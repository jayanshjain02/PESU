# Unit III: Smart Contract Platforms — Last-Minute Cheat Sheet

**Course:** Blockchain dApp Development (UQ24CA343AA3)  
**Source:** `U3-COMBINED.pdf`. Same seven sections as `notes.md`; the last two are **EL**.  
**Revision order:** Definitions → comparison tables → program outputs → error/permission traps. For full explanations and complete programs, use `notes.md`.

## Section 1 — Ethereum, Ether, Gas and EVM

| Term | One-line recall |
|---|---|
| Ethereum | Open-source, decentralised blockchain platform for smart contracts and DApps. |
| Smart contract | Blockchain program that executes its rules when called. |
| DApp | Application using decentralised blockchain logic, usually with a frontend. |
| Ether / ETH | Native currency: transfers, gas payments, deployment, DApp interaction and validator incentives. |
| Gas | Units measuring execution work. **Gas fee** is the ETH paid. |
| EVM | Runtime executing contract bytecode and computing state changes deterministically. |
| Bytecode / ABI | Executable EVM program / interface for encoding calls and interpreting results/events. |

**Features:** Decentralisation, smart contracts, DApps, transparency/security, open source, developer community, programmable transactions.

**Architecture roles:** Users send requests/transactions; wallets authorise them; developers build; nodes verify execution; validators support consensus; contracts hold logic/state; the blockchain records transactions/code and supports shared state. DApp examples: **DeFi, games, social networks, marketplaces, identity**.

**EVM responsibilities:** Execute code, compute state, enforce execution rules, isolate execution, produce identical results for identical state/context/inputs.

**Execution:** Write Solidity → compile → bytecode + ABI → deploy transaction → EVM executes → successful state update.

**Gas purposes:** Charge resources, discourage spam, bound computation, allocate capacity, support incentives.

`Fee = gas used × effective gas price`  
`1 ETH = 10^18 wei`; `1 gwei = 10^9 wei = 10^-9 ETH`  
`200,000 gas × 20 gwei = 0.004 ETH`

**Traps:** Gas limit is not gas used. Failed execution is not free. Modern base fee is burned; the priority fee goes to validators. Ethereum was proposed in **2013**, launched in **2015**; modern Ethereum uses validators, not miners.

## Section 2 — Developing Smart Contracts

**Objectives:** Automate agreements, execute transactions securely, reduce intermediaries, build DApps.

**Prerequisites:** Blockchain fundamentals + Ethereum + contract concepts + programming logic.

| Tool | Remember |
|---|---|
| Remix | Write, compile, deploy and interact. |
| MetaMask | Wallet/accounts, network connection and transaction authorisation. |
| Ganache | Course's local blockchain for testing. |
| Browser | Hosts development/DApp interfaces; not the EVM. |

**Lifecycle:** Design → code → compile → test → deploy → interact/verify.

**Certificate example:** Design certificate structure; store its details in a contract; compile; test sample/invalid cases; deploy; verify through contract reads.

| Challenge | Response |
|---|---|
| Coding errors | Compile + test logic/boundaries. |
| Security vulnerabilities | Validate input and permissions. |
| High gas | Avoid unnecessary writes/large loops. |
| Wrong deployment | Check account, network, inputs and resulting address. |
| Immutability | Test before deployment; ordinary deployed code cannot simply be edited in place. |
| Scalability | Bound work and growing-data operations. |

**Traps:** Compiles ≠ correct. Local deployment ≠ mainnet deployment. Blockchain storage ≠ truth of supplied data. Automatic rule execution still needs invocation.

## Section 3 — Solidity, Variables and Types

