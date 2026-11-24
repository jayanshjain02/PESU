# Unit IV: Decentralized Applications — MCQ Practice

**Source:** `U4-COMBINED.pdf`; section numbering matches Unit 4 `notes.md`.  
**28 questions:** Exactly **4 per section: 1 Easy + 3 Very Tough**. Sections 6 and 7 are **EL**.  
**Instructions:** Select one option per question. The answer key and explanations are at the bottom. Composite scenarios cover multiple topics within each section.

**Assumptions:** Use the contracts and Ethers.js 6 behaviour explained in the notes. Calls in a sequence are separate operations unless specified otherwise. Failed transactions do not erase earlier successful transactions. IDs are unique within one contract instance. A wallet connection, transaction submission and successful transaction receipt are different stages. Platform questions use the PPT's qualitative descriptions, not current performance benchmarks.

## Section 1 — Development Environment and Technology Stack

### Q1 — Easy

Which component primarily lets frontend JavaScript communicate with smart contract methods?

- A. CSS
- B. VS Code's text editor alone
- C. Web3.js or Ethers.js
- D. The Solidity licence comment

### Q2 — Very Tough

A team has these development tasks:

1. Build frontend controls and output areas.
2. Design features, user flow and contract rules.
3. Connect the wallet and initialise interaction.
4. Compile the contract and test its logic.
5. Write Solidity business logic.
6. Deploy the compiled contract to the intended network.
7. Perform reads/writes and verify the displayed results.

Which sequence matches the PPT's workflow **and** correctly assigns responsibility?

- A. 2 → 5 → 4 → 6 → 1 → 3 → 7; Remix handles Solidity development/deployment, Ganache supplies the local chain, and wallet signing is separate from contract execution.
- B. 2 → 5 → 4 → 6 → 1 → 3 → 7; MetaMask executes the Solidity business logic, and Ganache only stores frontend files.
- C. 2 → 5 → 6 → 4 → 1 → 3 → 7; testing can only begin after deploying to the final target network, and the ABI is the deployed executable.
- D. 2 → 1 → 3 → 5 → 7 → 4 → 6; creating an Ethers Contract interface deploys its source, so separate deployment is only a final documentation step.

### Q3 — Very Tough

A local exercise has:

- Ganache RPC: `http://127.0.0.1:7545`
- Frontend server: `http://127.0.0.1:5500/index.html`
- A funded test account at address **A**
- A successfully deployed contract at address **C**
- A matching ABI **I**

A student configures MetaMask with the frontend URL as its RPC and puts A in `contractAddress`. The student argues that both addresses are local and the wallet has a balance, so the configuration should work.

Which correction is complete?

- A. Keep the RPC URL, change contractAddress to C and remove the ABI because account funding supplies the interface.
- B. Use the Ganache RPC and matching ABI, but retain A because the signer and contract must have the same address.
- C. Use the Ganache RPC and C, then select any chain ID because the URL and wallet balance determine the correct chain automatically.
- D. Use Ganache's RPC and actual chain ID in the wallet; serve the page separately through Live Server; use C with I for the contract and A as the funded signing account.

### Q4 — Very Tough

Assess these statements about the development stack and its benefits:

I. Local testing, debugging tools and repeatable deployment can improve development efficiency without proving every contract bug absent.  
II. Frontend controls collect input, while the contract must enforce rules that must hold for every caller.  
III. The ABI can replace bytecode during deployment because both describe the same functions.  
IV. A successful wallet connection alone proves that the selected network contains the intended deployed contract.  
V. The library/provider carries requests; the wallet authorises applicable writes; the blockchain executes and maintains state.  
VI. Ganache, the frontend web server and MetaMask have distinct roles, even when all are used on one computer.

Which set is entirely correct?

- A. I, II, III, V and VI only
- B. I, II, V and VI only
- C. I, II, IV, V and VI only
- D. II, III, IV and VI only

## Section 2 — DApps and Blockchain Platforms

### Q5 — Easy

Which platform does the PPT specifically identify as a **permissioned blockchain for enterprise applications**?

- A. Ethereum
- B. Solana
- C. Polygon
- D. Hyperledger Fabric

### Q6 — Very Tough

Match the PPT's five platform descriptions to the names, in this exact order:

