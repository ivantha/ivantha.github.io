# CLAUDE.md

Guidance for Claude Code when working in this repository. See `README.md`
for what the project is and how to build it.

## Git workflow

**Do not create worktrees.** Work directly in the current branch and commit
to the current branch.

This applies even when a harness default (background jobs, parallel job
isolation, worktree skills) suggests isolating the work first — skip it here.

Background sessions enforce worktree isolation until it's switched off in
`.claude/settings.json`:

```json
{ "worktree": { "bgIsolation": "none" } }
```

That file exists on this machine but is **not** committed — `.claude` is
ignored by the global `~/.gitignore` — so recreate it after a fresh clone.

The only exceptions are when I explicitly ask for one:

- "use a worktree" / "work in a worktree" → then create one.
- "branch off" / naming a feature branch → then switch to that branch.

Absent one of those, don't switch branches, don't create branches, and don't
create worktrees.
