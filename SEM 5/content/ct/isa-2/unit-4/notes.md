# Unit 4 — Cloud Security and Governance

> ISA 2 / Unit 4 / Source: CT Unit 4 course slides. These revision materials summarize the supplied syllabus.

## Comprehensive Notes (Exam Revision)

> Based on **CT Unit 4.pdf**. Unit topics are arranged into seven sections, following the presentation's order.

## Section 1 - CIA Triad — Confidentiality, Integrity, Availability

### CIA Triad
The **CIA Triad** is the core information-security model consisting of:
- **Confidentiality (C):** Information is accessible only to authorized people, systems, or processes.
- **Integrity (I):** Information remains accurate, complete, and unaltered except by authorized users or processes.
- **Availability (A):** Authorized users can access cloud services and data whenever required.

These principles apply across **IaaS, PaaS, and SaaS**.

### Confidentiality
**Purpose:** prevent unauthorized disclosure or access.

**Cloud examples**
- Student marks and personal details must not be visible to unauthorized users.
- Exam-paper storage must not be publicly accessible.
- Database credentials must not appear in source code or logs.

**Common risks**
- Weak passwords or lack of MFA.
- Excessively permissive access rights.
- Public cloud storage.
- Data leakage through insecure APIs or logs.

**Controls**
- Encryption at rest and in transit.
- IAM and least privilege.
- Multi-factor authentication (MFA).
- Private network access and secure API design.
- Regular access reviews.

### Integrity
**Purpose:** protect accuracy, completeness, and prevent unauthorized changes.

**Examples**
- Exam marks must not be changed without authorization.
- Financial transactions must remain accurate.
- Cloud configuration files must not be tampered with.

**Risks**
- Unauthorized modification.
- Malware/ransomware changing files.
- Configuration tampering.
- Accidental corruption.

**Controls**
- Hashing and digital signatures.
- Audit logs and change tracking.
- Version control and backup verification.
- Role-based access control (RBAC).
- Database constraints and validation rules.

### Availability
**Purpose:** keep services and data accessible to authorized users when needed.

**Examples**
- An online examination portal is available during exam hours.
- A library service remains available during peak usage.
- Backups can be recovered after failure.

**Risks**
- Distributed denial-of-service (DDoS).
- Hardware or network failure.
- Cloud-service outage.
- Poor capacity planning.
- Resource exhaustion.

**Controls**
- Redundant deployments across zones/regions.
- Load balancing and auto-scaling.
- Backups and tested disaster recovery.
- Monitoring and alerting.
- DDoS protection.

### Quick identification
| Scenario | CIA property | Typical controls |
|---|---|---|
| Unauthorized person reads data | Confidentiality | Encryption, access control, MFA |
| Data is altered without permission | Integrity | Hashes, signatures, logs, constraints |
| Service cannot be accessed | Availability | Redundancy, scaling, DDoS defense, recovery |

**Memory cue:** *C = Can see? I = Is it correct? A = Available?*

---

## Section 2 - Cloud Security Architecture

### Definition
Cloud security architecture is the structured design and implementation of security controls, policies, and technologies to protect cloud environments. It secures cloud data, applications, and infrastructure and accounts for **shared responsibility** between provider and customer.

### Why layered security?
- A single control cannot protect the entire cloud system.
- Different layers have different assets, threats, and responsibilities.
- Protection must extend from physical infrastructure to user data.
- Identity and monitoring controls span multiple layers.

### Five security layers
| Layer | What it includes | Risks | Controls |
|---|---|---|---|
| **1. Physical facilities** | Data centers, buildings, power, cooling, physical access; servers, storage, network equipment, cabling | Physical intrusion, facility/power incidents | Biometrics, CCTV, redundant power, fire suppression |
| **2. Hardware & hypervisor** | Servers, CPU, memory, storage, network devices; hypervisor hosts VMs | Hardware failure, hypervisor compromise, VM escape | Patching, hardening, VM isolation, secure boot |
| **3. Network & storage** | Traffic between users/apps/services; databases, object storage, disks, backups | Open ports, insecure APIs, data leakage, public storage | VPC, firewalls, encryption, private endpoints, secure backups |
| **4. Platform & runtime** | OS, containers, middleware, databases, APIs | Unpatched systems, insecure images, API misuse | Patching, secure images, API authentication, hardening |
| **5. Application & data** | Software/interfaces and information through its lifecycle | Insecure code, weak APIs, excessive permissions, unencrypted data | Secure coding, validation, encryption, key management, backups |

