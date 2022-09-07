---
id: gitworkflow
title: GitFlow Workflow
---

## Introduction
Git is the most commonly used version control system today, at KPMG we are committed to using GitHub. A Git workflow is a recipe or recommendation for how to use Git to accomplish work in a consistent and productive manner. Git workflows encourage developers and DevOps teams to leverage Git effectively and consistently. Git offers a lot of flexibility in how users manage changes. Given Git's focus on flexibility, there is no standardized process on how to interact with Git.

To ensure the team is on the same page, an agreed-upon Git workflow should be developed or selected. This document presents a standardized Git Workflow for KPMG Connected.

## Git Workflow

The workflow we are implementing is a slight variation on a GitFlow Workflow with the slight modification that we advise to treat hotfixes like bug fixes and implement through feature branches. 

GitFlow is ideally suited for projects that have a scheduled release cycle and for the DevOps best practice of continuous delivery. This workflow doesn’t add any new concepts or commands beyond what’s required for the Feature Branch Workflow. Instead, it assigns very specific roles to different branches and defines how and when they should interact. In addition to feature branches, it uses individual branches for preparing, maintaining, and recording releases. Of course, you also get to leverage all the benefits of the Feature Branch Workflow: pull requests, isolated experiments, and more efficient collaboration.

In order to build a successful Git Workflow we must establish a set of branches and also a set of target deployment environments that will be part of the CI/CD strategy. We can visualize these branches and target environments in the following Git Workflow overview;

!["Git Workflow"](/img/devops/git-flow.png "Git Workflow")

### Branches and Environments
The following sections give more insight into the role of each branch in this Git Workflow.

#### master/production
This is the branch that contains the production ready code, and should never be committed into directly - GitHub branch settings should be applied to this branch to prevent commits, and only allow approved and successfully built pull requests from release/* to be merged in. Generally will have a single release merged into master once QA on a release branch/environment has been approved. This will then allow master to reflect the latest changes + the release code and be deployed to production.

#### develop/dev
This branch originates from the master branch, and contains the latest development changes including all merged in features which is built for the initial development sanity test environment. Again code should never be committed into this branch directly - GitHub branch settings should be applied to this branch to prevent commits, and only allow approved and successfully built pull requests from feature/* to be merged in. Once PR's are merged in an automated pipeline should deploy this code into the dev environment.

#### feature/validate only
A separate and temporary feature branch should be created for every feature or issue/bug-fix that is worked on. This should be checked out by a developer and this local branch should be committed to as the developer makes progress. On this branch, edit, stage, and commit changes in the usual fashion, building up the feature with as many commits as necessary. Work on the feature and make commits like you would any time you use Git. When ready, push your commits, updating the feature branch on Bitbucket. It’s a good idea to push the feature branch up to the central repository. This serves as a convenient backup, when collaborating with other developers, this would give them access to view commits to the new branch. When a PR is issued from a feature it is not built, only validated and if validated and successfully built can be merged into the develop branch.

Many feature branches can be worked on in parallel, this is the key process for project delivery, so as a developer you will be responsible for ensuring your code does not conflict with other PR's. It is preferable to have short lived feature branches but if not then you can pull in the latest develop branch changes at any time to ensure your PR will be consistent.

!["Git Feature Branches"](/img/devops/feature-branch.png "Git Feature Branches")

#### release/QA

A separate and less temporary release branch that groups together a selection of features that have been merged into the development branch and have been verified through testing. This release will be built and validated and can be deployed into a target test QA environment for thorough testing and validation prior to approval and merging into master for a scheduled production release. Minor changes may occur in the release branch which would mean this release branch must also be merged back into develop to ensure consistency.

!["Git Release Branches"](/img/devops/release-branch.png "Git Release Branches")