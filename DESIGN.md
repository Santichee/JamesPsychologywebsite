---
name: James Vining Psychotherapy
description: Premium design system for a caring, relational psychotherapist practice
colors:
  primary: "#3e5d7a"
  primary-hover: "#2b4965"
  primary-light: "#ebf1f6"
  accent-warm: "#ad624f"
  accent-warm-light: "#f9f1ef"
  neutral-bg: "#faf8f5"
  neutral-surface: "#ffffff"
  neutral-text: "#161e27"
  neutral-text-muted: "#525c66"
  border: "#eae6df"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.1rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Lora, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  container: "1200px"
---

# Design System: James Vining Psychotherapy

## 1. Overview

**Creative North Star: "The Relational Sanctuary"**

The visual system is designed to convey emotional safety, professional authority, and relational warmth. It is centered around natural organic colors (healing ocean blue and warm terracotta clay) set against a soft cream linen canvas. The pairing of a clean display face (Outfit) with a warm, literary serif body face (Lora) mirrors James's clinical approach: structured and clear systems integrated with deep, relational psychodynamics.

This system explicitly rejects hyper-neon corporate styling, flat cold monochrome interfaces, and high-contrast grids that generate visual fatigue or anxiety.

**Key Characteristics:**
- Soft, natural color palette with low-contrast, tinted neutral backgrounds.
- Fluid and readable editorial typography with generous line heights and balanced spacing.
- Subtle interactive cues (smooth scale transitions and background blends on hover).

## 2. Colors

The color palette is derived from natural earth tones to project calm, reflection, and safety.

### Primary
- **Healing Ocean Blue** (`#3e5d7a` / `oklch(45% 0.08 230)`): Used for primary branding, active navigation links, and main call-to-action buttons. Represents clarity and clinical depth.
- **Ocean Hover** (`#2b4965` / `oklch(37% 0.08 230)`): Accent state for primary items.
- **Ocean Tint** (`#ebf1f6` / `oklch(95% 0.02 230)`): Used for secondary buttons and light callouts.

### Secondary
- **Terracotta Clay** (`#ad624f` / `oklch(53% 0.12 40)`): Secondary accent color. Used for section eyebrows, experience badges, and logo subtitles to add relational warmth.

### Neutral
- **Cream Linen** (`#faf8f5` / `oklch(98% 0.005 80)`): Light mode body background. Reduces eye strain compared to pure white.
- **Midnight Slate** (`#161e27` / `oklch(20% 0.03 240)`): Used for high-emphasis headings and primary text.
- **Slate Blue-Gray** (`#525c66` / `oklch(46% 0.02 240)`): Used for readable body text.
- **Pure White** (`#ffffff` / `oklch(100% 0)`): Used for card backgrounds and navigation overlays.

### Named Rules
**The Tone Contrast Rule.** Body copy must maintain at least a 4.5:1 contrast ratio against the background. Muted gray text is prohibited for critical copy.
**The Warm Accent Rule.** Terracotta clay is an accent role used strictly to highlight specialized badges and section eyebrows; it must carry ≤10% of any page's total color weight.

## 3. Typography

**Display Font:** Outfit (sans-serif)
**Body Font:** Lora (serif)

**Character:** The pairing of Outfit and Lora balances structured, modern clarity with warm, traditional depth. Outfit headings feel bold and grounded, while Lora body copy provides a friendly, editorial feel.

### Hierarchy
- **Display** (Bold 700, `clamp(2.1rem, 5vw, 3.5rem)`, 1.15): Used for main hero headers.
- **Headline** (Bold 700, `2.5rem`, 1.25): Used for main section headers.
- **Title** (Semi-Bold 600, `1.35rem` to `1.75rem`, 1.3): Used for cards, subsections, and panel headers.
- **Body** (Regular 400, `1.125rem`, 1.7): Used for all long-form paragraphs. Standard max-width of 65–75ch for readability.
- **Label** (Medium 500, `0.85rem` to `1.0rem`, 1.2): Used for buttons, navigation links, and uppercase eyebrows.

### Named Rules
**The Balance Rule.** All display and section headings (h1, h2, h3) must use `text-wrap: balance` to prevent awkward line breaks.
**The Prose Constraint Rule.** All readable text blocks must be constrained to a maximum width of `65ch` or `75ch` to ensure ease of reading.

## 4. Elevation

The system is flat by default, relying on subtle backgrounds and border borders to separate sections. Depth is suggested through card overlays rather than heavy shadows.

### Shadow Vocabulary
- **Card Shadow** (`0 10px 40px -10px rgba(22, 30, 39, 0.05)`): Ambient soft shadow to float pricing and contact panels.

### Named Rules
**The Ambient Response Rule.** Shadows must remain ambient and light (opacity ≤ 5%). Heavy, high-contrast borders are prohibited.

## 5. Components

### Buttons
- **Shape:** Full pill shape (radius `9999px`)
- **Primary:** Healing Ocean Blue (`#3e5d7a`) background, white text. Internal padding `14px 28px`.
- **Hover:** Shifts to Ocean Hover (`#2b4965`), translates up `2px` with a soft glow.

### Cards / Containers
- **Corner Style:** Medium curved corners (radius `16px`)
- **Background:** Pure White (`#ffffff`) for light mode, Midnight Slate (`#161e27`) for dark mode.
- **Border:** Hairline border (`1px solid var(--border-light)`).

### Inputs / Fields
- **Style:** Stroke border (`1px solid var(--border-color)`), comfortable padding (`14px 20px`), radius `8px`.
- **Focus:** 2px solid Healing Ocean Blue ring with `4px` offset.

### Navigation
- **Style:** Sticky header with blurred glass background (`backdrop-filter: blur(12px)`). Active link features a slide-in bottom accent line.

## 6. Do's and Don'ts

### Do:
- **Do** use Outfit for structural titles and Lora for all prose/quote sections.
- **Do** maintain a strict light-mode cream background (`#faf8f5`) or system dark-mode slate (`#0e1319`).
- **Do** test headers on mobile to ensure fluid typography (`clamp`) does not cause text overflow.

### Don't:
- **Don't** use side-stripe borders (e.g. `border-left: 4px solid var(--accent-warm)`) as decorative highlights. Use full borders or subtle background fills.
- **Don't** use gradient text under any circumstances.
- **Don't** animate image elements on hover.
