# **☁️ CLOUD TECHNOLOGIES — UNIT 2**

## **7-Module Exam Preparation**

---

# **MODULE 1 — Cloud Architecture Design Principles**

Cloud architecture combines **hardware, software, virtualization, networking, storage, security and cloud services** to build reliable and scalable systems. Good architecture helps systems remain scalable, reliable, secure, fault-tolerant and cost-effective.

### **1\. Scalability**

**Scalability** is the ability of a cloud system to increase or decrease its resources according to workload.

Types:

* **Vertical scaling (Scale Up)** — increase CPU/RAM of a server.  
* **Horizontal scaling (Scale Out)** — add more servers/instances.

### **2\. Elasticity**

**Elasticity** means automatically allocating or releasing resources according to real-time demand.

**Example:**  
During a festival sale, extra servers are automatically added and removed after traffic decreases.

### **Scalability vs Elasticity**

| Scalability | Elasticity |
| ----- | ----- |
| Adjusts capacity | Automatically adjusts resources |
| Can be manual or automated | Mainly automatic |
| Handles workload growth | Handles real-time workload changes |

### **3\. High Availability**

High availability means keeping applications continuously accessible with **minimum downtime**.

Methods:

* Redundant servers  
* Load balancing  
* Health checks  
* Traffic redirection

### **4\. Fault Tolerance**

Fault tolerance means the system continues working even when one or more components fail.

**Example:**

`Server A fails → Traffic redirected → Server B`

### **5\. Automation**

Automation performs cloud tasks with little or no human intervention.

Benefits:

* Reduces repetitive work  
* Reduces human errors  
* Faster deployment  
* Consistent configuration

### **6\. Infrastructure as Code — IaC**

IaC means managing and provisioning cloud infrastructure using **code/configuration files instead of manual configuration**.

Benefits:

* Repeatable deployment  
* Version control  
* Collaboration  
* Faster deployment

### **7\. Security**

Security protects cloud data, applications and infrastructure.

Includes:

* Authentication  
* Authorization  
* Encryption  
* Monitoring  
* Access control

### **8\. Loose Coupling**

Loose coupling means reducing dependency between services.

Benefits:

* Independent deployment  
* Easier maintenance  
* Fault isolation  
* Supports microservices

### **9\. Modularity**

Modularity divides an application into **independent and reusable components**.

Benefits:

* Code reuse  
* Easier maintenance  
* Independent testing  
* Faster updates

The PDF summarizes these principles as scalability, elasticity, high availability, fault tolerance, automation, IaC, security, coupling and modularity.

### **Important Diagram**

```text
                    CLOUD ARCHITECTURE
                           |
     +---------------------+----------------------+
     |          |          |          |           |
Scalability     HA      Security      IaC     Automation
     |
Elasticity
     |
Loose coupling + Modularity
```

# **MODULE 2 — Cloud Computing Life Cycle**

The **Cloud Computing Life Cycle** is a structured process used when adopting, deploying, managing and continuously improving cloud solutions.

## **Main Phases**

Strategy & Planning  
        ↓  
    Assessment  
        ↓  
     Migration  
        ↓  
    Deployment  
        ↓  
Operations & Management  
        ↓  
Monitoring & Optimization  
        ↓  
Continuous Improvement  
        ↺

### **1\. Strategy and Planning**

Determines **why** the organization wants cloud computing.

Activities:

`Goals → Requirements → Budget → Timeline`

Example: University plans to move its LMS to the cloud.

### **2\. Assessment**

Checks whether existing applications and infrastructure are suitable for migration.

Considers:

* Compatibility  
* Security  
* Cost  
* Compliance  
* Dependencies

### **3\. Migration**

Moving applications, data and workloads from on-premises systems to cloud.

Basic process:

`Plan → Transfer → Validate → Complete`

### **4\. Deployment**

Cloud resources and applications are configured and released.

`Configure → Test → Release → Scale`

