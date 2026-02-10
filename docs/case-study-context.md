# Case Study Context

This document defines how project case studies should be structured and written.

## Why Case Studies Exist

Project cards show breadth, but case studies show depth.
Case study pages are designed to present concrete engineering decisions and outcomes in a short, scannable format.

The goal is not storytelling for its own sake. The goal is hiring signal.

## Case Study Structure

Each case study should include:

1. Header / Snapshot
2. Problem & Solution
3. System Overview
4. Key Engineering Constraints, Decisions & Trade-offs
5. One Deep-Dive Example
6. Outcomes

## Content Rules

- Exactly 1 diagram (in System Overview)
- Exactly 1 table (Constraints/Decisions/Trade-offs)
- Keep sections short and non-repetitive
- Deep dive should focus on one concrete technical problem
- Outcomes should be concrete and evidence-based where possible

## Section Guidance

### 1) Header / Snapshot

Include:

- project name
- one-line description
- your role
- tech stack

### 2) Problem & Solution

Keep it tight:

- Problem: one sentence
- Solution: one sentence
- Optional: why it mattered technically

### 3) System Overview

Include:

- one high-level architecture diagram
- 1-2 lines describing the main flow

### 4) Constraints, Decisions & Trade-offs

Use one table with 2-4 rows and these columns:

- Constraint
- Decision (with why)
- Trade-off

### 5) One Deep-Dive Example

Cover:

- one concrete technical problem
- your approach
- outcome/impact

### 6) Outcomes

Add concise outcome statements that describe impact.

## Data Model Reference

Type definitions live at:

- `src/content/caseStudies/types.ts`

Current core types:

- `CaseStudy`
- `ContentBlock`
- `ConstraintsDecisionsTable`
- `ConstraintDecisionRow`
- `ImageBlock`

## Editorial Intent

Case studies should make it easy for readers to answer:

- What problem was solved?
- How does the system work?
- What constraints existed?
- Why were these decisions made?
- What trade-offs were accepted?
- What changed because of the work?

If those answers are clear in under a few minutes, the case study is doing its job.
