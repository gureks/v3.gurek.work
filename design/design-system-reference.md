# Design System Reference — gurek.work v2

> Extracted from Figma file `L95Qbm2qizmTPnyWstPwdP`, node `26:177`
> Based on shadcn/ui + Inter, dark-first theme

---

## Color Palette

### Primitives (Neutral — Zinc-based)

| Token                  | Hex       | Usage                                    |
|------------------------|-----------|------------------------------------------|
| `--color-white`        | `#ffffff` | Text on dark, send button bg             |
| `--color-black`        | `#000000` | Hard borders, overlays                   |
| `--color-neutral-950`  | `#0a0a0a` | Page background                          |
| `--color-neutral-900`  | `#202020` | Nav background (at 80% opacity)          |
| `--color-neutral-800`  | `#262626` | Cards, bubbles, icon buttons, input bg   |
| `--color-neutral-700`  | `#404040` | Borders, tooltip bg, input border        |
| `--color-neutral-500`  | `#737373` | Secondary/muted text                     |
| `--color-neutral-400`  | `#a1a1a1` | Placeholder text, disabled text          |

### Accent

| Token           | Hex       | Usage                                  |
|-----------------|-----------|----------------------------------------|
| `--color-accent`| `#006eff` | CTA button, avatar bg, glow effect     |

### Opacity Variants Used

| Pattern                         | Where                        |
|---------------------------------|------------------------------|
| `rgba(32, 32, 32, 0.80)`       | Nav sidebar glassmorphism    |
| `rgba(38, 38, 38, 0.40)`       | AI response bubble bg        |
| `rgba(0, 0, 0, 0.20)`          | Generic overlay              |

---

## Typography

**Font:** Inter (all weights)

| Style Name         | Size   | Weight     | Line Height | Use Case                    |
|--------------------|--------|------------|-------------|-----------------------------|
| `text-sm-regular`  | 14px   | 400        | 20px        | Chat messages, body text    |
| `text-sm-medium`   | 14px   | 500        | 16px        | Button labels, nav labels   |
| `text-sm-bold`     | 14px   | 700        | 20px        | Emphasis in chat            |
| `text-xs-regular`  | 12px   | 400        | 16px        | Photo captions, metadata    |
| `text-xs-semibold` | 12px   | 600        | 16px        | Photo credit names          |
| Avatar initials    | 11.8px | 500        | 16px        | Chat avatar "AB"            |
| Avatar initials sm | 7.4px  | 500        | 10px        | Header avatar "AB"          |

**Italic** is used for dynamic/variable content (FirstName, JobRole) and emphasis phrases.

---

## Spacing Scale (4px base)

| Token        | Value | Common Usage                           |
|--------------|-------|----------------------------------------|
| `--space-0-5`| 2px   | Caption gaps                           |
| `--space-1`  | 4px   | Tight gaps (icon + text)               |
| `--space-1-5`| 6px   | Avatar internal padding                |
| `--space-2`  | 8px   | Icon button padding, nav item spacing  |
| `--space-2-5`| 10px  | Avatar internal padding                |
| `--space-3`  | 12px  | Nav link padding, send button padding  |
| `--space-4`  | 16px  | Card padding, chat bubble padding, gallery gap |
| `--space-6`  | 24px  | Page section padding, chat message gap |
| `--space-10` | 40px  | Input bottom padding                   |

---

## Border Radius

| Token          | Value | Usage                                    |
|----------------|-------|------------------------------------------|
| `--radius-sm`  | 8px   | Icon buttons, images, gallery thumbnails |
| `--radius-md`  | 10px  | Avatar badges                            |
| `--radius-lg`  | 16px  | Chat bubbles, nav panel, input, cards    |
| `--radius-full`| 9999px| Pills (unused currently, reserved)       |

---

## Shadows & Effects

| Token              | Value                                              | Usage              |
|--------------------|----------------------------------------------------|--------------------|
| `--shadow-sm`      | `0 1px 2px rgba(0,0,0,0.05)`                      | User pill button   |
| `--shadow-md`      | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)` | Send button  |
| `--shadow-lg`      | `0 10px 15px -3px rgba(0,0,0,0.1), ...`           | Input container    |
| `--shadow-tooltip` | `0 10px 15px rgba(0,0,0,0.1), ...`                | Suggestion chips   |
| `--glow-accent`    | `0 0 15px -2px #006eff`                            | CTA, user avatar   |