1. Smart contracts and a large ecosystem; DeFi, NFTs and DApps.
2. Fast transactions and low fees; gaming and DeFi.
3. Explicitly highlighted as EVM compatible and low cost; DeFi/token applications.
4. High throughput; gaming and NFTs.
5. Permissioned participation; enterprise applications.

Which mapping is correct, with a valid interpretation of compatibility?

- A. Ethereum, BNB Smart Chain, Polygon, Solana, Hyperledger Fabric; EVM compatibility means sharing Ethereum's existing contract state.
- B. Ethereum, Polygon, BNB Smart Chain, Solana, Hyperledger Fabric; the table describes differing platform characteristics, and the same deployment state is not shared merely through EVM compatibility.
- C. Ethereum, Polygon, BNB Smart Chain, Hyperledger Fabric, Solana; permissioned means anyone can join without approval.
- D. Ethereum, Polygon, BNB Smart Chain, Solana, Hyperledger Fabric; all five use the supplied Solidity/Ethers/MetaMask workflow unchanged because all are DApp platforms.

### Q7 — Very Tough

A DApp's contract permits a successful message update. Its old transaction history remains available. Later, its centrally hosted frontend fails, while the blockchain and contract remain accessible through another interface. A presenter makes these claims:

I. Updating the contract's current state is compatible with a tamper-resistant transaction history.  
II. The frontend outage proves that the contract's blockchain records were deleted.  
III. Decentralisation must be examined across the whole application; a DApp can retain central dependencies in its frontend or RPC access.  
IV. Valid transaction signatures guarantee that the application's business rules and inputs are correct.  
V. Transparency, distributed state and user-controlled assets can provide benefits without guaranteeing confidentiality or flawless application code.

Which set is correct?

- A. I, III and V only
- B. I, II, III and V only
- C. I, III, IV and V only
- D. II, IV and V only

### Q8 — Very Tough

A team is comparing platforms for supply-chain traceability, healthcare verification, digital identity, certificate verification, NFT trading and voting. A candidate platform has attractive fees but lacks required integration tools. Another meets the required security/access model but has different throughput and cost trade-offs.

Which selection argument is the most defensible under the PPT's criteria?

- A. Choose the lowest fee first; transaction speed, security, scalability and ecosystem compatibility become irrelevant once a DApp uses smart contracts.
- B. Choose solely by the largest developer community; this guarantees that public storage satisfies every healthcare confidentiality requirement and every voting eligibility rule.
- C. Evaluate speed, cost, security, scalability, contract support, community, tools and ecosystem compatibility against each application's needs; application categories alone do not prove one platform is best or that public data is confidential.
- D. Select the highest-throughput platform; because DApps are open source and peer-to-peer, required permission models and integration libraries can be assumed to exist.

## Section 3 — Structure and Smart Contract Interactions

### Q9 — Easy

Which action is normally a read-only frontend call rather than a state-changing transaction?

- A. Fetch a saved student record using a view getter.
- B. Register a new student.
- C. Cast a vote.
- D. Send ETH into a payable contract function.

### Q10 — Very Tough

The browser requests a write and receives a transaction response/hash after wallet approval. It displays “Success” immediately. The transaction is subsequently included but **fails during contract execution**. The frontend then calls a getter on the same instance.

Which diagnosis is correct?

- A. The initial Success message was justified because wallet approval permanently commits the requested update; a later execution failure only affects the UI.
- B. The hash proves success, but the getter must submit another signed transaction to discover the updated value.
- C. All storage assignments reached before the failed check remain saved, so the getter must show a partially updated record.
- D. Submission was incorrectly presented as success; the frontend should wait for the outcome, handle the failure and read unchanged committed state from that failed operation through an ordinary call.

### Q11 — Very Tough

A frontend performs three operations:

1. Reads a balance through an ordinary provider call.
2. Updates a student's name and course in **one nonpayable write function**, without attaching ETH as call value.
3. Sends ETH to a payable function.

Which statement correctly distinguishes transaction fees, value transfers and authorisation?

- A. Operation 1 never uses computation, even if its getter is executed inside another on-chain transaction; operations 2 and 3 each require one transaction.
- B. Operation 2 is impossible because every state-changing function must be payable to pay gas; only operation 3 can update state.
- C. Operation 1 normally needs no new signed transaction; operation 2 can consume gas without accepting ETH as call value, and its two assignments need no separate prompts; operation 3 needs a transaction for the actual value transfer.
- D. Operation 2 requires one approval for each stored field, while operation 3 must reject zero value solely because its function is marked payable.

