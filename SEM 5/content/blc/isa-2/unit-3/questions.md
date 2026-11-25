# Unit III: Smart Contract Platforms - MCQ Practice

**Source:** `U3-COMBINED.pdf`; section numbering matches `notes.md`.
**Format:** 28 questions, four per section. Each question focuses on one main concept or one short program.

**Common assumptions:** Solidity 0.8.20 semantics. Each question is independent. A stated successful transaction commits its changes; an uncaught failure reverts only that transaction.

## Section 1 - Ethereum, Ether, Gas and EVM

### Q1 - Easy

Which component executes a deployed Ethereum smart contract?

- A. MetaMask
- B. Ethereum Virtual Machine (EVM)
- C. The contract ABI
- D. The HTML frontend

### Q2 - Moderate

A developer gives a frontend team the ABI of a contract. What can the team use it for?

- A. Recovering the original private signing key.
- B. Deploying a contract without its bytecode.
- C. Changing the code of an existing deployment.
- D. Encoding calls to the contract's functions.

### Q3 - Moderate

A transaction uses 50,000 gas at an effective gas price of 20 gwei. What is its gas fee, excluding any ETH sent to the recipient?

- A. 0.001 ETH
- B. 0.01 ETH
- C. 1 ETH
- D. 50,000 ETH

### Q4 - Moderate

A transaction has a gas limit of 100,000 but successfully uses only 60,000 gas. Which quantity is multiplied by the effective gas price to calculate the execution fee?

- A. The remaining 40,000 gas.
- B. The full 100,000 gas limit.
- C. The actual 60,000 gas used.
- D. The number of contract functions.

## Section 2 - Developing Smart Contracts on Ethereum

### Q5 - Easy

Which tool provides a local blockchain with test accounts for contract development?

- A. A CSS framework
- B. A domain registrar
- C. Ganache
- D. A text editor alone

### Q6 - Moderate

A certificate contract compiles successfully but allows anyone to issue a certificate. What should be fixed before deployment?

- A. Add and test an issuer permission check in the contract.
- B. Hide the issue button but leave the contract unchanged.
- C. Increase the gas limit for all certificate requests.
- D. Change the HTML title of the certificate page.

### Q7 - Moderate

A contract works on Ganache, but the frontend wallet is connected to another network. What should the developer check first?

- A. Whether the contract filename matches the page title.
- B. Whether the frontend uses a larger font size.
- C. Whether the test account owns real mainnet ETH.
- D. Whether the wallet network and deployed address match.

### Q8 - Moderate

A contract stores a future date and contains a function that checks that date. What makes the function execute?

- A. The stored date alone schedules its execution.
- B. A transaction or another contract call invokes it.
- C. The Solidity compiler keeps calling it in the background.
- D. The ABI periodically runs the date check.

## Section 3 - Solidity Basics, Variables and Data Types

### Q9 - Easy

A contract must remember a student's marks between successful transactions. Where should the marks be declared?

- A. As a contract-level state variable.
- B. Only as a local variable inside a function.
- C. Only as a function parameter.
- D. Only as a JavaScript variable in the browser.

### Q10 - Moderate

Consider this function inside a contract:

```solidity
uint public age = 21;
function calculate(uint age) public pure returns (uint) {
    return age + 1;
}
```

What does calculate(30) return?

- A. 21
- B. 22
- C. 31
- D. The call changes stored age to 31.

### Q11 - Moderate

A mapping is declared as mapping(uint => string) names. No value has been stored for ID 99. What does names[99] contain?

- A. The name stored for the nearest ID.
- B. An empty string.
- C. A newly generated student name.
- D. An automatic duplicate-ID error.

### Q12 - Moderate

Account A calls contract B with 2 ETH. B then calls contract C and attaches 0.5 ETH. Inside C, what are msg.sender and msg.value?

- A. A and 2 ETH in wei.
- B. B and 2 ETH in wei.
- C. A and 0.5 ETH in wei.
- D. B and 0.5 ETH in wei.

## Section 4 - Control Structures, Functions and Modifiers

### Q13 - Easy

Which function category fits a function that adds two parameters without accessing contract state?

- A. payable
- B. view only
- C. constructor
- D. pure

### Q14 - Moderate

Consider this modifier:

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

What does _; represent?

- A. A command that deletes the owner address.
- B. The point where the modified function body executes.
- C. A command that ends every transaction successfully.
- D. A declaration of a private variable.

### Q15 - Moderate

A base contract has an internal function and a private function. Which can a derived contract call directly by name?

- A. Both functions.
- B. Only the private function.
- C. Only the internal function.
- D. Neither function.

### Q16 - Moderate

A deposit function must accept ETH attached to its call. Which keyword is needed?

- A. payable
- B. pure
- C. private
- D. constant

## Section 5 - Events, Logging, Data Locations and Error Handling

### Q17 - Easy

Which data location holds persistent contract state?

- A. memory
- B. storage
- C. calldata
- D. A function parameter by default

### Q18 - Moderate

A stored student initially has 50 marks. This function is called successfully:

```solidity
function testCopy() public {
    Student memory copy = students[0];
    copy.marks = 90;
}
```

What are the stored marks afterward?

- A. 90, because every struct variable is a storage reference.
- B. 0, because a memory copy clears the original.
- C. The contract cannot read a struct into memory.
- D. 50, because only the memory copy was changed.

### Q19 - Moderate

A function changes a balance and then fails an uncaught require check in the same transaction. What happens to that balance change?

