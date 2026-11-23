# Unit 4 — Cloud Security and Governance

> ISA 2 / Unit 4 / Source: CT Unit 4 course slides. These revision materials summarize the supplied syllabus.

## Last-Minute Cheat Sheet

## 1. CIA Triad
- **Confidentiality:** Only authorized access. Risks: weak passwords/MFA, excessive permissions, public buckets, insecure APIs/logs. Controls: encryption, IAM/least privilege, MFA, private access, access reviews.
- **Integrity:** Data remains accurate and unaltered. Risks: unauthorized modification, malware, configuration tampering, corruption. Controls: hashes/signatures, audit/change logs, versioning, RBAC, database validation.
- **Availability:** Service/data accessible when needed. Risks: DDoS, hardware/network/cloud outages, capacity issues, resource exhaustion. Controls: redundancy, load balancing, auto-scaling, backups/DR, monitoring, DDoS defense.
**C = Who can see? | I = Was it changed? | A = Can I access it?**

## 2. Cloud Security Architecture
**5 layers (bottom-up):**
1. Physical facilities — data center, power, cooling, access → biometrics, CCTV, redundant power, fire suppression.
2. Hardware/hypervisor — servers, CPU, memory, VMs → patch, harden, isolate VMs, secure boot.
3. Network/storage — traffic, DB, disks, backups → VPC, firewall, encryption, private endpoints, secure backups.
4. Platform/runtime — OS, containers, middleware, APIs → patch, secure images, API auth, hardening.
5. Application/data — software, interfaces, data → secure coding, validation, encryption, key management, backups.

**IAM:** Authentication = prove who you are; Authorization = what you're allowed to do; Least privilege = only necessary permissions; MFA; access review.

**Monitoring:** Logs + metrics + alerts + audit trails. Watch login, configuration, traffic, errors/latency, storage access, alerts.

**Shared responsibility:**
- IaaS: Provider infra; customer OS/software/apps/data.
- PaaS: Provider infra/platform; customer app/data/access.
- SaaS: Provider app/infra; customer still handles data use, access, accounts.

## 3. CSP & Virtualization
**Provider risks:** insider/privileged access; supply-chain dependency; limited transparency/auditability; vendor lock-in; outage/regional failures.
**Controls:** least privilege, segregation of duties, logs, audits/certifications, vendor risk review, portable formats/exit plan, multi-zone/region, backup/failover/DR.

- **Virtualization:** multiple VMs on one physical machine.
- **Hypervisor:** manages VMs and hardware resources.
- **Multi-tenancy:** multiple customers share infrastructure.
- **Isolation:** prevents tenant cross-access.
- **VM escape:** guest VM breakout → hypervisor/host/other VMs.
- **Noisy neighbor:** tenant resource-heavy workload affects another tenant.
- VM image risk: outdated software, default passwords, unnecessary services, misconfiguration.

Virtualization controls: patch hosts/hypervisor/images, restrict admin, segment network, firewall, encrypt data/migration, monitor VM/config/resource use, resource limits/capacity planning.

## 4. Data Security & Legal Issues
**Lifecycle:** Create → Store → Use → Share → Archive → Delete
**Protect:** At rest (stored) | In transit (network) | In use (processing).

**Classification:** Public → Internal → Confidential → Restricted/Highly Sensitive; classification decides controls.
**Access:** Least privilege, RBAC, MFA, access reviews, logging.
**Encryption:** Plaintext → Encrypt (key) → Ciphertext. Encrypt storage/backups and traffic (TLS).
**Key management lifecycle:** Create → Store → Distribute → Rotate → Backup → Destroy. Keep keys separate from data; protect keys.

**Backup:** recovery copies, encrypted + access controlled, restoration tested.
**Retention:** how long data must be kept (legal/regulatory/academic/business needs).
**Secure deletion:** remove active copies, backups/snapshots/replicas, destroy keys if appropriate, verify/evidence deletion.

