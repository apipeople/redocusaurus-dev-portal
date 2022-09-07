---
id: gitworkflow_example
title: GitFlow Workflow Example
---

## Step by Step Example

The following is an example of a scenario where a new feature is released for a production release.

**John begins a new feature**

!["New Feature"](/img/devops/new-feature.png "New Feature")

Before he starts developing a feature, John needs an isolated branch to work on. He can request a new branch with the following command:

```jsx title="checkout.bash"
git checkout -b feature/KPMG-123 develop
```

This checks out a branch called  feature/KPMG-123 based on develop, and the -b flag tells Git to create the branch if it doesn’t already exist. On this branch, John edits, stages, and commits changes in the usual fashion, building up her feature with as many commits as necessary:

```jsx title="add.bash"
git status 
git add <some-file> 
git commit
```

John adds a few commits to his feature over the course of the morning. Before he leaves for lunch, it’s a good idea to push his feature branch up to the central repository. This serves as a convenient backup, but if John was collaborating with other developers, this would also give them access to his initial commits.

```jsx title="push.bash"
git push --set-upstream origin feature/KPMG-123
```

This command pushes feature/KPMG-123 to the central repository (origin).