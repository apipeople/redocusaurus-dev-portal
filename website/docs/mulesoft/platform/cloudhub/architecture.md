---
id: introduction
title: Architecture
---

CloudHub is a cloud-based integration platform as a service (iPaaS) that enables developers to integrate and orchestrate applications and services while giving operations the control and visibility they require for mission-critical demands, all without the need to install or manage middleware or hardware infrastructure. You can deploy applications to CloudHub through Anypoint Runtime Manager, found on Anypoint Platform. 

CloudHub is designed to provide enterprises with a multitenant, secure, elastic, and highly available integration platform as a service (iPaaS). To maximize your use of CloudHub, you should understand how the underlying mechanisms of the CloudHub platform work to achieve these goals.

Manage CloudHub with the Anypoint Runtime Manager console in Anypoint Platform. You can also deploy to it directly from Anypoint Studio, via the CloudHub REST API or via the Anypoint Platform command-line interface.

To understand CloudHub’s approach to security and availability, it’s important to understand the architecture behind CloudHub. It includes two major components—​Anypoint platform services, and the worker cloud. These two components and the Runtime Manager console through which you access them work together to run your integration applications.

!["CloudHub Architecture"](/img/mulesoft/cloudhub/architecture.png "CloudHub Architecture")

- Integration Applications: Applications that you create and deploy to CloudHub to perform integration logic for your business
- Platform Services: Shared CloudHub platform services and APIs, which includes CloudHub Insight, alerting, logging, account management, virtual private cloud/secure data gateway, and load balancing
- Global Worker Clouds: An elastic cloud of workers, Mule instances that run integration applications
- Runtime Management Console: User interface that enables you to deploy and monitor integrations, and configure your account

:::info
You can view the live status and detailed service history for the Runtime Manager console, platform services, and the CloudHub worker cloud on **status.mulesoft.com** for the default (US hosted) Control Plane and **eu1-status.mulesoft.com** for the EU Control Plane.
:::

### Platform Services

CloudHub platform services are responsible for coordinating all aspects of the platform. They coordinate deployment of applications, monitor integrations, provide analytics data, store application data, run scheduled jobs, and more. Many of these services are also exposed through the CloudHub REST API.

### Global Worker Clouds

CloudHub offers worker clouds in different regions of the world: North America, South America, the European Union, and Asia-Pacific. For the complete list of supported regions, see Regional Services.

This global distribution enables you to host your integration in the location closest to your services, thus reducing latency. It can also provide for adherence to local laws, such as the EU Data Protection Directive. For the US and US-Gov control planes, MuleSoft hosts the management console and platform services in the United States. For the EU control plane, MuleSoft hosts these services in Europe.

The region that you deploy your application to determines the domain provided for your application. For example, if you deploy an application named myapp to Canada (Central), the domain used to access the application is myapp.ca-c1.cloudhub.io. The load balancer used to route requests resides in the same region as your application.

### Runtime Management Console

The Runtime Manager console is integrated into the Anypoint Platform. Sign in with your Anypoint Platform credentials to upload and manage your integration applications at runtime. The console surfaces useful monitoring information from the platform services and also works as a comprehensive dashboard for both application-level and account-level management.

Through this same console you can deploy to CloudHub as well as to other registered servers. You can also manage deployed applications.

### Workers and Multitenancy
Because different levels of security and isolation are needed depending on the service, the platform provides two different levels of multitenancy.

First, the worker cloud is a multitenant cloud of virtual machines. These VMs provide the security and isolation needed for your integrations to run custom code without affecting others.

Second, the management console and the platform services have a "shared everything" architecture – all tenants share the same web UI, monitoring services, load balancers, etc. These services do not process or transmit your data.

### Availability and Scalability
CloudHub is designed to be highly available and scalable through redundancy, intelligent healing, and zero-downtime updates. It also enables customers to scale and benefit from added reliability through clustering.

### Redundant Platform
All of CloudHub platform services, from load balancing to the API layer, have at least one, built-in layer of redundancy and are available in at least two data centers at all times. All data centers are at least 60 miles apart. This redundancy ensures that even if there is a data center outage, the platform remains available.

## High Availibility and DR

CloudHub provides high availability (HA) and disaster recovery for application and hardware failures.

CloudHub uses Amazon AWS for its cloud infrastructure, so availability is dependent on Amazon. The availability and deployments in CloudHub are separated into different regions, which in turn point to the corresponding Amazon regions. If an Amazon region goes down, the applications within the region are unavailable and not automatically replicated in other regions.

!["AWS Global Infrastructure"](/img/mulesoft/cloudhub/aws-global-infrastructure.png "AWS Global Infrastructure")

For example, if the US East region is unavailable, the CloudHub management UI, as well as the various REST services that enable deployments, are unavailable until the region’s availability is restored. New applications can’t be deployed while US East is down.

While the control plane is unavailable, the runtime plane continues to send log data and other telemetry data, which the worker buffers (up to 1 GB) until availability is restored.

CloudHub provides an internal messaging mechanism, in the form of persistent queues, that is used for message reliability. While persistent queues are highly available within a region, they might not be accessible if the region or part of the region is unavailable (usually a few seconds or minutes), which could result in some data loss. After the region is available again, CloudHub resumes communication with the queues.

Some CloudHub modules, such as Anypoint Object Store v1, application settings, and Insight-related information, are maintained in the US East region for all applications regardless of the region where they are deployed. Anypoint Object Store v2 is maintained in the same region as the deployed CloudHub application. For both Anypoint Object Store v1 and v2, if a region is unavailable, the data persists and becomes available again after the region returns to service.

Anypoint Virtual Private Cloud (Anypoint VPC) is set up at the region level. If a region is unavailable, Anypoint VPC is unavailable unless a previous Anypoint VPC instance is set up for the other region.

## Anypoint CloudHub Default Deployment Model

If the application uses multiple workers, CloudHub deploys the workers in separate availability zones by default, providing HA across availability zones. The distance between the availability zones is variable and generally doesn’t exceed 350 miles.

!["AWS Infrastructure"](/img/mulesoft/cloudhub/am-web-services.png "AWS Infrastructure")

If an application uses a single worker, when the availability zone is unavailable, CloudHub automatically restarts the application in a different availability zone. In this case, the application might experience downtime.

You can set up **status.mulesoft.com** to receive alerts when a failure occurs in an availability zone or region.

## Suggested Alternative Deployment Model

You can use a load balancer (cloud or on-premises) for applications deployed to different regions to provide a better disaster recovery strategy.

!["AM DR Load Balancer"](/img/mulesoft/cloudhub/am-load-balancer.png "AM DR Load Balancer")

## Keep Integrations Stateless

Ensure that integrations are stateless. Transactional information isn’t shared between client invocations or executions (in case of scheduled services). If the middleware must maintain some data because of a system limitation, ensure that the data persists in an external store, such as a database or a messaging queue, and not within the middleware infrastructure or memory.

As you scale, especially in the cloud, ensure that the state of and resources used by each worker or node are independent of other workers. This model provides better performance and scalability, as well as reliability.


