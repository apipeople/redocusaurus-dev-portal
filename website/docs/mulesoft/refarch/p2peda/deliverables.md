---
id: project_deliverables
title: Project Deliverables 
---

## Introduction

This page should help to clarify the overall project deliverables that are contractually agreed between the two parties - Novelis and KPMG. 

We can then further analyze this by Phase, and initially focus our attentions on Phase I and link the contractual elements to the actual documentation/asset we will define to satisfy the obligation.

## Phase I Project Deliverables

The milestone and deliverables for the first phase of the project have been documented as follows. 

Project Milestone / Document  | Activities                             | Vendor Role | Client Role |
------------------------------|----------------------------------------|-------------|-------------|
Integration Core Model & US – Readiness| MuleSoft Platform             | I           | R,A         |
|                             | Integration Architecture               | I           | R,A         |
|                             | C4E                                    | I           | R,A         |
|                             | DevOps - Platform/Infrastructure       | I           | R,A         |
|                             | DevOps - Config/Support                | I           | R,A         |
|                             | DevOps - Training                      | I           | R,A         |
|                             | DevOps - Execution                     | R,A         | I,S         |
|Integration Core Model & US – Mobilize MVP| Validate                  | I           | R,A         |
|                             | Adjust to Novelis’s core model         | C           | R,A         |
|Execution Sprint iterations across NA (1A) | Technical Stories        | R,A         | S           |
|                             | Technical Specifications and Mapping   | R,A         | S           |           
|                             | API Definitions                        | R,A         | I          |           
|                             | API Publish                            | R,A         | I          |           
|                             | API Implement & Unit Test              | R,A         | I           |           
|                             | API Manage                             | R,A         | C           |           
|                             | API Deploy                             | R,A         | I           |           
|                             | API Component Test                     | R,A         | I          |           
|                             | SIT                                    | S           | R,A          |      
|                             | UAT                                    | S           | R,A         | 
|                             | Cutover                                | R,A         | S          | 
|                             | Hypercare                              | R,A         | S          | 


The RASCI matrix information for clarification is as follows;

- R - Responsible - who is responsible for the deliverable
- A - Accountable - who is ultimately accountable for the deliverable
- S - Support - who will provide help to the responsible members
- C - Consulted - who will give advice to the responsible members
- I - Informed - who needs to be kept in the loop at every stage

Add something hereSSSSS

The following is a clarification on the agreed upon deliverables for Phase I;

### DevOps Execution

Assume this is to build out the Git Workflow and CI/CD strategy onto the existing DevOps infrastructure/tool set that Novelis will provide.

### Technical Stories

Technical stories, provided for Novelis publication in applicable Novelis repositories.

Need some clarification here to exactly what this entails - format - content etc ?

### Technical Specifications and Mapping

The technical specification of the APIs and their integrations including API identification, naming, technical requirements, design, and data formats and their mappings as they relate to supporting the business requirements.

This is essentially the content we can group into 'Domain' or 'Common Framework' Technical Design Documents.

### API Definitions 

The Design Center RAML libraries and individual API specifications. 

### API Publish 

The published API Specification and associated Exchange documentation and versioning information.

### API Implement & Unit Test

Using our best practices and the Technical Design Document we can build out the associated conde in Anypoint studio and in parallel build out the required MUnits to provide adequate coverage of positive and negative test cases.

### API Manage 

For each application we will be specifying non functional requirements related to ;

- Security 
- Quality of Service QoS
- Governance
- Monitoring and Alerting Plan
- Logging

### API Deploy

Leveraging the Novelis base CI/CD implementation we should build our automated pipelines to handle CI/CD.

### API Component Test 

Sanity checking and system testing the API as a deployed application into a Mule development environment.  

Clarify the scope of this  - perhaps to provide in the source code Postman scripts to facilitate the testing of an application by environment.

### Cutover 

I assume we will be working with Novelis to manage the cutover and so will need to ensure an operational implementation and support plan is in place.

### Hypercare

Assume this means constant support after go live, need to confirm how long this period will last and what are the deliverables ? Maybe an operational runbook ?
