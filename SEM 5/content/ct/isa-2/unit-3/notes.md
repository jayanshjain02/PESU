# Cloud Technologies – Unit 3 Exam-Ready Notes

> ISA 2 / Unit 3 / Source: CT Unit 3 course slides. These revision materials summarize the supplied syllabus.

**Course:** Cloud Technologies  
**Unit:** Cloud Computing Applications and Deployment  
**Source:** CT Unit 3.pdf  
**Purpose:** Complete exam revision notes covering the concepts in the presentation, organized into 7 sections. Section 7 is **EL (Experiential Learning / Practical Lab)**.

---

## Section 1 – Cloud Applications and Google App Engine

### 1. Cloud Computing Applications
Cloud computing applications are software programs that run on cloud infrastructure rather than on a user's local device. They use remote servers for processing, storage, and management, and are accessed over the internet.

**Key characteristics**
- **Scalability:** Resources can increase or decrease as demand changes.
- **Flexibility:** Users can access services from different devices and locations.
- **High availability:** Services can be designed to remain accessible.
- **Remote access:** Access is possible wherever internet connectivity is available.
- **Managed maintenance:** The cloud provider maintains much of the underlying infrastructure.
- **On-demand resources:** Computing resources are available when required.

Compared with traditional applications, cloud applications can dynamically scale, support remote access, and are maintained partly or fully by the cloud provider.

### 2. Types of Cloud Applications
| Type | Meaning | Example |
|---|---|---|
| **SaaS (Software as a Service)** | Ready-to-use software delivered over the internet. | Gmail, Google Docs |
| **PaaS (Platform as a Service)** | Platform for developing, deploying, and running applications. | Google App Engine |
| **IaaS (Infrastructure as a Service)** | Virtualized resources such as servers, storage, and networking. | AWS EC2 |
| **Cloud-native applications** | Applications designed for cloud environments using approaches such as microservices, containers, and orchestration. | Netflix (illustrative example in slides) |

### 3. Common Applications of Cloud Computing
- **Website and web application hosting:** Hosting websites and web-based services.
- **Mobile application back ends:** Providing APIs, authentication, and data services for mobile apps.
- **Online storage and backup:** Storing files and maintaining backup copies.
- **Database hosting:** Hosting databases used by applications.
- **SaaS:** Delivering ready-to-use software through the internet.
- **Data analytics and big-data processing:** Processing large datasets and extracting insights.
- **Artificial intelligence and machine learning:** Training and running AI/ML workloads.
- **Content delivery and media streaming:** Delivering videos, music, and other content.
- **Disaster recovery and business continuity:** Recovering systems and data after disruptions.
- **Internet of Things (IoT):** Connecting, collecting, and processing data from devices.

### 4. Google App Engine (GAE)
Google App Engine is a cloud platform for developing and hosting web applications. It is a **fully managed Platform as a Service (PaaS)** in Google Cloud.

Developers deploy their code and configuration; Google Cloud manages much of the infrastructure, including provisioning, scaling, SSL-related setup, logging, and version management.

**Purpose:** Deploy applications without having to directly manage physical servers or the underlying infrastructure.

### 5. Basic App Engine Architecture
**Request flow:**
`User → Internet → App Engine → Application → Cloud Services / Database`

- **Client/User:** Sends requests through a browser or application.
- **App Engine:** Receives and processes application requests and manages the execution environment.
- **Application:** Contains the code and business logic.
- **Services:** Application components can be organized into separate services.
- **Datastore / Cloud services:** Store or process application data.
- **Google Cloud infrastructure:** Supplies underlying computing resources.

**Applications App Engine can host**
- Websites
- REST APIs
- Mobile back ends
- Student and enterprise portals
- E-commerce applications
- Microservices
- Data-driven web applications

### 6. App Engine Application Structure
The hierarchy is:

`Google Cloud Project → App Engine App → Services → Versions → Instances`

- **Google Cloud Project:** Project container in which the App Engine application is created.
- **App Engine App:** Top-level application container.
- **Services:** Divide the application into independently organized components; services may use different runtimes and performance settings.
- **Versions:** Multiple versions of an application can exist within a service.
- **Instances:** Running copies of a version. More or fewer instances may be used depending on traffic and load.

The number of instances can increase or decrease according to workload, enabling scaling.

### 7. App Engine Environments
| Standard Environment | Flexible Environment |
|---|---|
| Runs in a managed, sandboxed environment. | Runs applications in containers on Compute Engine virtual machines. |
| Uses supported runtimes. | Offers greater flexibility for runtime and infrastructure requirements. |
| Designed for rapid scaling; can scale to zero in appropriate configurations. | Provides container-based runtime flexibility. |

### 8. App Engine as PaaS
**PaaS** provides a ready-to-use platform for developing, deploying, and running applications.

