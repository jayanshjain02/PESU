# Unit III: Smart Contract Platforms — MCQ Practice

**Source:** `U3-COMBINED.pdf`; section numbering matches `notes.md`.  
**Exactly 28 questions:** 4 per section = **1 Easy + 3 Very Tough**. Sections 6 and 7 are **EL**.  
**Instructions:** Choose exactly one option (A–D) per question. The answer key and explanations are at the bottom. The difficult questions deliberately combine several topics so that each section receives broad coverage.

**Common assumptions:** Solidity 0.8.20 semantics; ordinary checked arithmetic; enough gas unless stated otherwise; calls listed in a sequence are separate transactions/calls; an uncaught failure does not cancel earlier successful transactions. Actual Ether amounts are stated explicitly. A numerical `deposit(amount)` in an EL accounting simulation does not imply an Ether transfer. All code snippets are fragments inside otherwise valid contracts unless a full contract is shown.

## Section 1 — Ethereum, Ether, Gas and EVM

### Q1 — Easy

Which option correctly matches the platform, its native cryptocurrency and its smart contract execution environment?

- A. Ether — Ethereum — Solidity
- B. Ethereum — Ether (ETH) — EVM
- C. EVM — Gas — MetaMask
- D. Ethereum — Gas — Remix

### Q2 — Very Tough

A developer compiles a marketplace contract and gives a frontend developer only its ABI. The frontend developer claims that the ABI is the executable contract and that no deployment transaction is needed. Assess these statements:

I. A wallet can authorise a deployment transaction, but the EVM executes bytecode rather than the ABI.  
II. Users, developers, network nodes, validators and DApps have distinct roles in Ethereum's architecture.  
III. Ethereum's open-source, decentralised design guarantees that every application built on it has correct business logic.  
IV. Games, identity systems, DeFi and marketplaces can all be DApp categories.  
V. Ethereum's 2015 network launch and its earlier proposal are different historical milestones; the source's “miners/validators” label should not be interpreted as modern Ethereum requiring mining.

Which set is entirely correct?

- A. I, II, III and IV only
- B. I, II, IV only
- C. I, II, III, IV and V
- D. I, II, IV and V only

### Q3 — Very Tough

A contract deployment has a gas limit of **300,000**, actually uses **200,000 gas**, and has an effective gas price made up of a **base fee of 18 gwei** plus a **priority fee of 2 gwei**. There is no ETH value transfer in the transaction. Assume these hypothetical prices remain unchanged.

Which statement is correct?

- A. The fee is 0.004 ETH; the priority-fee component is 0.0004 ETH; raising only the gas limit to 400,000 does not change the fee if gas used stays 200,000.
- B. The fee is 0.006 ETH because the whole gas limit is necessarily charged, and the validator receives all of it.
- C. The fee is 0.004 ETH; the validator receives all 0.004 ETH, including the base-fee component.
- D. The fee is 0.000004 ETH because 1 gwei equals one millionth of one wei.

### Q4 — Very Tough

Two nodes execute the same bytecode from the same starting state with identical transaction and block inputs and obtain identical results. Later, the same contract returns a different caller address and block timestamp during a different call. A developer concludes that EVM determinism has failed.

Which diagnosis correctly combines execution, determinism and state recording?

- A. The conclusion is wrong because different calls may return different results, but a deterministic state transition is defined by bytecode and function parameters alone; block context is irrelevant.
- B. The conclusion is wrong because nodes need only agree on the final stored balances; disagreement in other execution results is allowed whenever the ABI is unchanged.
- C. The conclusion is wrong: determinism concerns identical execution inputs and state; a different call context can produce different results, and only successful transaction state changes are committed.
- D. The conclusion is wrong because the call contexts differ, but every executed storage write remains committed even if a later instruction makes the transaction fail.

## Section 2 — Developing Smart Contracts on Ethereum

### Q5 — Easy

Which tool-to-role mapping matches the PPT?

- A. MetaMask compiles Solidity; Ganache is the source-code language.
- B. Remix is the native cryptocurrency; the browser validates every block independently.
- C. Remix supports writing/compilation; MetaMask handles wallet interaction; Ganache provides a local test blockchain.
- D. Ganache is Ethereum mainnet; local test ETH is automatically real ETH.