### Identity and Access Management (IAM)
IAM determines **who can access cloud resources and what they can do**. It applies across all layers.

Key concepts:
- **Authentication:** verifies identity (“Who are you?”).
- **Authorization:** decides permitted actions (“What can you do?”).
- **Least privilege:** provide only the access required.
- **MFA:** use multiple authentication factors.
- **Access review:** periodically review and remove unnecessary permissions.

Weak IAM is a common cause of cloud-security incidents.

### Monitoring and visibility
Monitoring provides security and performance visibility, helps detect misconfigurations, unusual access, failures, and attacks, and supports incident response.

Monitor:
- Login/access activity.
- Configuration changes.
- Network traffic.
- Application errors and latency.
- Storage access.
- Security alerts.

Evidence includes **logs, metrics, alerts, and audit trails**.

### Shared responsibility
- **Provider:** underlying infrastructure and physical security.
- **Customer:** data, identity, access configuration, and applications.
- Visibility and responsibility vary by cloud service model and provider controls. Customers should use audit reports, certifications, and their own monitoring.

### Responsibility across service models
| Model | Provider generally manages | Customer generally manages |
|---|---|---|
| **IaaS** | Underlying infrastructure | Most software, OS, applications, data, and configurations |
| **PaaS** | Infrastructure and platform | Applications, data, and access |
| **SaaS** | Application and underlying infrastructure | Appropriate data use, user access, and account security |

**Exam tip:** SaaS does not mean the customer has no security duties.

---

## Section 3 - Cloud Service Provider (CSP) and Virtualization Issues

### Cloud Service Provider issues
Customers depend on CSPs for infrastructure, platforms, and services. Responsibility is shared, but customers may have limited visibility into provider-internal controls.

#### Main provider risks
1. **Provider access and insider risk**
   - Administrators may have privileged access to infrastructure and management tools.
   - Malicious or compromised insider accounts may expose customer data.
   - Controls: least privilege, segregation of duties, access logging; review provider access policies and audit evidence.

2. **Third-party and supply-chain risk**
   - Providers rely on hardware, software, and service suppliers.
   - A supplier weakness may affect many cloud customers.
   - Controls: vendor risk assessment, dependency awareness, incident-notification terms, contractual security requirements.

3. **Transparency and auditability**
   - Customers cannot directly observe every provider control.
   - Require audit reports, compliance certifications, security documentation, and independent evidence where possible.

4. **Vendor lock-in and portability**
   - Migration to another provider becomes difficult or expensive.
   - Proprietary services, data formats, and APIs reduce portability.
   - Controls: exit plans, portable formats, tested backups, data export, interoperability.

5. **Provider outage and availability**
   - Hardware, network, regional outage, or configuration errors can affect operations.
   - Controls: multi-zone/multi-region deployment for critical workloads, backup, failover, tested disaster recovery.

### Virtualization concepts
- **Virtualization:** multiple virtual machines (VMs) run on one physical server.
- **Hypervisor:** manages VMs and allocates hardware resources.
- **Multi-tenancy:** multiple customers share the same physical infrastructure.
- **Isolation:** prevents one tenant from accessing another tenant's data/resources.

Multi-tenancy improves utilization and reduces cost, but increases the importance of isolation.

### Virtualization risks
| Risk | Meaning / impact |
|---|---|
| **Multi-tenancy / weak isolation** | Compute, memory, storage, or network isolation failure may expose one tenant to another |
| **Hypervisor compromise** | Hypervisor controls VMs and physical resources; compromise can affect many VMs |
| **VM escape** | Attacker breaks out of a guest VM and may access the hypervisor, host, or other VMs |
| **Insecure VM image/configuration** | Images may contain outdated software, default passwords, unnecessary services; misconfiguration may expose ports/data |
| **Resource contention / noisy neighbor** | One tenant's heavy resource use affects other tenants' performance |