App Engine provides:
- Application runtime environment
- Deployment tools
- Automatic resource management and scaling
- Application monitoring
- Integration with cloud services

**PaaS responsibility model**
- **Developer:** Writes application code.
- **App Engine:** Provides platform and runtime.
- **Google Cloud:** Provides underlying infrastructure.

App Engine lets developers focus primarily on application development instead of server administration.

**Deployment lifecycle:**  
`Develop → Test → Configure → Deploy → Monitor`

### 9. Features of Google App Engine
1. **Automatic scaling:** Resources increase or decrease based on application demand.
2. **Managed infrastructure:** Google manages underlying infrastructure.
3. **High availability:** Applications can be designed to remain accessible under changing workloads.
4. **Security:** Cloud security and access-control mechanisms are provided.
5. **Application monitoring:** Tools help monitor application performance.
6. **Version management:** Supports application versioning and deployment management.
7. **Integration:** Can integrate with other Google Cloud services.

### 10. Google Compute Engine vs Google App Engine
| Google Compute Engine (GCE) | Google App Engine (GAE) |
|---|---|
| **IaaS** | **PaaS** |
| Provides virtual machines in different sizes. | Provides managed application platform. |
| User selects VM resources according to needs. | Google manages most underlying infrastructure. |
| Offers greater infrastructure control. | Developers focus on application development. |
| Suitable when organizations need control over infrastructure or complex workloads. | Suitable for application deployment without server-management burden. |

**Exam takeaway:** GCE provides more control; GAE provides more management convenience.

### Likely Exam Questions
- Define cloud computing applications.
- Explain the types of cloud applications.
- Define Google App Engine.
- Explain the basic architecture of App Engine.
- List any four features of App Engine.
- Explain App Engine as PaaS.
- Differentiate Compute Engine and App Engine.

---

## Section 2 – Google Apps and Google Apps Script

### 1. Google Apps
Google Apps (Gmail, Docs, Calendar, and Drive) are productivity services in Google Workspace (formerly G Suite). They support communication, document creation, scheduling, storage, sharing, and collaboration, with integration among services.

| Service | Purpose |
|---|---|
| **Gmail** | Cloud-based email and communication. |
| **Google Docs** | Online document creation, sharing, and collaboration. |
| **Google Calendar** | Event scheduling, management, and sharing. |
| **Google Drive** | Cloud storage, file sharing, synchronization, and collaboration. |
| **Google Apps Script** | Automates and integrates Google Workspace applications. |

### 2. Google Apps Script
Google Apps Script is a built-in, cloud-based JavaScript platform for automating and extending Google Workspace applications such as Gmail, Docs, Sheets, Calendar, Drive, and Forms, without managing servers.

### 3. Uses of Apps Script
**A. Automate repetitive tasks**
- Send templated or bulk emails from spreadsheet data.
- Generate reports, invoices, or certificates in Docs using Sheet data.
- Organize Drive files and folders according to rules.

**B. Integrate Google services**
- Create Calendar events from Form responses or Sheet rows.
- Log Gmail attachments into a Sheet.

**C. Extend the user interface**
- Add custom menus, dialogs, and sidebars to Sheets, Docs, and Forms.
- Build simple internal tools or dashboards embedded in Google Sites.

**D. Call external APIs**
- `UrlFetchApp` can call REST APIs, such as weather services, payment gateways, or AI services, from Apps Script.

**E. Publish web apps and add-ons**
- Scripts can be deployed as web apps using HTML Service.
- Scripts can be published as Workspace add-ons.

### 4. Why Apps Script Fits Cloud Computing
- **Serverless automation:** Code runs in Google's cloud; users do not need to provision their own servers.
- **OAuth and scopes:** Users authorize scripts and grant the permissions required to access services such as Gmail or Drive.
- **API-based approach:** Built-in services like `GmailApp`, `DriveApp`, and `CalendarApp` offer APIs through simpler JavaScript methods.
- **Integration patterns:** Services can be chained to create event-driven workflows, such as `Forms → Sheets → Gmail/Calendar/Drive`.

### 5. Practical Apps Script Examples

#### Example 1 – Send an email using Gmail
```javascript
function sendEmail() {
  GmailApp.sendEmail(
    "test@example.com",
    "Cloud Computing Practical",
    "This is a practical email sent using Google Apps Script."
  );
}
```
**Steps**
1. Open `script.google.com`.
2. Click **New project**.
3. Enter the code.
4. Replace the test recipient with your email address.
5. Save.
6. Select `sendEmail` from the function list.
7. Click **Run**.
8. Grant the required permissions.
9. Check Gmail → Sent.

**Output:** Email is sent using Apps Script.

#### Example 2 – Create a Google Doc
```javascript
function createDocument() {
  var doc = DocumentApp.create("Cloud Computing Practical");
  doc.getBody().appendParagraph("Introduction to Cloud Computing");
  doc.getBody().appendParagraph(
    "Google Apps Script can create and modify documents."
  );
  Logger.log(doc.getUrl());
}
```
**Steps:** Create a new Apps Script project → enter code → save → run → grant permissions → open the execution log → use the document URL.