### Q6 — Very Tough

A certificate-verification team has these tasks:

1. Deploy using the intended network, account and constructor inputs.
2. Define certificate fields, allowed issuers and verification behaviour.
3. Test normal issuance, invalid inputs, missing records and unauthorised issuance on a development network.
4. Write Solidity implementing the design.
5. Compile, fix syntax/type errors and obtain bytecode/ABI.
6. Interact with the deployed address and verify stored records and transaction outcomes.

The team wants both a correct sequence and a correct explanation of “automatic agreements.” Choose the best pair.

- A. 2 → 4 → 5 → 3 → 1 → 6; the contract executes encoded rules when invoked, so deployment does not by itself create a timer that periodically calls it.
- B. 2 → 4 → 5 → 3 → 1 → 6; once deployed, a stored date condition automatically schedules contract invocation without an external call.
- C. 2 → 4 → 5 → 1 → 3 → 6; an initial deployment to the intended final network is required before any local behavioural testing can occur.
- D. 2 → 4 → 5 → 3 → 1 → 6; after successful compilation and sample-data testing, the ABI itself is the executable program submitted for deployment.

### Q7 — Very Tough

A contract compiles and successfully stores certificates on Ganache. Anyone can issue a certificate, and the frontend is connected to a different network. The team says, “Compilation passed, blockchain data is immutable, and our objective is secure transactions; therefore deployment is ready.”

Which response addresses **all** the relevant problems?

- A. Restrict issuance buttons to institution accounts in the frontend, leave the contract's issuer function callable by anyone, align the network, and treat the UI restriction as sufficient access control.
- B. Add issuer validation, align the network and test normal records; after deployment, correct any remaining logic error simply by recompiling the local source while retaining the same ordinary contract instance.
- C. Add and test issuer checks, retain the local contract address in the frontend after switching networks, and rely on the shared EVM specification to make its state available there.
- D. Implement and test issuer authorisation and input rules, align the wallet/frontend with the intended network and deployed address, and recognise that compilation does not establish logical correctness or easy code replacement.

### Q8 — Very Tough

A team records six concerns:

I. They do not understand transactions or persistent contract state.  
II. The contract performs an increasing amount of work as records grow.  
III. A developer selected the wrong deploying account and network.  
IV. An ordinary deployed contract contains a logic bug.  
V. Unnecessary persistent writes make operations expensive.  
VI. They wish to automate agreements and reduce intermediaries by building a DApp.

Which interpretation is entirely correct?

- A. I identifies missing knowledge; II concerns scalability; III requires correcting deployment settings; IV can be repaired in place by changing the local source of the ordinary deployed contract; V concerns gas; VI states objectives.
- B. I identifies missing prerequisite knowledge; II raises scalability/gas concerns; III is a deployment error; IV exposes immutability-related maintenance difficulty; V concerns gas efficiency; VI states development objectives.
- C. I identifies missing knowledge; II concerns scalability; III is harmless if the source and ABI are identical across networks; IV concerns immutability; V concerns gas; VI states objectives.
- D. I identifies missing knowledge; II concerns scalability; III is a deployment error; IV concerns immutability; V can always be solved by declaring the same state-writing code view; VI states objectives.

## Section 3 — Solidity Basics, Variables and Data Types

### Q9 — Easy

Which declaration is appropriate for storing a student's pass/fail status as a persistent, publicly readable contract field?

- A. `bool public passed = true;` at contract scope
- B. `string pure passed = true;` at contract scope
- C. `bool passed = true;` declared only inside a function, with no state assignment
- D. `msg.sender public passed;`

### Q10 — Very Tough

