---
title: "Moving my coding agent workflow into Orca"
description: "I used to juggle Zed, omp, Claude and Codex in separate windows. Here's why I now run all of them, plus my worktrees, MCP servers and Jira, from Orca."
pubDate: "2026-11-24T10:00:00+07:00"
---

For a long time my setup was comfortable, and also scattered. This is how it looked, and why I moved everything into [Orca](https://github.com/stablyai/orca).

![Before: Zed, omp, Claude and Codex as separate windows. After: all of them inside one Orca workspace](/img/posts/orca-before-after.svg)

## The old setup

- **Zed** as the main editor.
- **omp**, my coding agent of choice, opened through Zed's terminal integration.
- **Claude** and **Codex** running separately, each in its own place.

The main reason I used Zed at all was **worktree management**. Git worktrees let me keep several branches checked out side by side, and Zed made that painless. The terminal integration was just the way to get my agent next to the code.

It worked, but the pieces were glued together by habit, not by design. Every new worktree meant another terminal, another agent session, and one more thing to remember.

## What changed with Orca

Orca became the place where all of that gets orchestrated. These are the parts that made the difference for me.

### My MCP servers come along via omp

I run omp inside Orca, so every MCP server I had already configured is available right there: Jira, Slack, New Relic, docs lookup and the rest. I didn't have to rebuild any integration for a new tool. I just opened omp in an Orca terminal and everything was already connected.

### Claude and Codex for research, in the same window

When I want a second opinion or some background research, I start Claude or Codex right next to my omp session. They sit in the same workspace instead of in separate apps. A typical flow now: omp implements, Codex reviews the diff, Claude digs into a question I'd otherwise have to open another window for.

Orca also gives agents a way to talk to each other. From the CLI, one agent can message another (`orca orchestration send`), hand work off to a new worktree with an agent already started (`orca worktree create --agent codex --prompt "..."`), and you can list everything that's running with `orca agent list`. There's even full-text search across past agent sessions with `orca search`, which is handy when I remember solving something but not where.

### Worktrees are detected automatically

This is the feature that originally kept me on Zed, and now it's built into the tool I run my agents in. Orca picks up my git worktrees on its own. Each worktree becomes a workspace with its own terminals and agents, so I never lose track of which agent is working on which branch.

![A repo with three worktrees, each with its own agents running inside](/img/posts/orca-worktrees.svg)

Creating a new one for a task is a single command, and it can be a child of the workspace I'm currently in:

```bash
orca worktree create --name fix-api-timeout --parent-worktree active
```

### Jira integration

Because Orca knows about the worktree, it can link that worktree to the ticket it belongs to. Attaching a ticket is just its key:

```bash
orca reference add ENG-123 --worktree current
```

The same mechanism accepts GitHub pull request URLs and Linear issues, so one worktree can carry its ticket and its PR together. Later I can search by a ticket key and jump straight to the worktree and agent that worked on it, instead of digging through branches.

![A Jira ticket linked to a worktree, an omp session and a pull request](/img/posts/orca-jira-flow.svg)

### Reaching it from my phone

Connecting Orca to my phone was easy. Orca can pair with other devices through a pairing code, so I pair once and then I can check on a running agent or nudge it along without sitting at my desk. For long agent tasks, that matters more than I expected: I can start something, walk away, and still see how it's going.

![Desktop Orca paired with a phone through a pairing code](/img/posts/orca-phone.svg)

## So, is Zed gone?

Not entirely. Zed is still a great editor, and I'll open it when I want to read or edit code by hand. What changed is that it's no longer the hub. Orca is where I start work, and the editor is just one tool I reach for from there.

## Before and after

| | Before | After |
| --- | --- | --- |
| Worktrees | Managed through Zed | Detected automatically by Orca |
| omp | Opened from Zed's terminal | Runs inside Orca, MCP servers included |
| Claude and Codex | Separate, outside the editor | Same workspace as omp |
| Jira | Separate tab | Linked to the worktree |
| Away from desk | Not really | Phone, via pairing |

## Wrapping up

The short version: the same tools I already liked (omp, Claude, Codex, worktrees, my MCP servers, Jira) now live in one place instead of five. If your workflow looks like my old one, Orca is worth a try.
