# Unit 4 — Cloud Security and Governance

> ISA 2 / Unit 4 / Source: CT Unit 4 course slides. These revision materials summarize the supplied syllabus.

## MCQs (28 Questions)

**Format:** 4 questions per section — 1 easy and 3 very tough.  
Choose the single best answer. The answer key with short explanations is at the bottom.

**Practice scoring:** Each MCQ earns 1 point. Skipped questions earn 0 points; this practice score does not specify exam marks.

---

## Section 1 — CIA Triad

### Q1 (Easy)
Which CIA property ensures that cloud data is accessible only to authorized people or systems?

A. Integrity  
B. Availability  
C. Confidentiality  
D. Portability

### Q2 (Very Tough)
A cloud-hosted exam portal is reachable and responds quickly. However, a privileged account silently changes students' marks without approval. Which statement is most accurate?

A. Availability is the only affected property because the portal is online.  
B. Integrity is directly violated even if availability remains unaffected.  
C. Confidentiality is necessarily violated because marks were changed.  
D. No CIA property is violated if the change is logged.

### Q3 (Very Tough)
A storage bucket containing examination papers is accidentally configured for public access. Which risk-control pairing best addresses the primary CIA concern?

A. Availability; auto-scaling  
B. Integrity; database constraints only  
C. Confidentiality; access restriction and encryption  
D. Availability; backup scheduling

### Q4 (Very Tough)
A video service remains online during a major event, but response time becomes extremely slow due to overloaded resources. Which is the best interpretation?

A. Availability is completely unaffected because the service is technically online.  
B. The service may still be available, but poor performance indicates saturation and can undermine practical availability.  
C. This is exclusively an integrity incident.  
D. Encryption is the direct remedy for resource saturation.

---

## Section 2 — Cloud Security Architecture

### Q5 (Easy)
Which security architecture layer includes data centers, physical access, power, and cooling?

A. Platform and runtime  
B. Network and storage  
C. Physical facilities  
D. Application and data

### Q6 (Very Tough)
A cloud customer runs VMs on shared physical hosts. The provider patches the host infrastructure, while the customer configures the guest OS, application, and data permissions. Which interpretation best reflects shared responsibility?

A. The provider is responsible for all cloud security because the infrastructure is hosted remotely.  
B. The customer is responsible for the physical data center because they own their data.  
C. Responsibilities are divided: provider handles underlying infrastructure while customer handles guest/software/data configuration within the service boundary.  
D. Shared responsibility applies only to SaaS.

### Q7 (Very Tough)
A developer has permission to read an object-storage bucket but can also delete every bucket in the account. Which IAM principle is most clearly violated?

A. Multi-region redundancy  
B. Least privilege  
C. Data residency  
D. Service-based SLA

### Q8 (Very Tough)
Which combination provides broad visibility across cloud-security layers and helps support incident response?

A. Auto-scaling and load balancing alone  
B. Encryption without logging  
C. Logs, metrics, alerts, and audit trails  
D. VM snapshots only

---

## Section 3 — CSP and Virtualization Issues

### Q9 (Easy)
Which component manages virtual machines and allocates hardware resources?

A. Hypervisor  
B. Firewall  
C. Load balancer  
D. Database

### Q10 (Very Tough)
An attacker exploits a flaw inside a guest VM and escapes into the host environment, potentially accessing other VMs. What is this attack called?

A. Vendor lock-in  
B. Noisy neighbor  
C. VM escape  
D. Data residency violation

### Q11 (Very Tough)
A cloud provider uses a third-party software component that has a critical vulnerability. Many customers are exposed even though their individual application code is secure. Which risk is illustrated?

A. Customer-side capacity planning  
B. Supply-chain/third-party risk  
C. SLI measurement failure  
D. Data retention risk only

### Q12 (Very Tough)
Tenant A runs a CPU-intensive workload. Tenant B’s VM becomes slow even though B's application has not changed. Which risk and response are most appropriate?

