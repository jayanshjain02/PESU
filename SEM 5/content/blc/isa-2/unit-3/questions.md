# Unit III: Smart Contract Platforms - MCQ Practice

**Source:** `U3-COMBINED.pdf`; section numbering matches `notes.md`.
**Format:** 28 concise, challenging questions. Each tests one focused distinction or one short program; no combined-program output puzzles.

**Common assumptions:** Solidity 0.8.20, ordinary checked arithmetic, and no upgrade mechanism unless stated. External calls are ordinary calls, not delegatecall. Questions are independent. A later failed transaction does not undo an earlier successful one.

## Section 1 - Ethereum, Ether, Gas and EVM

### Q1 - Challenging

Two calls to the same bytecode return different caller addresses. Why does this not, by itself, contradict EVM determinism?

- A. Determinism applies only to functions marked pure.
- B. The calls may have different execution inputs.
- C. Nodes agree on bytecode but not execution results.
- D. Determinism guarantees equal gas fees, not equal results.

### Q2 - Challenging

A frontend encodes a function call correctly using an ABI. What does that fact alone establish?

- A. The selected address contains the intended deployment.
- B. The connected wallet is using the intended blockchain.
- C. The transaction will pass the contract's permission checks.
- D. The call data matches the function description used.

### Q3 - Challenging

A transaction uses 80,000 gas. The base fee is 15 gwei and the priority fee is 3 gwei per gas. Which pair is correct: total execution fee; validator tip?

- A. 0.00144 ETH; 0.00024 ETH
- B. 0.00120 ETH; 0.00024 ETH
- C. 0.00144 ETH; 0.00120 ETH
- D. 0.00024 ETH; 0.00144 ETH

### Q4 - Challenging

A transaction updates a record, emits an event, then fails an uncaught require check. Which effect can still remain?

- A. The updated record, without its event.
- B. The event, without the updated record.
- C. A gas charge for the execution attempted.
- D. The record and event until the next block.

## Section 2 - Developing Smart Contracts on Ethereum

### Q5 - Challenging

A certificate DApp hides its issue button from students, but its contract permits any caller to issue. A student builds a different frontend. Which claim is strongest?

- A. A wallet signature proves that the issuer is an institution.
- B. The ABI limits calls to functions shown in the official UI.
- C. The contract still needs an on-chain issuer check.
- D. A successful deployment proves issuer checks are adequate.

### Q6 - Challenging

A contract contains a deadline check. The deadline passes, but nobody invokes the contract. What follows?

- A. The check does not execute merely because time passed.
- B. The next validator automatically invokes the function.
- C. The stored deadline schedules a deployment transaction.
- D. The ABI invokes the function when its deadline expires.

### Q7 - Challenging

The same hexadecimal contract address appears on two separate networks. What can the frontend safely infer?

- A. Both addresses share one persistent storage area.
- B. The networks contain identical deployed bytecode.
- C. A write on either network updates both instances.
- D. The address must be interpreted with its network.

### Q8 - Challenging

A developer fixes a bug in local Solidity source and recompiles. The frontend still calls the original ordinary deployed contract. Which behaviour should be expected?

- A. The original instance acquires the recompiled bytecode.
- B. The original instance continues executing its deployed code.
- C. The original instance resets its storage on the next call.
- D. The original instance rejects calls until its ABI is replaced.

## Section 3 - Solidity Basics, Variables and Data Types

### Q9 - Challenging

A mapping stores student marks as uint values. Looking up ID 99 returns zero. What can be concluded without a separate registration marker?

- A. The ID may be absent or may explicitly store zero.
- B. The ID must belong to a registered student with zero marks.
- C. The ID cannot exist because mapping values start at one.
- D. The lookup has created a persistent student record.

### Q10 - Challenging

Consider:

```solidity
uint public x = 4;
function f(uint x) public pure returns (uint) {
    x++;
    return x;
}
```

After f(6), what are the return value and stored x?

- A. 7 and 7
- B. 5 and 5
- C. 7 and 4
- D. 4 and 4

### Q11 - Challenging

A student marks a contract's password variable private. Which conclusion is valid?

- A. No external observer can inspect the stored value.
- B. Other contracts cannot access it through an automatic public getter.
- C. Its value becomes encrypted by the Solidity compiler.
- D. Only the deployer can read the variable in the defining contract.

### Q12 - Challenging

A calls B with 2 ETH. B calls C with 0.5 ETH. Inside C, which pair describes msg.sender and msg.value?

- A. A; 2 x 10^18 wei
- B. B; 2 x 10^18 wei
- C. A; 5 x 10^17 wei
- D. B; 5 x 10^17 wei

## Section 4 - Control Structures, Functions and Modifiers

### Q13 - Challenging

A function returns msg.sender without assigning any state variable. Which is the most restrictive valid mutability choice?

- A. pure, because no storage variable is read.
- B. payable, because a caller address is involved.
- C. A state-changing function, because context is accessed.
- D. view, because execution context is read.

