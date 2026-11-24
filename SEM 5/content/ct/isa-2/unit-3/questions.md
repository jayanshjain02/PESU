# Unit 3 Questions

## Section 1 - Cloud Applications & Google App Engine

### Q1. (Challenging)
A booking site keeps carts only in instance memory. After adding automatic scaling, some users lose their carts between requests. Which change addresses the underlying problem?

A. Move cart state into a shared data store.
B. Raise the maximum instance count substantially.
C. Deploy each cart as a separate application version.
D. Place every request behind a new DNS record.

### Q2. (Challenging)
A team needs independently deployable billing and search components. Each component must retain old releases for rollback within one App Engine application. Which layout fits?

A. Create one version per component and overwrite it per release.
B. Create one instance per component and reuse its filesystem.
C. Create one service per component with versions per release.
D. Create one project per release with instances per component.

### Q3. (Challenging)
An application requires installation of a custom kernel module. The team also wants to avoid infrastructure administration. Which assessment best exposes the conflict?

A. A new App Engine version can supply any missing kernel feature.
B. The module requires host control beyond a managed runtime.
C. Storing the module in Datastore grants it execution privileges.
D. Adding more managed instances removes the kernel dependency.

### Q4. (Challenging)
A service doubles its application instances, but throughput barely changes and database wait time rises. What should the team investigate first?

A. Whether the release should become a separate cloud project.
B. Whether the application should switch from PaaS to SaaS.
C. Whether a second domain would distribute database writes.
D. Whether the shared database is now the limiting resource.

## Section 2 - Google Apps & Google Apps Script

### Q5. (Challenging)
A script creates a Calendar event and then emails the attendee. Email delivery fails; rerunning the script creates a duplicate event. Which design best supports safe retries?

A. Record completed work against a stable submission ID.
B. Create a new submission ID on every execution attempt.
C. Send the message first and always recreate the event.
D. Catch every error and mark the submission complete.

### Q6. (Challenging)
A spreadsheet automation works for its author, but a colleague cannot access a destination Drive folder when running it under their own account. What is the strongest initial explanation?

A. The folder must be converted into a spreadsheet first.
B. The script must use DocumentApp instead of DriveApp.
C. The colleague must copy the code into a new project.
D. The executing account lacks the required folder access.

### Q7. (Challenging)
A monthly report combines spreadsheet records with live exchange-rate data returned by an external HTTPS API. Which division of work is appropriate?

A. DriveApp retrieves rates; CalendarApp combines the rows.
B. Spreadsheet services read rows; UrlFetchApp retrieves rates.
C. DocumentApp retrieves rates; GmailApp performs the joins.
D. CalendarApp reads rows; DriveApp calculates the rates.

### Q8. (Challenging)
A process generates a document and emails its link. Users receive emails, but some generated documents are empty after a data-fetch failure. What is the best correction?

A. Email the link before creating the destination document.
B. Give the document a new filename on every failed run.
C. Validate the input before publishing and notifying users.
D. Switch the destination from Drive to another folder.

## Section 3 - Datastore & Database Services

### Q9. (Challenging)
Two requests read the last available seat and both register a student before writing the new seat count. Which change prevents overselling?

A. Add another application instance for registration requests.
B. Store the seat count inside each application instance.
C. Update the count after sending both confirmation emails.
D. Check and update availability in one transaction.

### Q10. (Challenging)
A portal stores uploaded PDFs and must filter registration records by semester and status. Which allocation best fits the access patterns?

A. Keep PDFs and registration records together as database text.
B. Keep PDFs in object storage and registrations in a database.
C. Keep PDFs on instance disks and registrations in DNS records.
D. Keep registrations in object filenames and PDFs in memory.

### Q11. (Challenging)
Some applicant entities have a scholarship property while others do not. The UI must show a consistent form for both. Which conclusion follows?

A. The application still needs validation and missing-value rules.
B. Every missing property must become a separate database kind.
C. The database must be replaced before optional fields are used.
D. Each entity must gain identical properties before any lookup.

### Q12. (Challenging)
An admission system requires frequent relational joins across fees, departments, and registrations. Which requirement most strongly supports choosing Cloud SQL over an entity-oriented store?

A. The website serves users in more than one city.
B. The application runs on a managed cloud platform.
C. The dominant queries depend on relational joins.
D. The records include optional contact information.

## Section 4 - Apple iCloud & Amazon Web Services (AWS)

### Q13. (Challenging)
A photo deletion made on one device appears on the other devices using the same synchronized library. Which assumption caused the greatest recovery risk?

A. Synchronization was treated as an independent backup.
B. The devices were assumed to use the same user account.
C. The photo library was expected to update over a network.
D. The service was expected to store more than one photo.

### Q14. (Challenging)
An AWS application needs to read one S3 bucket. A developer proposes giving it full administrative permissions to avoid access errors. Which response best meets the requirement?

A. Grant the developer account password to every instance.
B. Make all application buckets publicly readable instead.
C. Allow only the required operations on the target bucket.
D. Move all objects into the account root user directory.

