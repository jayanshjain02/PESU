# Unit 3 Questions

## Section 1 – Cloud Applications & Google App Engine

### Q1. (Easy)
Which cloud service model primarily provides a ready-to-use software application to users over the internet?

A. IaaS  
B. SaaS  
C. PaaS  
D. Cloud-native orchestration  

### Q2. (Very Tough)
A team wants to deploy a web application while avoiding direct management of physical servers and most underlying infrastructure. It also wants application services, version management, monitoring, and automatic scaling. Which option best matches this requirement?

A. Google Compute Engine, because users control virtual machines and infrastructure configuration  
B. Google App Engine, because it provides a managed application platform  
C. Shared web hosting, because it always provides independent application versions and automatic scaling  
D. Google Drive, because it hosts application business logic and REST APIs  

### Q3. (Very Tough)
Which sequence correctly represents the App Engine application hierarchy described in the notes?

A. Project → Versions → App → Instances → Services  
B. App → Project → Instances → Services → Versions  
C. Project → App Engine App → Services → Versions → Instances  
D. Project → Services → App Engine App → Instances → Versions  

### Q4. (Very Tough)
Which statement correctly combines App Engine environments, cloud application use cases, and the GCE–GAE distinction?

A. Standard runs applications in Compute Engine containers exclusively; Flexible uses only a sandbox, and both are IaaS.  
B. Standard is a managed sandbox using supported runtimes; Flexible uses containers on Compute Engine VMs; GCE offers more infrastructure control while GAE abstracts more infrastructure.  
C. Flexible cannot use containers; GCE is PaaS while GAE is IaaS.  
D. App Engine is only for static websites and cannot host APIs, mobile back ends, portals, or microservices.

---

## Section 2 – Google Apps & Google Apps Script

### Q5. (Easy)
Which language is primarily used to write Google Apps Script?

A. Java  
B. Python  
C. JavaScript  
D. C#

### Q6. (Very Tough)
A workflow must create a Calendar event from a form response, send a confirmation email, and log the email attachment in Drive/Sheets. Which statement best describes an appropriate Apps Script solution?

A. Apps Script must run on a user-managed VM; use SSH to connect Gmail and Calendar.  
B. Chain Google service APIs such as CalendarApp, GmailApp, DriveApp, and spreadsheet services; authorize required OAuth scopes, and let the script run in Google's cloud.  
C. Use `UrlFetchApp` only; it cannot interact with native Google Workspace services.  
D. Use Google Docs as a relational database because Apps Script cannot read Sheets or Forms.

### Q7. (Very Tough)
Which pairing is **incorrectly** matched?

A. `GmailApp` — sending or managing Gmail operations  
B. `DocumentApp` — creating or modifying Google Docs  
C. `CalendarApp` — creating calendar events  
D. `UrlFetchApp` — directly managing Drive folders without using Drive services

### Q8. (Very Tough)
A developer wants to create a document from spreadsheet data, add a custom menu to Sheets, call an external REST API, and publish a script as a web app. Which option is the most accurate?

A. These are not possible because Apps Script only supports email automation.  
B. These are possible uses of Apps Script: document automation, UI extensions, external API calls, and HTML Service-based web apps; execution may require authorization.  
C. Only custom menus and sidebars are possible; external APIs and web apps require a physical server.  
D. Apps Script is a local JavaScript interpreter and does not execute in Google's cloud.

---

## Section 3 – Datastore & Database Services

### Q9. (Easy)
In Datastore's entity-based data model, what is the closest analogy to a relational database table?

A. Property  
B. Entity  
C. Kind  
D. Index  

### Q10. (Very Tough)
A student portal stores user records where entities of the same kind may have different properties. The system needs a managed, scalable NoSQL database and Datastore-style compatibility. Which statement is correct?

A. Datastore requires every entity in a kind to have exactly the same schema and uses relational joins as its primary model.  
B. Firestore in Datastore mode uses an entity/kind/property model and supports a schema-less design, making it suitable for Datastore-compatible workloads.  
C. Cloud Storage should be used because object files are equivalent to transactional database entities.  
D. Firestore Native mode is the same as Datastore mode in data model and primary use, with no distinction.

### Q11. (Very Tough)
Which description correctly matches components in the student portal example?

A. App Engine stores PDFs and profile images; Cloud Storage executes business logic; Datastore serves as the web server.  
B. App Engine runs the application/API and business logic; Datastore stores records such as profiles and registrations; Cloud Storage stores files such as PDFs and images; Cloud SQL may hold relational records such as marks or fees.  
C. Cloud SQL is used only for images and PDFs; Cloud Storage stores entity properties and performs ACID transactions.  
D. Datastore replaces the need for an application runtime, and App Engine is used only for backups.