- A. It is reverted.
- B. It remains permanently stored.
- C. It is kept only if an event was emitted.
- D. It is applied to every earlier transaction too.

### Q20 - Moderate

A registration function declares an event named Registered. Which statement writes that event to the transaction log?

- A. return Registered(id);
- B. require Registered(id);
- C. emit Registered(id);
- D. view Registered(id);

## Section 6 - EL: Basic Solidity Applications

### Q21 - Easy

The GradeCalculator returns A for marks of at least 90, B for at least 75, C for at least 60, D for at least 40, and F otherwise. What does getGrade(74) return?

- A. A
- B. B
- C. C
- D. D

### Q22 - Moderate

Consider this factorial function:

```solidity
function calculate(uint n) public pure returns (uint) {
    uint result = 1;
    for (uint i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

What does calculate(4) return?

- A. 24
- B. 10
- C. 4
- D. 0

### Q23 - Moderate

StudentRecords stores a single name for each ID. After addStudent(7, "Old"), a successful call to addStudent(7, "New") assigns the same mapping key again. What does getStudent(7) return?

- A. Both names as an array.
- B. Old, because mappings cannot be updated.
- C. An error because duplicate keys always revert.
- D. New, because the second assignment replaces the value.

### Q24 - Moderate

In ClassElection, a successful vote sets hasVoted[msg.sender] to true. The vote function first requires that this flag is false. What happens if the same account votes again?

- A. Its previous vote is moved to the new candidate.
- B. The second vote is rejected.
- C. Both votes are counted.
- D. The flag is automatically reset before each call.

## Section 7 - EL: Integrated Practical Programs

### Q25 - Easy

BankAccount has a nonpayable deposit(uint amount) function that only increases a stored balance number. What does deposit(500) do?

- A. Adds 500 to the internal ledger without transferring ETH.
- B. Transfers 500 ETH automatically.
- C. Transfers 500 wei automatically.
- D. Changes the balance only in browser memory.

### Q26 - Moderate

StudentMarksManagement uses this update:

```solidity
Student storage s = students[0];
s.marks = 90;
```

If the transaction succeeds, what happens to students[0].marks?

- A. It stays unchanged because s is local.
- B. It changes only until the function returns.
- C. It is permanently updated to 90.
- D. A second student is added to the array.

### Q27 - Moderate

An ATM ledger contains 700 units. withdraw(800) first checks require(amount <= balance). What is the balance after this call fails?

- A. 0
- B. 700
- C. 800
- D. 1500

### Q28 - Moderate

A library has one available copy of a book. B successfully borrows it, leaving zero copies. C then tries to borrow that book, and the contract requires at least one available copy. What happens?

- A. C borrows it and the copy count becomes negative.
- B. B's earlier borrowing is undone.
- C. C's failed call still adds a successful BookIssued event.
- D. C's call reverts; B's loan and the zero-copy count remain.

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

1. **B:** The EVM executes contract bytecode. MetaMask signs requests, while the ABI describes how to interact with the contract.
2. **D:** The ABI describes function names, parameter types and return types so software can construct calls. It is not executable bytecode.
3. **A:** 50,000 multiplied by 20 gwei is 1,000,000 gwei, which equals 0.001 ETH.
4. **C:** The gas limit is the maximum allowance; the execution fee is based on gas actually used.
5. **C:** Ganache provides a local development blockchain. Its test balances are not real mainnet ETH.
6. **A:** Authorization must be enforced by contract logic because callers can bypass a frontend. Compilation does not prove that permissions are correct.
7. **D:** A contract address must be used on the network where that instance was deployed. Another network does not automatically contain the same contract state.
8. **B:** A date condition does not create a background scheduler. Contract code executes when invoked.
9. **A:** Contract-level state variables persist. A function's local variables and parameters do not by themselves store a value for future calls.
10. **C:** The parameter named age is used inside the function, so the result is 30 + 1 = 31. The stored age remains 21.
11. **B:** An unset mapping entry has the default value of its value type. For string, that is an empty string.
12. **D:** C sees its immediate caller, B, and the value attached to the B-to-C call: 0.5 ETH, or 5 x 10^17 wei.
13. **D:** A pure function can calculate from its inputs without reading or changing contract state.
14. **B:** The placeholder marks where the function body runs after the preceding modifier checks succeed.
15. **C:** Internal functions are accessible from derived contracts. Private functions are accessible only within the contract that defines them.
16. **A:** The payable modifier allows a function to receive attached ETH. The function name alone does not provide that ability.
17. **B:** Storage holds persistent state. Memory and calldata are temporary locations used during execution.
18. **D:** A memory copy is separate from the stored struct. Updating it does not write the changed marks back to storage.
19. **A:** An uncaught failure rolls back the current transaction's state changes and logs. Earlier successful transactions are unaffected.
20. **C:** The emit keyword emits a declared event. Its logs can be observed by external tools and applications.
21. **C:** 74 is below 75 but at least 60, so it falls in grade C.
22. **A:** The loop multiplies 1 x 2 x 3 x 4, producing 24.
23. **D:** A mapping assignment replaces the value at that key unless the contract explicitly rejects the update.
24. **B:** The second call fails the already-voted check. The earlier successful vote remains counted.
25. **A:** An amount parameter is a numeric input. Without an actual value transfer, increasing an accounting balance does not deposit Ether.
26. **C:** The storage variable s refers to the original stored student, so assigning through it updates persistent state.
27. **B:** The withdrawal is rejected, so no deduction is committed.
28. **D:** The unavailable-book check rejects C's call. It does not undo B's earlier transaction, and no event from the failed call is retained.