### Backdrop Blur

| Token       | Value | Usage                          |
|-------------|-------|--------------------------------|
| `--blur-sm` | 8px   | Icon buttons                   |
| `--blur-md` | 16px  | Action buttons                 |
| `--blur-lg` | 20px  | Nav panel outer wrapper        |
| `--blur-xl` | 40px  | Nav panel inner, list bg       |

---

## Components (Figma → SCSS mapping)

### Nav Sidebar
- **Outer wrapper:** `backdrop-filter: blur(var(--blur-lg))`, `padding: var(--space-6)`, `border-radius: var(--radius-lg)`
- **Inner list:** `bg: var(--background-nav)`, `backdrop-filter: blur(var(--blur-xl))`, `border-radius: var(--radius-lg)`
- **Nav Item (default):** `padding: var(--space-2) var(--space-3)`
- **Nav Item (selected):** `bg: var(--foreground)` (white), `border-radius: var(--radius-lg)`

### Header Bar
- `padding: var(--space-6)`, `border-bottom: 1px solid var(--border-subtle)`
- **Icon buttons:** `bg: var(--background-elevated)`, `padding: var(--space-2)`, `border-radius: var(--radius-sm)`, `backdrop-filter: blur(var(--blur-sm))`
- **CTA "Get in Touch":** `bg: var(--accent)`, `padding: var(--space-2)`, `gap: var(--space-1)`, `border-radius: var(--radius-sm)`, `box-shadow: var(--glow-accent)`

### Chat Bubbles
- **User message:** `bg: var(--background-elevated)`, `padding: var(--space-4)`, `border-radius: var(--radius-lg)`
- **AI message:** `bg: var(--background-elevated-alt)`, same padding/radius
- **Message row:** `gap: var(--space-4)` (avatar to bubble)
- **Between messages:** `gap: var(--space-6)`

### User Avatar
- `bg: var(--accent)`, `size: var(--avatar-md)`, `border-radius: var(--radius-md)`, `box-shadow: var(--glow-accent)`

### Input Area
- `bg: var(--background-elevated)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `padding: 17px`, `box-shadow: var(--shadow-lg)`
- **Send button:** `bg: var(--foreground)`, `padding: var(--space-3)`, `border-radius: var(--radius-sm)`, `box-shadow: var(--shadow-md)`

### Suggestion Chips
- `bg: var(--background-tooltip)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `padding: var(--space-2) var(--space-4)`, `box-shadow: var(--shadow-tooltip)`

---

## Responsive Breakpoints

| Name      | Width   | Layout Changes                           |
|-----------|---------|------------------------------------------|
| Mobile    | < 768px | Nav becomes drawer/bottom bar, full-width content, smaller avatars |
| Tablet    | 768–1279px | Collapsed nav, centered content       |
| Desktop   | ≥ 1280px | Full sidebar nav (108px), 702px content max-width |

---

## Figma Component Sets

| Component         | Variants                                       |
|-------------------|-------------------------------------------------|
| `Nav - Primary`   | Default, Hover                                  |
| `Nav - Tooltip`   | Default, Mobile-default, Mobile-selected        |
| `Nav Item`        | Default, Hover, Selected, Selected-hover        |
| `icon`            | home, fpv, image, play, builds, prompts, projects, resume |
| `input-text-area` | Default, Active (with suggestion chips)         |

---

## shadcn/ui Library Variables (Available for Re-linking)

The file was originally built using the **shadcn/ui community Figma library**. These variables from the `mode` collection can be re-imported:

- `background`, `background-color`, `foreground`
- `card-foreground`, `muted-foreground`
- `accent-foreground`, `primary-foreground`, `secondary-foreground`
- `sidebar-foreground`, `sidebar-accent-foreground`, `sidebar-primary-foreground`
- `popover-foreground`, `semantic-foreground`

Your own **"Portfolio - gurek.work"** library also has a `colors` collection with a `background` variable.

To re-link, use `figma.variables.importVariableByKeyAsync(key)` with the keys from the search results.