Consider:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Student {
    uint public age = 21;
    function calculate(uint age) public pure returns (uint) {
        uint a = age;
        a += 1;
        return a;
    }
}
```

After `calculate(30)`, which combined interpretation is correct?

- A. The result is 31 and stored age becomes 31 because the parameter's name makes it a reference to the state field; ^0.8.20 excludes 0.9.0.
- B. The result is 22 and age() remains 21 because the state field takes precedence over the parameter; public generates a getter.
- C. The result is 31, `age()` remains 21, the parameter shadows the state name, and `^0.8.20` permits compatible 0.8.x compilers but excludes 0.9.0.
- D. The result is 31 and age() remains 21; public generates a getter, but the caret restricts compilation to exactly 0.8.20 and rejects 0.8.21.

### Q11 — Very Tough

A student makes these claims:

I. `bool`, `int`, `uint`, `address`, `enum` and fixed-size `bytes32` are value types.  
II. Unqualified `bytes` is a dynamic byte array, so it belongs with reference types rather than fixed-size byte value types.  
III. `string`, arrays, structs and mappings are reference types; a struct groups fields, an array uses indices and a mapping associates keys with values.  
IV. An unset `mapping(uint => string)` key produces a missing-key exception rather than a default empty string.  
V. Solidity is statically typed, supports inheritance/libraries/events and compiles into EVM bytecode; those features do not guarantee bug-free code.

Which set is correct?

- A. I, III and IV only
- B. I, II, III and V only
- C. II and IV only
- D. I, II, III, IV and V

### Q12 — Very Tough

Account A calls contract B with **2 ETH**. During that execution, B calls a payable function in contract C and attaches **0.5 ETH**. All of this occurs in block number N with timestamp T. C records the following tuple during its function call:

`(msg.sender, msg.value, block.number, block.timestamp)`

Which tuple and interpretation are correct?

- A. `(A, 2 × 10^18, N, T)`; msg.sender always identifies the transaction's original human sender.
- B. `(B, 2 × 10^18, N, T)`; every nested call inherits all ETH originally attached by A.
- C. `(A, 0.5, N + 1, T)`; msg.value is measured in ETH and a nested call creates a new block.
- D. `(B, 5 × 10^17, N, T)`; these built-ins describe C's current call/block context, and reading sender/block context is not a pure calculation.

## Section 4 — Control Structures, Functions and Modifiers

### Q13 — Easy

Which function category is appropriate for adding two input numbers without reading or modifying contract state?

- A. `payable` is mandatory
- B. `view` is mandatory because parameters are persistent state
- C. `private` is the only relevant function category
- D. `pure`

### Q14 — Very Tough

Assume `owner` was set to the deployer in a constructor and `total` initially equals 1:

```solidity
modifier gate() {
    require(msg.sender == owner, "Not owner");
    total += 2;
    _;
    total *= 3;
}