### Q12. (Very Tough)
Which option gives the **best** distinction among Datastore, Firestore Native mode, Cloud SQL, and Cloud Storage, while also reflecting the notes' transaction/query concepts?

A. Datastore is object storage; Native mode is a relational SQL database; Cloud SQL stores files; Cloud Storage provides entity-group transactions.  
B. Datastore mode provides an entity/kind-oriented NoSQL model; Native mode uses document/collection concepts and supports real-time app patterns; Cloud SQL is relational/SQL-oriented; Cloud Storage stores objects/files. Datastore uses indexes for query performance and supports ACID transactions within entity groups as described.  
C. All four are interchangeable storage services and differ only in pricing.  
D. Cloud Storage is the preferred relational database for joins; Datastore is intended for file sharing; Native mode cannot store documents.

---

## Section 4 – Apple iCloud & Amazon Web Services (AWS)

### Q13. (Easy)
What is iCloud primarily designed to provide to Apple-device users?

A. Virtual servers for hosting enterprise applications  
B. Personal cloud storage, backup, and synchronization  
C. Relational database administration  
D. Container orchestration

### Q14. (Very Tough)
A user wants photos and documents available across Apple devices, a device backup for restoration, and the option to strengthen protection with Advanced Data Protection. Which statement is accurate?

A. iCloud Drive is used only for device backups, while iCloud Backup stores shared files.  
B. iCloud Photos synchronizes supported photos/videos; iCloud Drive stores files; iCloud Backup helps restore device data; Advanced Data Protection extends end-to-end encryption to more iCloud data categories.  
C. Find My is AWS's load-balancing service, and Advanced Data Protection is mandatory for all accounts.  
D. iCloud cannot synchronize data across devices signed in to the same Apple Account.

### Q15. (Very Tough)
Which AWS service/function pairing is **correctly** matched?

A. IAM – object storage for static files  
B. EC2 – virtual servers; S3 – object storage; RDS – managed relational databases; IAM – identities and permissions  
C. S3 – relational database with SQL joins; EC2 – calendar synchronization  
D. Load Balancing – stores backups; RDS – authenticates user identities and permissions

### Q16. (Very Tough)
Which comparison best captures the difference between iCloud and AWS in the presentation?

A. Both are identical infrastructure platforms; the only difference is branding.  
B. iCloud focuses on consumer personal data storage, backup, and synchronization with a simple Apple-ecosystem experience; AWS provides configurable on-demand cloud services for building and operating applications and systems.  
C. AWS is only for photo synchronization, while iCloud is used to provision virtual servers and databases.  
D. iCloud is primarily a development platform for microservices; AWS is primarily a device backup service.

---

## Section 5 – Web Hosting & Cloud Hosting

### Q17. (Easy)
In traditional web hosting, what does DNS primarily do during website access?

A. Encrypts all website files  
B. Maps a domain name to an IP address so the browser can locate the server  
C. Automatically writes the website's HTML  
D. Replaces the hosting server with a database

### Q18. (Very Tough)
A small blog is hosted on a server shared with many other websites. The plan is inexpensive but performance may be affected by other sites using the same resources. Which hosting type and limitation are described?

A. Dedicated hosting; no resources are shared  
B. Shared hosting; shared server resources can limit performance  
C. VPS hosting; the customer owns the physical server  
D. Cloud hosting; it must use a single fixed physical server

### Q19. (Very Tough)
Which option correctly distinguishes hosting types and cloud deployment models?

A. VPS divides a server into virtual environments; dedicated hosting reserves a server for one client; public cloud uses provider resources, private cloud is dedicated to one organization, hybrid combines public and private, and community cloud is shared by organizations with common needs.  
B. Shared hosting gives every website its own physical server; VPS is always free hosting; hybrid cloud is a single public server.  
C. Colocation means the provider owns and operates all customer hardware; reseller hosting means reselling domain names only.  
D. Private cloud is shared by the public; community cloud is exclusive to a single individual; dedicated hosting is a container on a shared server.

### Q20. (Very Tough)
An e-commerce site experiences unpredictable traffic. It needs pooled compute resources, traffic distribution, redundancy/failover, and scaling without being restricted to one server. Which reasoning is most appropriate?

A. Traditional hosting is inherently distributed across a cluster and always provides automatic failover.  
B. Cloud hosting is suitable because resources can be pooled and scaled, a load balancer can distribute traffic, and redundancy/failover can improve availability; usage-based costs may nevertheless increase.  
C. Dedicated hosting must be selected because cloud hosting cannot support e-commerce workloads.  
D. Shared hosting is best because performance and resource allocation are guaranteed to be unaffected by other customers.

