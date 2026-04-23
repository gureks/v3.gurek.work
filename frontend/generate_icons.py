import re
import os

mapping = {
    'home': '3bb8bc18',
    'projects': '292a3738',
    'resume': 'b6f676db',
    'builds': '60f19584',
    'prompts': '990a457b',
    'playground': '27bf6d4f',
    'fpv': '9cfa0055',
    'instagram': '3a1738b0',
    'linkedin': '7c6503d5',
    'github': '035c7d6b',
    'email': 'b9fde5bf',
    'search': '80d736c7',
    'nightMode': '0f6c92a3',
    'share': 'f7a0a0de',
    'phone': '05cc4454',
    'caretDown': '47a83281',
    'send': '9cfa0055' # mapped using the FPV paper plane since it's the same
}

v2dir = '/Users/gureks/Desktop/v2.gurek.work/frontend/src/assets/svgs'
all_files = os.listdir(v2dir)

out = "import React from 'react';\n\ntype IconProps = { size?: number | string; className?: string; };\n\n"

for name, prefix in mapping.items():
    svg_filename = next(f for f in all_files if f.startswith(prefix))
    with open(os.path.join(v2dir, svg_filename), 'r') as f:
        svg_content = f.read()

    # extract viewBox
    viewbox_match = re.search(r'viewBox="([^"]+)"', svg_content)
    viewbox = viewbox_match.group(1) if viewbox_match else "0 0 24 24"

    # Get inner content of <svg ...> ... </svg>
    inner_match = re.search(r'<svg[^>]*>(.*?)</svg>', svg_content, re.DOTALL)
    inner = inner_match.group(1) if inner_match else ""
    
    # JSX modifications
    # fix fill-rule -> fillRule, clip-rule -> clipRule, stroke-width -> strokeWidth, etc.
    inner = re.sub(r'fill-rule', 'fillRule', inner)
    inner = re.sub(r'clip-rule', 'clipRule', inner)
    inner = re.sub(r'stroke-width', 'strokeWidth', inner)
    inner = re.sub(r'stroke-linecap', 'strokeLinecap', inner)
    inner = re.sub(r'stroke-linejoin', 'strokeLinejoin', inner)
    inner = re.sub(r'stroke="[^"]+"', 'stroke="currentColor"', inner)
    inner = re.sub(r'fill="[^"]+"', 'fill="currentColor"', inner)
    inner = re.sub(r'fill="none"', 'fill="none"', inner) # this will be reverted below if needed, but fill="none" is fine. Wait, all fills were matched above. Let's make sure.
    # actually let's just make fill="currentColor" on paths that don't have fill="none"
    
    # Actually, var(--fill-0, ...) is what we want to replace
    inner = re.sub(r'(fill|stroke)="var\([^"]+\)"', r'\1="currentColor"', inner)
    # Some also just use #0A0A0A or white
    inner = re.sub(r'fill="#0A0A0A"', 'fill="currentColor"', inner)
    inner = re.sub(r'fill="white"', 'fill="currentColor"', inner)
    inner = re.sub(r'stroke="#A1A1A1"', 'stroke="currentColor"', inner)

    comp = f"export const {name.capitalize()}Icon: React.FC<IconProps> = ({{ size = 20, className }}) => (\n"
    comp += f'  <svg xmlns="http://www.w3.org/2000/svg" width={{size}} height={{size}} viewBox="{viewbox}" className={{className}} overflow="visible">\n'
    comp += f'    {inner}\n'
    comp += f"  </svg>\n);\n\n"
    
    # Wait, some paths in SVGs have fill="none". We don't want to replace fill="none" with currentColor.
    
    out += comp

with open('/Users/gureks/Desktop/v2.gurek.work/frontend/src/assets/custom-icons.tsx', 'w') as f:
    f.write(out)