function run(uint n) public gate returns (uint) {
    for (uint i = 1; i <= n; i++) {
        if (i % 2 == 0) continue;
        if (i > 5) break;
        total += i;
    }
    return total;
}
```

The owner successfully executes `run(8)`. A different account then attempts `run(2)`. What are the **first call's returned value**, **stored total after the first call**, and **stored total after the second attempt**? The first value means the function's EVM return data, not a value automatically displayed by a wallet transaction receipt.

- A. 12, 12, 12 — return skips the rest of the modifier.
- B. 12, 36, 36 — the modifier's post-body code runs, and the unauthorised attempt fails before any update.
- C. 36, 36, 114 — modifiers apply only to the first call after deployment.
- D. 19, 57, 57 — continue exits the entire loop at the first even number.

### Q15 — Very Tough

A base contract defines `f` as private, `g` as internal, `h` as public and `k` as external. All are otherwise valid simple functions. Consider:

I. A derived contract may call `g` internally but cannot call the base's private `f` by name.  
II. A function in the base may call `h` internally; an outside caller may also call it.  
III. Writing `k()` as an ordinary internal call is valid simply because the code is in the same contract.  
IV. An external self-call such as `this.k()` is different from an ordinary internal call.  
V. Marking a state variable private encrypts it and makes its underlying on-chain value secret.

Which set is correct?

- A. I, II and III only
- B. II, IV and V only
- C. I, II and IV only
- D. I, II, III, IV and V

### Q16 — Very Tough

Four functions are required:

- F1: compute a grade from an input mark only;
- F2: return a stored student's age;
- F3: accept attached ETH and add `msg.value` to a stored deposit counter;
- F4: replace stored marks, but only after a modifier accepts marks from 0 through 100.

Which design is correct, including boundary and execution-cost behaviour?

- A. F1 pure; F2 view; F3 payable; F4 state-changing with `require(mark <= 100)` for a uint parameter and a modifier placeholder. A while loop may run zero times, do–while at least once, and pure/view code still consumes gas when executed in a transaction.
- B. F1 pure; F2 view; F3 payable; F4 state-changing with `mark < 100` and a modifier placeholder. While may run zero times and do–while at least once; transaction execution consumes gas.
- C. F1 pure; F2 view; F3 payable; F4 view because its modifier performs the check before the stored marks are replaced. While and do–while have the stated zero/one minimum iterations.
- D. F1 pure; F2 view; F3 payable; F4 state-changing with `mark <= 100` and a modifier placeholder. While/do–while behave as in A, but all pure/view execution is free of gas even when another transaction calls it.

## Section 5 — Events, Logging, Data Locations and Error Handling

### Q17 — Easy

Which data location is used for persistent contract state that survives successful calls?

- A. `memory`
- B. `storage`
- C. `calldata`
- D. A local value is always permanent, regardless of location

### Q18 — Very Tough

Assume `students[0].marks` initially equals 50. `Student` is a struct containing `marks`, `students` is a stored array, and `Changed` is a declared event:

```solidity
function change(bool fail) public returns (uint) {
    Student storage s = students[0];
    Student memory m = s;
    m.marks = 99;
    s.marks += 10;
    emit Changed(s.marks, m.marks);
    require(!fail, "Rejected");
    return m.marks;
}
```

First `change(false)` succeeds; then `change(true)` is attempted. Which final account is correct?

- A. Stored marks are 99; both events remain because memory updates automatically write back.
- B. Stored marks are 70; the second event remains even though its transaction reverted.
- C. Stored marks return to 50; the second failure undoes all earlier transactions.
- D. Stored marks are 60; the first call returns 99 and records `(60,99)`; the second call's update and event are rolled back.

### Q19 — Very Tough

A developer proposes this validation order for an internal-accounting withdrawal:

1. `require(amount > 0 && amount <= balance, "Invalid amount");`
2. Update balance and cumulative withdrawals consistently.
3. `assert(balance == totalDeposited - totalWithdrawn);`
4. Emit the withdrawal event.

Another developer proposes replacing both checks with `assert(balance >= 0)` because balance is a uint. Which assessment is correct?

- A. The first design distinguishes expected input errors from an internal invariant. The replacement is ineffective because uint is already nonnegative; an uncaught failure reverts the transaction's state/logs, but consumed gas is not free.
- B. The first design checks the intended invariant, but a failed assert must leave completed storage assignments intact; only a failed require can undo earlier assignments.
- C. The first design separates inputs from invariants, but replacing its two checks with uint nonnegativity still preserves the same protection against an incorrect cumulative withdrawal total.
- D. The first design checks inputs and invariants correctly and failures revert changes, but an uncaught rejection refunds every unit of gas consumed before the error.

### Q20 — Very Tough

A contract declares:

```solidity
event Registered(uint indexed id, address indexed by, string name);

