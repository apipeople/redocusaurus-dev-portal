---
id: erp_to_p2p_design_1
title: ERP to P2P PoC Design
---


!["ERP to P2P"](/img/mulesoft/refarch/p2p/erp_to_p2p_eda_reliable.png "ERP to P2P")

We can break this design into 3 key stages;

1. Retrieve Changes from ERP and Publish to Queue
2. Consume Changed CDM Messages, decorate and publish to target Queue
3. Consume Changed CDM Messages and Update Coupa

[Stage 1]

A timer based flow executes and retrieves a persistent object store key of date/time for purchase groups. 

It then calls the SAP PGE System API to retrieve all changed purchase group records since that date/time.
The system API returns an array of changed objects in CDM format (or as close to CDM as possible).
The flow now publishes each messages to the target Master Data Queue individually (does not support bulk publish).
It updates the watermark to the changed date/time of the last object recevied.

[Stage 2]

A flow with a Subscriber inbound enpoint that will process events from the queue of CDM messages. 
It will orchestrate any additional API calls required to retrieve additional ref data or used cached data if relevant.
It will determine the target queue basedon src/destination rules ? and plublish the message accordingly to the queue.

[Stage 3]

Coupa System API will have a flow with a Subscriber inbound enpoint that will process events from the queue of CDM messages. 
It will convert these to Coupa native format and execute Coupa API calls to update the objects.

**Assumptions**

That we will use AnypointMQ and since we do not want to use Fanout Exchange configurations will route directly to queues based on routing logic held in some modifiable cache.

**Design Pro's**

The ERP System API to retrieve a set of changed messages is reusable as it returns synchronously and therefore can be used by any other consumer.

The watermarking is consistent since the process APIs retrieves synchronously the batch of CDM records and so can control an exception or success scenario and change the object store accordingly

The returned CDM is not processed immediately so as to allow the reliable store of messages prior to any message based orchestration/processing.

The Coupa System API is reusable as it consumes a CDM model and converts internally to native Coupa.


**Design Con's**

The handling of native to CDM inside the System API has to be robust, and we need a strategy to handle individual record failures without impacting the overall array which has success records.

There is an exposure point when calling the System API synchronously if a large data set is to be returned, so we should consider a [pagination pattern](https://blogs.mulesoft.com/dev-guides/api-design/api-pagination-patterns/).

There may also be an exposure during the flow in the process API that publishes the results from the ERP API into the Master Data Queue. What happens if there is a failure after some events have been published but not all, and those that were published would likely be consumed and processed. 

**Queueing Considerations**

If we go with standard MQ queues we may have to investigat idempotent filters since messages could be delivered twice.

If we go with MQ we cannot route via Exchanges selectively so would have to do this in the code.
s


## API Sizing 

For Phase 1 the Master Data Process API would have to handle the following requirements;

1. Vendor - Coupa to ERP (SAP - PGE, Oracle)
2. Vendor - Informatica to Coupa
3. Purchasing Groups ERP (SAP - PGE, Oracle) to Coupa

So based on this the flow dispersion in the process API would be;

Id      | Use Case               | Scope       |  Type    | Parent | Description
|-------|------------------------|-------------|----------|--------| ------------
| |Change Data Extract Phase |
| 1     | Vendor - Coupa to ERP  | Get Events  | Main Flow |       | Schedule timer flow for Coupa Vendor Extract, calls retrieve and publish flows
| 1.1   |                        |             | Sub Flow  | 1     | Retrieve all change records from Coupa Sys based on watermark - may need loop/aggregation on paginated results
| 1.2  |                        |             | Sub Flow  | 1      | Batch publish all CDM messages to Master Data Process queue
| 2     | Vendor - Informatic to Coupa | Get Events  | Main Flow | | Schedule timer flow for Informatic Vendor Extract, calls retrieve and publish flow
| 2.1   |                        |             | Sub Flow  | 2   | Retrieve all change records from Informatica Sys based on watermark - may need loop/aggregation on paginated results
| 2.2  |                        |             | Sub Flow  | 2   |  Batch publish all CDM messages to Master Data Process queue
| 3     | Purch Groups - SAP PGE  to Coupa | Get Events  | Main Flow | | Schedule timer flow for SAP PGE PG Extract, calls retrieve and publish flow
| 3.1   |                        |             | Sub Flow  | 3   | Retrieve all change records from SAP PGE Sys based on watermark - may need loop/aggregation on paginated results
| 3.2  |                        |             | Sub Flow  | 3    |  Batch publish all CDM messages to Master Data Process queue
| 4     | Purch Groups - Oracle  to Coupa | Get Events  | Main Flow | | Schedule timer flow for Oracle PG Extract, calls retrieve and publish flow
| 4.1   |                        |             | Sub Flow  | 4   | Retrieve all change records from Oracle Sys based on watermark - may need loop/aggregation on paginated results
| 4.2  |                        |             | Sub Flow  | 4    |  Batch publish all CDM messages to Master Data Process queue
| |Process Events Phase - Could Optimize |
| 5     | All                   | Consume Messages | Main Flow   | | Listener to all messages published to the Master Data Process Queue - routes to sub flow based on properties ??
| 5.1   | Vendor - Coupa to ERP  | Process Events  | Sub  Flow | 5   | Orchestrates calls sub flows to handle ref data lookups etc and publish to target queues
| 5.1.1  |                        | Orchestrate  | Sub Flow | 5.1    | Perform any message decoration, ref data lookups etc related to the message
| 5.1.2  |                        | Publish      | Sub Flow | 5.1    | Pubish event(s) to target queue/exchange based on inbound message properties
| 5.2   | Vendor - Informatics to Coupa | Process Events  | Sub  Flow | 5   | Orchestrates calls sub flows to handle ref data lookups etc and publish to target queues
| 5.2.1  |                        | Orchestrate  | Sub Flow | 5.2    | Perform any message decoration, ref data lookups etc related to the message
| 5.2.2  |                        | Publish      | Sub Flow | 5.2    | Pubish event(s) to target queue/exchange based on inbound message properties
| 5.3   | Purch Groups - SAP PGE  to Coupa | Process Events  | Sub  Flow | 5   | Orchestrates calls sub flows to handle ref data lookups etc and publish to target queues
| 5.3.1  |                        | Orchestrate  | Sub Flow | 5.3    | Perform any message decoration, ref data lookups etc related to the message
| 5.3.2  |                        | Publish      | Sub Flow | 5.3    | Pubish event(s) to target queue/exchange based on inbound message properties
| 5.4   | Purch Groups - Oracle  to Coupa | Process Events  | Sub  Flow | 5   | Orchestrates calls sub flows to handle ref data lookups etc and publish to target queues
| 5.4.1  |                        | Orchestrate  | Sub Flow | 5.4    | Perform any message decoration, ref data lookups etc related to the message
| 5.4.2  |                        | Publish      | Sub Flow | 5.4    | Pubish event(s) to target queue/exchange based on inbound message properties