**Solidity:** High-level, statically typed, object-oriented; supports inheritance, libraries and events; compiles to EVM bytecode. Secure code still needs correct logic.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract HelloBlockchain {
    string public message = "Hello Blockchain";
}
```

**Skeleton:** SPDX = licence; pragma = compiler constraint; contract = data/behaviour container. `^0.8.20` means `>=0.8.20`, `<0.9.0`. `public` creates a **getter**, not a setter. Calling `message()` returns the string.

| Variable | Recall |
|---|---|
| State | Contract-level; persists between calls. |
| Local | Declared inside a function; used in its execution. |
| Global | Built-in current-call/block information. |

| Built-in | Meaning |
|---|---|
| `msg.sender` | Immediate caller address. |
| `msg.value` | Attached ETH value **in wei**. |
| `block.number` | Current block number. |
| `block.timestamp` | Current block time in Unix seconds. |
| `address(this).balance` | Contract's actual ETH balance in wei. |

**Value types:** `bool`, signed `int`, unsigned `uint`, 20-byte `address`, `bytes1`–`bytes32`, `enum`.  
**Reference types:** `string`, dynamic `bytes`, arrays, structs, mappings.  
**Correction:** `bytes` ≠ `bytes32`; the former is dynamic/reference, the latter fixed-size/value.

| Collection | Pattern / behaviour |
|---|---|
| Array | `bool[] attendance;` → ordered, index 0 onward, `push`, `length`. |
| Struct | `struct Student { string name; uint age; bool passed; }` → grouped record. |
| Mapping | `mapping(uint => string) students;` → key to value; no built-in key list. |

**Defaults:** uint → 0; bool → false; string → empty; address → zero address. Unset mapping values have defaults. `uint = uint256`; ordinary arithmetic overflow/underflow is checked in 0.8.x. Integer division truncates; division by zero fails.

**Operators:** `=` assign; `==` compare; `!` negate; `%` remainder; `++/--` increment/decrement; `+=/-=` update. `i % 2 != 0` means odd.

## Section 4 — Control Structures, Functions and Modifiers

| Construct | Recall |
|---|---|
| if / else | One conditional path / alternate path. |
| else-if | First matching branch wins; grade thresholds go highest first. |
| for | Initialise → condition → body → update. |
| while | Condition before body; zero iterations possible. |
| do–while | Body before condition; at least one iteration. |
| break | Exit nearest loop; continue after loop. |
| continue | Skip current iteration's remainder. |
| return | Return from function body; remaining modifier code can still run. |

**Function pattern:** `function name(parameters) visibility mutability modifiers returns (types) { ... }`

| Visibility | Who can call internally? | External call? |
|---|---|---|
| public | Same/derived contract | Yes |
| private | Same contract only | No |
| internal | Same/derived contract | No |
| external | Not through a direct internal call | Yes; `this.f()` is an external self-call |

| Mutability | Rule |
|---|---|
| pure | Parameter/local calculations; no state read/write. |
| view | Read state; no state modification or event emission. |
| payable | Can accept attached ETH. |
| No keyword | State changes permitted; nonpayable by default. |

**Constructor:** Runs once at deployment; often `owner = msg.sender`.

**Modifier fragment:**

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

Attach it to the function. **`_;` = execute the function body here.** Code before/after it surrounds that body. Uses: access control, validation, reusable rules, maintainability.

**Traps:** Visibility ≠ mutability. Private ≠ encrypted. `uint mark <= 100` covers 0–100. Payable does not require a positive amount. Large loops can exhaust gas. Pure/view execution inside a transaction still consumes gas.

## Section 5 — Events, Logging, Data Locations and Errors

**Event = structured log format; logging = recording activity for external DApps/explorers.**

```solidity
event Deposit(address indexed sender, uint amount);
// Inside a payable function:
// emit Deposit(msg.sender, msg.value);
```

`event` declares; `emit` records; `indexed` helps external filtering. Logs support tracking/notifications but do not replace storage and are not directly queryable as state by the contract.

| Location | Lifetime | Writable? | Use |
|---|---|---|---|
| storage | Persistent | Yes in permitted state changes | State records; costlier persistent writes. |
| memory | Temporary call data/work | Yes | Copies, temporary strings/structs. |
| calldata | Current input | No | Read-only reference-type parameters; avoids some copies. |

**Critical pattern:** `Student storage s = students[i]` → changing s changes the saved record. `Student memory m = students[i]` → changing m alone does not.

| Error mechanism | Use |
|---|---|
| `require(condition, "reason")` | Expected input, permission and precondition checks. |
| `assert(condition)` | Internal invariant that correct logic should preserve. |
| `revert("reason")` | Explicit rejection, commonly in an if branch. |

**Useful invariant:** `balance == totalDeposited - totalWithdrawn`.  
**Weak assertion:** `uintBalance >= 0` is already guaranteed by the type.

**Uncaught failure:** Undo that transaction's state changes and logs; keep earlier successful transactions; consumed gas still costs. An event-emitting function cannot be view. A pure function may validate input with require.

## Section 6 — EL: Basic Programs (All 20)

| # | Program | Last-minute rule / output |
|---|---|---|
| 1 | Student profile | State string/uint/bool; public getters → Rahul, 21, true. |
| 2 | Local calculator | Pure; `10 + 20 = 30`; no state update. |
| 3 | Student result | Stored marks; `>= 40` Pass, otherwise Fail; getter view. |
| 4 | Voting eligibility | Pure input check; `age >= 18`. |
| 5 | Grades | A: ≥90; B: 75–89; C: 60–74; D: 40–59; F: <40. Source does not reject >100. |
| 6 | Transaction sender | `msg.sender`; view; does not actually register a user. |
| 7 | Block information | `block.number`, `block.timestamp`; view. |
| 8 | Student struct | Name/age/pass record; later registration replaces the one record. |
| 9 | Student mapping | ID → name; duplicate key overwrites; unset → empty string. |
| 10 | Attendance array | push flags; zero-based index; out-of-range fails. |
| 11 | For-loop sum | 1 through 10 → **55**. |
| 12 | While factorial | Start result at 1; **0! = 1**, **5! = 120**. Large inputs can overflow. |
| 13 | Continue/even sum | Skip odd i; 2+4+6+8+10 → **30**. |
| 14 | Break/search | Result **5**. Original source returns before break; corrected notes store 5, break, then return. |
| 15 | Visibility calculator | Public add; private multiply via wrapper; internal subtract; external divide. calculate → **20**; 9/2 → **4**. |
| 16 | Ether wallet | **Actual ETH**: payable, msg.value, deposit counter; actual balance = address(this).balance. |
| 17 | Admin control | Constructor sets owner; onlyOwner restricts value update. |
| 18 | Marks modifier | uint + require `<= 100`; 0 and 100 valid, 101 rejected. |
| 19 | Owner student | Only owner stores name/age; public view tuple getter. |
| 20 | Class election | Owner sets names; mapping address → hasVoted; only choices 1/2; one valid vote per address. |

**Election trap:** An invalid candidate reverts without marking the caller as voted. A later valid vote can succeed. A second valid vote from that address fails. Address identity does not prove unique human identity.

## Section 7 — EL: Integrated Programs (All 8)

| # | Program | Data / validation / result |
|---|---|---|
| 1 | Registration + events | Mapping ID → Student; positive ID, nonempty name/course, no duplicate; save then emit; indexed ID/caller; getter copies. |
| 2 | BankAccount | Holder/balance/counter; constructor initialises; positive deposit and name update each increment counter; pure message changes no state. **Internal ledger only.** |
| 3 | Marks + storage/memory | Array of structs; valid index and marks ≤100; storage alias updates; memory getter copies; count/total getters. **75+85=160; replace 75 with 90 →175.** |
| 4 | Calldata student search | Private ID mapping; ID 0 means absent; getStudent rejects missing ID. **searchByName only validates/echoes text; it does not search.** |
| 5 | ATM require | Per-address internal balances; positive amounts, sufficient funds; transfer rejects zero address/self. **1000−300−200=500; recipient gets 200.** |
| 6 | Bank assert | Shared internal ledger; maintain balance, totalDeposited, totalWithdrawn; require inputs; assert relationship. **1000−300=700; verification true.** |
| 7 | Voter revert | Per-address age/eligible/registered; accept **18–120 inclusive**; no repeat registration; emit on register/check; checkEligibility is not view. |
| 8 | Library | Librarian-only add; books mapping; nested member/book borrowed flag; validate existence, availability and loan status; update copies and emit. |

**Library flow:** Add 3 → member issues: 2 / flag true → returns: 3 / flag false. Reject duplicate issue, return without borrowing, absent book, zero availability and unauthorised addition. Different members can borrow remaining copies. One member holds at most one copy of a given book at a time.

**Library invariant trap:** `availableCopies < type(uint).max` after decrement is only a weak sanity check. A stronger proposed relationship is `availableCopies + copiesOnLoan == totalCopies`; the source does not implement those extra counters.

**Five final checks before writing any program answer:**

1. Which fields persist, and which data is temporary?
2. Is the function pure, view, payable or state-changing?
3. Which caller/input must be rejected, and where is the check applied?
4. What exact state, return value and event follow a successful call?
5. What stays unchanged if the next call fails?

**Clarification references:** [Solidity 0.8.20](https://docs.soliditylang.org/en/v0.8.20/), [Ethereum gas](https://ethereum.org/developers/docs/gas/), [Ethereum history](https://ethereum.org/ethereum-history-founder-and-ownership/). Detailed source notes are in `notes.md`.