---

## Section 6 – App/Web Configuration & Deployment

### Q21. (Easy)
Which file is the main deployment configuration descriptor identified for Google App Engine?

A. `index.html`  
B. `package-lock.json`  
C. `app.yaml`  
D. `server.conf`

### Q22. (Very Tough)
A developer is deploying an App Engine app. They need to authenticate, select the correct project, deploy the configuration, and open the deployed site. Which command sequence is correct?

A. `gcloud app browse` → `gcloud config set project PROJECT_ID` → `gcloud auth login` → `gcloud app deploy app.yaml`  
B. `gcloud auth login` → `gcloud config set project PROJECT_ID` → `gcloud app deploy app.yaml` → `gcloud app browse`  
C. `ssh PROJECT_ID` → `sudo systemctl reload apache2` → `gcloud app deploy` → `gcloud auth login`  
D. `gcloud auth login` → `nano index.html` → `gcloud app browse` → `gcloud config unset project`

### Q23. (Very Tough)
Which configuration mapping is correct for `app.yaml`?

A. `runtime` specifies the programming language/runtime; `service` identifies a service; `entrypoint` specifies how the app starts; `automatic_scaling` configures scaling; `env_variables` supplies configuration values.  
B. `runtime` specifies the DNS address; `service` contains the database password; `entrypoint` creates a Cloud SQL table; `automatic_scaling` disables instances permanently.  
C. `runtime` is a user password; `service` defines HTML content; `entrypoint` sets the domain's DNS; `env_variables` controls physical server temperature.  
D. `app.yaml` is only an HTML stylesheet and cannot configure scaling or runtime.

### Q24. (Very Tough)
An administrator uploads website files securely, remotely manages the server, and reloads Apache after changing its configuration. Which sequence and command interpretation is correct?

A. SFTP → SSH → `sudo systemctl reload apache2`; SFTP securely transfers files, SSH remotely accesses/manages the server, and the reload command reloads Apache configuration.  
B. SSH → SFTP → `sudo systemctl reload apache2`; SSH uploads files, SFTP restarts Apache, and systemctl changes DNS.  
C. SFTP → `gcloud app browse` → `sudo systemctl reload apache2`; all three commands upload files.  
D. `sudo systemctl reload apache2` → SFTP → SSH; Apache reload creates a secure remote session and SFTP selects a project.

---

## Section 7 – EL (Experiential Learning): Cloud Shell & Cloudflare Pages

### Q25. (Easy)
Which command starts the local Python web server for the lab on port 8080?

A. `python3 -m http.server 8080`  
B. `npx wrangler pages deploy 8080`  
C. `gcloud app deploy 8080`  
D. `sudo systemctl reload python8080`

### Q26. (Very Tough)
A student created `~/my-website`, saved `index.html`, and started the server with `python3 -m http.server 8080`. Which next step correctly previews the local site before public deployment?

A. Open Cloudflare DNS and point the domain to port 8080; the Python server is already public.  
B. Use Cloud Shell's Web Preview and select preview on port 8080; keep the server running and test the page and button.  
C. Run `npx wrangler whoami`; this automatically opens the local server preview.  
D. Stop the server with Ctrl+C before opening Web Preview because the preview works without a running process.

### Q27. (Very Tough)
Which sequence best represents a Wrangler-based deployment, including verification and the role of the project name?

A. Deploy first → skip account verification → assume the URL → place `index.html` in any nested directory.  
B. Check Wrangler version → authenticate (`npx wrangler login`, using the supported login flow) → verify account with `npx wrangler whoami` → deploy the site directory using `npx wrangler pages deploy . --project-name=my-first-website` → open the exact URL printed by the deployment.  
C. Run `python3 -m http.server 8080` → `npx wrangler whoami` → use that output as the public website URL; no deploy command is required.  
D. Use `gcloud app deploy app.yaml` to publish to Cloudflare Pages; Wrangler is only an HTML editor.

### Q28. (Very Tough)
After deployment, the Pages URL displays a 404. Which troubleshooting approach most closely follows the lab?

A. Assume Cloudflare is down and delete the project immediately.  
B. Check Wrangler authentication/account, confirm `index.html` exists in the intended directory and at the deployment root, redeploy the correct directory, inspect the deployment output for the exact URL, and check the Pages project/deployment in the dashboard; if CLI is blocked, use direct upload as an alternative.  
C. Change the local preview port from 8080 to 443 and do not redeploy.  
D. Upload only the CSS file and use the Cloudflare dashboard URL from memory.
