---
name: design-system-sui
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Sui

## Mission
Deliver implementation-ready design-system guidance for Sui that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: Sui
- URL: https://www.sui.io/
- Audience: developers and technical teams
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=TWK Everett`, `font.family.stack=TWK Everett, Arial, sans-serif`, `font.size.base=15.1778px`, `font.weight.base=400`, `font.lineHeight.base=18.9722px`
- Typography scale: `font.size.xs=13px`, `font.size.sm=13.28px`, `font.size.md=14.23px`, `font.size.lg=15.18px`, `font.size.xl=17.08px`, `font.size.2xl=19.93px`, `font.size.3xl=41.74px`, `font.size.4xl=56.92px`
- Color palette: `color.text.primary=#6c7584`, `color.text.secondary=#ffffff`, `color.surface.base=#000000`, `color.text.inverse=#333333`, `color.surface.muted=#131518`, `color.surface.raised=#298dff`
- Spacing scale: `space.1=6.64px`, `space.2=6.65px`, `space.3=7.11px`, `space.4=7.59px`, `space.5=9.49px`, `space.6=9.96px`, `space.7=10px`, `space.8=11.21px`
- Radius/shadow/motion tokens: `radius.xs=50px` | `motion.duration.instant=200ms`, `motion.duration.fast=300ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