**Legal terms:**
- Data location = where physically stored.
- Data residency = rule/policy that data must stay in a region.
- Jurisdiction = which laws/legal authority apply.

**Contract clauses:** ownership, location, security duties, privacy, breach notification, service levels, audit rights, portability, retention/deletion, liability/indemnity.
Compliance: privacy/data-protection laws, sector rules, cross-border transfer, audit/records, IP/licensing.

## 5. Performance Monitoring
**KPIs:** Availability (uptime), Latency (response time), Error rate (failed requests), Throughput (requests/transactions per second), Traffic (demand), Saturation (resource near capacity), Cost.
**Four golden signals:** Latency, Traffic, Errors, Saturation.

High saturation (CPU/RAM/disk/network/DB connections/queue) → slow response, timeouts, errors → scale up/out.

**Monitoring pipeline:** Resources → metrics/logs → dashboard/threshold → alert → action.
- Dashboard = visualization.
- Log = detailed event record.
- Alert = notification when threshold crossed; should be meaningful/actionable.

**Incident response:** Detect → Analyze → Respond → Recover → Review/Improve.
Remedies: rollback, scale, failover, correct configuration.

## 6. Risk Management & NIST RMF
**Terms:** Asset (valuable thing), Threat (possible harm), Vulnerability (weakness), Risk (threat exploiting weakness), Impact (consequence), Likelihood (chance), Residual risk (left after treatment).

**Assess:** Asset → Threat → Vulnerability → Likelihood + Impact → Prioritize (Low/Medium/High/Critical).

**Treatment:** 
- Avoid = stop risk activity
- Mitigate = reduce with controls
- Transfer = shift some risk (insurance/provider)
- Accept = knowingly retain remaining risk

**NIST 7 steps (order):**
1. Prepare — roles, policy, context, assets
2. Categorize — impact/data classification
3. Select — choose controls
4. Implement — deploy/document controls
5. Assess — test effectiveness, identify residual risk
6. Authorize — official decides acceptable residual risk/operation
7. Monitor — continuous logs/alerts/vulnerabilities/changes

Mnemonic: **P-C-S-I-A-A-M**

## 7. SLA & Trust
- **SLI:** measured indicator (e.g., successful-request percentage).
- **SLO:** target (e.g., 99.9% monthly).
- **SLA:** formal agreement + obligations/remedy (e.g., credit if below target).
**Indicator → Objective → Agreement**

**SLA components:** Scope, Targets, Measurement, Responsibilities, Exclusions, Support/Escalation, Security, Remedies.
**Types:**
- Customer-based = one customer, multiple services.
- Service-based = one service, many customers.
- Multi-level = different levels for user groups.

SLA monitoring: actual performance vs target; reports and service credits; provider investigates misses.

**Trust evidence:** responsibilities, security controls, monitoring evidence, audit reports, compliance proof, incident transparency, data protection, exit plan, regular reviews.
**Trust formula:** Provider evidence + Customer monitoring + Clear contract = Trust.

## Rapid scenario mapping
| If question says... | Answer |
|---|---|
| Unauthorized disclosure/read | Confidentiality |
| Unauthorized change/alteration | Integrity |
| Outage, DDoS, service inaccessible | Availability |
| Hypervisor/VM management | Hypervisor |
| Break out of guest VM | VM escape |
| One tenant affects another's performance | Noisy neighbor |
| Data must stay in a country | Data residency |
| Which laws apply | Jurisdiction |
| Response time | Latency |
| Requests per second processed | Throughput |
| Resource near capacity | Saturation |
| Risk controls reduce likelihood/impact | Mitigate |
| System/data impact classification | Categorize |
| Senior approval of residual risk | Authorize |
| Measured value | SLI |
| Target value | SLO |
| Agreement/remedy | SLA |
| One customer, several services | Customer-based SLA |
| One service, multiple customers | Service-based SLA |
| Different service commitments for groups | Multi-level SLA |
