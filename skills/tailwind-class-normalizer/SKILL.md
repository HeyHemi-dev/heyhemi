---
name: tailwind-class-normalizer
description: Normalize Tailwind utility classes into cleaner canonical forms for readability and consistency. Use when refactoring class strings in Astro/HTML/JSX/TSX, especially to replace arbitrary-value syntax with Tailwind shorthand or built-in equivalents (for example var() shorthand and viewport-height utilities).
---

# Tailwind Class Normalizer

Normalize Tailwind class strings without changing layout intent.

## Workflow

1. Find candidate class strings in templates and components.
2. Apply safe canonical rewrites.
3. Keep behavior unchanged unless the user explicitly asks for semantic changes.
4. Rebuild or run checks after replacements.

## Canonical rewrites

Prefer these replacements:

- `pb-[var(--nav-height)]` -> `pb-(--nav-height)`
- `text-[var(--brand-text)]` -> `text-(--brand-text)`
- `min-h-[100vh]` -> `min-h-screen`

Project-specific optional rewrite (apply only when explicitly desired):

- `min-h-[100dvh]` -> `min-h-[100vh]` (or remove if duplicate with `min-h-screen`)

## Pattern-based guidance

Use the custom-property shorthand when supported by the utility:

- `[utility]-[var(--token)]` -> `[utility]-(--token)`

Examples:

- `h-[var(--nav-height)]` -> `h-(--nav-height)`
- `-mt-[var(--nav-height)]` -> `-mt-(--nav-height)`
- `text-[var(--brand-text)]` -> `text-(--brand-text)`

Do not rewrite utilities that do not support the shorthand.

## Scope and safety

- Change classes only; do not rewrite unrelated markup or logic.
- Preserve class ordering style already used in the file.
- If both old and new forms exist, keep one canonical form.
- If a rewrite is ambiguous, keep the existing class and note why.