**Output:** A new Google Doc is created automatically.

#### Example 3 – Create a Calendar event
```javascript
function createEvent() {
  var calendar = CalendarApp.getDefaultCalendar();

  var start = new Date("2026-09-15T10:00:00");
  var end = new Date("2026-09-15T11:00:00");

  calendar.createEvent(
    "Cloud Computing Seminar",
    start,
    end
  );
}
```
**Steps:** Enter the code in Apps Script → save → run → authorize Calendar → open Google Calendar and check the specified time.

**Output:** A Cloud Computing Seminar event is added to Calendar.

#### Example 4 – Create a Drive folder and file
```javascript
function createDriveFile() {
  var folder = DriveApp.createFolder("Cloud Computing Practical");

  var file = folder.createFile(
    "CloudComputing.txt",
    "This file is created using Google Apps Script."
  );

  Logger.log(file.getUrl());
}
```
**Steps:** Enter code → save → run → authorize Drive → open Google Drive → locate the folder and text file.

**Output:** A folder and a file are created in Drive.

### Important Apps Script Services / Names
- `GmailApp` – Gmail operations.
- `DocumentApp` – Google Docs operations.
- `CalendarApp` – Calendar operations.
- `DriveApp` – Drive operations.
- `UrlFetchApp` – Calls external APIs.

### Likely Exam Questions
- What are Google Apps?
- Define Google Apps Script.
- Explain four uses of Apps Script.
- Why is Apps Script considered cloud/serverless?
- Name any four Apps Script services.
- Explain how to send an email / create a document / create a calendar event / create a Drive file using Apps Script.

---

## Section 3 – Datastore and Database Services

### 1. Cloud Datastore
Cloud Datastore (presented as **Firestore in Datastore mode**) is a fully managed, schemaless NoSQL document database optimized for web and mobile applications that need automatic scaling, high availability, and queries over structured or semi-structured data.

### 2. Datastore Characteristics
**A. Data model**
- Data is stored as **entities** (similar to rows).
- Entities contain **properties** (similar to columns).
- Entities are grouped by **kind** (similar to tables).

**B. Schema-less design**
- Entities belonging to the same kind can have different properties.
- A rigid, identical schema is not required for every entity.

**C. Scaling and availability**
- Data can be automatically sharded and replicated across data centers.
- It can scale with traffic without manual resource provisioning.

**D. Transactions**
- Supports ACID transactions within entity groups.
- Useful for consistent operations such as fund transfers or inventory updates.

### 3. Typical Datastore Use Cases
- User profiles
- Product catalogs
- Game state
- Session data
- Lightweight transactional data

### 4. Datastore vs Google Drive
| Google Drive | Datastore |
|---|---|
| Stores files such as PDFs, images, documents, and videos. | Stores structured application data. |
| Used for file storage, sharing, and collaboration. | Used for data records such as names, IDs, products, and other application entities. |
| Basic Workspace automation can be performed with Apps Script, subject to quotas and account policies. | Used by applications to read, create, update, and query data. |

**Remember:** Drive stores files; Datastore stores structured application records.

### 5. Datastore Integration with App Engine
- **App Engine:** Runs and deploys the web application.
- **Datastore:** NoSQL cloud database that stores application data.

**Request-processing sequence**
1. User sends a request to the App Engine application.
2. App Engine receives it and executes application code.
3. Application validates the request.
4. Application creates a Datastore client.
5. Application reads, creates, updates, or deletes entities.
6. Datastore returns the result.
7. App Engine sends an HTML page or JSON response to the user.

Datastore is schema-less, so entities of the same kind need not contain identical properties. Slides mention access from Python, Java, Node.js, Go, PHP, Ruby, and other supported languages.

### 6. Online Student Portal Example
The slides use an online student portal to show how different cloud components work together:

**App Engine**
- Runs the web application and REST APIs.
- Validates student requests.
- Handles authentication and business rules.
- Connects to databases and storage services.

**Datastore**
- Stores student profiles.
- Stores course registrations.
- Stores assignment metadata.
- Supports queries on student and course records.

**Cloud Storage**
- Stores assignment PDFs.
- Stores profile images.
- Stores certificates and reports.

**Cloud SQL (optional)**
- Stores relational data such as marks, fees, enrollment, and examination information.

### 7. Firestore in Datastore Mode
- Google Firestore supports different database modes.
- **Firestore in Datastore mode** provides compatibility with the Datastore API and data model.
- Existing applications designed around Cloud Datastore can continue using that model while using current Firestore infrastructure.