### Q14 - Challenging

Assume x starts at 1 and the call succeeds:

```solidity
modifier m() { _; x *= 2; }
function f() public m returns (uint) {
    x += 2;
    return x;
}
```

What are the returned value and final stored x?

- A. 3 and 3
- B. 3 and 6
- C. 6 and 6
- D. 2 and 6

### Q15 - Challenging

A calls B.f(). Inside f(), B invokes its own external function using this.g(). What is msg.sender inside g()?

- A. A, because A started the transaction.
- B. The account that deployed B.
- C. B, because this.g() makes an external self-call.
- D. The zero address, because g() belongs to B.

### Q16 - Challenging

With Solidity 0.8.20, stored uint n starts at zero:

```solidity
function dec() public {
    n--;
    require(n < 10, "Too large");
}
```

Why does dec() fail?

- A. Checked underflow occurs before the require executes.
- B. The require rejects the negative value stored in n.
- C. The function cannot modify a public state variable.
- D. The require receives the wrapped uint maximum first.

## Section 5 - Events, Logging, Data Locations and Error Handling

### Q17 - Challenging

Stored students[0].marks starts at 50. The call succeeds:

```solidity
Student storage s = students[0];
Student memory m = s;
m.marks = 99;
s.marks = 70;
return m.marks;
```

What are the stored marks and returned value?

- A. 99 and 99
- B. 70 and 99
- C. 70 and 70
- D. 50 and 99

### Q18 - Challenging

One transaction successfully emits Saved(1). A later transaction emits Saved(2) and then reverts. Which logs remain?

- A. Neither log: the later failure erases earlier events.
- B. Both logs: events are written before validation.
- C. Only Saved(2): the newest attempted event replaces the old one.
- D. Only Saved(1): the failed transaction's log is removed.

### Q19 - Challenging

A withdrawal function replaces its accounting invariant with assert(balance >= 0), where balance is uint. What is the main weakness?

- A. It cannot detect inconsistent deposit and withdrawal totals.
- B. It rejects every positive balance.
- C. It changes the unsigned balance into a signed value.
- D. It makes later require checks stop reverting transactions.

### Q20 - Challenging

A contract emits registration events but stores no registration records. A new getter must return the historical records. Which limitation matters?

- A. Indexed event fields automatically become storage mappings.
- B. A view getter can scan past logs using an ordinary array index.
- C. Past logs are not directly readable as contract storage.
- D. Events can be queried only by the account that emitted them.

## Section 6 - EL: Basic Solidity Applications

### Q21 - Challenging

A grade function uses this order:

```solidity
if (marks >= 40) return "D";
if (marks >= 75) return "B";
if (marks >= 90) return "A";
return "F";
```

What does it return for marks = 92?

- A. A
- B. B
- C. D
- D. F

### Q22 - Challenging

Consider this factorial-like function:

```solidity
uint result = 1;
for (uint i = 1; i < n; i++) {
    result *= i;
}
return result;
```

For n = 4, what is returned?

- A. 6
- B. 24
- C. 10
- D. 4

### Q23 - Challenging

Attendance contains [true, false]. Its getter directly returns attendance[index] with no custom check. What happens when index = 2?

- A. It returns false, the default bool value.
- B. It returns the last element, which is false.
- C. It appends a third element and returns false.
- D. It fails because index 2 is outside the stored array.

### Q24 - Challenging

In ClassElection, vote(3) fails as an invalid candidate. The same account then calls vote(2). No earlier vote succeeded. What is the outcome?

- A. The second call fails because the first attempt used the vote.
- B. The second call succeeds and records one vote for candidate 2.
- C. Both attempts count because their candidate numbers differ.
- D. The second call succeeds but leaves hasVoted false.

## Section 7 - EL: Integrated Practical Programs

### Q25 - Challenging

BankAccount.deposit(uint amount) is nonpayable and updates an internal ledger. A caller invokes deposit(500) while attaching 1 wei. What happens?

- A. The call reverts without adding 500 to the ledger.
- B. The ledger increases by 500 and the contract receives 1 wei.
- C. The ledger increases by 501 because the amounts are combined.
- D. The call succeeds but automatically refunds the attached wei.

### Q26 - Challenging

StudentSearch stores Alice. Its searchByName function only checks that a calldata string is nonempty and returns that string. What does searchByName("Nobody") do?

- A. Returns Alice as the nearest stored match.
- B. Returns an empty string because no stored name matches.
- C. Returns Nobody without checking the stored records.
- D. Reverts because Nobody was never registered.

### Q27 - Challenging

A has 700 ledger units and successfully transfers 200 to B, whose balance starts at zero. A then attempts withdraw(600), which fails its balance check. What are the final A/B balances?

- A. 100 / 200
- B. 500 / 200
- C. 700 / 0
- D. 0 / 200

### Q28 - Challenging

