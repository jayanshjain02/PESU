# Unit IV: Decentralized Applications — Last-Minute Cheat Sheet

**Course:** Blockchain dApp Development (UQ24CA343AA3)  
**Source:** `U4-COMBINED.pdf`. Seven sections; **Sections 6 and 7 are EL**. Full explanations and both complete DApps are in `notes.md`.

## Section 1 — Development Environment and Stack

**Definition:** Tools used to design, build, test, deploy and interact with DApps.

**Objectives:** Develop contracts; test locally; connect users; deploy applications; interact with networks.

| Component | Job |
|---|---|
| Remix | Write, compile, deploy and interact with Solidity. |
| MetaMask | Accounts, connection permissions and transaction signing. |
| Ganache | Local Ethereum test blockchain and funded test accounts. |
| Web3.js / Ethers.js | Frontend-to-blockchain communication. |
| HTML / CSS / JS / optional React | Structure / styling / behaviour / component-based UI. |
| Ethereum / EVM | Execute contracts and maintain blockchain state. |
| VS Code / Live Server | Edit frontend files / serve them over local HTTP. |

**Development workflow:** Design → Solidity → compile/test → deploy → frontend → wallet → interact.

**Logical stack:** Frontend uses a Web3 library/provider; the wallet authorises writes; the contract executes on the blockchain. Reads normally skip transaction signing.

**Configuration terms:** RPC URL = node endpoint; chain ID = selected chain; wallet address = caller; contract address = deployed instance; ABI = interaction description; bytecode = executed program.

**Examples, not fixed requirements:** Ganache RPC `127.0.0.1:7545` or `:8545`; Live Server `:5500`; chain ID may be 1337. Use your workspace's actual values.

**Benefits:** Easier development, local testing, wallet integration, debugging/deployment support and faster iteration.

## Section 2 — DApps and Platforms

**DApp:** Frontend + smart-contract backend on a decentralised blockchain network.

**Features:** Decentralised, commonly open source, blockchain-based, smart-contract driven, peer-to-peer, transparent, tamper-resistant history, signed/validated transactions.

**Working:** User action → frontend request → wallet approval for writes → contract execution → network state/result → UI.

**Benefits:** Security, transparency, data integrity, reduced central dependence, fault tolerance, global access, user asset control and verifiable rules.

| Platform | PPT feature | PPT uses |
|---|---|---|
| Ethereum | Smart contracts; large ecosystem | DeFi, NFTs, DApps |
| Polygon | Fast; low transaction fees | Gaming, DeFi |
| BNB Smart Chain | EVM compatible; low cost | DeFi, tokens |
| Solana | High throughput | Gaming, NFTs |
| Hyperledger Fabric | Permissioned | Enterprise |

**Selection factors:** Speed, cost, security, scalability, contract support, community, tools, ecosystem compatibility. The table is qualitative; no universal “best platform.”

**Applications:** DeFi, NFT markets, gaming, supply chains, digital identity, healthcare records, voting, educational certificates.

**Traps:** Immutable history does not forbid authorised state updates. A DApp may still depend on a central frontend/RPC service. EVM compatibility does not share deployments/state. Transparency is not confidentiality; signatures do not guarantee correct business logic.

## Section 3 — Structure and Contract Interaction

**Six components:** User, frontend, wallet, Web3 library, contract, blockchain.

| Operation | Example | Normal browser interaction |
|---|---|---|
| Read / view | Get message, record or balance | Call; no new signed transaction or user gas payment. |
| Write | Save message, update record, vote | Signed transaction; gas consumed; wait for result. |
| Payable action | Send ETH into a contract | Transaction with attached value. |

**Remember:** Nonpayable writes still consume gas. Payable permits ETH; it does not force positive value. View code can consume gas if executed inside a transaction.

**Lifecycle:** Request → wallet confirmation → submitted → network validation/execution → success/failure → read-back/display.

```javascript
// Fragment inside an async function:
const tx = await contract.setMessage("New message");
await tx.wait();
const saved = await contract.getMessage();
```

**Submission ≠ successful execution.** A hash is not proof of success. One transaction may contain several assignments; no separate prompt is required for each field.

**Best practices:** Validate in UI and contract; avoid unnecessary writes; show pending/success/error; handle failures; check account/network; reduce wasted contract work/gas.

## Section 4 — Frontend Development

**Purpose:** Let users enter data, connect a wallet, read/write contract data and understand transaction outcomes.

**Connection steps:** Deploy → copy address → obtain ABI → connect wallet → create library interface → call method → show result.