### 8. When to Choose Datastore Mode
Choose Firestore in Datastore mode when:
- A scalable, managed NoSQL database is needed.
- Data is naturally represented as entities or documents.
- The application does not require many relational joins.
- Minimal database administration and App Engine integration are desired.
- The application stores profiles, products, orders, settings, or user activity.
- The application may grow from a prototype into a larger workload.
- Maintaining a legacy App Engine application that already uses Datastore APIs.

### 9. Datastore vs Other Database/Storage Services
| Aspect | Firestore in Datastore Mode | Firestore Native Mode | Cloud Storage |
|---|---|---|---|
| Data model | Entities and kinds | Documents and collections | Objects/files |
| Best for | Existing Datastore-compatible apps | Modern apps needing real-time sync | Media, backups, static files |
| Querying | Datastore-style queries | Richer modern document queries | Mainly object/file metadata |
| Transactions | Supported | Supported | Not applicable |
| Real-time updates | Not the primary focus | Supported | Not supported as database updates |

**Additional comparison**
- **Cloud SQL:** Managed relational database for structured data, SQL, joins, and table relationships.
- **Firestore Native mode:** NoSQL document database suited to modern web/mobile and real-time application use.
- **Firestore in Datastore mode:** Scalable NoSQL option compatible with Datastore-oriented applications.
- **Cloud Storage:** Object/file storage, not a conventional database for application records.

### 10. Creating Datastore Entities – Concept
Datastore does not use traditional relational tables. Instead:
- **Kind** is similar to a table.
- **Entity** is similar to a row.
- **Property** is similar to a column/field.

The presentation directs students to PESU portal notes for the practical steps to create a kind/entity in the Google Cloud console.

### Likely Exam Questions
- Define Firestore in Datastore mode.
- Explain the data model of Datastore.
- What is schema-less data storage?
- Explain Datastore integration with App Engine.
- Differentiate Datastore and Google Drive.
- Compare Datastore mode, Firestore Native mode, Cloud SQL, and Cloud Storage.
- List use cases of Datastore.

---

## Section 4 – Apple iCloud and Amazon Web Services (AWS)

### 1. Consumer Cloud Storage vs Enterprise Cloud Computing
Cloud computing delivers storage, computing, and software capabilities through the internet. iCloud and AWS both use cloud infrastructure but serve different goals:
- **iCloud:** Primarily consumer-focused personal storage, backup, and synchronization.
- **AWS:** Broad cloud platform for developers, organizations, and enterprises to build and operate systems.

### 2. Apple iCloud
Apple iCloud is a cloud service primarily for Apple-device users. It stores and synchronizes photos, contacts, calendars, documents, backups, and app data.

When a user updates data on one device signed in to the same Apple Account, iCloud can make those updates available across other devices.

### 3. Key iCloud Features
- **iCloud Drive:** Stores files and folders for access across devices.
- **iCloud Photos:** Keeps photos and videos available across Apple devices.
- **iCloud Backup:** Backs up device settings, apps, and selected data.
- **Find My:** Helps locate Apple devices and supports device security.
- **Synchronization:** Keeps supported contacts, notes, calendars, messages, and other data aligned across devices.

**Working concept:** Devices use the same Apple Account → selected data is stored centrally in iCloud → changes synchronize between devices → backup and recovery features help restore data.

### 4. iCloud Security
- iCloud encrypts data to protect it during storage and transfer.
- Under standard data protection, Apple retains certain encryption-key capabilities to help with account recovery.
- **Advanced Data Protection (optional):** Expands end-to-end encryption to more iCloud categories, including backups and photos.

### 5. Amazon Web Services (AWS)
AWS is a broad cloud computing platform serving individuals, startups, educational institutions, and enterprises.

It provides on-demand services for:
- Compute
- Storage
- Networking
- Databases
- Analytics
- Artificial intelligence
- Security

Customers can provision resources as needed and generally pay based on usage.

### 6. Major AWS Service Categories
| Category | Purpose / Example |
|---|---|
| **Compute – EC2** | Virtual servers for running applications. |
| **Storage – S3** | Object storage for files and data at scale. |
| **Databases** | Managed relational and non-relational database services. |
| **Networking** | Private networks, content delivery, and traffic routing. |
| **AI and Analytics** | Data processing and machine-learning workloads. |

### 7. Important AWS Services
- **IAM (Identity and Access Management):** Controls identities, authentication, and access permissions.
- **EC2 (Elastic Compute Cloud):** Provides virtual servers for compute tasks.
- **Load Balancing:** Distributes incoming traffic across multiple instances.
- **S3 (Object Storage):** Stores files, backups, and static assets.
- **RDS (Relational Database Service):** Managed relational databases.
- **Backup and Security:** Encryption, compliance-related capabilities, and disaster-recovery support.

### 8. Examples
**iCloud:** A student takes a photo on an iPhone and later accesses it on an iPad or Mac through iCloud Photos.

