# Claude Agent Helper for Gontobbo

This directory contains Claude Code configuration for the Gontobbo project.

## Structure

```
.claude/
├── settings.json          # Permissions and hooks (committed)
├── settings.local.json    # Personal overrides (gitignored)
├── commands/              # Slash commands
│   ├── review.md         # /review - Code review
│   ├── fix.md            # /fix - Fix issues
│   └── deploy.md         # /deploy - Deploy app
├── rules/                 # Coding guidelines
│   ├── code-style.md     # TypeScript/React patterns
│   └── testing.md        # Testing guidelines
├── skills/                # Auto-activated knowledge
│   ├── backend-patterns/ # Backend best practices
│   └── mobile-patterns/  # Mobile best practices
└── agents/                # Subagent personas
    └── code-reviewer.md  # Code reviewer agent
```

## Usage

### Slash Commands

Type in chat:

- `/review` - Review code changes
- `/fix [error]` - Fix errors automatically
- `/deploy [app] [env]` - Deploy application

### Rules

Rules auto-load when editing relevant files:

- `code-style.md` - Applied to all TypeScript files
- `testing.md` - Applied when writing tests

### Skills

Skills auto-activate based on file patterns:

- `backend-patterns` - When working in `apps/backend/`
- `mobile-patterns` - When working in `apps/mobile/`

## Customization

Create local-only files (gitignored):

- `settings.local.json` - Personal permissions
- `commands/my-command.local.md` - Personal commands

## Learn More

See the attached images for full Claude Code Workflow patterns.