function echo(string calldata name)
    external pure returns (string memory)
{
    require(bytes(name).length > 0, "Empty");
    return name;
}
```

Separately, a state-changing registration function saves a record and emits `Registered`. Which statement combines the correct data-location, logging and function behaviour?

- A. echo may be pure and calldata is read-only, but returning the string automatically inserts it into the registration mapping as a persistent record.
- B. echo may be pure and indexed fields support filtering, but the contract can later read its past Registered logs directly as if they were entries in a storage mapping.
- C. echo validates read-only input without searching saved records; successful emitted events support external filtering by indexed ID/caller; their logs are distinct from ordinary contract state.
- D. echo may be pure and return a memory string; registration logs are separate from stored records, but an event-only eligibility-check function may be view because it assigns no state variable.

## Section 6 — EL: Basic Solidity Applications

### Q21 — Easy

In the source's StudentProfile and Calculator programs, the profile stores `name = "Rahul"`, `age = 21`, `passed = true`, while `add()` uses local variables 10 and 20. Which statement is correct?

- A. Calling add changes the profile's age to 30.
- B. The profile fields are temporary because they have initial values.
- C. The profile fields persist and have public getters; add returns 30 without updating contract state.
- D. The bool field is an address, and add must accept Ether.

### Q22 — Very Tough

Use the exact basic-program rules from the source:

- Result is Pass for marks ≥ 40, otherwise Fail.
- Voting eligibility requires age ≥ 18.
- Grades are A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, otherwise F.
- SumCalculator sums 1 through 10.
- Factorial starts result and i at 1 and multiplies while i ≤ n.
- EvenNumberSum skips odd numbers using continue.
- The **original PDF** SearchNumber returns i at `i == 5`, followed later in the loop by `if (i > 5) break;`.

Set stored result marks to 39, test voting age 18 and grade mark 74. Define:

`K = sum(1..10) + factorial(5) + evenSum(1..10) + findFive()`

Which complete outcome is correct?

- A. Fail; eligible; C; K = 210; factorial(0) = 1; the source findFive returns before its break branch can execute.
- B. Fail; not eligible; C; K = 210; factorial(0) = 0; continue stops the even-number loop at 1.
- C. Pass; eligible; B; K = 205; factorial(0) = 1; break returns the function's value automatically.
- D. Fail; eligible; D; K = 180; factorial(0) = 0; the source break executes at i = 5.

### Q23 — Very Tough

Consider fresh, independent instances of these basic source programs:

- ServiceRegistration returns `msg.sender`.
- BlockchainMonitor returns `block.number` and `block.timestamp`.
- StudentRegistration with a struct stores **one** student and allows that record to be overwritten.
- StudentRecords maps an ID to a name and permits overwrite.
- Attendance appends flags to an array and retrieves by index.
- The owner-controlled StudentRegistration allows only the deployer to replace its name/age fields.

Account A deployed the owner-controlled program and stored `("Jay",21)`. At block N and timestamp T, B calls the sender/monitor getters. In the unrestricted struct program, callers register `("Ananya",20,true)` then `("Riya",22,false)`. In StudentRecords, they save `(7,"Old")` then `(7,"New")`. Attendance receives `true` then `false`. B attempts to replace the owner-controlled student with `("Other",30)`.

Which outcome is entirely correct?

- A. Sender A; block N+1; struct preserves Ananya; mapping preserves Old; attendance[1] true; protected record becomes Other.
- B. Sender B; block N/T; both struct registrations are automatically retained as a list; an unset mapping key throws; attendance[2] false; protected record stays Jay.
- C. Sender B; block N/T; struct Riya; mapping New; attendance[1] false; the failed protected update clears all stored fields.
- D. Sender B; block N/T; struct Riya/22/false; mapping 7 is New and an unset ID yields an empty string; attendance[1] false while index 2 fails; protected record remains Jay/21.

### Q24 — Very Tough

Use independent source contracts, all initially fresh:

1. **VisibilityDemo:** `calculate()` calls privateMultiply(5,4); externalDivide divides its uint inputs.
2. **EtherWallet:** A deposits 2 ETH, then B deposits 1 ETH; no other ETH movement occurs.
3. **AdminControl:** A is owner, sets value to 42; B attempts to set it to 99.
4. **MarksValidation:** marks is set to 100; a later attempt supplies 101.
5. **ClassElection:** A sets candidates. B tries candidate 3, then candidate 2, then candidate 1. Invalid candidates revert; a valid vote sets hasVoted[B] true; repeat voting is rejected.

Which row is correct? The visibility outputs are `calculate()` and `externalDivide(9,2)`.

| Option | Visibility outputs | Wallet counter / balance | Admin value / marks | Votes (1,2) / B flag |
|---|---|---|---|---|
| A | 20 / 4 | 3 ETH / 3 ETH | 99 / 101 | (1,1) / true |
| B | 20 / 4 | 3 ETH / 3 ETH | 42 / 100 | (0,1) / true |
| C | 9 / 4.5 | 0 / 3 ETH | 42 / 100 | (0,0) / false |
| D | inaccessible / 4 | 3 ETH / 0 | 42 / 0 | (1,0) / true |

## Section 7 — EL: Integrated Practical Programs

### Q25 — Easy

In BankAccount, `deposit(uint amount)` is not payable and only increases a stored uint balance. Which interpretation is correct?

- A. It updates an internal numerical ledger; calling deposit(500) does not by itself transfer 500 wei or 500 ETH to the contract.
- B. Every function named deposit automatically receives Ether.
- C. The amount parameter is always measured in ETH, even without payable or msg.value.
- D. It must be pure because amount is an input parameter.

### Q26 — Very Tough

Three independent integrated contracts are used:

**StudentRegistration:** A registers ID 101 with name Ananya/course BCA; B attempts the same ID. The code validates ID/text, checks a registered marker, stores a struct and emits an event with indexed ID/caller.  
**StudentMarksManagement:** Add students with marks 75 and 85, then update index 0 to 90 through a storage reference; read index 0 through the memory-copy getter.  
**StudentSearch:** Add ID 101/Ananya/BCA. Call `searchByName("Nobody")`, then attempt `getStudent(999)`. searchByName is the source's nonempty-calldata echo function.

Which outcome is correct?

- A. Two registration events; marks total 160 because local storage references cannot persist; search returns Ananya as the closest name match.
- B. One registration event; marks total 175; searchByName fails because Nobody was not registered; getStudent(999) returns an empty record without validation.
- C. One registration event with caller A; the duplicate fails; count 2 and total 175 with the copy showing 90; searchByName returns Nobody, while getStudent(999) fails its missing-record check.
- D. No events because indexed fields are private; marks total 175 until the memory getter resets it to 160; both search calls succeed.

### Q27 — Very Tough

Four independent integrated programs execute these separate-call sequences:

1. **ATMWithdrawal:** A deposits 1000, withdraws 300, unsuccessfully withdraws 800, then transfers 200 to B. No other balance changes occur.
2. **BankBalanceVerification:** deposit(1000), withdraw(300), then an unsuccessful withdraw(800).
3. **BankAccount:** deploy with Ananya/1000; deposit(500); updateName(Jay); call createTemporaryMessage(100). The counter increments only on a successful deposit or name update.
4. **VotingEligibility:** A's registerVoter(16) fails; registerVoter(18) succeeds; checkEligibility succeeds and emits an event; another registration attempt from A fails.

Which combined final state is correct?

- A. ATM A/B = 700/200; verification balance 700 with withdrawals 1100; BankAccount counter 4; voter A is unregistered because one later call failed.
- B. ATM A/B = 500/200; verification balance/deposits/withdrawals = 700/1000/300 with invariant true; BankAccount = Jay/1500/counter 2; voter A = 18/eligible/registered.
- C. ATM A/B = 500/200; verification balance 0 because any failed withdrawal resets the ledger; BankAccount counter 2; voter A's check is view because it only emits a log.
- D. ATM A/B = 500/200 in real ETH; verification invariant is merely balance ≥ 0; BankAccount counter 3; age 18 is rejected because the minimum is strictly greater than 18.

### Q28 — Very Tough

In LibraryManagement, L is the librarian and adds book 101 with **2 copies**. The following calls occur separately in this order:

1. B issues book 101.
2. B attempts to issue it again.
3. C issues book 101.
4. D attempts to issue it.
5. B returns it.
6. D issues it.
7. C returns it.
8. C attempts another return.
9. B issues it again.
10. D attempts to add a new book, although D is not the librarian.

The source rejects duplicate loans and invalid returns; a failed operation produces no retained event. The getter returns the mapping's default fields for an unset ID. Which result is correct, counting successful **BookAdded + BookIssued + BookReturned** events across this sequence including L's initial addition?

- A. 1 copy available; B/C/D flags false/false/true; 10 events; getBook(999) necessarily reverts.
- B. 0 available; B/C/D true/true/true; 7 events; the weak uint-bound assert proves inventory conservation.
- C. 0 available; B/C/D true/false/true; 9 events because failed calls retain logs; D successfully adds a book.
- D. 0 available; B/C/D true/false/true; 7 events; D's add fails; an unset getter returns default fields, and the source assert is only a weak sanity check.

---

### Topic coverage map

Composite questions are used because four questions cannot test every subtopic independently. This map shows where each section's topics are exercised.

| Section | Coverage |
|---|---|
| 1 | Q1: Ethereum/ETH/EVM distinction. Q2: history, features, architecture, users/wallets/developers/nodes/validators, DApp examples, ABI/bytecode. Q3: ETH units, gas limit/use/price, fees and incentives. Q4: EVM responsibilities, context, deterministic execution and successful state updates. |
| 2 | Q5: Remix, MetaMask, Ganache, browser context. Q6: design/code/compile/test/deploy/interact lifecycle and automation. Q7: certificate example, validation, security, network/account selection and immutability. Q8: prerequisites, all six development challenges and objectives. |
| 3 | Q9: persistent public bool. Q10: program skeleton, licence, pragma, public getter, state/local variables and pure calculation. Q11: all listed value/reference types and language features. Q12: caller, call value, block number and timestamp. |
| 4 | Q13: pure. Q14: conditions, for, continue, break, return, constructor ownership and modifier execution. Q15: all four visibility levels. Q16: pure/view/payable/state changes, parameters, validation modifiers, while/do–while, uint boundaries and gas. |
| 5 | Q17: storage. Q18: memory copy/storage alias, emit and rollback. Q19: require/assert/revert behaviour, input checks, invariants and fees. Q20: calldata, memory return, event declaration/emission, indexed filtering, logging and external/pure/view distinctions. |
| 6 — EL | Q21: programs 1–2. Q22: programs 3–5 and 11–14. Q23: programs 6–10 and 19. Q24: programs 15–18 and 20. Every basic EL program is represented. |
| 7 — EL | Q25: internal balance versus ETH. Q26: programs 1, 3 and 4. Q27: programs 2, 5, 6 and 7. Q28: program 8. Every integrated EL program is represented. |

### Answer key

| Section | Easy | Very Tough | Very Tough | Very Tough |
|---|---|---|---|---|
| 1 | Q1 **B** | Q2 **D** | Q3 **A** | Q4 **C** |
| 2 | Q5 **C** | Q6 **A** | Q7 **D** | Q8 **B** |
| 3 | Q9 **A** | Q10 **C** | Q11 **B** | Q12 **D** |
| 4 | Q13 **D** | Q14 **B** | Q15 **C** | Q16 **A** |
| 5 | Q17 **B** | Q18 **D** | Q19 **A** | Q20 **C** |
| 6 — EL | Q21 **C** | Q22 **A** | Q23 **D** | Q24 **B** |
| 7 — EL | Q25 **A** | Q26 **C** | Q27 **B** | Q28 **D** |

### Answer explanations

1. **B:** Ethereum is the blockchain platform, ETH the native currency and EVM the contract runtime.
2. **D:** I, II, IV and V are correct. The ABI describes interaction, while bytecode is executed. A sound network architecture does not guarantee correct application code.
3. **A:** `200,000 × 20 gwei = 0.004 ETH`. The priority portion is `200,000 × 2 gwei = 0.0004 ETH`; the base portion is 0.0036 ETH. Gas limit is not automatically gas used.
4. **C:** Determinism requires matching starting state and execution inputs. A new caller/block context is different input. Successful execution is necessary for a transaction's state changes to persist.
5. **C:** The IDE, wallet and local blockchain have separate roles. A browser hosts interfaces; it does not turn Ganache test balances into mainnet funds.
6. **A:** Requirements precede coding; compilation precedes executable testing; testing precedes the intended deployment. Encoded rules still need an invocation to execute.
7. **D:** The problems are missing authorisation and mismatched deployment context. Compilation checks syntax/types, while tests must check behaviour. An ordinary deployed contract cannot simply be overwritten by editing local source.
8. **B:** Each concern is mapped to its correct category. Objectives do not remove prerequisites or engineering challenges.
9. **A:** A contract-scope bool is persistent state; public exposes a getter. A local bool by itself is not a persistent field.
10. **C:** Inside calculate, the parameter named age shadows the state field. The local value becomes 31; stored age remains 21. Public adds a getter, not a setter; the pragma expresses a version range.
11. **B:** I, II, III and V are correct. IV is false: an unset string mapping entry yields the default empty string. Fixed-size bytes and dynamic bytes must be distinguished.
12. **D:** C sees its immediate caller B and the value B attached, `0.5 × 10^18 wei`. Nested calls in the same transaction share block context. This reads execution context, so it is not pure.
13. **D:** Arithmetic using parameters and local values fits pure. Visibility is a separate property.
14. **B:** Pre-modifier update: `1 + 2 = 3`. Accepted loop values are 1, 3 and 5, so the body returns `3 + 1 + 3 + 5 = 12`. Even values are skipped and i = 7 triggers break. Post-modifier multiplication stores 36. The next caller fails the owner check. A function-body return does not skip remaining modifier code.
15. **C:** I, II and IV are correct. External functions are not ordinary internal entry points, though an external self-call is possible. Private visibility is not data encryption.
16. **A:** The annotations match each operation. A uint's lower bound is already zero, while `<= 100` enforces the upper bound. The modifier must allow the body through its placeholder. A while loop can skip its body; do–while executes it once before testing.
17. **B:** Storage is persistent state. Memory and calldata are temporary execution locations.
18. **D:** The storage reference changes the original from 50 to 60. The memory copy reaches 99 independently. The second call's tentative 70 and event are reverted; the first call remains committed.
19. **A:** Input conditions belong in require, while assert checks a relationship that correct logic preserves. A uint nonnegativity assertion checks no useful accounting relationship. Uncaught failure removes that transaction's changes and logs, while execution has still used gas.
20. **C:** Calldata is read-only input. echo depends only on that input, so it can be pure. Logging requires emit; indexed fields aid external filtering, and logs do not replace stored records. Emitting an event is incompatible with view.
21. **C:** State fields remain stored; the local addition simply returns 30.
22. **A:** 39 fails, 18 is eligible and 74 is C. `55 + 120 + 30 + 5 = 210`. With n = 0 the factorial loop runs zero times, retaining 1. The source search exits through return at 5; its break branch is not reached.
23. **D:** Caller/block getters reflect B and N/T. The single struct and existing mapping key are overwritten. The array has two entries indexed 0 and 1. An unauthorised protected setter reverts without erasing the earlier record.
24. **B:** Private functions can be used by an allowed internal wrapper; integer division yields 4. The wallet has received 3 ETH. Owner validation preserves 42; marks validation preserves 100. B's invalid candidate does not use up the vote; voting for 2 succeeds, and the later repeat is rejected.
25. **A:** A stored accounting number is not the actual Ether balance. Neither the function name nor the amount argument automatically moves ETH.
26. **C:** Only the first registration succeeds. The storage update changes 75 to 90, giving 175 total; the getter copies without resetting. The calldata function echoes Nobody. getStudent rejects an absent record because its copied ID is zero.
27. **B:** ATM: `1000 − 300 − 200 = 500`, B receives 200 internal units. The failed 800 withdrawal changes neither ledger. Verification retains `700 = 1000 − 300`. Name update and deposit count as two BankAccount updates; the pure message does not. Age 18 is accepted; registration persists despite a later failed duplicate.
28. **D:** Available copies trace: `2 → 1 → 1 → 0 → 0 → 1 → 0 → 1 → 1 → 0`. Final borrowers are B and D. Logs: 1 addition + 4 successful issues + 2 successful returns = 7. Failed calls add none. The getter does not validate existence, while the add function enforces librarian access. The post-decrement maximum-bound assert is not a full inventory invariant.

**Reference note:** The uploaded PDF and `notes.md` supply the program rules. Clarifications follow the official [Solidity 0.8.20 documentation](https://docs.soliditylang.org/en/v0.8.20/) and [Ethereum gas documentation](https://ethereum.org/developers/docs/gas/).