**AWS:** A college portal runs its web application on EC2, stores documents in S3, and uses a managed database.

**Key idea**
- iCloud hides most infrastructure complexity and emphasizes ease of use.
- AWS provides configurable services and choices for developers and administrators.

### 9. iCloud vs AWS
| Feature | Apple iCloud | AWS |
|---|---|---|
| Primary users | Consumers, especially Apple users | Developers, organizations, enterprises |
| Main purpose | Personal storage, backup, synchronization | Building, deploying, and operating IT systems |
| Typical data | Photos, contacts, documents, device backups | Apps, databases, websites, enterprise data |
| Interaction | Simple settings within Apple ecosystem | Console, CLI, APIs, SDKs |
| Example | Sync photos between iPhone and Mac | Host a web application on virtual servers |

### Likely Exam Questions
- Explain Apple iCloud.
- List and explain iCloud features.
- Explain iCloud security.
- Define AWS and list major service categories.
- Explain EC2, S3, IAM, Load Balancing, and RDS.
- Compare iCloud and AWS.
- Compare consumer cloud storage and enterprise cloud computing.

---

## Section 5 – Web Hosting and Cloud Hosting

### 1. Web Hosting
Web hosting is a service that stores a website's files, databases, and content on a server connected to the internet.

**How it works**
1. User enters a website address.
2. Browser sends a request to the hosting server.
3. Server processes the request.
4. Server returns the required web page to the browser.

Traditional hosting commonly uses a physical or virtual server to host a website.

### 2. Web Hosting Workflow
1. **Domain registration:** Register a domain (e.g., `example.com`).
2. **Server space allocation:** Hosting provider allocates server space.
3. **File upload:** Upload HTML, CSS, images, code, etc.
4. **DNS resolution:** DNS maps the domain name to the server IP address.
5. **Content delivery:** Server responds to browser requests by sending website files.

### 3. Types of Web Hosting – Core
| Type | Definition | Best use |
|---|---|---|
| **Shared Hosting** | Multiple websites share one physical server. | Beginners, blogs, small websites. |
| **VPS Hosting** | Server is divided into virtual partitions with dedicated resources. | Medium businesses and growing sites. |
| **Dedicated Hosting** | One server is dedicated to one client. | Large enterprises and high-traffic sites. |
| **Cloud Hosting** | Uses a cluster of virtual servers and supports elastic scaling. | E-commerce, dynamic apps, enterprise workloads. |

### 4. Other Web Hosting Types
- **Managed WordPress Hosting:** Optimized for WordPress with features such as updates and security management.
- **Reseller Hosting:** A customer purchases hosting and resells hosting services to others.
- **Colocation Hosting:** Client owns/provides hardware; it is housed in a provider's data center.
- **E-commerce Hosting:** Hosting tailored for online stores, often with SSL and payment integration.
- **Agency Hosting:** Designed for web professionals managing multiple client websites.
- **Free Hosting:** No-cost hosting with limited features/resources.

### 5. Web Hosting Advantages and Disadvantages
| Feature | Advantages | Disadvantages |
|---|---|---|
| Cost | Affordable, especially shared plans. | Limited resources may slow high-traffic websites. |
| Simplicity | Easy for beginners to set up and manage. | Less flexibility and scaling control. |
| Support | Provider may offer technical support and maintenance. | Support quality varies; server control is limited. |
| Accessibility | Websites can be accessed globally through domain names. | Downtime can occur if a server fails. |
| Variety | Shared, VPS, and dedicated options exist. | Upgrades may require plan changes or migration. |
| Performance | Often sufficient for small/medium sites. | Performance depends on server load. |
| Security | Providers may include SSL and backups. | Shared environments can introduce security risks. |

### 6. Cloud Hosting
Cloud hosting uses multiple virtual servers in a cloud environment to store and deliver data. Resources are pooled and allocated dynamically; performance is not tied to a single physical server.

- If one server becomes unavailable, resources can be shifted to others.
- Helps improve availability, resilience, and scalability.
- Examples of providers include AWS, Microsoft Azure, and Google Cloud.

### 7. How Cloud Hosting Works
- A **load balancer** distributes incoming requests among multiple servers.
- Additional compute instances can be added during high demand.
- Data can be replicated and backed up across cloud resources.
- If one server fails, another can continue serving requests.

### 8. Types of Cloud Hosting
- **Public Cloud:** Resources are provided by a third-party cloud provider and commonly shared across customers.
- **Private Cloud:** Infrastructure dedicated to one organization.
- **Hybrid Cloud:** Combines public and private cloud environments.
- **Community Cloud:** Infrastructure shared by organizations with similar requirements or objectives.

