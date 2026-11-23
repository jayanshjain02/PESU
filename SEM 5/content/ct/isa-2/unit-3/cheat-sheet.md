# Cloud Technologies – Unit 3 | Last-Minute Cheat Sheet

> ISA 2 / Unit 3 / Source: CT Unit 3 course slides. These revision materials summarize the supplied syllabus.


> **Use this for rapid revision.** Focus on keywords, contrasts, architecture, workflows, and commands.

## 1) Cloud Applications & Google App Engine (GAE)

### Cloud basics
- **Cloud application:** Software runs on cloud infrastructure and is accessed over the internet.
- **Characteristics:** on-demand resources · scalability · flexibility · remote access · availability · managed maintenance.
- **Cloud application types:**
  - **SaaS** = ready-to-use software (Gmail, Google Docs)
  - **PaaS** = platform to build/deploy/run apps (Google App Engine)
  - **IaaS** = virtual machines, storage, networking (AWS EC2)
  - **Cloud-native** = built for cloud (microservices/containers/orchestration)
- **Uses:** hosting, mobile back ends, storage/backup, databases, analytics, AI/ML, streaming, disaster recovery, IoT.

### GAE in a nutshell
- **Google App Engine = managed PaaS**; deploy code/configuration, Google manages much of the infrastructure.
- **Architecture/request flow:** `User → Internet → App Engine → Application → Cloud Services/Database`
- **Hierarchy:** `Project → App → Services → Versions → Instances`
  - Project = cloud resource container · Service = app component · Version = code release · Instance = running copy.
- **Standard vs Flexible:**
  - **Standard:** managed/sandboxed runtime; rapid scaling; can scale to zero in suitable configs.
  - **Flexible:** containers on Compute Engine VMs; more runtime flexibility.
- **GAE features:** automatic scaling · managed infrastructure · availability · security/access control · monitoring · versioning · Cloud integration.
- **GCE vs GAE:** **GCE = IaaS/control over VMs**; **GAE = PaaS/managed app platform**.
- **PaaS responsibility:** developer writes app; platform provides runtime/deployment/scaling; provider manages underlying infrastructure.

**Remember lifecycle:** `Develop → Test → Configure → Deploy → Monitor`

---

## 2) Google Apps & Google Apps Script

### Google Workspace services
| Service | Main purpose |
|---|---|
| Gmail | Email/communication |
| Docs | Document creation and collaboration |
| Calendar | Events and scheduling |
| Drive | File storage, sharing, sync |
| Apps Script | Automate/integrate Workspace |

### Apps Script
- **Definition:** Cloud-based **JavaScript** platform for automating and extending Workspace without managing servers.
- **Use it for:** repetitive tasks, email automation, report/certificate generation, Drive organization, Calendar creation, custom menus/dialogs, add-ons, web apps, external APIs.
- **Cloud connection:** serverless execution · OAuth authorization/scopes · built-in service APIs · workflow integration.
- **Workflow example:** `Forms → Sheets → Apps Script → Gmail / Calendar / Drive`

### Key service names
- `GmailApp` = Gmail
- `DocumentApp` = Google Docs
- `CalendarApp` = Google Calendar
- `DriveApp` = Google Drive
- `UrlFetchApp` = external HTTP/REST API calls
- **Language:** JavaScript

---

## 3) Datastore & Database Services

### Datastore essentials
- **Cloud Datastore / Firestore in Datastore mode:** managed, scalable, **NoSQL**, schema-less data store.
- **Data model:** `Kind (group/type) → Entity (record) → Properties (fields)`
- Entities of the same kind **can have different properties** (schema-less).
- Supports automatic scaling/sharding/replication, queries, indexes, and transactions (ACID within entity groups as described in notes).
- **Use cases:** profiles, products, game state, sessions, lightweight transactional data.

### App Engine + Datastore request flow
`User request → App Engine → validate/process → Datastore client → read/write/query entities → response (HTML/JSON)`
- **App Engine** runs app/API and business logic.
- **Datastore** stores structured app records.
- **Cloud Storage** stores files (images, PDFs, certificates).
- **Cloud SQL (optional)** stores relational data (e.g., marks, fees, enrollment).

