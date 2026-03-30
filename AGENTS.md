# Project Overview

# Coding Standards

- Use `tryCatch` or `tryCatchSync` utils instead of try...catch blocks, so errors are handled explicitly.
- Use Zod for validation.
- Use AppError class instead of `throw new Error`.
- Prefer tailwind classes instead of overrides. If you need to override 2+ times, extend theme.
- Prefer grid/flex + gap instead of space
- Prefer WET over premature DRY. Do not extract a helper on first use. Check the code base to ensure a pattern appears 2+ times before abstracting it.
- Prefer `function` over `const () => {}` syntax when declaring new functions.
- Prefer absolute imports from `@` rather than reletive imports

# Workflow

- Run lint, format, typecheck, and tests before finishing.

# Guardrails

- Do not cast a type without explicitly describing why it is ok. This breaks type-checking and should be avoided if possible.