### 9. Cloud Hosting Advantages and Disadvantages
| Feature | Advantages | Disadvantages |
|---|---|---|
| Scalability | Scale resources up/down on demand. | Complex scaling may require expertise. |
| Reliability | Redundant servers and failover can improve uptime. | Dependent on provider and internet connectivity. |
| Performance | Load balancing optimizes speed and resource usage. | Performance may vary on shared public resources. |
| Cost efficiency | Pay-as-you-go can reduce upfront cost and waste. | Long-term costs can rise with heavy usage. |
| Flexibility | Supports varied workloads and global access. | Requires configuration and management skills. |
| Security | Encryption, compliance, and monitoring tools. | Shared infrastructure may raise privacy concerns. |
| Maintenance | Provider handles hardware, updates, and patches. | Less control over physical infrastructure. |
| Accessibility | Access from anywhere with internet. | Provider outages may cause downtime. |

### 10. Web Hosting vs Cloud Hosting Methodology
**Traditional web hosting**
`Single Server → Website Files Stored on Server → Server Responds to Browser`

- Fixed CPU, RAM, and bandwidth limits.
- Domain points to server IP.
- Server delivers files directly.
- Single server can become a single point of failure.

**Cloud hosting**
`Cluster of Servers → Pooled Resources → Load Balancer → Application/Storage`

- CPU, RAM, and storage are pooled and allocated as needed.
- User request enters the cloud system.
- Load balancer distributes traffic.
- Data may be stored in distributed services such as object storage or managed databases.
- Failover can help maintain service if one server fails.
- Supports elastic scaling, reliability, and usage-based billing.

### 11. Web Hosting vs Cloud Hosting
| Feature | Web Hosting | Cloud Hosting |
|---|---|---|
| Infrastructure | Usually a single physical/virtual server | Cluster of virtual servers |
| Scalability | Limited | Elastic and on-demand |
| Reliability | May have single point of failure | Failover/redundancy can improve reliability |
| Performance | Depends on server load | Load-balanced |
| Cost model | Often fixed monthly plan | Often pay-as-you-go |
| Use cases | Blogs, small websites | E-commerce, enterprise apps, variable traffic |

### Likely Exam Questions
- Define web hosting and explain its working.
- Explain the steps involved in web hosting.
- List and explain core types of web hosting.
- Explain other web hosting types.
- Discuss advantages and disadvantages of web hosting.
- Define cloud hosting and explain its working.
- Explain types of cloud hosting.
- Compare web hosting and cloud hosting.
- Compare web hosting and cloud hosting methodology.

---

## Section 6 – App/Web Configuration and Deployment

### 1. Configuration and Deployment Overview
A website must be configured and deployed so that users can access it through the internet.

**Traditional hosting**
- Requires direct configuration of servers, files, databases, DNS, and SSL.
- Administrators manage server components.

**Google App Engine**
- Managed web-hosting platform.
- Google manages much of the underlying infrastructure.
- Application configuration is primarily described through `app.yaml`.

Both approaches still require application, domain, security, and deployment settings.

### 2. Traditional Web Hosting Configuration
In traditional hosting, an administrator directly configures the server.

Main settings:
- Domain name and DNS records.
- Server IP address and firewall.
- Apache or Nginx virtual host.
- Document root (e.g., `/var/www/example`).
- Website files uploaded using SFTP.
- Database and database user.
- SSL certificate and HTTPS.
- Backups, logs, and monitoring.

### 3. Google App Engine Configuration
App Engine provides managed hosting for web applications.

**`app.yaml`** is the deployment descriptor. It defines settings such as:
- Runtime
- Handlers
- Scaling
- Environment variables
- Other service/deployment settings

**Important difference:** On App Engine, the developer normally does not install or manually maintain Apache, Nginx, or the operating system.

### 4. Meaning of Common `app.yaml` Settings
| Setting | Meaning |
|---|---|
| `runtime` | Specifies the programming environment/runtime. |
| `service` | Identifies the App Engine service. |
| `entrypoint` | Defines how the application starts. |
| `automatic_scaling` | Controls scaling behavior and the number of instances. |
| `env_variables` | Stores application configuration values. |

### 5. Traditional Deployment Commands
**SFTP**
- SFTP = Secure File Transfer Protocol.
- Securely uploads files from local computer to server.
- Example files: HTML, CSS, JavaScript, images.

```bash
sftp website-files/
```
*(The slide shows this as a deployment command/example; in actual SFTP use, connect to the server and transfer the files using the appropriate client syntax.)*

**SSH**
- SSH = Secure Shell.
- Securely connects to and manages a remote server.
- After connecting, an administrator can run remote commands.

```bash
ssh server
```

**Reload Apache**
```bash
sudo systemctl reload apache2
```
- `sudo`: Executes with administrative privileges.
- `systemctl reload`: Reloads service configuration.
- `apache2`: Apache web server service.

**Simple deployment flow**
`Upload files (SFTP) → Connect to server (SSH) → Reload web server (Apache2)`

