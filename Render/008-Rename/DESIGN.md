# Design System Strategy: The Digital Sanctuary

## 1. Overview & Creative North Star
The "Digital Sanctuary" is a high-end editorial approach to the modern pet store. We are moving away from the "big-box retailer" aesthetic of cluttered grids and harsh borders. Instead, our Creative North Star is **"The Curated Home."**

The experience should feel like walking into a premium boutique: spacious, warm, and intentionally layered. We break the "template" look by using **Dynamic Asymmetry**—where hero images of pets overlap container boundaries—and **Tonal Depth**, using background shifts instead of lines to guide the eye. Every interaction should feel like a soft pat: reliable, gentle, and high-fidelity.

## 2. Colors & Surface Philosophy
Our palette transitions from a purely functional set to a sophisticated environmental language.

*   **Primary (#964300 / #FF8C42):** Used for "The Glow." It’s not just a button color; it’s a beacon of energy.
*   **Secondary (#006761 / #4ECDC4):** Our "Calm Accent." Use this for trust-based elements like health certifications or premium organic tags.
*   **The "No-Line" Rule:** **Strictly prohibit 1px solid borders for sectioning.** To separate a product grid from a testimonial section, shift the background from `surface` (#f7f6f5) to `surface-container-low` (#f1f1f0). Use whitespace (Spacing Scale 12 or 16) to define boundaries.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper.
    *   **Level 0 (Background):** `surface` (#f7f6f5).
    *   **Level 1 (Sections):** `surface-container-low` (#f1f1f0).
    *   **Level 2 (Cards/Interactives):** `surface-container-lowest` (#ffffff).
*   **The "Glass & Gradient" Rule:** For floating navigation or "Quick Add" modals, use `surface-container-lowest` with a 80% opacity and a 12px backdrop-blur. Apply a subtle linear gradient from `primary` (#964300) to `primary-container` (#f9873e) on main CTAs to create a "sun-kissed" volume that flat colors lack.

## 3. Typography: The Friendly Editorial
We use a dual-font system to balance authority with "pet-friendly" warmth.

*   **The Voice (Plus Jakarta Sans):** Used for `display` and `headline` scales. It’s modern and clean but maintains a geometric friendliness. High-contrast sizing (e.g., using `display-lg` next to `body-md`) creates an editorial, magazine-like feel.
*   **The Body (Be Vietnam Pro):** Used for `title`, `body`, and `label`. It offers exceptional legibility for long product descriptions and ingredient lists.
*   **Hierarchy Note:** Always lead with a `display-sm` or `headline-lg` for category headers to create an "Alpha" visual anchor, then skip down to `body-lg` for descriptions to create breathable, sophisticated contrast.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-heavy." We use light and tone.

*   **The Layering Principle:** To make a product card "pop," do not use a shadow. Place a `surface-container-lowest` card on top of a `surface-container` background. The slight delta in hex code creates a sophisticated "natural lift."
*   **Ambient Shadows:** If a card must float (e.g., a "Recommended for You" hover state), use a shadow tinted with `on-surface` (#2e2f2f) at 4% opacity with a 32px blur. It should look like a soft glow, not a dark smudge.
*   **The "Ghost Border" Fallback:** If a border is required for input fields, use `outline-variant` (#adadac) at **15% opacity**. It should be felt, not seen.
*   **Roundedness:** Stick to the `md` (1.5rem) scale for most containers to echo the "Friendly" brand persona. Use `full` (9999px) strictly for interactive chips and buttons.

## 5. Components & Interaction Patterns

### Buttons
*   **Primary:** `primary-container` (#f9873e) background with `on-primary-container` (#451b00) text. Use `Roundedness-full` for a playful, pebble-like feel.
*   **Secondary:** `surface-container-highest` (#dcdddc) with a "Ghost Border."
*   **States:** On hover, shift background to `primary-fixed-dim` (#e97b32). No sudden color jumps; use 200ms easing.

### Cards & Product Grids
*   **Constraint:** **Forbid the use of divider lines.**
*   **Structure:** Use vertical whitespace (Spacing 6) to separate product titles from pricing.
*   **Imagery:** Photos must be "Edge-to-Edge" at the top with `Roundedness-md` applied only to the bottom of the container to ground the image.

### Chips & Tags
*   **Selection Chips:** Use `secondary-container` (#7cf6ec) for "In Stock" or "Organic" tags. It provides a cool, refreshing contrast to the warm orange primary.
*   **Interaction:** 0.5rem (sm) roundedness to distinguish them from the fully rounded buttons.

### Input Fields
*   **Background:** `surface-container-low` (#f1f1f0).
*   **Active State:** Transition the "Ghost Border" to `primary` (#964300) at 100% opacity, but keep the line weight at 1.5px. Use `title-sm` for user input text.

## 6. Do’s and Don’ts

### Do
*   **Do** overlap pet imagery across different background colors to break the grid.
*   **Do** use `Spacing-20` for hero section margins to emphasize exclusivity and "breathing room."
*   **Do** use `tertiary` (#775600) for "Sale" or "Limited" callouts to maintain warmth without the alarm of "Error Red."

### Don’t
*   **Don’t** use the `error` (#b02500) color for anything other than critical system failures. It’s too aggressive for a "Caring" brand.
*   **Don’t** use a pure black (#000000) for text. Always use `on-surface` (#2e2f2f) to keep the contrast soft and readable.
*   **Don’t** use 90-degree corners. Everything in the pet store should feel soft to the touch.