### Virtualization controls
- Patch hypervisors, hosts, and VM images.
- Restrict and monitor administrative access.
- Use network segmentation and firewall rules.
- Encrypt sensitive data and VM migration traffic.
- Monitor VM activity, configuration changes, and resource usage.
- Use approved hardened images and scan configurations before deployment.
- Set resource limits and perform capacity planning.

**VM escape chain:** Guest VM → Escape → Hypervisor/Host → Other VMs (potential impact).

---

## Section 4 - Cloud Data Security and Legal Issues

### Data security lifecycle
Data security protects information through:
**Create → Store → Use → Share → Archive → Delete**

Cloud data may exist across multiple servers, regions, and services. Protection is required for:
- **Data at rest:** stored data (files, databases, backups).
- **Data in transit:** data moving over networks.
- **Data in use:** data being processed/accessed.

The goals remain confidentiality, integrity, and availability.

### Data classification
Classification groups data by sensitivity and business impact and helps decide required controls.

Common levels:
| Classification | Example | Typical protection |
|---|---|---|
| Public | Published course brochure | Basic integrity controls |
| Internal | Internal timetable | Access control |
| Confidential | Student marks | Encryption and role-based access |
| Restricted / highly sensitive | Highly sensitive personal/regulated data | Strong access restrictions, encryption, detailed monitoring |

### Access control
- Only authorized users access information.
- Apply **least privilege**.
- Use RBAC, MFA, and regular access reviews.
- Monitor and log access to sensitive data.

Flow: **User → Authentication → Authorization → Data access**

### Encryption
Encryption transforms readable plaintext into unreadable ciphertext using cryptographic keys.

- Encrypt **at rest** (databases, files, backups).
- Encrypt **in transit** (secure protocols such as TLS).
- Keep encryption keys protected.

Flow: **Plaintext → Encryption → Ciphertext → Secure storage/transmission**

### Key management
Key management covers:
1. Key creation
2. Secure storage
3. Distribution
4. Rotation
5. Backup
6. Destruction

Important principles:
- Keys should be stored separately from encrypted data.
- Use managed key-management services or HSMs where required.
- Protect keys throughout their lifecycle; do not store keys and encrypted data together.

### Backup, retention, and secure deletion
- **Backup:** copies used to recover after deletion, corruption, ransomware, or outages.
- Backups should have production-level encryption and access controls.
- **Retention:** how long data must be kept; follow legal, regulatory, academic, and business requirements.
- **Secure deletion:** ensures data cannot be recovered when no longer required.

Deleting one file may not remove backups, snapshots, replicas, or other copies. A deletion process may include:
**Identify data → Remove active copies → Delete backups/snapshots → Destroy keys (where applicable) → Verify deletion**

Customers should understand provider deletion procedures and request evidence when required.

### Legal issues
Cloud data may be stored, processed, or accessed across countries and by multiple parties. Main concerns:
- Data ownership.
- Privacy.
- Jurisdiction.
- Contracts.
- Compliance.
- Liability.
- Data return and deletion.

#### Data location, residency, jurisdiction
- **Data location:** physical/geographic region where data is stored.
- **Data residency:** legal or policy requirement for data to remain in a specific country/region.
- **Jurisdiction:** legal authority/laws applicable to data or a dispute.

Cross-border cloud storage may raise questions about local data-protection laws, foreign government access, location guarantees, encryption, deletion, audits, and breach notification.

### Important cloud contract clauses
- Data ownership (customer owns data).
- Data location.
- Security responsibilities.
- Privacy and confidentiality.
- Breach notification.
- Service levels.
- Audit rights.
- Data portability/export.
- Data retention and deletion.
- Liability and indemnity.

### Compliance considerations
Check:
- Data-protection/privacy laws.
- Sector regulations (education, banking, healthcare, government).
- Contract obligations.
- Cross-border data-transfer restrictions.
- Audit, record-keeping, breach notification.
- Intellectual-property and software licensing terms.

**Use-case approach:** For cloud student examination records, identify data owner, approved location, applicable laws, authorized users, secure deletion on termination, and contractual breach responsibilities.

---

## Section 5 - Cloud Performance Monitoring and Management

