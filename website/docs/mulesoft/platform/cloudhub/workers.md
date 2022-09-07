---
id: workers
title: Workers 
---

Workers are dedicated instances of a Mule runtime engine that run your integration applications on CloudHub. Think of a worker as a customized EC2 instance that runs your Mule Runtime with your application pre-installed. These workers will run on one of the designated Mule global worker clouds depending on your location and license agreement.

Workers have the following characteristics:

- Capacity: Each worker has a specific amount of capacity to process data. Select the size of your workers when configuring an application.
- Isolation: Each worker runs in a separate container from every other application.
- Manageability: Each worker is deployed and monitored independently.
- Locality: Each worker runs in a specific worker cloud, such as the US, EU, or Asia-Pacific.

The memory capacity and processing power of a worker depends on how you configure it at the application level.

Worker sizes have different compute, memory, and storage capacities. You can scale workers vertically by selecting one of the available worker sizes:

Worker Size	| Heap Memory	| Storage |  
------------|---------------|---------|
0.1 vCores  | 500 MB        | 8 GB    |
0.2 vCores  | 1 GB          | 8 GB    |
1 vCore     | 1.5 GB        | 12 GB   |
2 vCores    | 3.5 GB        | 40 GB   |
4 vCores    | 7.5 GB        | 88 GB   |
8 vCores    | 15 GB         | 168 GB  |
16 vCores   | 32 GB         | 328 GB  |

*Workers with 0.1 vCores and 0.2 vCores:*

Provide limited CPU and I/O for apps with smaller workloads, and can burst to higher CPU speeds for a short time.

This ability helps to improve application startup times and to process infrequent, large workloads. If you need consistent performance, use workers with more vCores.

*Workers with 1 or more vCores:*

Provide performance consistency and are available only for Mule version 3.6.2 or later, or API gateway version 2.0.2 or later.

Each worker has a minimum of 8 GB of storage, which is used for both system and application storage. If your application requires more storage (for example, verbose logging), use a worker with two or more vCores, enabling the application to access additional storage in /tmp.

Only running applications count toward worker usage.

If your applications require more vCores than are available, CloudHub allows you to create the application, but you cannot start it until the additional vCores become available. To increase vCore allocation, stop another application or contact your account manager to increase your subscription’s vCore allocation.

The metaspace limit for apps deployed to CloudHub is currently 256 MB, regardless of the worker size. The initial metaspace size is 128 MB; metaspace garbage collection begins after the metaspace reaches that threshold.

You can scale your applications horizontally by adding multiple workers and enabling persistent queues to distribute workloads across workers. See Worker Scaleout and Persistent Queues.

CloudHub monitors workers to verify that they are operating correctly. If you enable automatic restarts, CloudHub also automatically restarts applications, if necessary.

## Intelligent Healing

CloudHub monitors the worker clouds for problems and provides a self-healing mechanism to recover from them. If the underlying hardware suffers a failure, the platform migrates your application to a new worker automatically. In the case of an application crash, whether due to a problem with custom code or a bug in the underlying stack, the platform recognizes the crash and can restart the worker automatically.

## Zero-Downtime Updates

CloudHub supports updating your applications at runtime so end users of your HTTP APIs experience zero downtime. While your application update is deploying, CloudHub keeps the old version of your application running. Your domain points to the old version of your application until the newly uploaded version is fully started. This allows you to keep servicing requests from your old application while the new version of your application is starting.

## Clustering

Clustering provides scalability, workload distribution, and added reliability to applications on CloudHub. These capabilities are powered by the scalable load-balancing service, worker scaleout, and persistent queueing features.

## Worker Scale Out and Data Center Redundancy

With clustering, you can add multiple workers to your application to make it horizontally scale. CloudHub automatically distributes multiple workers for the same application across two or more data centers for maximum reliability.

When deploying your application to two or more workers, the HTTP load balancing service distributes requests across these workers, allowing you to scale your services horizontally. Requests are distributed on a round-robin basis.

## Persistent Queues

Persistent queues ensure zero message loss and allow you to distribute non-HTTP workloads across a set of workers. For example, if your application is deployed to more than one worker, persistent queues allow interworker communication and workload distribution. If a large file is placed in the queue, your workers can divide it up and process it in parallel.

Persistent queues also guarantee delivery of your messages; even if one or more workers or datacenters go down, persistent queues facilitate disaster recovery and provide resilience to hardware or application failures.

## Security

CloudHub architecture provides a secure platform for your integrations.

Securing your payload data is critically important. To this end, CloudHub does not inspect, store, or otherwise interact directly with payload data. CloudHub workers provide a secure facility for transmitting and processing data by giving each application its own virtual machine. This ensures complete isolation between tenants for payload security, and isolation from other tenants’ code.

CloudHub collects monitoring, analytics, and log data from CloudHub workers and may perform actions on behalf of the user on CloudHub workers. All communication between CloudHub platform services and the worker cloud is secured using SSL with client certificate authentication. This ensures that unauthorized parties cannot read data and that they cannot initiate unauthorized actions.

Secure properties can also be loaded as part of your application bundle. If a property is flagged as secure, it won’t be viewable even through the Runtime Manager console, in fact, it is never propagated anywhere outside the CloudHub worker running the application.

For more information about MuleSoft’s approach to security, please see the [Anypoint Cloud Security & Compliance whitepaper](http://mulesoft.com/downloads/whitepapers/security-whitepaper.pdf).
