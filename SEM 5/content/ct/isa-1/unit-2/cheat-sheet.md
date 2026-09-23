# **⚡ LAST-MINUTE UNIT 2 CHEAT SHEET**

### **Cloud Architecture**

**Scalability** → Increase/decrease capacity  
**Elasticity** → Automatically adjust resources  
**High Availability** → Minimum downtime  
**Fault Tolerance** → Continue after failure  
**Automation** → Minimal human intervention  
**IaC** → Infrastructure using code  
**Security** → Protect cloud resources  
**Loose Coupling** → Less dependency  
**Modularity** → Independent reusable components

### **Cloud Life Cycle**

Planning  
   ↓  
Assessment  
   ↓  
Migration  
   ↓  
Deployment  
   ↓  
Operations  
   ↓  
Monitoring & Optimization  
   ↓  
Continuous Improvement

### **Cloud Reference Architecture**

**CRA \= What?**  
**NIST \= Who?**

CRA components:

**F-C-V-S-M**

* Front End  
* Core Services  
* Virtualization  
* Security & IAM  
* Monitoring & Management

NIST actors:

**C-P-B-A-C**

* Consumer  
* Provider  
* Broker  
* Auditor  
* Carrier

### **Load Balancing**

**Purpose:** Distribute traffic across servers.

Algorithms:

* **Round Robin** → Sequential  
* **Least Connections** → Fewest active connections  
* **Weighted Round Robin** → Based on server capacity  
* **IP Hash** → Based on client IP/session persistence

**Static** → Predefined rules  
**Dynamic** → Current server conditions

### **Virtualization**

Applications  
     ↓  
Guest OS  
     ↓  
VMs  
     ↓  
Hypervisor  
     ↓  
Physical Hardware

**Hypervisor \= creates/manages VMs**

### **Types of Virtualization**

| Type | Remember |
| ----- | ----- |
| Server | Multiple VMs |
| Storage | Logical storage pool |
| Network | Virtual networks |
| Desktop | Virtual desktops |
| Application | Isolated applications |
| OS | Containers |

### **Hypervisors**

**Type 1:**

`Hardware → Hypervisor → VMs`

**Type 2:**

`Hardware → Host OS → Hypervisor → VMs`

### **SOA**

**SOA \= Independent services communicating through APIs**

Main components:

**Consumer \+ Provider \+ API Gateway \+ Service Registry \+ Microservices \+ Cloud Database**

API Gateway:

**Route \+ Authenticate \+ Authorize \+ Rate Limit \+ Load Balance \+ Validate \+ Monitor**

Communication:

* REST → Real-time  
* SOAP → Enterprise  
* JSON/XML → Data exchange  
* Message Queue → Asynchronous  
* Service Discovery → Find services

Infrastructure:

**Compute \+ Kubernetes \+ Networking \+ Storage/IAM**

---

