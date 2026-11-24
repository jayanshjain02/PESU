# Unit IV: Decentralized Applications (DApps) — Exam-Ready Notes

**Course:** Blockchain dApp Development (UQ24CA343AA3)  
**Primary source:** `U4-COMBINED.pdf`, 81 PDF pages. Page references use the PDF page number, not the handout's printed page label.  
**Organisation:** Seven sections: five theory sections followed by the two EL guides. Duplicate slides and title/thank-you pages are consolidated. Diagram content, practical steps, code concepts and troubleshooting are included.

**How to study:** Learn the architecture, tool roles, read/write distinction and voting case study first. For EL, practise explaining **setup → contract → frontend → wallet → transaction → verification**. Attempt `questions.md` before opening its answer key; use `cheat-sheet.md` for final revision.

**Version convention:** The practicals use Solidity `^0.8.20` and Ethers.js **6.13.5**. Code reproduced in the EL sections follows the supplied guide. Deployment-address placeholders must be replaced with your own successful local deployment addresses. These are notes about the supplied examples, not a claim that the DApps were deployed during note preparation.

| Section | Topic | Source PDF pages |
|---|---|---|
| 1 | Development environment and DApp technology stack | 1–11 |
| 2 | Introduction to DApps and blockchain platforms | 12–23 |
| 3 | DApp structure and smart contract interactions | 24–36 |
| 4 | Frontend development for DApps | 37–48 |
| 5 | Case study: decentralised voting application | 49–65 |
| 6 — EL | Message DApp: complete 15-step practical | 66–73 |
| 7 — EL | Student Registration DApp: updated contract and complete explanations | 74–81 |

## Section 1 — Development Environment for DApps

*Source: PDF pages 1–11, including the workflow and stack diagrams on pages 6–7.*

### 1.1 Definition and objectives

**Exam definition:** A DApp development environment is a collection of tools and technologies used to design, develop, test, deploy and interact with decentralised applications.

Its objectives are to:

1. Develop smart contracts.
2. Test applications locally before wider deployment.
3. Connect users to the blockchain.
4. Deploy DApps and their contract components.
5. Interact with blockchain networks.

A DApp requires several cooperating components: writing the Solidity contract alone does not create a complete browser application.

### 1.2 Components and responsibilities

| Component | Purpose | Important distinction |
|---|---|---|
| **Remix IDE** | Write, compile, deploy and interact with smart contracts. | Compilation produces artifacts; deployment creates a contract instance on a network. |
| **MetaMask** | Manage wallet accounts and authorise/sign transactions. | It is not the compiler or the blockchain database. |
| **Ganache** | Run the course's local Ethereum blockchain for testing. | Local test balances and deployments are separate from public networks. |
| **Web3.js / Ethers.js** | Connect JavaScript/frontend code to blockchain interfaces and contract functions. | They do not replace Solidity's on-chain business logic. |
| **HTML/CSS/JavaScript or React** | Build the user interface. | React is optional in this unit's examples. |
| **Ethereum network** | Execute contracts and maintain blockchain state. | A local Ganache network provides the development counterpart. |
| **VS Code** | Edit the practicals' HTML, CSS and JavaScript files. | It does not by itself provide a blockchain. |
| **Live Server** | Serve the frontend at a local HTTP address. | It serves the website; Ganache separately serves blockchain RPC requests. |

### 1.3 DApp development workflow

The source diagram presents seven stages:

1. **Design the DApp:** Plan features, user actions and contract rules.
2. **Develop the smart contract:** Write the business logic in Solidity.
3. **Compile and test:** Correct compiler errors and check behaviour.
4. **Deploy to the blockchain:** Create a contract instance on the intended network.
5. **Develop the frontend:** Build screens, controls, inputs and outputs.
6. **Connect the wallet:** Allow the user to select/authorise a wallet account.
7. **Interact with the smart contract:** Read data or submit transactions through the interface.

This is the PPT's teaching sequence. Frontend design and contract development can be iterative; the important dependency is that contract interaction uses the correct deployed address and matching interface.

### 1.4 Technology stack and data flow

| Layer | What happens there? |
|---|---|
| Frontend | User views information, enters input and clicks a control. |
| Web3.js/Ethers.js | JavaScript encodes calls and communicates with the network/provider. |
| MetaMask | Exposes wallet/provider access and requests approval for the example's transactions. |
| Smart contract / EVM | Contract logic executes on the blockchain's execution environment. |
| Blockchain network | Transactions are validated and successful state changes are recorded. |

**Write example:** A user enters a message → JavaScript invokes `setMessage` → the wallet authorises the transaction → the contract changes its stored message → the frontend reads and displays the new value.

**Read example:** JavaScript calls `getMessage` to retrieve the current value. It does not need to create a new state-changing transaction.

### 1.5 Configuration concepts used throughout the practicals

| Item | Meaning |
|---|---|
| RPC URL | Endpoint through which software sends requests to the blockchain node. |
| Chain ID | Identifies the chain the wallet is configured to use. |
| Wallet/account address | Identifies the selected account that will act as caller. |
| Contract address | Identifies a particular deployed contract on a particular network. |
| ABI | Describes callable functions and their parameter/return types for frontend interaction. |
| Bytecode | The compiled program deployed to and executed by the EVM. |

**Example addresses in the source:** Ganache RPC commonly uses `http://127.0.0.1:7545` or `http://127.0.0.1:8545`; Live Server may use `http://127.0.0.1:5500/index.html`. These endpoints have different jobs. Use the actual values in your workspace; **1337 is an example chain ID, not a universal requirement**.

### 1.6 Advantages of a configured development environment

- Simplifies blockchain application development.
- Supports local testing before deployment.
- Provides wallet integration.
- Supplies debugging and deployment tools.
- Speeds up development by connecting specialised tools.

**Exam answer outline:** Define the environment → state objectives → map each tool to its role → explain the seven-stage workflow → describe the stack → list advantages.

## Section 2 — DApps and Blockchain Platforms

*Source: PDF pages 12–23.*

### 2.1 Definition of a DApp

**Exam definition:** A decentralised application is an application whose blockchain-based backend logic is implemented using smart contracts on a decentralised network, with a frontend through which users interact.

The source contrasts this with an application that relies entirely on a central server for its backend logic and data.