### Q12 — Very Tough

A DApp validates input only in JavaScript, shows “Saved” when a button is clicked, repeatedly submits writes just to refresh displayed values, and catches all errors with the message “Try increasing gas.” Its developer says this satisfies the PPT's recommendations because MetaMask is present.

Which repair addresses the full interaction problem?

- A. Add an input regex and disable buttons permanently after the first click; leave permission rules solely in JavaScript and continue using writes for retrieval.
- B. Enforce essential rules in the contract as well as the frontend, use reads for retrieval, distinguish approval/pending/success/failure, check account/network context and diagnose errors before changing gas settings.
- C. Move the validation into the ABI and display Success when a transaction hash exists; an ABI change automatically updates the contract's permissions.
- D. Use view getters for display and show pending status, but treat rejected wallet requests and reverted contract calls as successful because both were initiated by the user.

## Section 4 — Frontend Development

### Q13 — Easy

Which mapping of frontend technologies is correct?

- A. HTML signs transactions; CSS executes Solidity; JavaScript stores blockchain consensus.
- B. HTML supplies structure; CSS supplies styling; JavaScript supplies interactivity; React is optional.
- C. React is mandatory and replaces the blockchain library.
- D. MetaMask replaces the HTML page and all contract getters.

### Q14 — Very Tough

Assume the correct contract is already deployed and `window.ethereum` exists:

```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();
const abi = [
  "function getStudentCount() view returns (uint256)"
];
const contract = new ethers.Contract(deployedAddress, abi, signer);
const count = await contract.getStudentCount();
```

Which explanation is correct?

- A. `new ethers.Contract` deploys a new empty student contract, so count must be zero.
- B. The ABI is invalid because it omits registerStudent and all event definitions, even though only the count getter is used.
- C. BrowserProvider adapts the injected provider, the signer represents the authorised account, Contract wraps the existing deployment, and a valid ABI subset can support this ordinary read without a new write transaction.
- D. Obtaining a signer makes every subsequent getter a write; count is returned only after a new state-changing transaction is mined.

### Q15 — Very Tough

A new contract version was deployed at C2, but the frontend still points to C1. Its HTML loads app.js without `type="module"`, although app.js imports Ethers.js. JavaScript attaches a handler to `registerButton`, but the HTML button's ID is `registerBtn`.

Which is the smallest complete repair of these three independent faults?

- A. Change only the ABI; it will redirect C1 to C2, enable module imports and match semantically similar IDs.
- B. Change to C2 and add type="module"; HTML IDs are case/style suggestions and need not match JavaScript.
- C. Fix the script type and button ID; the two contract addresses refer to the same state whenever their source filenames match.
- D. Configure C2 with its matching ABI, load app.js as a module, and make the HTML/JavaScript ID names agree exactly; then test using the intended network and HTTP-served page.

### Q16 — Very Tough

A frontend was connected as account A. The user changes MetaMask to B, but the page has no account-change listener and retains its earlier signer/contract objects. The same page reads input text, uses textContent for output and waits for write receipts.

Which assessment is correct?

- A. Reconnect/recreate the signer and contract for the intended account and check the network; textContent displays data as text, and receipt-based status remains necessary because switching accounts or changing the DOM does not itself prove an on-chain update.
- B. Change only the displayed wallet label to B; the string in the label determines msg.sender for every contract call.
- C. Replace textContent with CSS; the selected style class determines which wallet owns a saved record.
- D. Preserve the old connection objects and omit receipt waiting; MetaMask account selection automatically updates every cached JavaScript object and guarantees the next write's success.

## Section 5 — Decentralised Voting Case Study

### Q17 — Easy

What does a correctly enforced `hasVoted[address]` rule directly provide?

- A. Proof that every wallet belongs to a different human.
- B. Automatic proof that each caller is an eligible citizen/student.
- C. At most one accepted vote from each tracked address in the election.
- D. A secret ballot merely because a mapping is used.

### Q18 — Very Tough

Consider an explanatory implementation of the source's voting rules. There are candidates 1 and 2; voting must be open; A and B are eligible; invalid candidates and repeat votes revert. Counts start at zero.

Separate calls occur in this order:

1. A attempts candidate 3.
2. A votes for candidate 1.
3. A attempts candidate 2.
4. B votes for candidate 2.
5. The administrator ends the election.
6. A fresh eligible C attempts candidate 1 after closure.

Which final interpretation is correct?

- A. Counts (0,1); A's invalid first candidate already consumed A's vote, and candidate 2 is the winner.
- B. Counts (1,1); A and B have voted, C has not; the source's highest-count rule alone does not specify how to resolve the tie.
- C. Counts (1,2); A's second vote replaces A's first vote, and closure only hides the Vote button.
- D. Counts (2,1); C's eligibility overrides election closure, and the first candidate wins automatically.

### Q19 — Very Tough

The source lists election name, candidates, counts, owner and voting status; it lists Add Candidate, Cast Vote, Get Vote Count, Get Winner, Start Election and End Election. Its diagram begins with “Start Election” before “Register Candidates.”

Which design explanation is most precise?

- A. Separate creating/configuring an election from opening voting, enforce owner/stage/eligibility/repeat-vote rules in contract logic, treat count/winner retrieval as reads when they only return data, and define ties explicitly because the PPT does not provide a complete implementation.
- B. Interpret the first diagram step as unrestricted voting immediately; any wallet may add candidates afterwards because the owner variable is merely descriptive.
- C. Make every listed function payable; this automatically enforces eligibility and makes Get Winner change the voting status when the highest count exists.
- D. Keep eligibility and repeat-vote checks only in the frontend; decentralised storage makes hidden buttons enforceable against all callers.

### Q20 — Very Tough

A presentation claims that the voting case study already implements biometric authentication, a mobile multilingual interface, digital identity integration, off-chain election reports and large-scale election support. It also claims there is no administrator, no gas cost and guaranteed ballot secrecy.

Which correction best matches the source?

- A. The enhancements are all implemented by using MetaMask; owner controls are only necessary for private blockchains.
- B. The enhancements are future work, but the presence of a public blockchain still guarantees no administrator powers, no transaction fees and secret individual votes.
- C. Only government elections are listed as an application; student, university, corporate, shareholder and community voting are outside the source's scope.
- D. Those six enhancements are proposals; the design still includes an owner and limitations such as fees, connectivity, wallet management and scalability. Its listed applications span student/university, corporate/shareholder and community voting, with government elections described as future potential.

## Section 6 — EL: Message DApp

### Q21 — Easy

Immediately after a fresh MessageStorage deployment, what does getMessage() return?

- A. `Hello Blockchain Students!`
- B. The deploying wallet's private key
- C. `Welcome to our Blockchain Lab`, before the user has stored it
- D. A separate empty message for each wallet

### Q22 — Very Tough

An older local EVM rejects deployment with an unsupported-opcode problem. The source uses `pragma solidity ^0.8.20;`. A student proposes switching to compiler 0.8.19 without changing the pragma, increasing gas and reusing the address of an earlier deployment after editing the Solidity file.

Which recovery is correct for the compatibility issue described by the guide?

- A. Use 0.8.19 with the unchanged ^0.8.20 pragma; the caret accepts every earlier 0.8.x compiler.
- B. Increase gas until the EVM recognises every instruction; no recompilation or new instance is needed.
- C. Select Paris only in the frontend ABI; the ABI chooses which opcodes the deployed program executes.
- D. Select a compiler satisfying the pragma and a target supported by the local EVM, such as Paris for this mismatch; recompile and redeploy. If using the 0.8.19 fallback, change the pragma accordingly and update app.js to the new successful address.

### Q23 — Very Tough

Use the exact MessageStorage contract and frontend behaviour:

- The contract setter is public with no owner or nonempty-string check.
- The page trims input, rejects empty text, waits for the write receipt, clears the field and calls readMessage.
- readMessage displays the returned value and sets status to “Message retrieved successfully!”
- Store is re-enabled in finally.

Starting from a fresh connected deployment:

1. A tries to store three spaces through the page.
2. A stores `"  Lab  "` through the page; the transaction succeeds.
3. B directly calls `setMessage("")` using another interface; that transaction succeeds.
4. A clicks Read Message on the same instance.

Which outcome is correct, counting successful message-write transactions only?

- A. Three writes; final value Lab because direct callers inherit the page's trim/nonempty validation.
- B. Two writes; final value is the empty string; the page's initial whitespace request never reached a write, the successful page write was read back, and its Store control was re-enabled.
- C. One write; final value Lab because only the deploying wallet can call a public setter.
- D. Two writes; final value is the original constructor message because B's update resets the contract before every read.