### 6. App Engine Deployment Commands
**Authenticate**
```bash
gcloud auth login
```
Logs into the Google Cloud account and authenticates before deployment.

**Set project**
```bash
gcloud config set project PROJECT_ID
```
Selects the Google Cloud project where the application is deployed. Replace `PROJECT_ID` with the actual project ID.

**Deploy**
```bash
gcloud app deploy app.yaml
```
Deploys the application to App Engine using the configuration in `app.yaml`.

**Open application**
```bash
gcloud app browse
```
Opens the deployed application in a browser.

**Typical workflow**
1. Authenticate using `gcloud auth login`.
2. Select project using `gcloud config set project PROJECT_ID`.
3. Configure the application in `app.yaml`.
4. Deploy using `gcloud app deploy app.yaml`.
5. Browse using `gcloud app browse`.

### 7. Traditional Hosting vs App Engine
| Configuration Area | Traditional Web Hosting | Google App Engine |
|---|---|---|
| Server management | Administrator manages server. | Google manages infrastructure. |
| Deployment | FTP/SFTP and server commands. | `gcloud app deploy`. |
| Main configuration | Apache/Nginx configuration and hosting panel. | `app.yaml`. |
| Scaling | Often manual or plan-based. | Configurable automatic scaling. |
| Database | Installed/selected separately. | Often connected to managed cloud services. |
| HTTPS | Certificate configured manually or through hosting panel. | Configured through Google Cloud/App Engine facilities. |
| Best suited for | Simple websites and learning server administration. | Managed, scalable web applications. |

### 8. Summary of Configuration Concepts
- Traditional hosting teaches direct server configuration.
- App Engine teaches managed cloud application deployment.
- `app.yaml` replaces much of the manual server configuration.
- App Engine does not eliminate configuration; it shifts configuration toward runtime, services, scaling, routing, and deployment.
- Traditional hosting is useful for understanding server administration.
- App Engine is useful for understanding managed cloud hosting.

### Likely Exam Questions
- Compare App Engine and traditional web hosting.
- What is `app.yaml`?
- What is the purpose of the `runtime` field?
- What are environment variables?
- What does automatic scaling do?
- Explain the traditional deployment flow using SFTP, SSH, and Apache reload.
- Explain the App Engine deployment commands.

---

## Section 7 – EL (Experiential Learning): Create and Publish a Website Using Cloud Shell and Cloudflare Pages

> **Practical focus:** Create a simple static HTML website in Google Cloud Shell, preview it, and publish it through Cloudflare Pages. The lab is presented as beginner-friendly and intended to avoid paid resources; if signup or deployment asks for payment details, stop and review the requirements.

### 1. Goal and Requirements
**Goal:** Create a simple website in Google Cloud Shell and publish it using Cloudflare Pages so it can be accessed through a public web address.

**Requirements**
- Google account to access Cloud Shell.
- Cloudflare account; use the Free plan and avoid paid add-ons/domain purchase for this lab.
- Internet connection and web browser.

**Billing note**
- Cloud Shell is a temporary development environment, not the permanent public website host.
- Plan features and signup requirements may change. Review payment requests before continuing.

### 2. Open Google Cloud Shell
1. Open Google Cloud Console.
2. Sign in with your Google account.
3. Activate the Cloud Shell terminal icon.
4. Wait for the browser-based terminal to load.

### 3. Create a Website Folder
Run:
```bash
mkdir -p ~/my-website
cd ~/my-website
```
- `mkdir` creates a directory.
- `-p` creates parent directories if needed and avoids errors if the directory already exists.
- `cd` moves into the directory.