**Precision:** A DApp can still use a centrally hosted frontend or an RPC service. Therefore, “decentralised” does not automatically mean every component has no central dependency. [Architecture clarification](https://ethereum.org/developers/docs/dapps/)

### 2.2 Features

| Feature in the slides | Meaning |
|---|---|
| Decentralised | Shared blockchain execution/state rather than one application database controlling all records. |
| Open source | Code can be available for inspection and collaborative development; this is a common DApp characteristic, not automatic verification of safety. |
| Blockchain-based | Uses a blockchain to execute and record supported operations. |
| Smart-contract driven | Encodes application rules in on-chain programs. |
| Peer-to-peer communication | Participating blockchain nodes communicate across a distributed network. |
| Transparent | Operations and relevant public-chain data can be independently inspected. |
| Immutable data | Confirmed history is intended to resist tampering; authorised transactions can still update the contract's current state. |
| Secure transactions | Cryptographic signatures and blockchain validation protect transaction authorisation/integrity. |
| Reduced single-point dependence | Replicated blockchain state reduces reliance on one backend machine. The frontend and other services still require consideration. |

**Important example:** Updating the message in the EL contract does not contradict blockchain immutability. The new transaction changes the current message while the earlier transaction remains part of history.

### 2.3 How a DApp works

1. The user opens and interacts with the application.
2. The frontend prepares a read request or transaction request.
3. For a wallet-authorised write, the wallet signs the transaction after approval.
4. The smart contract executes the requested logic.
5. The blockchain validates the transaction and maintains the resulting state.
6. The interface displays the returned/read-back information.

For a read-only request, the signed-transaction stage is normally unnecessary.

### 2.4 Advantages and their meaning

| Advantage | Exam explanation |
|---|---|
| Security | Signed transactions and enforced program rules protect authorised actions. |
| Transparency | Participants can inspect activity and verify outcomes. |
| Data integrity | Recorded information is protected against unauthorised historical alteration. |
| Reduced central authority | Many operations can follow shared contract rules rather than discretionary server-side decisions. |
| Fault tolerance | Distributed state is not held by just one application machine. |
| Global accessibility | Users can interact through supported networks and interfaces. |
| User ownership of assets | Wallet control can give users direct control of on-chain assets. |
| Trust through smart contracts | Users can inspect and rely on explicitly encoded rules. |

These are architectural benefits, not a guarantee that every DApp has secure code, private data, trustworthy inputs or a flawless frontend.

### 2.5 Blockchain platforms: the source comparison

Blockchain platforms provide the infrastructure to build, deploy and execute DApps.

| Platform | Feature highlighted in the PPT | Common uses highlighted |
|---|---|---|
| **Ethereum** | Smart contract support; large ecosystem. | DeFi, NFTs, general DApps. |
| **Polygon** | Fast transactions; low transaction fees. | Gaming, DeFi. |
| **BNB Smart Chain** | EVM compatibility; low cost. | DeFi, token applications. |
| **Solana** | High throughput. | Gaming, NFTs. |
| **Hyperledger Fabric** | Permissioned blockchain. | Enterprise applications. |

**Permissioned** means participation/access is controlled according to an organisation or consortium's rules. **EVM compatible** means a platform supports an Ethereum-style execution environment/tooling for compatible contracts; it does not share Ethereum's deployment state.

The table captures the PPT's qualitative positioning. It is not a measured performance ranking or a promise of a particular current fee. Also, do not assume that this unit's Solidity/Ethers/MetaMask workflow transfers unchanged to every listed platform.

### 2.6 Platform selection factors

| Factor | Question to ask |
|---|---|
| Transaction speed | How quickly must operations be processed/confirmed? |
| Transaction cost / gas | What cost can users tolerate per operation? |
| Security | What protection and trust assumptions are required? |
| Scalability | Can the platform support the expected workload? |
| Smart contract support | Can the required program logic be implemented? |
| Community support | Are documentation, examples and knowledgeable developers available? |
| Development tools | Are suitable editors, compilers, wallets and testing tools available? |
| Ecosystem compatibility | Can the application integrate with its intended tooling, assets and services? |

**Exam approach:** State the application requirements first, then justify the choice against these factors. No platform is automatically best for every DApp.

### 2.7 Real-world application areas

| Area | Example role of the DApp |
|---|---|
| DeFi | Financial operations controlled by smart contract rules. |
| NFT marketplaces | Record ownership and facilitate digital-asset transactions. |
| Blockchain gaming | Manage game-related assets and ownership. |
| Supply chain management | Record product movement and traceability information. |
| Digital identity | Support identity-related claims and verification mechanisms. |
| Healthcare records | Support controlled verification/audit workflows; public storage is not automatically confidential. |
| Voting systems | Enforce voting rules and track counts. |
| Educational certificates | Store/verify certificate-related records. |

**Exam answer outline:** Definition → features → working → benefits → platform comparison → selection criteria → applications.

## Section 3 — DApp Structure and Smart Contract Interactions

*Source: PDF pages 24–36, including architecture and transaction-lifecycle diagrams.*

### 3.1 Six main components

| Component | Function |
|---|---|
| User | Initiates actions and authorises applicable transactions. |
| Frontend | Displays information and collects input. |
| Wallet, e.g. MetaMask | Manages the account interface and transaction signing. |
| Web3 library, e.g. Ethers.js | Connects frontend logic to contract/network interfaces. |
| Smart contract | Executes business rules and reads/updates its stored data. |
| Blockchain network | Validates transactions and maintains distributed state. |

**Architecture explanation:** The frontend uses a blockchain library and provider connection to communicate with the network. The wallet adds account authorisation for writes. The contract executes in the EVM; the frontend later displays the result. The arrows in the source are a logical interaction diagram, not separate servers that execute every step one after another.

### 3.2 What is smart contract interaction?

Smart contract interaction means communicating with an already deployed contract to **read data, update data, execute functions or send transactions**.

Examples:

- Read an account balance or saved message.
- Retrieve a student record.
- Update a student's details.
- Submit a vote.
- Send ETH to a payable contract function.

Calling a function and sending a transaction are not synonyms: a function can be evaluated through an ordinary read-only call.

### 3.3 Read, write and payable operations

| Operation | Typical purpose | State change? | Signed transaction needed for the described action? |
|---|---|---|---|
| Read (`view`; also `pure` computations) | Retrieve data or calculate without changing state. | No. | Normally no when using an off-chain call. |
| Write | Update a record, save text, cast a vote. | Yes on successful execution. | Yes. |
| Payable action receiving ETH | Transfer ETH into a contract while optionally running logic. | Includes an actual value transfer. | Yes for an actual on-chain transfer. |

**Read-call distinction:** The PPT's “no gas fee” means an ordinary frontend read call does not submit a fee-paying blockchain transaction. It does not mean the computation performs no work, or that a `view` function consumes no gas when executed inside another transaction.

**Payable distinction:** `payable` allows ETH to be attached. It does not force a nonzero amount, and not every state-changing function is payable. Both supplied EL registration/message setters are ordinary nonpayable writes.

### 3.4 Interaction workflow

1. User performs an action in the frontend.
2. Web3.js/Ethers.js prepares the call or transaction request using the ABI.
3. For a write in these examples, MetaMask requests user approval and signs.
4. The transaction is sent to the selected blockchain network.
5. The contract executes the requested function and checks its rules.
6. On success, state changes are recorded.
7. The frontend reads/displays the updated result.

For reads, skip the write approval/transaction-recording stages and display the call's return data.

### 3.5 Transaction lifecycle and UI status

The page-33 diagram shows **user request → MetaMask confirmation → transaction sent → network validation → contract execution → blockchain update → result displayed**.

| Stage | What the UI can honestly report |
|---|---|
| Before approval | “Please confirm in MetaMask.” |
| User rejects | “Request rejected”; the requested state change did not succeed. |
| Transaction submitted | “Submitted / waiting for confirmation.” A transaction response/hash is not final success. |
| Transaction executes successfully | “Confirmed / successful.” |
| Contract execution fails | Display the failure and preserve accurate state information. |
| Read-back completes | Display the current saved value/count. |

The EL write pattern is:

```javascript
// Fragment inside an async function with a connected contract:
const tx = await contract.setMessage("New message");
await tx.wait();
const saved = await contract.getMessage();
```

The first `await` obtains the transaction response after submission; `wait()` waits for inclusion/receipt. The read-back fetches stored state. [Ethers interaction reference](https://docs.ethers.org/v6/getting-started/)

**Scope of the slide's approval rule:** These examples use interactive MetaMask approval per submitted write transaction. A single transaction can execute many assignments and internal calls without a separate wallet prompt for each one.

### 3.6 Best practices

1. Validate frontend inputs before requesting a transaction.
2. Enforce required rules again inside the smart contract.
3. Avoid unnecessary blockchain writes; use reads for retrieval.
4. Handle rejected, failed and delayed transactions clearly.
5. Show transaction progress/status rather than immediate assumed success.
6. Use the intended wallet account and network.
7. Reduce unnecessary contract work and storage writes to control gas cost.

**Exam answer outline:** Components → types of interaction → read/write/payable comparison → write lifecycle → status and failure handling → best practices.

## Section 4 — Frontend Development for DApps

*Source: PDF pages 37–48.*

### 4.1 Definition and objectives

Frontend development for a DApp is designing and implementing the browser interface through which users interact with blockchain smart contracts.

The frontend should:

- Provide an interactive user interface.
- Connect users to the blockchain/wallet.
- Send and receive contract-related data.
- Support wallet-based authorisation and explain transaction status.

### 4.2 Technologies

| Technology | Role |
|---|---|
| HTML | Page structure, fields, buttons and output areas. |
| CSS | Layout, colours, spacing and visual feedback. |
| JavaScript | Event handling, validation, asynchronous actions and UI updates. |
| React, optional | Component-based dynamic interfaces. |
| Web3.js / Ethers.js | Encode calls, create contract wrappers and communicate with the network. |
| MetaMask | Account access and user-authorised transaction signing. |

**Separation of responsibilities:** CSS cannot enforce a contract's permissions. Disabling a button can improve usability, but the contract must enforce the actual rule.

### 4.3 Seven-step frontend workflow

The page-42 diagram shows:

1. User opens the DApp.
2. User connects MetaMask.
3. Frontend initialises the contract interface with its address and ABI.
4. User enters data or clicks a button.
5. Frontend calls a smart contract function.
6. The network processes the request; writes require transaction execution.
7. The frontend displays the returned or refreshed result.

“Loading the contract” here means creating a JavaScript interface to an existing deployment. `new ethers.Contract(...)` in the practicals does **not** deploy a new Solidity contract.

### 4.4 Connecting frontend and contract

The PPT's connection steps are:

1. Deploy the smart contract.
2. Obtain the deployed **contract address**.
3. Obtain its **ABI**.
4. Connect MetaMask.
5. Use Web3.js/Ethers.js to create the connection/interface.
6. Invoke the intended contract functions.
7. Display the result in the UI.

**Connection checklist:** Correct chain + correct contract address + matching ABI + intended account/signer.

The address of a user's account is not a substitute for the deployed contract address. Editing the ABI does not add new functions to old deployed bytecode. After deploying a changed contract, update the frontend to use its new instance.

### 4.5 Provider, signer and contract in Ethers.js 6

| Object/concept | Purpose in the EL code |
|---|---|
| `window.ethereum` | Browser-injected provider interface supplied by the wallet in this example. |
| `eth_requestAccounts` | Requests permission to access/select wallet accounts. |
| `new ethers.BrowserProvider(window.ethereum)` | Adapts the injected provider to Ethers.js 6. |
| `await provider.getSigner()` | Obtains an interface for the authorised account's signing operations. |
| `await signer.getAddress()` | Returns the selected signer's address. |
| `new ethers.Contract(address, abi, signer)` | Builds a JavaScript interface to the deployment, able to request signed writes. |

A provider alone can support ordinary public reads. The supplied pages require connection first because their code initialises the contract during wallet connection. That is an application choice, not a rule that all blockchain reads require a connected wallet. [Ethers reference](https://docs.ethers.org/v6/getting-started/)

### 4.6 Read versus write examples

| Action | Read or write? | Normal frontend behaviour |
|---|---|---|
| Get account balance | Read. | Fetch and display data. |
| Show student details | Read. | Call getter and display its return fields. |
| Submit a vote | Write. | Ask for transaction approval, wait, then refresh counts. |
| Update user/student details | Write. | Validate input, submit, wait and display status. |

**Connection versus transaction approval:** Approving account access is not the same as approving every future write. Wallet connection alone does not alter student records or cast a vote.

### 4.7 Best practices and challenges

| Challenge | Appropriate handling |
|---|---|
| Wallet unavailable/locked or permission rejected | Detect provider availability, offer clear status and let the user reconnect. |
| Network mismatch | Check the intended network and deployment; do not assume a successful wallet connection means the correct chain. |
| Transaction delay | Show pending status and wait before claiming success. |
| Gas fees / insufficient balance | Explain the transaction and use a funded local test account for the practical. |
| Contract error/revert | Surface the error and inspect input/permission conditions. |
| UX limitations | Use readable messages, responsive controls, clear inputs and transaction feedback. |

Additional practical habits: minimise unnecessary writes, optimise contract work, use local HTTP serving for the ES modules, and update the signer/contract connection when the account or chain changes. The supplied examples do not implement automatic account/network change listeners.

**Exam answer outline:** Frontend definition → technology roles → workflow → address/ABI/provider/signer → read versus write → usability and failure handling.

## Section 5 — Case Study: Decentralised Voting Application

*Source: PDF pages 49–65, including voting-workflow and transaction-flow diagrams.*

### 5.1 Definition and objectives

A decentralised voting application uses blockchain smart contracts to enforce election rules, record votes and make counts verifiable through a DApp interface.

The source aims to:

- Conduct digital voting securely.
- Prevent unauthorised vote alteration.
- Provide transparency.
- Allow eligible voters to vote once.

**Exam precision:** The slides use “tamper-proof” and “no central authority.” Explain these as intended benefits of validated blockchain records and programmed rules. The case still includes an owner/administrator, and a basic wallet-based voting DApp is not proof of complete real-world election security.

### 5.2 Problem statement and proposed solution

| Traditional-voting challenge in the PPT | Intended contribution of the proposed DApp |
|---|---|
| Centralised control | Shared, inspectable contract rules and records. |
| Possibility of manipulation | Signed transactions and validated state transitions. |
| Lack of transparency | Visible counts and auditable activity. |
| High operational cost | Automate supported registration/voting/counting tasks; transactions still incur costs. |
| Slow counting | Update counters through contract execution. |
| Limited public trust | Make rules and outcomes independently verifiable. |

**Proposed solution:** Use blockchain and smart contracts to automate and secure the supported election process.

### 5.3 System requirements and architecture

**Software:** Remix, MetaMask, Ganache, Web3.js/Ethers.js, HTML/CSS/JavaScript or React.  
**Hardware/connectivity:** Computer/laptop, a modern browser and an internet connection for the hosted tools/libraries used by the guide.

| Component | Role |
|---|---|
| Voter | Connects a wallet, selects a candidate and approves the vote transaction. |
| Frontend application | Shows candidates, voting controls, progress, counts and winner. |
| MetaMask | Provides account access and transaction approval/signing. |
| Web3 library | Connects the frontend to contract methods. |
| Voting contract | Checks rules, records accepted votes and exposes counts/results. |
| Ethereum / local test blockchain | Executes transactions and maintains the resulting election state. |

### 5.4 Smart contract design

The PPT lists these state elements:

| State element | Purpose |
|---|---|
| Election name | Identifies the election. |
| Candidate list | Stores candidates available for voting. |
| Vote count | Tracks votes for each candidate. |
| Owner address | Identifies the administrator for protected operations. |
| Voting status | Indicates whether the election is open/closed or at another defined stage. |

To enforce the listed one-wallet-one-vote rule, a practical implementation also needs a persistent record such as `hasVoted[address]`. Enforcing voter eligibility additionally needs an explicit eligibility rule/data source. These are explanations of implementation needs; the PPT does not supply complete voting source code.

| Listed function | Purpose | Expected interaction type |
|---|---|---|
| Add Candidate | Insert a candidate during the allowed setup stage. | Write. |
| Cast Vote | Validate a vote, increase the chosen count and mark the voter. | Write. |
| Get Vote Count | Retrieve the count for a candidate. | Read. |
| Get Winner | Determine/return the candidate with the highest count. | Can be a read if it only calculates/returns data. |
| Start Election | Change election status to allow voting. | Write. |
| End Election | Close voting. | Write. |

Owner restrictions and the permitted stage for administrative actions must be implemented, not assumed from function names.

### 5.5 Voting workflow from the diagram

The source's ten stages are:

1. Start/create the election.
2. Register candidates.
3. Connect MetaMask.
4. Authenticate/check the voter.
5. Select and cast a vote.
6. Validate the transaction.
7. Record the accepted vote on-chain.
8. Display the updated vote count.
9. End the election.
10. Declare/display the winner.

**Ordering clarification:** The diagram labels its first step “Start Election” before candidate registration. For an implementation, distinguish **creating/configuring** an election from **opening voting**. Prepare/finalise candidates before accepting votes; the source does not define a complete phase model.

### 5.6 Contract rules and a reasoning pattern

Rules explicitly listed:

- Only eligible users may vote.
- One wallet may vote only once in the election.
- An accepted vote cannot be edited through the voting interface.
- Vote counts are updated by contract logic.
- The highest vote count determines the winner under the stated rule.

**Explanatory pseudocode, not supplied implementation:**

```text
castVote(candidateId):
    require election is open
    require caller satisfies the eligibility rule
    require caller has not voted
    require candidateId refers to a valid candidate
    increase candidate's count
    mark caller as having voted
```

If an uncaught check fails, that transaction's state changes do not persist. Hiding a Vote button after one click does not enforce one-vote-per-wallet on-chain.

**Unspecified cases to mention in an exam design answer:** Tied highest counts, zero-vote elections and the exact eligibility mechanism require explicit rules. Do not claim that the slides already define a particular tie-breaker.

### 5.7 Vote transaction flow

User clicks Vote → MetaMask displays confirmation → user signs/approves → transaction reaches the blockchain → contract checks and executes → successful vote is recorded → frontend refreshes counts/results.

The page-59 diagram separates “vote recorded” and “blockchain updated” for teaching. These are parts of a successful transaction outcome, not evidence that a vote remains saved if the transaction later fails.

### 5.8 Frontend controls

| Control/output | Purpose |
|---|---|
| Connect Wallet button | Request account access and show the selected account. |
| Candidate list | Display valid choices. |
| Vote button | Request a vote transaction for the selected candidate. |
| Transaction status | Distinguish approval, submitted, confirmed and failed stages. |
| Current vote count | Display counts read from the contract. |
| Winner display | Show the result under the election's defined rules. |

### 5.9 Security measures, benefits and limitations

**Measures in the PPT:** Wallet-based authorisation, immutable vote history, one vote per wallet, transparent counting, cryptographic protection and decentralised storage.

**Benefits:** Transparent voting, signed transactions, reduced central dependence, tamper-resistant records and rapid programmed counting.

**Limitations in the PPT:** Blockchain knowledge, transaction gas costs, internet dependency, wallet-management difficulties and scalability.

**Important design distinctions:**

- **One wallet is not one person.** A person can control several addresses; eligibility/identity must be handled separately.
- **Wallet connection is not proof of voter eligibility.** The contract needs the election's actual rule.
- **Transparency is not ballot secrecy.** A simple public-chain record can reveal voting activity.
- **An owner remains an authority for its permitted actions.** Decentralised storage does not remove administrator powers.
- **Automatic counting is not automatic scheduling.** Contract code still needs an invocation; the slides do not provide a background scheduler.

### 5.10 Applications and future enhancements

| Applications listed | Future enhancements listed |
|---|---|
| Student council elections | Biometric voter authentication. |
| University elections | Mobile DApp support. |
| Corporate board voting | Multilingual interface. |
| Shareholder voting | Digital identity integration. |
| Community polls | Off-chain storage for election reports. |
| Government elections — future potential | Support for larger-scale elections. |

These enhancements are proposals, not features demonstrated by the provided practical contracts. Report storage outside the blockchain is distinct from the contract's authoritative vote state.

**Exam answer outline:** Problem → proposed solution → requirements → components/state/functions → workflow → vote validation → UI → security/benefits/limitations → applications/future work.


## Section 6 — EL: Building a Decentralised Message DApp

*Source: PDF pages 66–73. All 15 practical steps are covered below.*

**Goal:** Connect a browser page to MetaMask, read a stored message and save a new one through a Solidity contract deployed on Ganache.

**Files:** `MessageStorage.sol` in Remix; `index.html`, `style.css` and `app.js` together in the frontend folder. The complete source code is included at the relevant steps.

### 6.1 Step 1 — Prepare the tools

Prepare Ganache, MetaMask, Remix, VS Code and a browser profile containing MetaMask. The page also uses Ethers.js. Keep Ganache running throughout deployment and testing.

- Ganache supplies the local chain and funded disposable test accounts.
- MetaMask supplies the wallet connection and approval interface.
- Remix handles Solidity compilation/deployment.
- VS Code edits the frontend files.
- The browser runs the interface and loads its JavaScript library.

**Source security point:** Import only a disposable local Ganache account. Do not put a real wallet private key into frontend code, a document or a demonstration.

### 6.2 Step 2 — Record Ganache details

Record the workspace's RPC URL, chain ID, test account address and balance. Common example RPC URLs are `http://127.0.0.1:7545` and `http://127.0.0.1:8545`; a commonly used chain ID is 1337. **Read the actual values from your setup.**

The RPC endpoint routes requests to Ganache. The chain ID identifies the chain configured in the wallet. Stopping Ganache interrupts access; resetting its workspace may remove/change the deployment and state the frontend expects.

### 6.3 Step 3 — Add Ganache to MetaMask

Open the wallet's network settings, add a custom network, enter the RPC URL and chain ID, give it a name such as Ganache Local and select it. ETH may be used as the local currency symbol. Recheck the settings if the wallet rejects the network details.

For this practical, use the local Ganache network on which the contract will be deployed.

### 6.4 Step 4 — Import a funded test account

Use Ganache's account details to obtain a disposable test account's private key, import it through MetaMask's account-import interface, select it and verify the test balance.

**Exam distinction:** The private key authorises the account; the account address identifies it. Neither is the deployed contract address. Do not publish the private key in any of the application's files.

### 6.5 Step 5 — Create MessageStorage.sol

**MessageStorage.sol — source code:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract MessageStorage {
    string public message;
    constructor() {
        message = "Hello Blockchain Students!";
    }
    function setMessage(string memory _message) public {
        message = _message;
    }
    function getMessage() public view returns (string memory) {
        return message;
    }
}
```

| Contract element | Meaning |
|---|---|
| SPDX comment | Source licence metadata. |
| `pragma solidity ^0.8.20;` | Compiler version range starting at 0.8.20 and below 0.9.0. |
| `string public message` | Persistent message; also creates an automatic getter `message()`. |
| Constructor | Runs once at deployment and sets `Hello Blockchain Students!`. |
| `setMessage(string memory _message)` | Replaces persistent text; a successful write transaction is required. |
| `getMessage()` | Returns the current string through a view function. |
| `string memory` | Temporary string value during the call/return, distinct from stored state. |

**Behaviour:** There is one shared message for the contract, not a separate message per wallet. The setter has no owner restriction and no nonempty-string requirement. The supplied frontend rejects blank text, but another caller can directly set an empty string through the contract.

### 6.6 Step 6 — Resolve compiler/EVM compatibility

A compiler version and an EVM target are different settings:

- The compiler must satisfy the Solidity pragma.
- The bytecode target must be supported by the local EVM.

If deployment reports an unsupported/invalid opcode due to target mismatch, the guide suggests selecting **Paris** in Remix's advanced EVM settings, recompiling and redeploying. Solidity 0.8.20 changed its default target to Shanghai and can emit `PUSH0`; an older local EVM may not support that instruction. [Compiler release explanation](https://www.soliditylang.org/blog/2023/05/10/solidity-0.8.20-release-announcement/)

If the guide's fallback compiler **0.8.19** is used, change the source pragma to `^0.8.19` as well. Compiler 0.8.19 does not satisfy `^0.8.20`. Do not assume that raising the gas limit fixes unsupported instructions. Invalid opcode can have other causes; compatibility is the particular issue addressed here.

### 6.7 Step 7 — Compile and check

Compile the latest contract, read errors and correct them before continuing. Warnings are not necessarily fatal but should be understood. After editing the source, compile again.

**Artifacts:** Bytecode is deployed; ABI describes contract interaction. A successful compilation does not create a deployed instance by itself.

### 6.8 Step 8 — Deploy through MetaMask

In Remix, select the injected-provider environment connected to MetaMask. Check the Ganache network and imported account, select MessageStorage, click Deploy, approve the deployment transaction and wait for the deployed instance to appear.

If network/account settings are wrong, correct them before proceeding. After changing compiler/EVM settings, recompile and deploy the resulting artifact.

### 6.9 Step 9 — Copy the deployed address

Copy the address of the newly deployed contract from Remix. Put this address into the frontend's `contractAddress` configuration. Use the latest successful instance on the intended network; do not copy the wallet address.

Redeploying creates a new instance with its own constructor-initialised state. The frontend must use the new address to interact with that instance.

### 6.10 Step 10 — Create the HTML page

Create a `MessageDApp` folder containing the three frontend files. HTML supplies the inputs, buttons and output elements.

**index.html — source code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Decentralized Message DApp</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Decentralized Message DApp</h1>
    <p class="description">Store and retrieve messages using a blockchain.</p>
    <button id="connectButton">Connect MetaMask</button>
    <p id="account"></p>
    <hr>
    <h2>Store a Message</h2>
    <input type="text" id="messageInput" placeholder="Enter your message">
    <button id="storeButton">Store Message</button>
    <hr>
    <h2>Retrieve a Message</h2>
    <button id="readButton">Read Message</button>

    <div class="message-box">
      <h3>Message Stored on Blockchain</h3>
      <p id="storedMessage">No message retrieved yet.</p>
    </div>
    <p id="status"></p>
  </div>
  <script type="module" src="app.js"></script>
</body>
</html>
```

| ID / HTML element | Role |
|---|---|
| `connectButton` | Starts wallet connection. |
| `account` | Displays the selected account address. |
| `messageInput` | Captures the replacement text. |
| `storeButton` | Starts the write request. |
| `readButton` | Starts the getter call. |
| `storedMessage` | Displays the returned message. |
| `status` | Shows progress/errors. |
| Stylesheet link | Loads `style.css`. |
| `script type="module"` | Loads `app.js` as a module so it can import Ethers.js. |

JavaScript uses the exact IDs to locate controls. A mismatched ID can make a lookup return null and prevent the intended handler/output from working.

### 6.11 Step 11 — Add CSS

**style.css — source code:**

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f1f4f9;
  margin: 0;
  padding: 0;
}
.container {
  width: 500px;
  max-width: 90%;
  margin: 60px auto;
  padding: 25px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
h1 { color: #243b64; }
h2 { color: #333333; margin-top: 25px; }
.description { color: #666666; }
input {
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
}
button {
  padding: 12px 18px;
  margin: 8px;
  border: none;
  border-radius: 5px;
  background-color: #4169e1;
  color: white;
  cursor: pointer;
}
button:hover { background-color: #294bb5; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
hr {
  margin: 25px 0;
  border: 0;
  border-top: 1px solid #dddddd;
}
.message-box {
  background-color: #edf5ff;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  overflow-wrap: anywhere;
}
#account { overflow-wrap: anywhere; font-size: 13px; }
#status { margin-top: 20px; overflow-wrap: anywhere; color: #333333; }
```

**CSS concepts:** `body` sets the base font/background; `.container` controls content width, spacing and card appearance; input/button selectors style controls; `button:hover` changes the hover state; `button:disabled` signals an unavailable action; `overflow-wrap:anywhere` prevents long addresses/messages from overflowing; `#account` and `#status` target specific IDs.

`max-width:90%` helps the fixed-width container fit narrower screens. `box-sizing:border-box` includes padding/border in an input's specified width. CSS changes appearance; JavaScript must actually set a button's disabled property.

### 6.12 Step 12 — Write the JavaScript

The code imports Ethers.js 6.13.5 from a CDN. Replace the placeholder address with the deployment from Step 9. The browser needs access to the CDN unless the dependency is served another way.

**app.js — source code:**

```javascript
import { ethers } from
  "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.5/ethers.min.js";
const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";
const contractABI = [
  "function setMessage(string _message)",
  "function getMessage() view returns (string)",
  "function message() view returns (string)"
];
let provider;
let signer;
let contract;
const connectButton = document.getElementById("connectButton");
const storeButton = document.getElementById("storeButton");
const readButton = document.getElementById("readButton");
const messageInput = document.getElementById("messageInput");
const accountDisplay = document.getElementById("account");
const storedMessageDisplay = document.getElementById("storedMessage");
const statusDisplay = document.getElementById("status");
function showStatus(message) {
  statusDisplay.textContent = message;
}
async function connectWallet() {
  try {
    if (!window.ethereum) {
      showStatus("MetaMask is not installed. Please install it first.");
      return;
    }
    showStatus("Connecting to MetaMask...");
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    const accountAddress = await signer.getAddress();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    accountDisplay.textContent = "Connected Account: " + accountAddress;
    showStatus("Wallet connected successfully!");
    connectButton.disabled = true;
  } catch (error) {
    console.error(error);
    showStatus("Wallet connection failed: " + error.message);
  }
}
async function storeMessage() {
  try {
    if (!contract) {
      showStatus("Please connect MetaMask first.");
      return;
    }
    const message = messageInput.value.trim();
    if (message.length === 0) {
      showStatus("Please enter a message.");
      return;
    }
    storeButton.disabled = true;
    showStatus("Please confirm the transaction in MetaMask.");
    const transaction = await contract.setMessage(message);
    showStatus("Transaction submitted. Waiting for confirmation...");
    await transaction.wait();
    showStatus("Message stored successfully on Ganache!");
    messageInput.value = "";
    await readMessage();
  } catch (error) {
    console.error(error);
    showStatus("Transaction failed: " + error.message);
  } finally {
    storeButton.disabled = false;
  }
}

async function readMessage() {
  try {
    if (!contract) {
      showStatus("Please connect MetaMask first.");
      return;
    }
    const message = await contract.getMessage();
    storedMessageDisplay.textContent = message;
    showStatus("Message retrieved successfully!");
  } catch (error) {
    console.error(error);
    showStatus("Unable to read the message: " + error.message);
  }
}
connectButton.addEventListener("click", connectWallet);
storeButton.addEventListener("click", storeMessage);
readButton.addEventListener("click", readMessage);
```

**Connection logic:**

1. Check `window.ethereum`; show a helpful message if no injected wallet is present.
2. Create a BrowserProvider.
3. Request account access with `eth_requestAccounts`.
4. Obtain the signer and its address.
5. Create the contract wrapper from address + ABI + signer.
6. Display the account and disable the successful connection button.

**Write logic:**

1. Require an initialised contract interface.
2. Read the text and `trim()` surrounding whitespace.
3. Reject an empty result before making a contract request.
4. Disable Store to reduce duplicate clicks.
5. Request `setMessage`; the wallet may ask for approval.
6. Show submitted/pending status and await `transaction.wait()`.
7. After success, clear the input and call `readMessage()`.
8. Handle errors in `catch`; re-enable Store in `finally`.

**Read logic:** Check the connected interface, await `getMessage()`, and put the returned text into `storedMessageDisplay.textContent`. An ordinary read does not need a new signed transaction.

| JavaScript concept | Explanation |
|---|---|
| `import { ethers } ...` | Loads the library as an ES module. |
| Human-readable ABI strings | Describe the three functions used by this interface. Names, types and read mutability must match the contract. |
| `let provider, signer, contract` | Hold the connection objects after initialisation. |
| `getElementById` | Obtains an element using its HTML ID. |
| `textContent` | Displays text without treating the value as HTML markup. |
| `async` / `await` | Wait for asynchronous wallet/network operations without a synchronous busy wait. |
| `try` / `catch` | Handle failure without treating it as success. |
| `finally` | Restore the Store control after completion or failure. |
| `console.error` | Send technical error information to the browser console. |
| `addEventListener("click", ...)` | Connect a button click to the relevant function. |

**Trace detail:** After a successful write, `readMessage()` sets the final status to “Message retrieved successfully!”; it overwrites the earlier “Message stored successfully on Ganache!” text. The saved value remains the new message.

**Source limitation:** The code checks for a wallet but does not automatically verify its chain ID or install account/network change listeners. Its contract is created with the signer obtained at connection time. Refresh/reconnect after a switch before treating the new account as the active caller.

### 6.13 Step 13 — Run with Live Server

Open `index.html` through VS Code Live Server, using a local HTTP address such as `http://127.0.0.1:5500/index.html`. Another port is acceptable. Avoid simply double-clicking the file because module imports and provider availability can behave differently under a file URL.

Keep the web server, browser and Ganache running. The frontend server and blockchain RPC server are different processes/endpoints.

### 6.14 Step 14 — Perform the demo

1. Click Connect MetaMask and approve account access.
2. Confirm that the selected account appears.
3. Click Read Message: a fresh deployment returns **Hello Blockchain Students!**.
4. Enter **Welcome to our Blockchain Lab**.
5. Click Store Message and approve the transaction on Ganache Local.
6. Wait for success/read-back; the new message appears.
7. Repeat with different text to demonstrate a state change.

Reading uses a call; storing uses a signed transaction and consumes local-chain gas. Using a local chain avoids spending real mainnet ETH in this exercise.

### 6.15 Step 15 — Verify and troubleshoot

**Verify at three levels:**

- **Web page:** Correct connected account, status and saved message.
- **Remix:** The same deployed instance's `getMessage()` or `message()` returns the new value.
- **Ganache:** The write transaction appears in the intended workspace's transaction list.

| Problem | Check / fix from the guide |
|---|---|
| Invalid opcode on deploy | Investigate target compatibility; select Paris if appropriate, recompile and redeploy; use a compatible compiler/pragma pair. |
| Wrong network | Align MetaMask's RPC URL/chain ID with the Ganache workspace. |
| Contract call fails | Check address, ABI, selected network, current workspace and successful deployment. |
| No MetaMask prompt | Check extension/profile, unlock the wallet, refresh and reconnect. |
| Transaction rejected/fails | Inspect account/network/test balance and the actual error; rejection is not success. |
| Module/import error | Check CDN access, module script, file names and Live Server. |
| Remix message differs | Check that both interfaces use the same chain and contract instance and that the write succeeded. |

### 6.16 Exam tests and important limits

| Test | Expected behaviour |
|---|---|
| Fresh deployment | Initial constructor message appears. |
| Valid frontend write | New message persists after a successful transaction and read-back. |
| Whitespace-only frontend input | Trimmed to empty; no contract write is requested. |
| Direct `setMessage("")` call | Allowed by the source contract; the UI-only check is bypassed. |
| Write from another funded account | Allowed: there is no owner check. |
| Rejected wallet request | No successful saved-state change from that request. |
| Call an older deployed address | Reads/updates that older instance rather than a new deployment. |

**Explain in one paragraph:** The frontend connects to MetaMask, creates an Ethers.js contract interface using a matching address and ABI, reads the initial stored message, and sends a signed setMessage transaction for updates. After waiting for the receipt, it reads the current state again. Remix and Ganache provide independent evidence of the same local deployment and transaction.

## Section 7 — EL: Student Registration DApp

*Source: PDF pages 74–81. The guide's 13 topics, complete source files and updated multiple-registration behaviour are covered below.*

### 7.1 How the DApp works and what changed

The application supports:

1. Register a student with ID, name and course.
2. View a record by ID.
3. Check whether an ID is registered.
4. Update a record only from the wallet that registered it.
5. View the latest ID registered by the current caller.
6. View the total number of successful student registrations.

**Central rule:** One wallet may register **multiple students**, provided every ID is globally unique within this contract. The earlier one-registration-per-wallet check is deliberately absent.

**Architecture:** Browser interface uses Ethers.js and MetaMask to call StudentRegistration on Ganache. Writes need transaction approval; getters read the current state.

### 7.2 Complete updated Solidity contract

**StudentRegistration.sol — source code:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentRegistration {
    struct Student {
        uint256 id;
        string name;
        string course;
        address registeredBy;
    }
    mapping(uint256 => Student) private students;
    mapping(uint256 => bool) public isRegistered;
    mapping(address => uint256) public walletToStudentId;
    uint256 public studentCount;
    event StudentRegistered(
        uint256 studentId, string name, string course, address registeredBy
    );
    event StudentUpdated(uint256 studentId, string name, string course);
    function registerStudent(
        uint256 _id, string memory _name, string memory _course
    ) public {
        require(_id > 0, "Student ID must be greater than zero");
        require(!isRegistered[_id], "Student ID already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_course).length > 0, "Course cannot be empty");
        students[_id] = Student({
            id: _id,
            name: _name,
            course: _course,
            registeredBy: msg.sender
        });
        isRegistered[_id] = true;
        walletToStudentId[msg.sender] = _id;
        studentCount++;
        emit StudentRegistered(_id, _name, _course, msg.sender);
    }
    function getStudent(uint256 _id)
        public view
        returns (uint256, string memory, string memory, address)
    {
        require(isRegistered[_id], "Student not found");
        Student memory s = students[_id];
        return (s.id, s.name, s.course, s.registeredBy);
    }
    function checkRegistration(uint256 _id) public view returns (bool) {
        return isRegistered[_id];
    }
    function getStudentCount() public view returns (uint256) {
        return studentCount;
    }
    function updateStudent(
        uint256 _id, string memory _name, string memory _course
    ) public {
        require(isRegistered[_id], "Student not found");
        require(
            students[_id].registeredBy == msg.sender,
            "Only the registering wallet can update"
        );
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_course).length > 0, "Course cannot be empty");
        students[_id].name = _name;
        students[_id].course = _course;

        emit StudentUpdated(_id, _name, _course);
    }
    function getMyRegistration() public view returns (uint256) {
        return walletToStudentId[msg.sender];
    }
}
```

**Data model:**

| State | Key / value | Meaning |
|---|---|---|
| `Student` | id, name, course, registeredBy | One student record and its registering address. |
| `students` | uint256 ID → Student | Main persistent records. |
| `isRegistered` | ID → bool | Whether an ID is already used. |
| `walletToStudentId` | Address → uint256 ID | Only the latest successfully registered ID for each wallet. |
| `studentCount` | uint256 | Total successful registrations across all wallets. |

**Function behaviour:**

| Function | Read / write | Checks and result |
|---|---|---|
| `registerStudent` | Write | Positive unused ID; nonempty name/course; save record/caller, mark ID, replace latest-ID pointer, increment count, emit event. |
| `getStudent` | Read | Require registered ID; return ID/name/course/registering address. |
| `checkRegistration` | Read | Return bool; an absent ID is false. |
| `getStudentCount` | Read | Return count. |
| `updateStudent` | Write | Require existing ID, matching registering caller and nonempty text; update name/course and emit event. |
| `getMyRegistration` | Read | Return caller's latest ID; default 0 means no successful registration. |

**Update does not:** Change the student's ID, change registeredBy, increment studentCount or move walletToStudentId. An old record remains editable by its registering wallet even after that wallet registers another student.

### 7.3 Solidity commands and statements explained

| Syntax / concept | Meaning in this contract |
|---|---|
| SPDX / pragma | Licence metadata and compiler-version constraint; pragma does not install/select a compiler automatically. |
| `contract` | Groups persistent data and functions. |
| `struct` | Defines the related fields of a Student. |
| `uint256`, `string`, `address`, `bool` | Unsigned integer, text, account address and true/false value. |
| `mapping` | Key-to-value lookup, not an automatically enumerable list. |
| `private students` | No automatic public mapping getter; it does not encrypt the records. |
| `public` state | Creates automatic getters such as studentCount(); explicit getters are also present. |
| `event` / `emit` | Define a log format / record a successful registration or update. The source events have no indexed parameters. |
| Parameters `_id`, `_name`, `_course` | Values supplied by the caller. |
| `string memory` | Temporary parameter data during the call. |
| `require(condition, reason)` | Stop and revert when a required condition is false. |
| `!isRegistered[_id]` | Logical NOT: ID must not already be registered. |
| `bytes(text).length > 0` | Rejects a zero-length string; it does not reject every whitespace-only string. |
| `Student({...})` | Constructs a struct using named fields. |
| `msg.sender` | Current caller; recorded as registeredBy and used for update permission. |
| `studentCount++` | Increment once per successful new registration. |
| `view`, `returns`, `return` | Read-only function annotation, declared result types and returned result values. |
| `Student memory s = students[_id]` | Temporary copy for retrieving fields. |
| `==` | Compares registering address with the current caller. |
| `students[_id].name = _name` | Persistent field assignment; corresponding course assignment updates the second text field. |

**Privacy point from the guide:** getStudent is publicly callable for any registered ID. Private visibility does not make on-chain data confidential; use demonstration data for this exercise.

### 7.4 Compile and deploy the updated contract

1. Create StudentRegistration.sol and paste the updated code.
2. Compile using a version satisfying `^0.8.20`.
3. If the local EVM has the compatibility problem described in Section 6, choose a supported target such as Paris and recompile.
4. Choose Remix's injected-provider environment and the intended Ganache account/network.
5. Deploy and approve the transaction.
6. Copy the **new contract address** into app.js.

An old deployed version that allowed only one student per wallet does not gain the new rule because a local file or ABI was edited. Deploy the changed contract and use the correct new instance. A fresh deployment starts with empty mappings and count 0.

### 7.5 Complete HTML file

**index.html — source code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Registration DApp</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <h1>Student Registration DApp</h1>
    <button id="connectButton">Connect MetaMask</button>
    <p id="walletAddress">Wallet: Not connected</p>
    <section>
      <h2>Register Student</h2>
      <input id="studentId" type="number" placeholder="Student ID">
      <input id="studentName" type="text" placeholder="Student name">
      <input id="studentCourse" type="text" placeholder="Course">
      <button id="registerButton">Register Student</button>
    </section>
    <section>
      <h2>View Student</h2>
      <input id="viewId" type="number" placeholder="Student ID">
      <button id="viewButton">View Student</button>
      <pre id="studentResult"></pre>
    </section>
    <section>
      <h2>Check Registration</h2>
      <input id="checkId" type="number" placeholder="Student ID">
      <button id="checkButton">Check ID</button>
      <p id="checkResult"></p>
    </section>
    <section>
      <h2>Update Student</h2>
      <input id="updateId" type="number" placeholder="Student ID">
      <input id="updateName" type="text" placeholder="New student name">
      <input id="updateCourse" type="text" placeholder="New course">
      <button id="updateButton">Update Student</button>
    </section>
    <section>
      <h2>My Registration</h2>
      <button id="myRegistrationButton">View My Registration</button>
      <p id="myRegistrationResult"></p>
    </section>
    <section>
      <h2>Total Students</h2>
      <button id="countButton">Get Student Count</button>
      <p id="countResult"></p>
    </section>
    <p id="status"></p>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
```

### 7.6 HTML elements explained

| Element / attribute | Role |
|---|---|
| `<!DOCTYPE html>` | Declares HTML document mode. |
| `<html lang="en">` | Document root and language. |
| `<head>` | Metadata container. |
| UTF-8 meta | Character encoding. |
| Viewport meta | Supports correct sizing on narrower/mobile screens. |
| `<title>` | Browser-tab title. |
| Stylesheet `<link>` | Loads style.css. |
| `<main class="container">` | Main content with a class used for styling. |
| `<h1>`, `<h2>`, `<section>` | Page heading, feature headings and grouped controls. |
| `<button id="...">` | Clickable control; exact ID is used by JavaScript. |
| Number/text `<input>` | IDs or text input; HTML type does not replace contract validation. |
| `placeholder` | Input hint, not an entered/submitted value. |
| `<p>` and `<pre>` | Output areas; pre preserves multiline formatting. |
| `<script type="module" src="app.js">` | Loads module JavaScript with import support. |

The interface has separate register, view, check, update, latest-registration and count controls. Input IDs such as studentId, viewId, checkId and updateId belong to different operations.

### 7.7 Complete CSS file

**style.css — source code:**

```css
body {
  font-family: Arial, sans-serif;
  background: #f2f5f9;
  margin: 0;
  padding: 24px;
  color: #202a35;
}
.container { max-width: 760px; margin: auto; }
h1 { color: #17365d; }
section {
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000012;
}
input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}
button {
  padding: 10px 14px;
  margin: 5px 0;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background: #245b8f;
  color: white;
}
pre { white-space: pre-wrap; overflow-wrap: anywhere; }
#status { font-weight: bold; }
```

### 7.8 CSS properties explained

| Selector / properties | Effect |
|---|---|
| `body`: font-family, background, color | Base text style and colours. |
| `margin`, `padding` | Outside spacing versus inside spacing. |
| `.container`: max-width, margin:auto | Limits content width and centres the content block. |
| `h1` | Main-heading colour. |
| `section`: background, padding, margin | Creates separate content cards. |
| `border-radius`, `box-shadow` | Rounded corners and a shadow. |
| `input`: display:block, width:100% | Put inputs on separate lines and fill the container width. |
| `box-sizing:border-box` | Includes padding and border in the specified width. |
| `button`: padding, cursor:pointer, border:0 | Controls spacing, pointer feedback and border removal. |
| `pre`: white-space:pre-wrap | Preserves line breaks while allowing wrapping. |
| `overflow-wrap:anywhere` | Wraps long text/addresses. |
| `#status`: font-weight:bold | Emphasises status text. |

**Selector reminder:** `body`/`section` select element types; `.container` selects a class; `#status` selects an ID.

### 7.9 Complete JavaScript file

Use the address of the updated contract. The code imports the same Ethers.js 6.13.5 version through an ES-module CDN endpoint.

**app.js — source code:**

```javascript
import { ethers } from
  "https://cdn.jsdelivr.net/npm/ethers@6.13.5/+esm";
const contractAddress = "YOUR_NEW_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  "function registerStudent(uint256 _id, string _name, string _course)",
  "function getStudent(uint256 _id) view returns (uint256, string, string, address)",
  "function checkRegistration(uint256 _id) view returns (bool)",
  "function getStudentCount() view returns (uint256)",
  "function updateStudent(uint256 _id, string _name, string _course)",
  "function getMyRegistration() view returns (uint256)"
];
let provider, signer, contract;
const byId = (id) => document.getElementById(id);
function setStatus(message) { byId("status").textContent = message; }
function requireContract() {
  if (!contract) throw new Error("Connect MetaMask first.");
}
function validPositiveId(value) {
  const id = value.trim();
  if (!/^[0-9]+$/.test(id) || BigInt(id) <= 0n) {
    throw new Error("Enter a student ID greater than zero.");
  }
  return id;
}
async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask was not found.");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  byId("walletAddress").textContent = "Wallet: " + await signer.getAddress();
  setStatus("Wallet connected. Confirm the Ganache network in MetaMask.");
}
async function registerStudent() {
  requireContract();
  const id = validPositiveId(byId("studentId").value);
  const name = byId("studentName").value.trim();
  const course = byId("studentCourse").value.trim();
  if (!name || !course) throw new Error("Name and course are required.");
  const tx = await contract.registerStudent(id, name, course);
  setStatus("Registration submitted. Waiting for confirmation...");
  await tx.wait();
  setStatus("Student registered successfully.");
}
async function viewStudent() {
  requireContract();
  const id = validPositiveId(byId("viewId").value);
  const s = await contract.getStudent(id);
  byId("studentResult").textContent =
    `ID: ${s[0]}\nName: ${s[1]}\nCourse: ${s[2]}\nRegistered by: ${s[3]}`;
}
async function checkRegistration() {
  requireContract();
  const id = validPositiveId(byId("checkId").value);
  const exists = await contract.checkRegistration(id);
  byId("checkResult").textContent = exists ?
    "This student ID is registered." : "This student ID is not registered.";
}
async function updateStudent() {
  requireContract();
  const id = validPositiveId(byId("updateId").value);
  const name = byId("updateName").value.trim();
  const course = byId("updateCourse").value.trim();
  if (!name || !course) throw new Error("New name and course are required.");
  const tx = await contract.updateStudent(id, name, course);
  setStatus("Update submitted. Waiting for confirmation...");
  await tx.wait();
  setStatus("Student details updated successfully.");
}
async function viewMyRegistration() {
  requireContract();
  const id = await contract.getMyRegistration();
  byId("myRegistrationResult").textContent = id === 0n ?
    "This wallet has not registered a student." :
    `Most recently registered student ID: ${id}`;
}
async function getStudentCount() {
  requireContract();
  const count = await contract.getStudentCount();
  byId("countResult").textContent = `Total registered students: ${count}`;
}
function handle(buttonId, action) {
  byId(buttonId).addEventListener("click", async () => {

    try {
      setStatus("Processing...");
      await action();
    } catch (error) {
      console.error(error);
      setStatus(error?.shortMessage || error?.reason || error?.message ||
        "Operation failed. Check MetaMask and the browser console.");
    }
  });
}
handle("connectButton", connectWallet);
handle("registerButton", registerStudent);
handle("viewButton", viewStudent);
handle("checkButton", checkRegistration);
handle("updateButton", updateStudent);
handle("myRegistrationButton", viewMyRegistration);
handle("countButton", getStudentCount);
```

### 7.10 JavaScript statements and flows explained

| Statement / feature | Meaning |
|---|---|
| `import` | Loads Ethers.js; requires module loading in HTML. |
| `contractAddress` | The actual deployed instance on the selected chain. |
| Human-readable `abi` | Describes the six functions called by this frontend. A valid subset may omit unused automatic getters/events. |
| `provider`, `signer`, `contract` | Network interface, account authorisation interface and contract wrapper. |
| `const byId = (id) => ...` | Arrow-function helper for document.getElementById. |
| `.value` | Reads an input field's current value. |
| `.textContent` | Displays plain text instead of interpreting HTML. |
| `requireContract()` | Throws a JavaScript Error if connection has not initialised the wrapper; it is not Solidity require. |
| `.trim()` | Removes leading/trailing whitespace. |
| `/^[0-9]+$/` | Requires the complete ID string to contain one or more decimal digits. |
| `BigInt(id) <= 0n` | Rejects zero; compares integers without first converting them to an imprecise JavaScript Number. |
| `async`, `await` | Sequence asynchronous requests and receipts. |
| `window.ethereum.request(...)` | Requests wallet account access. |
| `BrowserProvider`, `getSigner` | Build the Ethers 6 wallet/provider connection. |
| `new ethers.Contract` | Construct an interface; does not deploy Solidity code. |
| `tx.wait()` | Wait for the submitted write transaction's receipt before success status. |
| `s[0]` … `s[3]` | Access the getter's ID, name, course and registering-address results. |
| Backtick template + `${...}` | Insert values into a string; `\n` inserts line breaks in the output. |
| `condition ? a : b` | Choose a display message based on a Boolean result. |
| `id === 0n` | Strictly compare a returned BigInt with BigInt zero. |
| `handle(buttonId, action)` | Attach one reusable async error-handling wrapper to each button. |
| `addEventListener` | Run an action in response to a click. |
| `try/catch`, `console.error` | Handle user-facing errors and log technical details. |
| `error?.shortMessage` | Optional chaining avoids reading a property from null/undefined. |
| `shortMessage \|\| reason \|\| message \|\| fallback` | Use the first truthy available error description. |

**Registration flow:** Check connection → validate ID and trimmed text → call registerStudent → show pending → wait for receipt → show success. The contract repeats its own checks before committing.

**View flow:** Validate ID → getStudent → display the four tuple fields using textContent. Missing IDs revert in this getter.

**Check flow:** Validate ID → checkRegistration → display registered/not registered using `? :`. An absent ID returns false instead of a missing-record revert.

**Update flow:** Validate inputs → request updateStudent → contract checks registeredBy → wait for receipt → show success. UI access alone grants no update rights.

**Latest-registration flow:** Call getMyRegistration using the connected signer context; compare the returned value with **0n**. The answer is one ID, not a list.

**Count flow:** Call getStudentCount and display its BigInt value in a template string. The source does not automatically refresh this display after every registration; use its count button.

**Reusable handler flow:** Set Processing → await the requested action → catch any error → print it in the console and display the best available reason.

**Numeric examples:** `" 103 "` passes after trim; `"000103"` is also a positive digit string and represents the same numeric ID 103. `"0"`, `"-1"`, `"1.5"`, `"1e3"` and `"abc"` fail the helper. The helper returns a string for ABI encoding, preserving large integer digits. It does not explicitly check the uint256 maximum.

Ethers 6 uses JavaScript BigInt for Solidity integer results. Therefore `0n === 0` is false, while `0n === 0n` is true; changing the source comparison to Number zero breaks its no-registration test. [Version reference](https://docs.ethers.org/v6/migrating/)

### 7.11 Run, test and trace the DApp

Start Ganache → select its wallet network/test account → deploy the updated contract → set its address in app.js → save the three frontend files → open through Live Server → connect the wallet.

**Source demo:** From the same wallet A, register 101/Asha/BCA, then 103/Rahul/BCA. Both succeed with unique IDs. View both records; the total on a fresh contract is 2. Test an update as A and a rejected update from B. Refresh/reconnect after switching accounts so the application obtains the intended signer.

| Step on a fresh contract | Outcome | Total | Latest ID for A |
|---|---|---|---|
| A registers 101/Asha/BCA | Store record; registration event. | 1 | 101 |
| A registers 103/Rahul/BCA | Store another record; registration event. | 2 | 103 |
| A updates record 101's name/course | Allowed: A still owns record 101; update event. | 2 | 103 |
| B attempts to update 101 | Rejected; prior record stays intact. | 2 | 103 |
| B attempts to register ID 103 | Rejected because IDs are unique across all wallets. | 2 | 103 |
| B registers a new ID 105 | Succeeds; B's latest ID becomes 105. | 3 | 103 |

**Additional tests:**

| Test | Expected result |
|---|---|
| Register ID 0 | Rejected by helper/contract as applicable. |
| Empty name or course | Rejected. |
| Whitespace-only input through the page | Trimmed and rejected. |
| Direct contract call with a whitespace-only nonempty string | Passes the source's byte-length check; demonstrates a validation gap. |
| getStudent for absent positive ID | Reverts with Student not found. |
| checkRegistration for absent ID | Returns false. |
| getMyRegistration from an unused wallet | Returns 0 as Solidity uint / 0n in Ethers.js. |
| Repeated getter calls | Do not increment studentCount. |
| Successful update | Does not increment studentCount or change the latest registered ID. |

### 7.12 Troubleshooting

| Problem | Check / fix |
|---|---|
| Second unique registration from one wallet fails | Confirm new code was compiled/deployed and app.js points at the updated instance. |
| Duplicate ID | Use a new positive ID; uniqueness is global for this contract, not only per wallet. |
| estimateGas revert | Inspect input, duplicate/absent ID, caller permission, address and network; a failed simulated check is not fixed by blindly raising gas. |
| Wrong network | Select the Ganache chain containing this deployment. |
| Invalid opcode on deployment | Investigate compiler/EVM target mismatch; recompile for a supported target. |
| Update rejected | Use the wallet saved in that record's registeredBy field. |
| Page/buttons fail | Check local HTTP serving, module/CDN import, exact file names, DOM IDs and browser console. |
| Account switched but caller seems unchanged | Reconnect/recreate the signer and wrapper; the supplied code has no automatic change listener. |

### 7.13 Limitations and extensions

**Latest-ID limitation:** Registering 101 and then 103 overwrites only `walletToStudentId[A]`, not `students[101]`. To retrieve all IDs for a wallet, an extension could store `mapping(address => uint256[])` and append each new ID. This extension is proposed, not included.

Other extensions named in the guide:

- Add admin-only registration.
- Display event logs.
- Improve validation.
- Add a search/list page.

**Source boundaries:** Anyone can register an unused valid ID; there is no administrator-only rule. Updates belong to each record's registering wallet. The frontend ABI omits events, and the UI does not subscribe to/display them. A private mapping is not confidential storage. The demo is for a local teaching chain, not a complete production student-information system.

### 7.14 Compare the two EL applications

| Aspect | Message DApp | Student Registration DApp |
|---|---|---|
| Main data | One shared string. | Records keyed by unique student ID. |
| Write functions | setMessage. | registerStudent, updateStudent. |
| Read functions | getMessage, automatic message getter. | Record, existence, total and caller's latest ID. |
| Access restriction | Setter is unrestricted. | Any wallet may register; only registeredBy may update its record. |
| Blank text | Rejected in frontend only. | Empty strings rejected in contract; frontend also trims whitespace. |
| Multi-wallet behaviour | Callers overwrite the same message. | Callers share the ID namespace; ownership is stored per record. |
| Post-write UI | Automatically reads message again. | Shows success; use view/count controls to refresh their displayed values. |
| Events | No custom events declared in this source. | StudentRegistered and StudentUpdated. |
| Important error | Wrong instance / EVM target / rejected request. | Duplicate ID / wrong updating wallet / old deployed version. |

### 7.15 Source and clarification references

The uploaded **U4-COMBINED.pdf** is the primary syllabus source. All seven section ranges appear in the opening table. Complete EL code is reproduced from the supplied guide, including its configuration placeholders. Explanatory limits/corrections are identified beside the relevant topic.

- [Ethers.js 6: provider, signer, ABI, contract calls and waiting for transactions](https://docs.ethers.org/v6/getting-started/)
- [Ethers.js 6 migration: BrowserProvider and BigInt](https://docs.ethers.org/v6/migrating/)
- [Solidity 0.8.20: Shanghai default and PUSH0](https://www.soliditylang.org/blog/2023/05/10/solidity-0.8.20-release-announcement/)
- [Solidity 0.8.20: selecting a compatible EVM target](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html#setting-the-evm-version-to-target)
- [Ethereum: DApp architecture and limitations](https://ethereum.org/developers/docs/dapps/)
