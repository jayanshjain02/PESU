# Answer Key

## Section 1 - Cloud Applications & Google App Engine

| Question | Answer | Explanation |
|---|---|---|
| 1 | **A** | Requests can reach different instances. Shared persistent state lets any instance recover the cart; adding capacity alone does not preserve it. |
| 2 | **C** | Services separate application components; versions distinguish releases within each service. Instances are running copies, not release containers. |
| 3 | **B** | A kernel module needs control of the host operating system. The team must change that dependency or choose infrastructure that gives it the required control. |
| 4 | **D** | More application capacity cannot remove a shared database bottleneck. Increased database waits are evidence to investigate storage access and capacity. |

## Section 2 - Google Apps & Google Apps Script

| Question | Answer | Explanation |
|---|---|---|
| 5 | **A** | A stable identifier and recorded progress allow retries to resume incomplete steps instead of repeating successful side effects. |
| 6 | **D** | Authorization and resource permissions apply to the executing account. Working code does not give a different user access to a private folder. |
| 7 | **B** | Use spreadsheet services for sheet data and HTTP fetching for the external API. The report logic combines the results. |
| 8 | **C** | Publishing should depend on successful data retrieval and document generation. Changing order or filenames does not validate the report. |

## Section 3 - Datastore & Database Services

| Question | Answer | Explanation |
|---|---|---|
| 9 | **D** | A transactional read-and-update prevents competing registrations from independently consuming the same available seat. |
| 10 | **B** | Object storage fits document bytes; a database fits structured records and queries. Local instance storage is not a shared durable document repository. |
| 11 | **A** | Schema flexibility does not define application rules. The application must decide how optional properties are validated, defaulted, and displayed. |
| 12 | **C** | A relational workload with frequent joins is a direct reason to choose a SQL database. Hosting location and optional fields do not establish that need. |

## Section 4 - Apple iCloud & Amazon Web Services (AWS)

| Question | Answer | Explanation |
|---|---|---|
| 13 | **A** | Synchronization propagates changes, potentially including deletions. It should not be assumed to provide a separate recovery copy unaffected by those changes. |
| 14 | **C** | Permissions should match the resource and operations required. Broad administration adds unnecessary access unrelated to reading the bucket. |
| 15 | **B** | Personal backup and synchronization do not provide application compute and database infrastructure. These are different service requirements. |
| 16 | **D** | Limiting credential scope reduces the resources accessible through a compromised server. Naming and database size do not impose authorization boundaries. |

## Section 5 - Web Hosting & Cloud Hosting

| Question | Answer | Explanation |
|---|---|---|
| 17 | **D** | Successful direct-IP access isolates the problem toward name resolution or cached mappings rather than application capacity or content encoding. |
| 18 | **B** | Cloud placement alone does not configure elasticity. Scaling, traffic distribution, and the ability of application dependencies to scale must be designed. |
| 19 | **C** | Virtual isolation does not imply exclusive physical hardware. Dedicated hosting is the separate concept of reserving a physical server. |
| 20 | **A** | Requests may reach either server, so local session files produce inconsistent state. Shared session storage makes the login available across instances. |

## Section 6 - App/Web Configuration & Deployment

| Question | Answer | Explanation |
|---|---|---|
| 21 | **B** | Valid credentials may still target the wrong project. Checking the active account and project establishes the intended deployment destination. |
| 22 | **D** | Uploading code and successfully starting a process are different steps. The entrypoint must launch the application as the new release expects. |
| 23 | **A** | Environment configuration separates deployment-specific values from shared application logic. Secret handling would require additional controls. |
| 24 | **C** | File transfer changes the file on disk, not necessarily the active server configuration. Validate the configuration before asking Apache to reload it. |

## Section 7 - EL: Cloud Shell & Cloudflare Pages

| Question | Answer | Explanation |
|---|---|---|
| 25 | **C** | The server serves its document root, normally the directory where it starts. Run it from the site folder or explicitly select that directory. |
| 26 | **A** | For the intended root page, index.html must be at the root of the uploaded output. Deploying its parent preserves an unwanted public subdirectory. |
| 27 | **D** | Preview depends on the local server process. A hosted deployment uploads the site to a hosting service and has a separate serving lifecycle. |
| 28 | **B** | The successful returned URL is evidence of a working deployment. Investigate which project or alias the guessed address refers to rather than changing working site files. |