### Know the distinctions
| Service | Stores / best for |
|---|---|
| Datastore mode | Entities/kinds; Datastore API-compatible applications |
| Firestore Native | Documents/collections; modern web/mobile, real-time features |
| Cloud SQL | Relational SQL, tables, joins, relationships |
| Cloud Storage | Objects/files (media, backups, static files) |
| Google Drive | User files, sharing, collaboration—not app-record database |

**Student portal example:** App Engine = portal/API · Datastore = student/course/assignment records · Cloud Storage = PDFs/images/certificates · Cloud SQL = relational marks/fees/enrollment if needed.

---

## 4) Apple iCloud & Amazon Web Services (AWS)

### iCloud
- **Purpose:** personal cloud storage, backup, synchronization across Apple devices.
- **Typical features:** photos, files, device backup, sync, sharing, Apple ecosystem integration.
- **Security:** encryption; Advanced Data Protection adds end-to-end encryption for more categories (availability/settings depend on service/account).

### AWS
- **Purpose:** broad cloud platform for computing, storage, databases, networking, security, and more.
- **Major service names:**
  - **IAM** = identity/access permissions
  - **EC2** = virtual compute instances
  - **S3** = object storage
  - **RDS** = managed relational database
  - **Load Balancing** = distributes incoming traffic across targets
- **iCloud vs AWS:** iCloud is consumer-focused storage/sync/backup; AWS offers configurable cloud infrastructure and services for developers/organizations.

---

## 5) Web Hosting & Cloud Hosting

### Web hosting
- Hosts website files/content on an internet-connected server so browsers can access them.
- **Workflow:** `Create site → upload files → configure domain/DNS → server serves content → browser displays site`
- **Core types:**
  - **Shared:** multiple sites share one server; low cost, limited resources/control.
  - **VPS:** virtual server with more control/resources than shared.
  - **Dedicated:** one physical server for one customer; high control/cost.
- Other types may include managed hosting, reseller hosting, and specialized hosting.

### Cloud hosting
- Uses pooled/distributed cloud resources; capacity can scale with demand.
- **Typical flow:** `User → DNS → Load Balancer → Cloud instances/containers → App/data services`
- **Deployment models:** Public · Private · Hybrid · Community.
- **Advantages:** elastic scaling, resilience/availability, flexibility, managed services.
- **Potential drawbacks:** cost complexity, provider dependence, internet reliance, security/configuration responsibility.

**Web hosting vs Cloud hosting:** traditional hosting often uses fixed/server-based resources; cloud hosting uses distributed pooled resources and can scale elastically.

---

## 6) App/Web Configuration & Deployment

### Traditional hosting – remember the components
- **DNS/domain** points users to hosting.
- **Apache/Nginx** web server serves the site.
- **Document root** = directory containing website files.
- **SFTP** securely transfers files.
- **Database** stores application data.
- **SSL/TLS** encrypts browser-server traffic (HTTPS).

### App Engine configuration (`app.yaml`)
| Setting | What it describes |
|---|---|
| `runtime` | Language/runtime environment |
| `service` | App Engine service name |
| `entrypoint` | Command used to start the app (where applicable) |
| `automatic_scaling` | Scaling behavior/settings |
| `env_variables` | Environment variables/config values |

**Traditional hosting:** configure server, web server, files, database, SSL.  
**App Engine:** configure app (e.g., `app.yaml`) and deploy; platform manages much of infrastructure.

### Commands to memorize
```bash
# Traditional server / web hosting
ssh server                     # Secure remote shell (placeholder host)
sudo systemctl reload apache2  # Reload Apache

# Google App Engine
 gcloud auth login
 gcloud config set project PROJECT_ID
 gcloud app deploy app.yaml
 gcloud app browse
```
- **SSH** = secure remote login/command execution.
- **SFTP** = secure file transfer.
- **Deployment order:** authenticate → set project → deploy → browse/verify.

---