LibraryManagement has two available copies. B successfully issues one, then attempts to issue the same book again. Duplicate loans revert. What remain: available copies; successful BookIssued events?

- A. 0 copies; 2 events
- B. 2 copies; 0 events
- C. 1 copy; 2 events
- D. 1 copy; 1 event

---

### Topic coverage map

| Section | Focus |
|---|---|
| 1 | Ethereum, Ether, Gas and EVM |
| 2 | Developing Smart Contracts on Ethereum |
| 3 | Solidity Basics, Variables and Data Types |
| 4 | Control Structures, Functions and Modifiers |
| 5 | Events, Logging, Data Locations and Error Handling |
| 6 | EL: Basic Solidity Applications |
| 7 | EL: Integrated Practical Programs |

### Answer key

| Section | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| 1 | Q1 **B** | Q2 **D** | Q3 **A** | Q4 **C** |
| 2 | Q5 **C** | Q6 **A** | Q7 **D** | Q8 **B** |
| 3 | Q9 **A** | Q10 **C** | Q11 **B** | Q12 **D** |
| 4 | Q13 **D** | Q14 **B** | Q15 **C** | Q16 **A** |
| 5 | Q17 **B** | Q18 **D** | Q19 **A** | Q20 **C** |
| 6 | Q21 **C** | Q22 **A** | Q23 **D** | Q24 **B** |
| 7 | Q25 **A** | Q26 **C** | Q27 **B** | Q28 **D** |

### Answer explanations

1. **B:** The caller is part of the execution context. Determinism concerns the same starting state and execution inputs, not every call to the same code.
2. **D:** Correct ABI encoding does not verify the deployed instance, network, permissions or successful execution. These must be checked separately.
3. **A:** Total fee = 80,000 x 18 gwei = 0.00144 ETH. The priority portion is 80,000 x 3 gwei = 0.00024 ETH; the base-fee portion is burned.
4. **C:** The transaction's application-state changes and logs are reverted, but the sender still pays for gas consumed. Reversion does not make attempted execution free.
5. **C:** Frontend restrictions can be bypassed. Signatures identify an authorizing account; contract logic must decide whether that account may issue certificates.
6. **A:** A condition involving time is checked when code is invoked. Storing a deadline does not create a scheduler that sends transactions.
7. **D:** An address is meaningful in the context of its blockchain. The same address on another network does not establish matching code or state.
8. **B:** Editing or compiling local source does not replace deployed code. With no upgrade mechanism, a new deployment and matching frontend configuration are needed.
9. **A:** An unset uint mapping entry and an entry assigned zero produce the same value. A separate existence flag or equivalent design is needed to distinguish them.
10. **C:** The parameter shadows the state field. Incrementing that local parameter returns 7 without changing stored x, which remains 4.
11. **B:** Private is a Solidity access restriction, not encryption. It does not generate a public getter or make underlying blockchain data secret.
12. **D:** C sees its immediate caller B and the value attached to the B-to-C call: 0.5 ETH = 5 x 10^17 wei. The original transfer is not automatically forwarded in full.
13. **D:** Reading msg.sender prevents pure, but it does not require a state change. The function can be view.
14. **B:** The function prepares return value 3. Execution then continues after the modifier placeholder, doubling stored x to 6. The return does not skip the modifier's remaining code.
15. **C:** An external self-call creates a new call context whose immediate caller is B. It differs from an ordinary internal function call.
16. **A:** Ordinary Solidity 0.8 arithmetic is checked. Decrementing zero fails immediately, before the later require; the transaction leaves n unchanged.
17. **B:** s aliases the stored struct; m is an independent memory copy. Writing s persists 70, while the copy retains and returns 99.
18. **D:** Rollback applies to the failing transaction. It removes Saved(2), while the earlier successfully committed Saved(1) remains.
19. **A:** A uint is already nonnegative. That assertion does not verify an accounting relationship such as balance = totalDeposited - totalWithdrawn.
20. **C:** Logs support external indexing and queries, but are distinct from storage accessible to ordinary Solidity getters. The contract must store the records it needs to read itself.
21. **C:** The first condition already matches 92 and returns D. Later checks are never reached; returning early makes condition order important.
22. **A:** The strict i < n condition runs for 1, 2 and 3, producing 6. The loop never multiplies by 4.
23. **D:** An array of length two has valid indices 0 and 1. Unlike an unset mapping key, an out-of-bounds array read fails.
24. **B:** The failed call does not retain state changes. Since no successful vote marked the account as having voted, its subsequent valid vote can succeed.
25. **A:** A nonpayable function rejects attached ETH. The function name and its numeric amount argument do not make it payable.
26. **C:** The implementation is an input echo, not a search through records. A function name does not supply behaviour absent from its code.
27. **B:** The transfer commits balances 500 and 200. The later failed withdrawal does not undo that earlier transaction or deduct another amount.
28. **D:** The first borrowing reduces availability to one and emits one issue event. The duplicate attempt is rejected and retains no additional state change or event.