### Q24 — Very Tough

Four independent observations occur while following the practical:

I. Clicking Store successfully changes the value through the page and creates a Ganache transaction, but a **different deployed instance** expanded in Remix still shows the constructor message.  
II. A page opened as a file URL reports an ES-module/CDN import error before button handlers attach.  
III. Another page cannot find window.ethereum because it is opened in a browser profile without the wallet extension.  
IV. A student pastes a wallet account address into contractAddress and assumes that the wallet's test balance proves the contract exists there.

Which diagnostic set is correct?

- A. I proves the confirmed transaction failed; II requires more transaction gas; III is fixed by changing the CSS; IV is a valid configuration.
- B. I is an EVM determinism failure; II requires changing Solidity to payable; III requires copying a real wallet key into app.js; IV is fixed by adding the account to the ABI.
- C. I requires comparing the same chain and contract instance across page/Remix/Ganache; II requires checking HTTP serving, module setup and CDN access; III requires the intended wallet-enabled profile; IV requires the actual deployed contract address and matching ABI.
- D. I is repaired by reading another network with the same ABI; II is solved by removing all event listeners; III is irrelevant because connection is never checked in this example; IV is fixed by changing only the displayed account label.

## Section 7 — EL: Student Registration DApp

### Q25 — Easy

The same wallet successfully registers student IDs 101 and then 103 using the updated contract. What does getMyRegistration() return for that wallet?

- A. An array containing 101 and 103
- B. 101, because the first registration locks the wallet permanently
- C. The total student count
- D. 103, the latest registered ID

### Q26 — Very Tough

On a fresh StudentRegistration instance, separate operations occur:

1. A registers 101/Asha/BCA.
2. A registers 103/Rahul/BCA.
3. B attempts to register 101 again.
4. B registers 105/Meera/BCA.
5. A updates record 101 to Asha/MCA.
6. B attempts to update record 103.

Which final result matches the supplied contract? Count only successful StudentRegistered and StudentUpdated events.

- A. Count 3; latest A/B IDs 103/105; records 101 and 103 remain registered by A; 101 has course MCA; 3 registration events and 1 update event.
- B. Count 4; latest A/B IDs 101/105 because updating moves the latest-registration pointer; 4 registration events and 1 update event.
- C. Count 3; record 101 is owned by B because the duplicate registration overwrites it; B can update any record since registration is public.
- D. Count 2; A's second registration was rejected; updating 101 increments the count, and private students prevents all external reads of its records.

### Q27 — Very Tough

Consider the actual helper and latest-ID comparison:

```javascript
function validPositiveId(value) {
  const id = value.trim();
  if (!/^[0-9]+$/.test(id) || BigInt(id) <= 0n) {
    throw new Error("Enter a student ID greater than zero.");
  }
  return id;
}
// Elsewhere:
const id = await contract.getMyRegistration();
const none = id === 0n;
```

Assess the statements:

I. `" 000103 "` passes and is returned as the digit string `"000103"`; ABI integer encoding represents ID 103, so it cannot bypass an existing-ID check.  
II. `"9007199254740993"` can pass without first losing precision through a JavaScript Number conversion.  
III. `"1e3"`, `"1.5"`, `"-1"` and `"0"` are rejected by this helper.  
IV. Replacing `id === 0n` with `id === 0` preserves the result because strict equality ignores numeric type differences.  
V. The helper accepts every positive digit string only if it also explicitly fits uint256's maximum.

Which set is correct?

- A. I, II, III and IV only
- B. I, III and V only
- C. I, II and III only
- D. II, III, IV and V only

### Q28 — Very Tough

Consider the supplied HTML/CSS/JavaScript and contract together:

I. `type="module"` enables the Ethers import; exact HTML IDs let byId/handle attach actions to controls, and textContent displays a name such as `<b>Asha</b>` literally rather than as HTML.  
II. `.container` is a class selector and `#status` is an ID selector; styling or hiding a button does not grant permission to update another wallet's record.  
III. For `error = { shortMessage: "", reason: "Student ID already registered", message: "execution reverted" }`, the wrapper's `shortMessage || reason || message || fallback` selects the reason text.  
IV. A successful update increments studentCount and automatically refreshes the count label because handle listens for contract events.  
V. An absent positive ID makes checkRegistration return false, but getStudent rejects it; an unused caller's getMyRegistration returns 0n through Ethers.  
VI. The source's proposed address-to-array extension, event-log display, admin-only registration and search/list page are already implemented by the six-entry ABI.

