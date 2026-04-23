const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// replace the entire Design System: Brand & Semantic Tokens section
const replacement = `    /* ─── Design System: Brand & Semantic Tokens ─── */
    --semantic-background: #0a0a0a;
    --semantic-background-elevated: #262626;
    --semantic-background-tooltip: #404040;
    --semantic-border: #404040;
    --semantic-foreground: #ffffff;
    --semantic-foreground-muted: #a1a1a1;
    --semantic-accent: #006eff;
    --semantic-accent-foreground: #ffffff;
    --glow-accent: 0px 0px 15px -2px #006eff;
    --shadow-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.3), 0px 4px 6px -4px rgba(0, 0, 0, 0.2);`;

css = css.replace(/\/\* ─── Design System: Brand & Semantic Tokens ─── \*\/[\s\S]*?(?=\s*\})/, replacement + '\n  ');

fs.writeFileSync('src/index.css', css);