## 7) EL – Cloud Shell & Cloudflare Pages

### Practical sequence
1. Open Google Cloud Console → start **Cloud Shell**.
2. Create folder and enter it:
   ```bash
   mkdir -p ~/my-website
   cd ~/my-website
   ```
3. Create file: `nano index.html` → write HTML → save `Ctrl+O`, Enter → exit `Ctrl+X`.
4. Check files: `ls` or `ls -la`.
5. Start local preview server:
   ```bash
   python3 -m http.server 8080
   ```
6. Cloud Shell **Web Preview → Preview on port 8080**.
7. Test page, edit `index.html`, refresh preview; stop server with **Ctrl+C**.
8. Deploy with Cloudflare Pages/Wrangler:
   ```bash
   npx wrangler --version
   npx wrangler login --device --browser=false
   npx wrangler whoami
   npx wrangler pages deploy . --project-name=my-first-website
   ```
9. Open the **exact URL printed after deployment**.

### Commands—what they mean
| Command | Meaning |
|---|---|
| `mkdir -p` | Create directory (including parents); no error if it already exists |
| `cd` | Change directory |
| `nano index.html` | Open/create file in Nano text editor |
| `ls -la` | List files, including hidden files, with details |
| `python3 -m http.server 8080` | Run simple local HTTP server on port 8080 |
| `npx wrangler --version` | Check Wrangler version |
| `npx wrangler login ...` | Authenticate Wrangler to Cloudflare |
| `npx wrangler whoami` | Verify logged-in account |
| `wrangler pages deploy . ...` | Deploy current directory to Cloudflare Pages |

### Local preview vs live site
- **Local preview:** temporary server in Cloud Shell, accessed through Web Preview; not public deployment.
- **Published Pages site:** deployed to Cloudflare; opens at the deployment URL.

### 404 quick troubleshooting
- Check authentication: `npx wrangler whoami`.
- Check correct folder: `cd ~/my-website && ls -la`.
- Ensure **`index.html` is at the root of the deployed folder** (not buried in another folder).
- Deploy the correct directory again; read CLI output and open its exact URL.
- Check Cloudflare Dashboard → Workers & Pages → project/deployment status.
- If Wrangler fails, Dashboard direct upload is an alternative (upload `index.html` at project root).

---

# Ultra-Quick Memory Triggers

| If the question says… | Recall… |
|---|---|
| Ready-made software online | SaaS |
| App development platform, no server management | PaaS / App Engine |
| VM/server control | IaaS / Compute Engine / EC2 |
| App Engine scaling | Platform/automatic scaling |
| App Engine hierarchy | Project → App → Services → Versions → Instances |
| Google automation language | JavaScript (Apps Script) |
| Gmail/Docs/Calendar/Drive automation | `GmailApp` / `DocumentApp` / `CalendarApp` / `DriveApp` |
| Call external APIs from Apps Script | `UrlFetchApp` |
| Datastore structure | Kind → Entity → Properties |
| Schema-less NoSQL | Datastore |
| File vs records | Drive/Cloud Storage vs Datastore |
| SQL and joins | Cloud SQL |
| Apple backup/sync | iCloud |
| AWS compute/storage/database | EC2 / S3 / RDS |
| Secure file transfer / remote shell | SFTP / SSH |
| App Engine config file | `app.yaml` |
| Cloud Shell website preview | `python3 -m http.server 8080` → Web Preview port 8080 |
| Cloudflare deployment CLI | Wrangler |
| Cloudflare deployment command | `npx wrangler pages deploy . --project-name=my-first-website` |


## High-yield comparisons
- **SaaS / PaaS / IaaS:** use software / build on platform / manage infrastructure.
- **GCE / GAE:** virtual machines & control / managed application platform.
- **Drive / Datastore:** files / application records.
- **Datastore / Cloud SQL:** NoSQL entities / relational SQL tables.
- **iCloud / AWS:** personal sync-backup / configurable cloud services.
- **Traditional / cloud hosting:** server-centric fixed resources / pooled, elastic resources.
- **Local preview / deployment:** temporary test / published website.