| Ethers.js 6 / browser concept | Meaning |
|---|---|
| `window.ethereum` | Injected wallet/provider interface in the example. |
| `eth_requestAccounts` | Request account access. |
| `new ethers.BrowserProvider(...)` | Wrap the injected provider. |
| `await provider.getSigner()` | Obtain account authorisation interface. |
| `await signer.getAddress()` | Read the connected signer's address. |
| `new ethers.Contract(address, abi, signer)` | Wrap an existing deployment; **does not deploy**. |
| `await tx.wait()` | Wait for the transaction receipt/outcome. |

**Frontend workflow:** Open page → connect wallet → initialise contract → user action → call → processing → updated display.

**Four things must agree:** **Chain + deployed address + ABI + intended signer.** An ABI may omit unused functions, but the functions used must match. Changing an ABI does not change deployed code.

**HTML/CSS/JS reminders:** IDs connect HTML to handlers; `type="module"` permits imports; textContent shows text; CSS is appearance; React is optional. Provider-only public reads are possible, although these sample pages initialise their contracts during wallet connection.

**Challenges:** Wallet/profile/permission issues; wrong network; pending transactions; gas/balance; contract errors; confusing UX. Reconnect/rebuild connection objects after account/network changes if no automatic listener is implemented.

## Section 5 — Voting DApp Case Study

**Problem:** Centralised control, manipulation risk, low transparency, operating cost, slow counting, limited trust.  
**Solution:** Contract-enforced voting rules and verifiable blockchain records/counts.

**Requirements:** Remix, MetaMask, Ganache, Web3 library, web frontend; laptop, browser and connectivity for the hosted tools.

| Design part | Recall |
|---|---|
| Actors/components | Voter, frontend, wallet, library, voting contract, blockchain. |
| Listed state | Election name, candidates, vote counts, owner, voting status. |
| Listed methods | Add Candidate, Cast Vote, Get Vote Count, Get Winner, Start Election, End Election. |
| Extra state needed to enforce rules | A voted-address record and a defined eligibility mechanism. |
| UI | Connect button, candidates, Vote button, transaction status, counts, winner. |

**Source workflow:** Start/create election → candidates → connect wallet → check eligibility → cast → validate → record → update count → end → winner.

**Implementation clarification:** Separate election setup from opening voting; configure candidates before accepting votes.

**Vote checks:** Election open; caller eligible; caller not already voted; candidate valid. Then increment count and mark voter. Rejected operations do not consume a successful vote.

**Rules:** One wallet/one accepted vote; no vote-edit operation; counts updated by logic; highest count determines winner. **Tie/no-vote handling is unspecified in the PPT.**

**Security/benefits:** Signed transactions, tamper-resistant records, one-wallet enforcement, transparent counting, cryptography, distributed storage, fast programmed counting.

**Limits:** Blockchain knowledge, fees, internet, wallet management, scale. One wallet ≠ one person; connection ≠ eligibility; public records ≠ secret ballots; owner/admin powers still exist. Counting automatically during execution is not background scheduling.

**Applications:** Student councils, universities, corporate boards, shareholders, community polls; government elections are future potential.

**Future work:** Biometrics, mobile support, multilingual UI, digital identity, off-chain election reports, large-scale elections. These are proposals, not implemented features in the two EL DApps.

## Section 6 — EL: Message DApp

**Goal:** Read/update one shared string on Ganache. **Files:** MessageStorage.sol; index.html; style.css; app.js.

**All 15 steps:**

| Steps | Action |
|---|---|
| 1–4 | Prepare tools; note Ganache RPC/chain details; add network to MetaMask; import/select a funded disposable test account. |
| 5–7 | Write contract; align compiler/EVM target; compile and inspect errors. |
| 8–9 | Deploy through Remix's injected provider; approve; copy the successful contract address. |
| 10–12 | Create HTML; style with CSS; add Ethers.js 6 JavaScript with the correct address/ABI. |
| 13–15 | Open via Live Server; connect/read/store; verify in page + Remix + Ganache and troubleshoot. |

| Contract part | Behaviour |
|---|---|
| `message` | Persistent shared string; public getter message(). |
| Constructor | Sets **Hello Blockchain Students!** |
| `getMessage()` | View getter returning the string. |
| `setMessage(string memory)` | Public nonpayable write; no owner or blank-string check. |

**Compatibility:** Solidity `^0.8.20` requires compiler ≥0.8.20 and <0.9.0. An older EVM may reject Shanghai `PUSH0`; select a supported target such as **Paris**, recompile and redeploy. If using compiler 0.8.19, also change pragma to `^0.8.19`. More gas does not repair an unsupported opcode.

**Connect:** Detect provider → request accounts → obtain signer/address → create contract → show account → disable Connect after success.

**Store:** Check contract → trim input → reject blank → disable Store → request transaction → await receipt → clear input → read back → finally re-enable Store.

