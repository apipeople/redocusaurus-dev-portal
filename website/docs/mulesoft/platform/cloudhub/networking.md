---
id: networking
title: Networking 
---

Following on from the discussion of CloudHub architecture and workers and worker clouds, we land at how networking works in CloudHub.

## AWS Regions and Availibility Zones

It is good at this point to review the concept of regions and zones as per AWS;

*AWS has the concept of a Region, which is a physical location around the world where we cluster data centers. We call each group of logical data centers an Availability Zone. Each AWS Region consists of multiple, isolated, and physically separate AZs within a geographic area. Unlike other cloud providers, who often define a region as a single data center, the multiple AZ design of every AWS Region offers advantages for customers.* 

*An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. AZs give customers the ability to operate production applications and databases that are more highly available, fault tolerant, and scalable than would be possible from a single data center.*

A great starter article on this can be found [here](https://www.rackspace.com/blog/aws-101-regions-availability-zones).

### MuleSoft Regions

Although AWS provides Regions worldiwde, the following is the list of regions that the MuleSoft control plane and worker cloud (runtime plane for CloudHub) are available on;

Regions in U.S. Control Plane | DNS Record
------------------------------|-------------------------
US East (N. Virginia)         | myapp.us-e1.cloudhub.io
US East (Ohio)                | myapp.us-e2.cloudhub.io
US West (N. California)       | myapp.us-w1.cloudhub.io
US West (Oregon)              | myapp.us-w2.cloudhub.io
Canada (Central)              | myapp.ca-c1.cloudhub.io
South America (Sao Paulo)     | myapp.br-s1.cloudhub.io
Asia Pacific (Singapore)      | myapp.sg-s1.cloudhub.io
Asia Pacific (Sydney)         | myapp.au-s1.cloudhub.io
Asia Pacific (Tokyo)          | myapp.jp-e1.cloudhub.io
EU (Ireland)                  | myapp.ir-e1.cloudhub.io
EU (Frankfurt)                | myapp.de-c1.cloudhub.io
EU (London)                   | myapp.uk-e1.cloudhub.io

### The right Region for You

It is important to understand the supported regions, it not only affects the default domain names for CloudHub applications but it also determines where your physical EC2 instances will spin up. Condsider this in terms of access to your main sources of data, VPN configurations and when considering latency levels across APIs.

### CloudHub DNS Records

Now that you understand the region and zone configurations, it is useful to understand how the DNS records for your applications are exposed when they are deployed to CloudHub:

DNS                                  | Details
-------------------------------------| --------------------|
myapp.region.cloudhub.io             | Load balancer. Ports 80 and 443 forward to ${http.port} and ${https.port} respectively.
mule-worker-myapp.region.cloudhub.io | The external IP address of the Mule workers. Public HTTP services are exposed on: ${http.port} and ${https.port}
mule-worker-internal-myapp.region.cloudhub.io | The internal IP address of the Mule workers. The IP addresses for this DNS record are accessible only within a customer’s private Anypoint VPC. These IP addresses are not accessible for workers running in the MuleSoft shared VPC. Internal HTTP services are exposed on: ${http.private.port} and ${https.private.port}. The default assigned ports are 8091 and 8092 respectively, and cannot be changed.



## VPC (Virtual Private Cloud)

Now that you have understood your regions and your available AZs per region (remember each region may have a different number of AZ's available) it is time consider the VPC configuration.

According to AWS;

*A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. You can launch your AWS resources, such as Amazon EC2 instances, into your VPC.*

*When you create a VPC, you must specify a range of IPv4 addresses for the VPC in the form of a Classless Inter-Domain Routing (CIDR) block; for example, 10.0.0.0/16. This is the primary CIDR block for your VPC. For more information about CIDR notation, see [RFC 4632](https://tools.ietf.org/html/rfc4632).*

It is very important to remember - **a VPC spans all of the Availability Zones in the Region**. The following diagram shows a new VPC with an IPv4 CIDR block.

!["VPC Spanning AZ's"](/img/mulesoft/cloudhub/vpc-across-regions.png "VPC Spanning AZ's")



## CloudHub VPC Configuration

When you first purchase a license with MuleSoft your subscription will at minimum contain 2 VPC entitlements, but it is important to note - they are not configured by default.

As per MuleSoft documentation ;

*The base Anypoint VPC subscription includes two Anypoint VPCs and each Anypoint VPC can be associated with multiple environments. This allows you, for example, to have one isolated network for your production environment, and another for your non-productions environments, for example, QA and staging. Your licensing requirements depend on your specific deployment scenario.*

They even suggest a standard allocation of those 2 VPCs;

!["Prod and Non-Prod VPC"](/img/mulesoft/cloudhub/vpc-prod-non-prod.png "Prod and Non-Prod VPC")

It is also important to note that VPCs can be associate to multiple environments across multiple business groups.

### Default Shared Worker Cloud

It is **important to understand the default VPC configuration for CloudHub deployments**. If you have not configured any VPC then your worker will be provisioned in a shared VPC with all other clients in the region who have not specified a private VPC. This is called Shared Worker Cloud, and note traffic is routed via the default Shared Load Balancer which is not allocated to any VPC;

!["Shared Worker Cloud"](/img/mulesoft/cloudhub/shared-worker-cloud.png "Shared Worker Cloud")

Note here that the shared worker cloud (VPC) will also span across all Availibility Zones in the Region, so when increasing the worker count you will get HA and a certain amount of DR relative to the number of AZ's available.

The issues with a shared VPC is the inability to configure the firewall rules and also the use of a shared load balancer, which does not allow custom names, SSL or custom rate limiting.

### Using a Private Cloud (VPC)

By creating a VPC you can start to see more flexibility in the configuration since you can now add in firewall rules, and you will also see a difference in the allocated IP addresses. 

!["Private Worker Cloud"](/img/mulesoft/cloudhub/private-vpc.png "Private Worker Cloud")

This configuration is still relying on the shared load balancer, and so in order to route external traffic into workers on the sub-nets on each AZ the firewall rules would still need to keep ports 8081/8082 open. 


### Introducting a Dedicated Load Balancer

!["Private VPC with DLB"](/img/mulesoft/cloudhub/private-vpc-with-dlb.png "Private VPC with DLB")

Creating a VPC and the sizing of it will create a VPC and then divide it across all available AZs in the region (form 2 to 5) and so you will see IP ranges represent that if you deploy multiple workers in a VPC spread across multiple AZs - interesting to demo this ...


https://dzone.com/articles/deep-dive-into-mulesoft-anypoint-vpc-vpn-and-dedic

This explains the shared infrastruture ...

https://help.mulesoft.com/s/article/How-to-access-Mule-workers-through-different-connectivity-methods





Networking here 

This about nails it : https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html



Should really familiarize yourself with this https://www.rackspace.com/blog/aws-101-regions-availability-zones

Need to have a solid understanding of AWS regions, az's and then of vpc's

also need to understand how vpc's can span across Az's but not regions and this allows ips for HA/DR

Need to understand a VPC - especially in relationg to sizing and how many apps - and remember - additional IP's needed in the background to support rolling deployments !!


This is cool : https://github.com/tbeauvais/aws-vpc-networking-101
