# LUXURY UI & MODERN DESIGN CONSTITUTION FOR ASTERA

## 1. BRAND IDENTITY & TAILWIND v4 VARIABLES
- **Mandate:** You must strictly use the custom Astera Tailwind v4 variables defined in `globals.css`.
- **Colors:** Use `bg-astera-cream` for backgrounds, `bg-astera-white` for cards, `text-astera-dark` for primary text, and `text-astera-gold` for accents. NEVER use arbitrary hex codes.
- **Localization:** All UI text must be in Croatian (e.g., "Dodaj u košaricu").

## 2. THE "ANTI-MUSH" SPACING LAW
- **Zero Edge Touching:** No element (text, labels, buttons) shall ever touch the edge of its container or an image border. 
- **Vertical Rhythm:** Main sections MUST have a minimum padding of `py-20` to `py-32` (80px to 128px). 
- **The "Breathe" Rule:** If you think a gap is "enough," double it. High-end design is defined by intentional whitespace.
- **Container Logic:** Always wrap content in `max-w-7xl mx-auto px-6 lg:px-8`.

## 3. VISUAL HIERARCHY & TYPOGRAPHY
- **Headings:** Use the custom serif variable (`font-serif` mapped to Playfair Display/Cinzel) with `tracking-widest` and `uppercase` for a "Cartier" aesthetic.
- **Body:** Use clean, minimalist Sans-serif (`font-sans`) with `leading-relaxed`.
- **Labels:** Floating labels must be inside a `backdrop-blur-md bg-white/70` pill with `rounded-full`, `px-4`, and `py-1.5`.

## 4. COMPONENT POLISH (TAILWIND ONLY)
- **Borders & Corners:** Use `rounded-2xl` or `rounded-3xl` for cards. Use ultra-thin borders: `border border-astera-border` or `border-black/5`.
- **Shadows:** Never use default heavy shadows. Use `shadow-sm` or custom soft glows (`shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
- **Interaction:** Every clickable element MUST have a transition: `transition-all duration-500 ease-in-out`. Add `hover:scale-[1.01]` and `hover:opacity-80`.
- **Forms/Inputs:** Inputs must have `focus:ring-1 focus:ring-astera-gold focus:outline-none`. NO default browser blue outlines.

## 5. MANDATORY CODE PATTERN QA PROTOCOL
Before outputting code, you must internally verify the following:
- **Check 1:** Are there any default HTML buttons? If yes, REWRITE using Astera component polish.
- **Check 2:** Did I use generic `text-gray-900` or `bg-white` instead of `text-astera-dark` or `bg-astera-cream`? If yes, FIX IT.
- **Check 3:** Are the `z-index` and `fixed` positioning correct for navigation and floating UI to prevent overlapping?
- **Check 4:** Is the layout explicitly using Flexbox or Grid (`flex`, `grid`) to prevent vertical collapsing?

## 6. PROHIBITED PRACTICES
- NO inline styles.
- NO unstyled `<input>`, `<button>`, or `<form>` tags.
- NO `padding: 5px` or arbitrary small values.
- NO "mushed" footers or overlapping sidebar navigation.