### 4. Create the HTML File
Run:
```bash
nano index.html
```
Create the following page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 60px auto;
      padding: 0 20px;
      line-height: 1.6;
      color: #243447;
    }
    h1 { color: #1769aa; }
    button {
      padding: 10px 16px;
      border: 0;
      border-radius: 6px;
      background: #1769aa;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Welcome to My First Website!</h1>
  <p>This website was created in Google Cloud Shell and published with Cloudflare Pages.</p>
  <button onclick="alert('Hello! Your website works.')">Click Me</button>
</body>
</html>
```

**Save using Nano**
1. Press `Ctrl + O` (write/save).
2. Press `Enter` to confirm filename.
3. Press `Ctrl + X` to exit.

Check the file:
```bash
ls
```
You should see `index.html`.

### 5. Start a Local Web Server
Run:
```bash
python3 -m http.server 8080
```
Expected message indicates that the server is serving on port 8080.

This starts a basic web server on **port 8080**. Keep the terminal running while previewing the site.

### 6. Preview the Website
1. In the Cloud Shell toolbar, click **Web Preview**.
2. Choose **Preview on port 8080**.
3. The website should open in a browser tab.
4. Verify the heading, paragraph, and button.
5. Click **Click Me** to test the JavaScript alert.

### 7. Test and Modify
Try these exercises:
- Change the heading in `index.html`.
- Add another paragraph.
- Save the file.
- Refresh the preview tab and check the changes.

Stop the local web server with:
```text
Ctrl + C
```
in the terminal.

**What was learned**
- Creating an HTML website.
- Using a Linux terminal in Cloud Shell.
- Starting a web server on port 8080.
- Previewing a website in a browser.

**Important:** This is a temporary local preview; it does not yet make a permanent public website.

### 8. Cloudflare Pages – Publishing Preparation
**Wrangler** is Cloudflare's command-line tool.

Check its version:
```bash
npx wrangler --version
```
If it prompts to install Wrangler, install only if you are comfortable doing so. The dashboard upload method is an alternative.

### 9. Sign in to Cloudflare Using Wrangler
Try device authorization:
```bash
npx wrangler login --device --browser=false
```
If the installed Wrangler version does not recognize `--device`:
1. Run `npx wrangler login --help`.
2. Follow the supported login method.
3. If a verification URL and code appear, open the URL in your browser.
4. Sign in to Cloudflare.
5. Enter the code and approve access.
6. Return to Cloud Shell.

Check login:
```bash
npx wrangler whoami
```
Proceed only if the command confirms that you are logged in to the correct Cloudflare account.

### 10. Deploy Using Wrangler (Command-Line Method)
1. Confirm website files exist:
```bash
cd ~/my-website
ls -la
```
Ensure `index.html` is present at the root of the folder being deployed.

2. Deploy:
```bash
npx wrangler pages deploy . --project-name=my-first-website
```
3. Wait for the deployment to finish.
4. Read the command output carefully.
5. Open the exact deployment URL printed by Wrangler.

**Important:** Do not assume the URL is always `https://my-first-website.pages.dev`. Use the URL actually returned by the successful deployment.

### 11. Troubleshooting – Page Not Found / 404
If the website shows a 404:

1. **Check login**
```bash
npx wrangler whoami
```
Confirm that the Cloud Shell session is authenticated.

2. **Check files**
```bash
cd ~/my-website
ls -la
```
Confirm that `index.html` is in the website directory.

3. **Deploy the correct folder**
```bash
cd ~/my-website
npx wrangler pages deploy . --project-name=my-first-website
```

4. **Read terminal output**
- If the project does not exist, create it in Cloudflare dashboard or use dashboard upload.
- If authentication/permission errors appear, resolve them before redeploying.

5. **Use the exact deployment URL**
Open the URL printed after successful deployment.

6. **Check the Cloudflare dashboard**
Open Cloudflare Dashboard → **Workers & Pages** → select your Pages project → check deployment status.
If no project appears, it may not have been created in the account currently signed in.

7. **Check deployment contents**
Ensure the successful deployment includes `index.html` at the root, not inside an extra nested folder.

### 12. Alternative – Dashboard Direct Upload
Use this if Wrangler login or CLI deployment is problematic.

1. Confirm file exists:
```bash
ls -la ~/my-website
```
2. Download `index.html` to your computer using Cloud Shell's file explorer or Download option.
3. Open Cloudflare Dashboard.
4. Go to **Workers & Pages**.
5. Create an application/project and choose the Pages direct-upload or drag-and-drop option, if available.
6. Create a project name such as `my-first-website`.
7. Upload `index.html`, ensuring it is at the root of the uploaded files.
8. Deploy.
9. Wait for Cloudflare to display the published URL.
10. Open the exact URL displayed.

If Cloudflare requests payment details or a credit card, stop and review the current plan requirements. A custom domain is not required for the default `pages.dev` address in this lab.

### 13. Quick Lab Checklist
- [ ] File is named `index.html`.
- [ ] `index.html` is inside `~/my-website`.
- [ ] Local preview runs on port 8080.
- [ ] Website appears in Web Preview.
- [ ] Button works.
- [ ] `npx wrangler whoami` confirms the expected Cloudflare account (for CLI deployment).
- [ ] Deployment command completes successfully.
- [ ] Exact URL printed by deployment is opened.
- [ ] Cloudflare dashboard shows the Pages project and deployment.

### EL – Viva / Practical Questions
1. What is Google Cloud Shell?
2. What is the purpose of `mkdir -p`?
3. What does `cd` do?
4. Why is the website file named `index.html`?
5. What is Nano? How do you save and exit?
6. What does `python3 -m http.server 8080` do?
7. What is a port? Which port is used in this practical?
8. What is Web Preview in Cloud Shell?
9. What is Cloudflare Pages?
10. What is Wrangler?
11. Why do we run `npx wrangler whoami`?
12. What does `npx wrangler pages deploy . --project-name=my-first-website` do?
13. Why must `index.html` be in the deployment root?
14. What causes a 404 in this lab?
15. How can you deploy without using Wrangler?
16. What is the difference between local preview and a public deployment?

---