Which set is correct?

- A. I, II, III, IV and V only
- B. I, II, III and V only
- C. I, II, III, V and VI only
- D. II, IV, V and VI only

---

### Topic coverage map

| Section | Topics exercised |
|---|---|
| 1 | Q1: blockchain libraries. Q2: objectives, complete development workflow and tool roles. Q3: local chain/frontend endpoints, account versus deployment, chain ID and ABI. Q4: stack responsibilities, development advantages, local testing and rules. |
| 2 | Q5–6: all five platforms, characteristics and uses, permissioned/EVM distinctions. Q7: DApp features, working, immutability, security, transparency, decentralisation and benefits. Q8: all eight selection criteria and real-world application areas. |
| 3 | Q9: interaction categories. Q10: wallet approval, submission, validation/execution, receipt, state and result display. Q11: read/write/payable, fees/value transfer and prompt scope. Q12: input validation, efficiency, error handling, status, connections and gas diagnostics. |
| 4 | Q13: HTML/CSS/JavaScript/React. Q14: provider, signer, ABI, address, contract wrapper and reads. Q15: connection workflow, source/deployment mismatch, module/DOM wiring. Q16: wallet/account/network issues, safe text display, UX and transaction status. |
| 5 | Q17: one-wallet rule versus identity. Q18: eligibility, candidate checks, repeat prevention, closure, counters and winner/tie handling. Q19: state/functions, diagram order, owner, reads/writes, UI versus enforcement. Q20: security, requirements/limitations, application areas and all six future enhancements. |
| 6 — EL | Q21: contract/constructor/getter. Q22: compiler/pragma/EVM compatibility, compile/deploy/address steps. Q23: shared setter, frontend validation, asynchronous write/read flow, status and finally. Q24: tooling/setup, local serving, CDN/module import, wallet/profile, addresses and three-level verification/troubleshooting. These build on the 15-step workflow documented in notes.md. |
| 7 — EL | Q25–26: multiple registrations, all mappings/fields, ownership, getters/setters, events/counts and sample tests. Q27: input regex, trim, BigInt, numeric encoding and boundaries. Q28: HTML/CSS/DOM/module concepts, error wrapper, read semantics, refresh behaviour, limits and proposed extensions. |

### Answer key

| Section | Easy | Very Tough | Very Tough | Very Tough |
|---|---|---|---|---|
| 1 | Q1 **C** | Q2 **A** | Q3 **D** | Q4 **B** |
| 2 | Q5 **D** | Q6 **B** | Q7 **A** | Q8 **C** |
| 3 | Q9 **A** | Q10 **D** | Q11 **C** | Q12 **B** |
| 4 | Q13 **B** | Q14 **C** | Q15 **D** | Q16 **A** |
| 5 | Q17 **C** | Q18 **B** | Q19 **A** | Q20 **D** |
| 6 — EL | Q21 **A** | Q22 **D** | Q23 **B** | Q24 **C** |
| 7 — EL | Q25 **D** | Q26 **A** | Q27 **C** | Q28 **B** |

### Answer explanations