### Purpose
Performance monitoring continuously observes the health, speed, and reliability of cloud applications and infrastructure. It helps identify problems before they severely affect users and provides evidence for troubleshooting, capacity planning, and SLA reports.

Monitor applications, VMs, containers, databases, networks, and storage.

Workflow: **Cloud resources → Metrics and logs → Dashboards and alerts → Action**

### Key performance indicators (KPIs)
| Metric | Meaning | Example |
|---|---|---|
| **Availability** | Percentage of time a service is usable | 99.9% uptime |
| **Latency** | Time to respond to a request | 250 ms average |
| **Error rate** | Percentage of failed requests | 2% HTTP 500 errors |
| **Throughput** | Requests/transactions processed per unit time | 500 requests/sec |
| **Traffic** | Demand, such as requests/sec or active users | Request volume |
| **Saturation** | How close a resource is to its capacity | CPU at 85% |
| **Cost** | Cloud resource spending | Monthly compute/storage |

The four core monitoring signals are **latency, traffic, errors, and saturation** (often called the four golden signals).

### Understand the metrics
- A service can be available but still perform poorly if latency or errors are high.
- Traffic shows incoming demand.
- High saturation can cause slow responses, timeouts, and failures.
- Capacity management ensures resources meet current and future demand.

Important saturation resources: CPU, memory, disk, network bandwidth, database connections, queue length.

When load increases: **High load → High saturation → Slow responses/errors → Scale up or scale out**

### Dashboards, logs, alerts
- **Dashboard:** graphs/charts for important metrics.
- **Logs:** detailed events (user activity, errors, system/config changes).
- **Alerts:** notifications when metrics cross thresholds.

Alerts should be **meaningful and actionable** to avoid alert fatigue.

Workflow: **Metrics + Logs → Dashboard → Threshold crossed → Alert → Incident response**

### Incident response
1. Detect/identify the affected service and users.
2. Analyze recent changes, logs, metrics, and alerts.
3. Respond/restore using rollback, scaling, failover, or configuration correction.
4. Recover service.
5. Conduct a post-incident review and learn to prevent recurrence.

**Detect → Analyze → Respond → Recover → Review & Improve**

### Performance-management practices
- Define availability, latency, and error-rate targets.
- Monitor infrastructure and user-facing performance.
- Use automated scaling for changing workloads.
- Review trends for capacity planning and cost optimization.
- Test performance under normal and peak loads.

---

## Section 6 - Cloud Risk Management Framework

### Definition
Cloud risk management is the process of identifying, assessing, treating, and monitoring risks in cloud environments. It protects data, applications, users, and business operations. Risks cannot always be eliminated; they should be reduced to acceptable levels. Risk management continues throughout the cloud lifecycle.

Workflow: **Identify → Assess → Treat → Monitor**

### Basic risk terms
| Term | Definition | Cloud example |
|---|---|---|
| **Asset** | Something valuable to protect | Student database |
| **Threat** | Possible source of harm | Hacker, malware, insider misuse |
| **Vulnerability** | Weakness that can be exploited | Weak password, public storage bucket |
| **Risk** | Chance of a threat exploiting a vulnerability | Unauthorized access to student records |
| **Impact** | Effect if risk occurs | Privacy violation or service loss |
| **Likelihood** | Chance risk will occur | High likelihood from weak access controls |

Risk assessment evaluates **likelihood and impact**, often classifying risk as low, medium, high, or critical. High-impact and high-likelihood risks need urgent attention.

Process: **Asset → Threat → Vulnerability → Likelihood & Impact → Prioritize**

### Risk-treatment options
| Option | Meaning | Example |
|---|---|---|
| **Avoid** | Stop activity creating the risk | Do not store highly sensitive data in a public cloud |
| **Mitigate** | Reduce risk with controls | Encryption, MFA, patching, monitoring |
| **Transfer** | Shift some risk to another party | Insurance or compliant provider |
| **Accept** | Knowingly accept remaining risk | Accept low-impact risk after controls |

Residual risk is the risk that remains after treatment.