A. VM escape; encrypt migration traffic  
B. Noisy neighbor/resource contention; monitor usage and apply resource limits/capacity planning  
C. Data classification; move data to restricted tier  
D. Vendor lock-in; export data

---

## Section 4 — Cloud Data Security and Legal Issues

### Q13 (Easy)
What is the main purpose of data classification in cloud security?

A. Increase cloud bandwidth  
B. Determine data sensitivity and the protection it requires  
C. Replace authentication  
D. Remove the need for backups

### Q14 (Very Tough)
An organization encrypts its cloud database but stores the encryption keys alongside the encrypted database in the same unrestricted location. Which statement is best?

A. Encryption is automatically sufficient because ciphertext cannot be read.  
B. Key management is weak; keys should be protected and stored separately from encrypted data.  
C. This improves availability but reduces throughput.  
D. It is primarily a data-residency issue.

### Q15 (Very Tough)
A college must keep certain student records in a specified country due to policy or legal requirements. Which concept most precisely describes that requirement?

A. Jurisdiction  
B. Data residency  
C. Data throughput  
D. Multi-tenancy

### Q16 (Very Tough)
A cloud customer terminates a service. The provider deletes the active files, but snapshots, backups, and replicas may remain. What is the strongest conclusion?

A. Deletion is complete as soon as the active file is removed.  
B. The customer should understand and verify the deletion process, including retained copies, and obtain evidence where required.  
C. Data deletion is unrelated to cloud contracts.  
D. Destroying the user account guarantees all data is erased.

---

## Section 5 — Cloud Performance Monitoring and Management

### Q17 (Easy)
Which KPI measures how long a service takes to respond to a request?

A. Throughput  
B. Saturation  
C. Latency  
D. Data residency

### Q18 (Very Tough)
A cloud service reports 99.99% uptime. During the time it is online, response latency is high and error rate is rising. Which conclusion is best?

A. High uptime alone proves good user experience.  
B. Availability is the only metric that matters for performance.  
C. The service can be highly available yet perform poorly; latency and errors must also be monitored.  
D. Latency and error rate are legal-compliance metrics only.

### Q19 (Very Tough)
CPU, memory, disk, database connections, and queue length are approaching their limits. The service is beginning to time out. Which metric group and action best fit?

A. Confidentiality; encrypt all requests  
B. Saturation/capacity; scale up or out and review capacity  
C. Data classification; restrict users  
D. Jurisdiction; move region

### Q20 (Very Tough)
An alert fires repeatedly for a harmless metric that requires no action. Administrators begin ignoring alerts, including serious ones. Which monitoring design principle was neglected?

A. Alerts should be meaningful and actionable to avoid alert fatigue.  
B. Monitoring should not include metrics.  
C. Alerts should only be generated after a service outage.  
D. Audit logs should be disabled to reduce noise.

---

## Section 6 — Cloud Risk Management Framework

### Q21 (Easy)
Which NIST RMF step classifies a system and its information based on impact?

A. Prepare  
B. Categorize  
C. Implement  
D. Monitor

### Q22 (Very Tough)
A team applies encryption, MFA, patching, and monitoring to reduce the likelihood or impact of an identified cloud risk. Which risk-treatment option is this?

A. Avoid  
B. Transfer  
C. Mitigate  
D. Accept

### Q23 (Very Tough)
Cloud security controls have been implemented and tested. A senior official reviews the remaining risk and decides whether the system may operate. Which RMF step is occurring?

A. Select  
B. Assess  
C. Authorize  
D. Categorize

### Q24 (Very Tough)
Arrange the NIST RMF steps in the correct sequence.

A. Prepare → Select → Categorize → Assess → Implement → Monitor → Authorize  
B. Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor  
C. Categorize → Prepare → Implement → Select → Authorize → Assess → Monitor  
D. Prepare → Implement → Categorize → Select → Monitor → Assess → Authorize

---

## Section 7 — Cloud SLA and Trust Management

