# 🔹 Rules for Next Code Generations

## 1. HTML Structure

-   Use **semantic tags** (`header`, `nav`, `main`, `section`,
    `article`, `footer`) instead of generic `div`s.
-   Navigation must use `<ul><li><a>` structure for accessibility.
-   Always include meaningful `alt` text for images (not just repeating
    the title).
-   Use `<button>` or `<a>` for interactive elements (not bare emojis).
-   Wrap main page content in `<main>`.

## 2. Accessibility (a11y)

-   Use `aria-label` or descriptive text for buttons/icons.
-   Provide `:hover`, `:focus`, and `:active` styles for links and
    buttons.
-   Keep font sizes readable (`>= 14px`) and maintain good contrast.

## 3. CSS

-   Use **CSS variables** (`--primary`, `--secondary`, `--text`,
    `--space-md`, etc.) for colors, spacing, and radii.
-   Define a **consistent spacing system** (`--space-sm`, `--space-md`,
    `--space-lg`, etc.).
-   Group reusable/shared styles to avoid duplication (DRY).
-   Use external `style.css`, never inline `<style>` unless explicitly
    needed.
-   Add smooth hover/transition effects for interactive elements.

## 4. Layout & Responsiveness

-   Use **flexbox or grid** for layouts instead of fixed positioning.
-   Ensure responsive design: content should adapt to smaller screens
    (mobile-first).
-   Cards or grids should stack vertically on narrow screens.

## 5. Code Quality

-   Keep indentation consistent (2 or 4 spaces).
-   Use descriptive class names (`.recipe-card`, `.navbar`) --- avoid
    meaningless names.
-   Avoid repeating sections with duplicate HTML; if patterns repeat,
    use reusable classes or templates.
-   Keep HTML for structure & content only, CSS for styling.

## 6. Performance & UX

-   Use `object-fit: cover` for images to prevent distortion.
-   Lazy-load images if many are present (`loading="lazy"` when
    applicable).
-   Optimize for readability with whitespace and clean formatting.