### NIST Risk Management Framework (RMF) — 7 steps
1. **Prepare:** define security roles/responsibilities, policies, risk tolerance, assets, stakeholders, requirements.
2. **Categorize:** classify system/data based on impact and sensitivity.
3. **Select:** choose controls based on assessment (access control, encryption, logging, backups, incident response).
4. **Implement:** deploy controls and document configurations.
5. **Assess:** test/scan/audit and verify controls work; identify residual risk.
6. **Authorize:** senior official reviews residual risk and decides whether operation is acceptable.
7. **Monitor:** continuously track alerts, logs, vulnerabilities, user activity, and changes; update controls as risk evolves.

Mnemonic: **P-C-S-I-A-A-M** (Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor).

### Example: cloud student-result system
- Prepare: roles, policies, risk tolerance.
- Categorize: marks and personal data as highly sensitive.
- Select: MFA, RBAC, encryption, logging, backups.
- Implement: configure controls.
- Assess: verify unauthorized users cannot read or change results.
- Authorize: management approves operation.
- Monitor: continuously review logs, alerts, and configuration changes.

---

## Section 7 - Cloud SLA and Trust Management

### SLA
A **Service Level Agreement (SLA)** is a formal agreement between a cloud provider and customer defining expected service levels, how they are measured, responsibilities, and remedies for failure.

Common measures: availability, latency, error rate, and support response time.

### SLA practice
1. Define services covered.
2. Set measurable availability, performance, and support targets.
3. Specify measurement period (e.g., monthly).
4. Define exclusions (e.g., scheduled maintenance or customer-caused issues).
5. Define escalation, reporting, remedies, and termination conditions.

Workflow: **Define service → Set targets → Measure performance → Report → Apply remedies**

### SLI, SLO, SLA
| Term | Full form | Meaning | Example |
|---|---|---|---|
| **SLI** | Service Level Indicator | Measurable performance indicator | % successful requests |
| **SLO** | Service Level Objective | Target value for an SLI | 99.9% successful requests per month |
| **SLA** | Service Level Agreement | Agreement and consequences if target missed | Service credit if uptime below 99.9% |

Memory cue: **Indicator = measurement; Objective = target; Agreement = promise/remedy.**

### SLA components
- **Scope:** services and users covered.
- **Service targets:** availability, latency, error rate.
- **Measurement:** metrics, tools, reporting period.
- **Responsibilities:** provider/customer duties.
- **Exclusions:** maintenance and customer-side issues.
- **Support:** contact, response, escalation.
- **Security:** data protection/access rules.
- **Remedies:** credits, penalties, termination.

### SLA types
| Type | Meaning | Example |
|---|---|---|
| **Customer-based SLA** | One customer, multiple services | College has one agreement for compute, storage, and support |
| **Service-based SLA** | One service, multiple customers | Same storage SLA applies to all customers |
| **Multi-level SLA** | Different service levels for groups/users | Basic student support; priority administrator support |

### SLA monitoring
Monitoring compares actual performance with agreed targets using uptime, latency, error rate, response time, etc. Results support reports and service-credit calculations. If targets are missed, provider investigates and improves service.

Workflow: **Cloud service → SLI measurement → Compare with SLO → SLA report**

### SLA example: student result system
- SLI: percentage of successful requests.
- SLO: at least 99.9% successful requests per month.
- SLA: service credit if monthly availability falls below 99.9%.
- Measurement period: one calendar month.
- Exclusion: scheduled maintenance announced in advance.

### Trust management
Trust is built on evidence that the cloud provider delivers secure, reliable, compliant service—not assumptions.

Elements:
- Clear responsibilities.
- Security controls.
- Monitoring evidence.
- Audit reports.
- Compliance proof.
- Incident transparency.
- Data protection.
- Exit plan.
- Regular reviews.

**Build trust:** clear shared-responsibility boundaries, encryption/access controls/monitoring, audit reports and certifications, transparent incident notification, tested backup/recovery/exit plans, and regular SLA review.

**Formula cue:** Provider evidence + Customer monitoring + Clear contract = Trust.

### Online banking trust-management example
- Clear responsibilities: bank manages user access; provider manages infrastructure security.
- Security controls: encryption, passwords, MFA.
- Monitoring: login attempts and suspicious transactions.
- Audit reports: review security activities/logs.
- Compliance proof: applicable banking/data-protection requirements.
- Incident transparency: provider informs bank about incidents.
- Data protection: account details stored securely and backed up.

---