### **5\. Operations and Management**

Maintains the deployed cloud environment.

Activities:

`Manage → Secure → Backup → Support`

### **6\. Monitoring and Optimization**

Monitors:

* CPU  
* Memory  
* Network  
* Application performance

Process:

`Monitor → Analyse → Adjust → Optimise`

### **7\. Continuous Improvement**

Continuously improves:

* Performance  
* Security  
* Cost  
* Usability

Process:

`Review → Improve → Automate → Repeat`

The PDF identifies all seven phases and their activities.

### **Importance**

* Reduces migration risks  
* Minimizes downtime  
* Optimizes costs  
* Improves security  
* Improves business continuity  
* Efficient resource utilization

# **MODULE 3 — Cloud Reference Architecture**

A **Cloud Reference Architecture (CRA)** is a standardized blueprint describing the structure, components, relationships and interactions within a cloud environment.

### **Importance**

* Standardized design  
* Simplifies implementation  
* Improves interoperability  
* Improves scalability  
* Improves security  
* Reduces design complexity  
* Supports best practices

### **CRA vs NIST Reference Architecture**

| CRA | NIST Reference Architecture |
| ----- | ----- |
| Technology and components | Roles and responsibilities |
| Focuses on **What?** | Focuses on **Who?** |

### **Five CRA Components**

1. **Front End**  
   * User interfaces and applications  
2. **Core Services**  
   * Compute  
   * Storage  
   * Databases  
   * Networking  
3. **Virtualization**  
   * Sharing and allocation of resources  
4. **Security & IAM**  
   * Protects resources  
   * Controls access  
5. **Monitoring & Management**  
   * Tracks performance  
   * Manages resources

### **NIST Five Actors**

1. **Cloud Consumer** — uses cloud services  
2. **Cloud Provider** — delivers cloud services  
3. **Cloud Broker** — manages/integrates services between provider and consumer  
4. **Cloud Auditor** — checks security, performance and compliance  
5. **Cloud Carrier** — provides network connectivity

### **Cloud Service Interaction**

User Request  
     ↓  
Authentication  
     ↓  
Load Balancing  
     ↓  
Application Processing  
     ↓  
Database / Storage  
     ↓  
Response

The PDF gives this exact interaction sequence: request → authentication → load balancing → processing → data access → response.

# **MODULE 4 — Cloud Load Balancing**

**Load balancing** distributes incoming network traffic or user requests across multiple servers so that one server does not become overloaded. It improves performance, reliability and availability.

### **Importance**

* Prevents server overload  
* Improves response time  
* Better resource utilization  
* Improves availability  
* Supports scalability

### **Working**

```text
             Users
               |
         Load Balancer
        /      |      \
   Server 1  Server 2  Server 3
        \      |      /
             Response
```

Steps:

1. User sends request.  
2. Request reaches load balancer.  
3. Health of servers is checked.  
4. Best/least-busy server is selected.  
5. Request is forwarded.  
6. Server processes request.  
7. Response returns to user.

## **Static vs Dynamic Load Balancing**

| Static | Dynamic |
| ----- | ----- |
| Predefined rules | Current system status |
| Does not continuously monitor | Continuously monitors |
| Simple | More complex |
| Suitable for predictable workloads | Suitable for changing workloads |

### **Load Balancing Algorithms**

#### **1\. Round Robin**

Requests are assigned sequentially.

Request 1 → Server A  
Request 2 → Server B  
Request 3 → Server C  
Request 4 → Server A

Suitable when servers have similar capacity.

#### **2\. Least Connections**

Request goes to the server with the **fewest active connections**.

#### **3\. Weighted Round Robin**

More powerful servers receive more requests.

#### **4\. IP Hash**

Client IP address determines the server.

Useful for **session persistence**, such as shopping carts and online banking.

The PDF describes these four algorithms and their suitable environments.

### **Hardware vs Software Load Balancer**