1. **C:** Web3.js/Ethers.js bridges frontend JavaScript and the blockchain interfaces. HTML/CSS organise and style the page; the editor alone is not a blockchain connection.
2. **A:** The sequence matches design → contract → compile/test → deploy → frontend → wallet → interaction. MetaMask authorises transactions; the contract executes on the selected blockchain.
3. **D:** The web server serves HTML/JS, while Ganache's RPC processes blockchain requests. A is the signing account; C is the deployment; I describes its methods. The wallet still needs the correct chain configuration.
4. **B:** I, II, V and VI are true. ABI describes interaction and is not bytecode. Wallet connection does not verify the intended deployment exists on the selected network.
5. **D:** Hyperledger Fabric is the PPT's permissioned enterprise platform.
6. **B:** The ordered mapping matches every source row. EVM compatibility does not merge deployments or state, and the same Ethereum-specific development workflow does not automatically apply unchanged to all platforms.
7. **A:** Current contract state may change through authorised transactions while history remains recorded. Frontend failure is not deletion of contract state. Signatures prove transaction authorisation, not correctness of business logic or real-world claims.
8. **C:** All eight selection criteria matter in context. A use-case label or a single attractive metric cannot establish fit, confidentiality or integration support.
9. **A:** A view getter normally returns data through a call. Registration, voting and actual ETH transfers are on-chain write actions.
10. **D:** A response/hash means submission, not successful execution. The uncaught failure prevents that transaction's state changes from persisting. The frontend should wait, handle the error and use a getter to show the committed state.
11. **C:** Gas fees are different from ETH attached as function-call value. A nonpayable write can still consume gas. Multiple assignments in one transaction do not require one wallet prompt each. A payable annotation permits value but does not require a positive amount by itself.
12. **B:** Validation, efficient reads, meaningful status, accurate network/account context and specific failure handling address separate issues. A frontend check can be bypassed by other callers; increasing gas does not repair permission or input failures.
13. **B:** HTML structures, CSS styles and JavaScript implements interactions. React is an optional UI approach, not a replacement for the contract/network layer.
14. **C:** The wrapper targets an existing deployment. The ABI may contain only the functions needed by this frontend. A signer-enabled wrapper can still perform ordinary read calls; constructing it does not deploy a contract.
15. **D:** All three faults must be fixed: deployment address/interface, module loading and exact DOM-ID wiring. Source filenames and ABI edits do not redirect old deployed state.
16. **A:** The example does not recreate its signer automatically after a switch. Refresh/reconnect or implement appropriate handlers. UI labels do not determine contract caller identity. textContent avoids interpreting the supplied name as markup.
17. **C:** The mapping tracks addresses. It does not independently prove human uniqueness, eligibility or ballot secrecy.
18. **B:** A's invalid attempt does not consume a vote; A then votes once for 1, and B votes once for 2. The repeat and post-closure attempts fail. Counts tie, and the source provides no tie-breaking rule.
19. **A:** The diagram is conceptual. A sound explanation separates setup from opening voting and specifies the missing enforcement rules. A getter can return a computed winner without a write; its name alone does not schedule or end an election.
20. **D:** Those features appear under Future Enhancements. The design includes an owner and the listed costs/usability/scalability limitations. Application examples include all groups named in D. Blockchain use alone does not establish secrecy or remove administrative powers.
21. **A:** The constructor sets that exact initial string. Welcome to our Blockchain Lab is a later demonstration input.
22. **D:** Bytecode compatibility depends on the target EVM; compiler compatibility depends on the pragma. 0.8.19 is below the permitted range of ^0.8.20. Recompilation/deployment and a new frontend address are necessary to use the new artifact/instance.
23. **B:** The page rejects whitespace before a write. The valid page input becomes Lab, commits and is read back. B's direct empty-string update is permitted by the actual contract. The final read shows empty text; only the Lab and empty-string updates are successful writes. finally restores the Store control.
24. **C:** Compare the same deployment across the three verification surfaces. A module failure may prevent handlers from being installed. Provider availability depends on the browser/profile. A funded account address is not the address of the intended deployed contract.
25. **D:** walletToStudentId holds one latest ID; it does not hold an array. The old record still exists in students[101].
26. **A:** The unique registrations are 101, 103 and 105. Duplicate 101 is rejected. A retains ownership of both earlier records, so updating 101 succeeds without changing count/latest pointers. B cannot update A's 103. Hence three registration events and one update event.
27. **C:** I–III are true. Leading zeroes do not create a new integer ID. The helper preserves large digits as a string/BigInt. Strict equality distinguishes BigInt zero and Number zero, so IV is false. It checks positivity and digit format but not the uint256 maximum, so V is false.
28. **B:** I, II, III and V are true. The empty shortMessage is falsy, so the reason wins. Updates do not increment count, the handler attaches DOM click listeners rather than contract event subscriptions, and the count display is refreshed by its action. The listed extensions are not implemented by merely describing six functions in the ABI.

**References:** Primary rules come from the supplied Unit 4 PDF and code. Clarifications are documented in `notes.md`, with official [Ethers.js 6](https://docs.ethers.org/v6/getting-started/), [BigInt migration](https://docs.ethers.org/v6/migrating/) and [Solidity EVM-target](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html#setting-the-evm-version-to-target) references.
