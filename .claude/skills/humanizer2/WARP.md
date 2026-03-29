# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## What this repo is
This repository is a **Claude Code skill** implemented as a modular Markdown architecture with context routing.

The hub file is `SKILL.md`: Claude Code reads the YAML frontmatter (metadata + allowed tools), the master pattern index, and the three-pass audit process. Pattern details live in six `ref-*.md` reference files that the agent reads on demand during each pass.

## Key files (and how they relate)
- `SKILL.md`
  - The skill hub. Contains YAML frontmatter (`---` ... `---`) with `name`, `version`, `description`, and `allowed-tools`.
  - After frontmatter: Semantic Entropy Restoration section, master pattern index table, compound indicators, three-pass audit process, output format, and reference citations.
  - Routes agents to the appropriate ref files per audit pass.
- `ref-content.md` - Patterns 1-6: Content Patterns
- `ref-language.md` - Patterns 7-14: Language and Grammar Patterns
- `ref-sentence.md` - Patterns 15-21: Sentence Structure Patterns
- `ref-formatting.md` - Patterns 22-27: Formatting and Style Patterns
- `ref-communication.md` - Patterns 28-36: Communication and Filler Patterns
- `ref-composition.md` - Patterns 37-39: Composition Patterns

When changing pattern content, edit the appropriate `ref-*.md` file. When changing process, routing, or the pattern index, edit `SKILL.md`.

**Canonical source:** `loom-repo/.claude/skills/humanizer2/`. If copies exist in other repos (SOUP, etc.), they must stay in sync with this source.

## Common commands
### Install the skill into Claude Code
Recommended (clone directly into Claude Code skills directory):
```bash
mkdir -p ~/.claude/skills
git clone https://github.com/blader/humanizer.git ~/.claude/skills/humanizer2
```

Manual install/update:
```bash
mkdir -p ~/.claude/skills/humanizer2
cp SKILL.md ref-*.md ~/.claude/skills/humanizer2/
```

## How to "run" it (Claude Code)
Invoke the skill:
- `/humanizer2` then paste text

## Making changes safely
### Versioning (keep in sync)
- `SKILL.md` has a `version:` field in its YAML frontmatter.
- Bump the version when adding patterns, changing the process, or modifying routing logic.

### Editing ref files
- Each ref file covers one pattern category.
- Pattern numbering is sequential across all ref files (1-39). If you add or remove a pattern, renumber across all files and update the master index in SKILL.md.
- Keep each file under 300 lines.

### Editing SKILL.md
- Preserve valid YAML frontmatter formatting and indentation.
- The master pattern index table must stay in sync with the ref files.
- The three-pass routing instructions must reference the correct ref files for each pass.

### Documenting non-obvious fixes
If you change a pattern to handle a tricky failure mode, add a short note to the relevant ref file describing what was fixed and why.