| Hardware | Software |
| ----- | ----- |
| Physical device | Software application |
| High performance | Flexible |
| Expensive | Cost-effective |
| Large enterprises | Cloud/web applications |
| Example: F5 BIG-IP | Example: NGINX |

# **MODULE 5 — Cloud Virtualization Technology**

**Virtualization** allows multiple virtual computers, called **Virtual Machines (VMs)**, to run on a single physical computer.

Each VM can have:

* Its own operating system  
* Applications  
* CPU allocation  
* Memory  
* Storage  
* Network interface

### **Why Virtualization?**

* Efficient hardware utilization  
* Reduced infrastructure costs  
* Faster server deployment  
* Application isolation  
* Better scalability  
* Easier backup and disaster recovery

### **Virtualization Architecture**

```text
Applications
     |
Guest Operating Systems
     |
Virtual Machines
     |
Hypervisor
     |
Physical Hardware
CPU | RAM | Storage | Network
```

The PDF identifies the five layers as physical hardware, hypervisor, VMs, guest OS and applications.

### **Hypervisor**

A **hypervisor**, also called a **Virtual Machine Monitor (VMM)**, creates and manages multiple VMs on one physical server.

Responsibilities:

* Create/manage VMs  
* Allocate CPU/RAM/storage/network  
* Isolate VMs  
* Monitor VM performance  
* Optimize resources

Examples:

* VMware ESXi  
* Microsoft Hyper-V  
* KVM  
* Xen  
* Oracle VM VirtualBox

### **Physical vs Virtual Environment**

| Physical | Virtual |
| ----- | ----- |
| One OS per physical server | Multiple OSs on one physical server |
| Lower resource utilization | Higher resource utilization |
| Higher infrastructure cost | Reduced cost |
| Dedicated resources | Shared resources |
| More hardware maintenance | Centralized management |

### **Applications**

* Cloud computing  
* Software testing  
* Disaster recovery  
* Data centres  
* Educational laboratories  
* VDI  
* Application development

### **Challenges**

* Resource contention  
* Performance overhead  
* Security vulnerabilities  
* VM sprawl  
* Licensing costs  
* Complex management

# **MODULE 6 — Types of Virtualization and Hypervisors**

The PDF identifies six major types of virtualization:

1. Server Virtualization  
2. Storage Virtualization  
3. Network Virtualization  
4. Desktop Virtualization  
5. Application Virtualization  
6. Operating System Virtualization

## 

## 

## 

## **1\. Server Virtualization**

Runs multiple VMs on one physical server.

**Benefit:** Better resource utilization and lower hardware costs.

## **2\. Storage Virtualization**

Combines storage from multiple devices into one logical storage pool.

**Benefit:** Easier storage management.

## **3\. Network Virtualization**

Creates virtual networks independent of physical network hardware.

**Example:** Virtual Private Cloud (VPC).

## **4\. Desktop Virtualization**

Provides virtual desktops hosted on a central server/cloud.

**Benefit:** Remote access and centralized management.

## **5\. Application Virtualization**

Runs applications in isolated environments without requiring full local installation.

**Benefit:** Easier deployment and fewer compatibility problems.

## **6\. OS-Level Virtualization**

Allows multiple isolated operating environments to run on one system.

**Example:** Containers/Docker.

The PDF gives examples including GCP server virtualization, Cloud Storage, VPC, virtual desktops and GKE/container-based environments.

---

## **Type 1 Hypervisor**

Also called **Bare-Metal Hypervisor**.

```text
Hardware
   |
Type 1 Hypervisor
   |
VMs
```

Runs directly on physical hardware.

Examples:

* VMware ESXi  
* Microsoft Hyper-V  
* Xen

Used mainly in:

* Servers  
* Data centres

## **Type 2 Hypervisor**

Also called **Hosted Hypervisor**.