### Q15. (Challenging)
A retailer already uses iCloud for employee device backups. It now needs virtual servers and a managed relational database for checkout. What is the sound architectural conclusion?

A. Existing iCloud capacity can be reassigned as RDS instances.
B. A consumer backup subscription does not supply that stack.
C. Device synchronization can execute the checkout API instead.
D. The database should be stored inside each employee backup.

### Q16. (Challenging)
An application server is compromised. Which design most directly limits how much unrelated stored data its credentials can expose?

A. Give all servers the same account-wide storage permissions.
B. Use a longer storage bucket name for confidential records.
C. Run the relational database on a larger managed instance.
D. Scope server permissions to the data its workload needs.

## Section 5 - Web Hosting & Cloud Hosting

### Q17. (Challenging)
A website works at the new server IP but its domain still reaches the previous server. Both servers are healthy. Which layer should be investigated first?

A. The HTML document encoding on the new server.
B. The relational schema used by the application.
C. The amount of RAM allocated to the new server.
D. The domain records and cached name resolution.

### Q18. (Challenging)
A shop moves to a fixed-size VM in a public cloud and assumes flash-sale traffic is now handled automatically. Which missing element most directly challenges that assumption?

A. A second registered domain name for the storefront.
B. A configured scaling and traffic-distribution design.
C. A reseller account for purchasing additional domains.
D. A private email server beside the application VM.

### Q19. (Challenging)
A customer buys a VPS and concludes that no other customer shares the underlying physical machine. Which distinction corrects this?

A. A VPS reserves a complete physical server for each guest.
B. A VPS shares the same application process with every site.
C. A VPS provides a virtual environment on shared hardware.
D. A VPS removes the need to manage any operating system.

### Q20. (Challenging)
A load balancer routes requests to two healthy servers. A user logs in on one request but appears logged out on the next. Both servers use local session files. Which change best addresses the cause?

A. Use a shared session store available to both servers.
B. Increase the number of DNS records for the same domain.
C. Give the two servers identical amounts of free disk space.
D. Increase the load balancer health-check frequency.

## Section 6 - App/Web Configuration & Deployment

### Q21. (Challenging)
A deployment succeeds, but it appears in a different Google Cloud project from the one the team intended. Which check should have preceded deployment?

A. Inspect the local browser cache for old application files.
B. Confirm the active identity and selected project.
C. Rename the main HTML file to the target project ID.
D. Increase the configured automatic scaling limit.

### Q22. (Challenging)
A release changes the command used to start an application, but leaves the configured entrypoint unchanged. The code uploads successfully and startup then fails. What should be checked first?

A. Whether the domain uses the same name as the service.
B. Whether the deployment folder contains a screenshot.
C. Whether every instance has a different runtime version.
D. Whether the entrypoint matches the new startup command.

### Q23. (Challenging)
A team changes an API base URL by editing source code for every environment. The values are configuration, not secrets. Which change best reduces accidental cross-environment edits?

A. Set environment-specific values through configuration.
B. Create a different programming language for each release.
C. Store the development URL in the production HTML title.
D. Use a separate domain registrar for every application.

### Q24. (Challenging)
An administrator uploads a revised Apache configuration using SFTP. Requests still follow the previous configuration, and no reload has occurred. Which next action best fits this evidence?

A. Change the website domain before inspecting the server.
B. Upload the same configuration with a different filename.
C. Validate the configuration, then reload Apache.
D. Delete the remote configuration and restart the laptop.

## Section 7 - EL: Cloud Shell & Cloudflare Pages

### Q25. (Challenging)
The site folder is ~/site, but a student starts the Python server from ~. Web Preview shows a directory listing rather than the expected home page. What is the most direct fix?

A. Switch Web Preview to an unrelated unused port.
B. Change the Cloudflare project name and retry preview.
C. Serve ~/site as the document root on the preview port.
D. Upload the directory listing as the new index.html.

### Q26. (Challenging)
A deployment reports success, but the root URL returns 404. The uploaded directory contains public/index.html rather than a root index.html. Which correction matches this evidence?

A. Deploy the public directory as the site root.
B. Run the local server on port 443 before retrying.
C. Rename the Cloud Shell terminal to the project name.
D. Change the browser language and reuse the deployment.

### Q27. (Challenging)
A Cloud Shell preview works while Python is running, then stops after the process is terminated. A student expected a permanent public website. Which conclusion is correct?

A. Preview success proves the files are already on Cloudflare.
B. The permanent URL must use the local preview port number.
C. The preview can be restored by changing the DNS provider.
D. A running preview is separate from a published deployment.

### Q28. (Challenging)
The CLI confirms the intended account and a successful deployment. A guessed project URL fails, while the exact URL printed by the deployment loads the new page. What is the best next step?

A. Redeploy the same files repeatedly until the guess works.
B. Use the confirmed URL and inspect its deployment mapping.
C. Rebuild the HTML because the deployment must be corrupt.
D. Change the local preview port to match the guessed name.