### Q25 (Easy)
A measurable indicator such as the percentage of successful requests is called:

A. SLO  
B. SLA  
C. SLI  
D. RMF

### Q26 (Very Tough)
A cloud provider promises 99.9% monthly availability and states that customers receive service credits if the measured availability falls below the target. Which distinction is correct?

A. 99.9% is the SLI; the service credit is an SLO.  
B. The 99.9% target is an SLO, and the agreement including the remedy is the SLA.  
C. The service credit is the SLI, while uptime is the SLA.  
D. SLI, SLO, and SLA are interchangeable.

### Q27 (Very Tough)
One college signs a single agreement covering compute, storage, and support for its account. Which SLA type is this?

A. Service-based SLA  
B. Multi-level SLA  
C. Customer-based SLA  
D. Internal SLO

### Q28 (Very Tough)
A bank wants to establish trust in its cloud provider. Which approach most comprehensively supports evidence-based trust?

A. Rely on the provider’s marketing statements and avoid auditing.  
B. Use clear responsibility boundaries, security controls, monitoring evidence, audits/compliance proof, incident transparency, and tested exit/recovery plans.  
C. Focus only on uptime; data protection and incident reporting are unnecessary.  
D. Keep the contract vague so responsibilities can change informally.

---

# Answer Key (with brief explanations)

| Q | Answer | Explanation |
|---|---|---|
| 1 | **C** | Confidentiality restricts information to authorized access. |
| 2 | **B** | Unauthorized alteration violates integrity; the portal can still be available. |
| 3 | **C** | Public exposure risks unauthorized disclosure; restrict access and protect data. |
| 4 | **B** | Online status alone does not mean good performance; saturation can degrade practical availability. |
| 5 | **C** | Physical facilities cover data centers, physical access, power, and cooling. |
| 6 | **C** | Provider/customer responsibilities differ by service boundary. |
| 7 | **B** | Permissions exceed the user's necessary role, violating least privilege. |
| 8 | **C** | Monitoring evidence across logs, metrics, alerts, and audit trails supports visibility and response. |
| 9 | **A** | The hypervisor manages VMs and allocates physical resources. |
| 10 | **C** | VM escape is breaking out of a guest VM toward host/hypervisor/other VMs. |
| 11 | **B** | A third-party supplier weakness is a supply-chain risk. |
| 12 | **B** | Shared-resource contention creates the noisy-neighbor effect; limits and capacity planning help. |
| 13 | **B** | Classification determines sensitivity and required controls. |
| 14 | **B** | Keys must be protected and separated from encrypted data. |
| 15 | **B** | Data residency is a requirement for data to stay in a specified country/region. |
| 16 | **B** | Secure deletion must account for backups, snapshots, replicas, and evidence of deletion. |
| 17 | **C** | Latency is response time. |
| 18 | **C** | Uptime does not reveal latency/error experience; monitor multiple indicators. |
| 19 | **B** | Saturation indicates capacity pressure; scale and plan capacity. |
| 20 | **A** | Repeated non-actionable alerts create alert fatigue. |
| 21 | **B** | Categorize determines system/data impact classification. |
| 22 | **C** | Mitigation reduces risk using security controls. |
| 23 | **C** | Authorization is the senior official's acceptance decision about residual risk and operation. |
| 24 | **B** | Correct seven-step NIST RMF order. |
| 25 | **C** | SLI is the measured service indicator. |
| 26 | **B** | SLO is the target; SLA is the agreement with consequences/remedies. |
| 27 | **C** | Customer-based SLA covers one customer across multiple services. |
| 28 | **B** | Trust is supported by clear obligations, evidence, controls, transparency, and tested plans. |

## Score guide
- **25–28:** Excellent — ready for exam-style application.
- **20–24:** Strong — revisit missed scenario questions.
- **14–19:** Moderate — review notes and reattempt.
- **0–13:** Rebuild topic understanding before memorizing answers.