```text
Hardware
   |
Host Operating System
   |
Type 2 Hypervisor
   |
VMs
```

Runs on top of an existing operating system.

Examples:

* Oracle VirtualBox  
* VMware Workstation

Used mainly for:

* Development  
* Testing  
* Learning

### **Type 1 vs Type 2**

| Type 1 | Type 2 |
| ----- | ----- |
| Directly on hardware | On host OS |
| Better performance | More convenient |
| Data centres | Desktop/lab |
| VMware ESXi | VirtualBox |

# **MODULE 7 — Cloud SOA: Components, Communication and Infrastructure**

**Service-Oriented Architecture (SOA)** consists of independent cloud services that communicate through **standard interfaces such as APIs**.

Each service performs a specific function and can be developed, deployed and managed independently.

## **Major SOA Components**

1. Cloud Consumer  
2. Cloud Provider  
3. API Gateway  
4. Service Registry  
5. Microservices  
6. Cloud Database

### **1\. Cloud Consumer**

Requests and uses cloud services.

Example: Student using Google Classroom.

### **2\. Cloud Provider**

Provides cloud services and manages infrastructure.

Examples:

* AWS  
* Google Cloud  
* Microsoft Azure

### **3\. API Gateway**

Acts as the **entry point for client requests**.

Functions:

* Request routing  
* Authentication  
* Authorization  
* Rate limiting  
* Load balancing  
* Request validation  
* Monitoring

Examples:

* Google API Gateway  
* AWS API Gateway  
* Azure API Management

### **4\. Service Registry**

Stores information about available services and supports **service discovery**.

Functions:

* Service registration  
* Service discovery  
* Service lookup  
* Dynamic routing

Examples:

* Kubernetes Service Discovery  
* Consul  
* Eureka

### **5\. Microservices**

Divides an application into small independent services.

Example:

```text
              E-Commerce App
                     |
       +-------------+-------------+
       |             |             |
   Login service Payment service Inventory service
       |
Notification service
```

Characteristics:

* Independent deployment  
* Independent scaling  
* API-based communication  
* Fault isolation

### **6\. Cloud Database**

Database hosted and managed through a cloud platform.

Characteristics:

* Automatic scaling  
* High availability  
* Backup  
* Disaster recovery  
* Encryption  
* Authentication  
* Internet accessibility

---

## **SOA Communication**

Cloud services communicate using standardized protocols and interfaces.

### **Important methods**

**REST APIs**

* Usually HTTP/HTTPS  
* Common for real-time communication

**SOAP**

* Used for enterprise/structured communication

**JSON/XML**

* Data exchange formats

**Message Queues**

* Asynchronous communication

**Service Discovery**

* Locates available services

| Method | Purpose |
| ----- | ----- |
| REST API | Real-time communication |
| SOAP | Enterprise communication |
| JSON/XML | Data exchange |
| Message Queue | Asynchronous communication |
| Service Discovery | Locate services |

---

## **SOA Infrastructure**

SOA infrastructure provides resources needed to **deploy, execute, monitor and manage services**.

Major components:

1. **Compute Services**  
   * Provides processing power  
   * Example: AWS EC2, GCP, Azure  
2. **Kubernetes**  
   * Deploys, manages and scales containerized applications  
   * Handles failures and distributes applications  
3. **Networking Infrastructure**  
   * Routers  
   * Switches  
   * Firewalls  
   * Load balancers  
   * Virtual networks  
4. **Storage & IAM**  
   * Storage saves/retrieves data  
   * IAM controls who can access resources and what they can do

### 

### **SOA Overall Diagram**

```text
Cloud Consumer
      |
API Gateway
      |
Service Registry
      |
+-----------+-----------+
|           |           |
Login     Payment    Inventory
Service   Service     Service
|           |           |
+-----------+-----------+
            |
         Cloud DB
            |
  Cloud Infrastructure
            |
Compute | Kubernetes | Network | Storage / IAM
```