**Read:** Call getMessage → textContent → status. After successful store/read-back, final status becomes **Message retrieved successfully!**

**HTML IDs:** connectButton, account, messageInput, storeButton, readButton, storedMessage, status. `addEventListener` wires clicks. CSS includes container/input/button styles, hover/disabled states and long-text wrapping.

**Critical traps:**

- UI rejects spaces, but direct `setMessage("")` succeeds. Another wallet can overwrite the same message.
- A new instance starts with constructor state; an old address still points to the old instance.
- Module/CDN failure can prevent handlers loading. Use local HTTP and a wallet-enabled browser profile.
- Check the same chain/instance in page, Remix and Ganache; rejected/pending is not confirmed.
- Use local test keys only; no private keys belong in frontend source.

## Section 7 — EL: Student Registration DApp

**Updated rule:** One wallet may register **many students**, but every ID must be unique within the contract.

| State | Meaning |
|---|---|
| Student struct | id, name, course, registeredBy. |
| `students[id]` | Persistent record; private does not mean secret. |
| `isRegistered[id]` | Used-ID flag. |
| `walletToStudentId[wallet]` | **Latest** ID only; not an array. |
| `studentCount` | Number of successful new registrations. |

| Function | Essential behaviour |
|---|---|
| registerStudent | Positive unused ID, nonempty text; store caller; set flag/latest ID; increment count; emit StudentRegistered. |
| getStudent | Require existing ID; return ID/name/course/registering address. |
| checkRegistration | Return bool; absent ID → false. |
| getStudentCount | Return count. |
| updateStudent | Existing ID + caller equals registeredBy + nonempty text; change name/course; emit StudentUpdated. |
| getMyRegistration | Return current caller's latest ID; unused wallet → 0 / **0n in JS**. |

**Trace:** A registers 101 then 103 → both records remain; count 2; A's latest ID 103. A may still update 101. Update changes neither count nor latest ID. B cannot update A's record or register an already-used ID; B may register a new ID.

**Source-code concepts:** SPDX/pragma; struct/mappings; uint256/string/address/bool; public getters; memory copies; require; `!` NOT; `==` equality; `++` count; msg.sender; view/returns; event/emit. The source events are not indexed, and the frontend does not display them.

**HTML:** main/sections/headings; typed inputs; exact IDs; placeholders are hints; pre shows multiline output; module script imports Ethers.  
**CSS:** `.container` class; `#status` ID; margin outside/padding inside; max-width/centering; border-box; cards; pre-wrap and overflow-wrap.

**JavaScript essentials:**

- byId uses getElementById; textContent safely displays text.
- requireContract throws a JS error before using an uninitialised wrapper.
- validPositiveId = trim → digits-only regex → BigInt > 0n → return the digit string.
- `"000103"` is ID 103; `"1e3"`, decimals, negatives and zero fail the helper. It has no explicit uint256 maximum check.
- Ethers 6 integers are **BigInt**: `0n === 0` is false. Use `id === 0n`.
- `s[0..3]` gives the record fields; template strings format them; `? :` chooses a message.
- async/await sequences calls; tx.wait waits for writes; handle attaches click actions with try/catch.
- Optional chaining `?.` and `||` choose the first useful error text; console.error helps debugging.
- Success status does not automatically refresh every display; use View/Count controls.

**Deployment/tests:** Deploy the updated version; set its new address; connect correct account/chain; register 101/Asha/BCA then 103/Rahul/BCA from the same wallet; view/count; test owner and non-owner updates.

**Troubleshooting:** Second unique registration fails → check old contract/address. Duplicate → new ID. Update rejected → registering wallet only. estimateGas revert → inspect validation/permission/address/network. Buttons fail → module/CDN/HTTP/DOM IDs. Account switch → reconnect if needed.

**Limits/extensions:** Latest pointer is not a list; an address-to-ID-array can add listing. Admin-only registration, event displays, stronger validation and a search/list page are proposed extensions. Empty text is rejected on-chain, but nonempty whitespace can pass a direct call; frontend trimming is stricter. Use nonconfidential demo data.

**Final exam distinctions:** **ABI ≠ bytecode; account ≠ contract; connect ≠ approve write; submit ≠ succeed; current state ≠ history; UI check ≠ contract enforcement; latest ID ≠ all IDs; update ≠ registration.**

**References:** The PDF is the primary source. Technical clarifications: [Ethers.js 6](https://docs.ethers.org/v6/getting-started/), [BigInt](https://docs.ethers.org/v6/migrating/), [Solidity 0.8.20 target compatibility](https://www.soliditylang.org/blog/2023/05/10/solidity-0.8.20-release-announcement/).
