# Unit III: Smart Contract Platforms — Exam-Ready Notes

**Course:** Blockchain dApp Development (UQ24CA343AA3)  
**Source:** `U3-COMBINED.pdf`, 92 PDF pages. Page references below use the PDF page number, not the page number printed inside the practical handouts.  
**Organisation:** Five theory sections followed by two EL sections. Repeated slides and title/thank-you pages are consolidated; every distinct teaching topic and all 28 practical programs are covered.

**How to study:** Learn definitions and comparison tables in Sections 1–5, then practise explaining each EL program as **purpose → data → validation → processing → output**. Attempt `questions.md` before checking its answer key. Use `cheat-sheet.md` for final revision.

**Code convention:** Examples follow the source's Solidity `^0.8.20` baseline. Each complete contract is a separate exercise; do not paste all contracts into one source file because some names repeat. Short fragments are explicitly labelled. The EL code is retained from the handout, except the clearly marked correction to the `break` example.

| Section | Topic | Source PDF pages |
|---|---|---|
| 1 | Ethereum, Ether, gas, architecture and EVM | 1–13 |
| 2 | Developing smart contracts on Ethereum | 14–21 |
| 3 | Solidity basics, variables and data types | 22–39 |
| 4 | Control structures, functions and modifiers | 40–56 |
| 5 | Events, logging, data locations and error handling | 57–71 |
| 6 — EL | Basic Solidity applications: 20 programs | 72–83 |
| 7 — EL | Integrated practical applications: 8 programs | 84–92 |

## Section 1 — Ethereum, Ether, Gas and EVM

*Source: PDF pages 1–13.*

### 1.1 Ethereum: definition and features

**Exam definition:** Ethereum is an open-source, decentralised blockchain platform that supports smart contracts and decentralised applications (DApps).

A **smart contract** is a program stored on a blockchain that executes its rules when called. A **DApp** is an application that uses blockchain-based logic, usually through smart contracts, together with a user interface.

The slides associate Ethereum with **Vitalik Buterin** and **2015**. For precise history, distinguish the **2013 proposal** from the **2015 network launch**. [History clarification](https://ethereum.org/ethereum-history-founder-and-ownership/)

| Feature | Meaning / exam explanation |
|---|---|
| Decentralised network | Many participating nodes maintain and verify the network rather than one central server. |
| Smart contract support | Rules can be expressed as programs and executed by the network. |
| DApp development | Applications can use shared blockchain state and programmable transactions. |
| Transparency | Transactions and deployed contract information can be inspected on a public blockchain. |
| Security | Cryptography, validation and consensus protect the network; application code still requires correct security logic. |
| Open source | The platform's software can be inspected and developed openly. |
| Large developer community | Developers contribute applications, tools, libraries and documentation. |
| Programmable transactions | A transaction can invoke logic such as registration, voting or asset transfer. |

**Important distinction:** Ethereum is the platform; **Ether (ETH)** is its native cryptocurrency; the **EVM** is its execution environment.

### 1.2 Ethereum architecture: explain the diagram

The architecture diagram on PDF page 5 contains the following components.

| Component | Role |
|---|---|
| Users | Send transactions and interact with DApps. |
| Wallet | Manages the credentials used to authorise transactions and provides an interface for balances and network interaction. |
| Developers | Write and deploy smart contracts and build DApps. |
| Ethereum network / nodes | Maintain blockchain data and verify transactions and execution. |
| Validators | Participate in consensus and block creation/validation. |
| Smart contracts | Store program logic and persistent application data. |
| Ether | Pays transaction fees and supports value transfers and validator incentives. |
| EVM | Executes contract bytecode and computes state changes. |
| DApps | Examples shown: DeFi, games, social networks, marketplaces and identity applications. |
| Ethereum blockchain | Records transactions and deployed code and supports the shared state produced by execution. |

**Working relationship:** A user authorises a transaction through a wallet. Nodes process it; if it calls a smart contract, the EVM executes the contract logic. Successful state changes become part of blockchain state, and a DApp can display the resulting information.

**Diagram clarification:** The source labels one component “validators/miners.” Modern Ethereum uses proof of stake and **validators**; miners belong to its earlier proof-of-work history. A wallet manages access to an account; ETH balances are recorded on the blockchain. [Ethereum history](https://ethereum.org/ethereum-history-founder-and-ownership/)

### 1.3 Ether (ETH)

**Exam definition:** Ether is Ethereum's native cryptocurrency, used to pay transaction fees and transfer value within the Ethereum ecosystem.

Uses listed in the slides:

1. Pay gas fees.
2. Transfer value and support digital-asset interactions.
3. Provide validator rewards/incentives.
4. Interact with DApps.
5. Deploy and execute smart contracts.

ETH is often called the network's **fuel** because executing on-chain transactions requires payment for resources.

### 1.4 Gas: meaning, purpose and calculation

**Precise definition:** Gas measures the computational work/resources required for Ethereum operations. The **gas fee** is the amount paid in ETH for that work. The slide's wording “gas is the transaction fee” is a simplification; its takeaway correctly identifies gas as a computational measure.

Gas metering:

- Charges for computation and storage-related work.
- Makes repeated expensive transactions costly, helping discourage spam.
- Bounds the amount of work an execution can perform.
- Helps allocate limited network resources.
- Supports network incentives through the transaction-fee mechanism.

| Term | Meaning |
|---|---|
| Gas used | Work actually charged to a transaction. |
| Gas limit | Maximum gas the sender permits for execution. |
| Gas price | Price per gas unit; usually expressed in gwei. |
| Gas fee | Gas used multiplied by the effective gas price. |

**Calculation:**

`Transaction fee = gas used × effective gas price`

`1 ETH = 10^18 wei` and `1 gwei = 10^9 wei = 10^-9 ETH`.

**Worked example:** A deployment uses 200,000 gas and the effective price is 20 gwei:

`200,000 × 20 = 4,000,000 gwei = 0.004 ETH`.

Increasing the gas limit does not by itself increase the gas actually used. An execution that runs out of gas fails; work already performed is not free. In the modern fee mechanism, the base fee is burned and the priority fee goes to the validator, so the entire fee is not a validator reward. [Gas clarification](https://ethereum.org/developers/docs/gas/)

### 1.5 Ethereum Virtual Machine (EVM)

**Exam definition:** The EVM is Ethereum's runtime environment for executing smart contract bytecode.

Its responsibilities are:

1. Execute smart contract instructions.
2. Compute and maintain contract/blockchain state changes.
3. Apply the rules for valid execution.
4. Produce deterministic results.
5. Isolate execution within the virtual-machine environment.

**Deterministic** means that the same code, starting state and execution inputs produce the same result. Different calls can return different values when inputs such as the caller, block number or timestamp differ.

### 1.6 Working of the EVM: six-step answer

1. **Write:** The developer writes Solidity code, commonly in Remix.
2. **Compile:** The compiler checks the source and translates it.
3. **Generate artifacts:** It produces EVM **bytecode** and an **ABI**.
4. **Deploy:** A deployment transaction creates the contract on the selected network.
5. **Execute:** The EVM executes the bytecode when the contract is invoked.
6. **Update:** Successful transaction execution updates blockchain state; transaction logs may also be recorded.

**Bytecode** is machine-level code for the EVM. **ABI (Application Binary Interface)** describes how external applications encode contract calls and interpret responses/events. They serve different purposes: ABI is not the executed program.

**Exam answer skeleton:** Define Ethereum → list its features → explain ETH and gas → describe EVM responsibilities → give the write/compile/deploy/execute/update sequence.

## Section 2 — Developing Smart Contracts on Ethereum

*Source: PDF pages 14–21.*

### 2.1 Meaning and objectives

Smart contract development involves **designing, coding, compiling, testing and deploying** programs that enforce rules on a blockchain.

The objectives in the slides are:

- **Automate digital agreements:** Encode rules so that execution follows those rules.
- **Execute transactions securely:** Validate inputs and restrict sensitive operations.
- **Reduce intermediaries:** Let participants rely on shared program rules for supported operations.
- **Build DApps:** Expose contract functions to an application interface.

“Automatic” describes rule execution after invocation; a deployed contract does not spontaneously call itself merely because time has passed. [Execution clarification](https://docs.soliditylang.org/en/v0.8.20/contracts.html)

### 2.2 Required knowledge

| Knowledge | Why it is needed |
|---|---|
| Blockchain fundamentals | Understand transactions, blocks, accounts and shared state. |
| Ethereum basics | Understand ETH, gas, EVM and network selection. |
| Smart contract concepts | Understand deployment, persistent data and callable functions. |
| Programming logic | Implement variables, conditions, loops, functions and validation. |

### 2.3 Development tools and their separate roles

| Tool from the PPT | Role | Common confusion to avoid |
|---|---|---|
| Remix IDE | Write, compile, deploy and interact with Solidity contracts. | Compilation alone does not deploy a contract. |
| MetaMask | Wallet interface for accounts, network connection and authorising transactions. | It is not the Solidity compiler or the blockchain itself. |
| Ganache | Local blockchain environment used in the course for testing. | Local test balances and local deployments are not Ethereum-mainnet assets or deployments. |
| Web browser | Runs browser-based tools and wallet/application interfaces; examples: Chrome, Edge, Firefox. | The browser is an interface, not the contract execution engine. |

### 2.4 Complete development lifecycle

1. **Design the requirements:** Identify data, actors, operations and restrictions.
2. **Write Solidity code:** Declare state, functions, modifiers and relevant events.
3. **Compile:** Fix syntax/type errors; obtain ABI and bytecode.
4. **Test:** Check normal inputs, boundaries, rejected operations, permissions and expected outputs on a development network.
5. **Deploy:** Select the intended account and network, supply constructor arguments and authorise the deployment transaction.
6. **Interact and verify:** Call getters and state-changing functions; inspect state, transaction outcomes and logs.

**Compile-time versus run-time:** A contract can compile successfully and still have incorrect business logic or missing access control. Testing must check behaviour, not only syntax.

### 2.5 Student certificate verification: source scenario

**Goal:** Store certificate details and allow verification through a smart contract.

| Stage | Action |
|---|---|
| Design | Decide the certificate structure and identifying fields. |
| Code | Implement the contract that stores certificate details. |
| Compile | Produce bytecode and ABI; correct compiler errors. |
| Test | Try valid records, missing records and other relevant edge cases. |
| Deploy | Deploy the tested contract to the selected Ethereum network. |
| Verify | Retrieve/compare the stored certificate information through contract functions. |

**Exam extension:** If only an institution should issue certificates, its authorisation rule must be implemented. Merely storing a record on-chain does not prove that the original certificate details were truthful.

### 2.6 Challenges and sensible responses

| Challenge | Meaning | Development response |
|---|---|---|
| Coding errors | Incorrect syntax, types or program logic. | Compile, inspect and test boundary cases. |
| Security vulnerabilities | Unauthorised or unintended operations become possible. | Validate input and test access restrictions. |
| High gas fees | Computation and persistent writes incur costs. | Avoid unnecessary state writes and excessive loops. |
| Incorrect deployment | Wrong network, account, constructor input or contract selected. | Verify deployment settings and resulting contract address. |
| Immutability | An ordinary deployed contract's code cannot simply be edited in place. | Test carefully; a correction may require a new deployment or a deliberately designed upgrade mechanism. |
| Scalability | Many users or large operations may exceed practical throughput/gas limits. | Bound work per call and keep data processing manageable. |

**Exam answer skeleton:** Definition → objectives → prerequisite knowledge → tool roles → lifecycle → certificate example → development challenges.

## Section 3 — Solidity Basics, Variables and Data Types

*Source: PDF pages 22–39.*

### 3.1 Solidity: definition and features

**Exam definition:** Solidity is a high-level, statically typed, object-oriented programming language used to write smart contracts for Ethereum and other EVM-compatible blockchains.

Features from the slides:

- Syntax resembling familiar JavaScript/C++ constructs.
- **Static typing:** Variable and expression types are checked during compilation.
- **Object-oriented structure:** Contracts group data and behaviour.
- **Inheritance:** A derived contract can reuse accessible base-contract features.
- **Libraries:** Reusable code can be organised in libraries.
- **Events:** Contracts can produce logs for external applications.
- **EVM compilation:** Source is compiled into executable bytecode.
- **Security-related constructs:** Visibility, modifiers and validation support safer programs; the language does not automatically make every contract secure.

### 3.2 Basic structure and first program

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloBlockchain {
    string public message = "Hello Blockchain";
}
```

| Part | Explanation |
|---|---|
| `SPDX-License-Identifier: MIT` | Declares the source's software licence; it is metadata, not executable logic. |
| `pragma solidity ^0.8.20;` | Restricts compatible compiler versions. Here, `>=0.8.20` and `<0.9.0`. It does not install or select the compiler by itself. |
| `contract HelloBlockchain` | Declares a contract and its name. |
| `{ ... }` | Contains its members. |
| `string` | The variable stores text. |
| `public` | The compiler exposes a getter. |
| `message` | A persistent state variable. |
| `"Hello Blockchain"` | Its initial value. |

Calling `message()` returns `"Hello Blockchain"`; the program does not automatically print it to a console. A public state variable creates a **getter**, not an automatic setter. [Getter clarification](https://docs.soliditylang.org/en/v0.8.20/contracts.html#visibility-and-getters)

### 3.3 State, local and global variables

| Category | Declaration/source | Lifetime and purpose | Example |
|---|---|---|---|
| State | Declared in the contract, outside functions. | Persists across transactions and represents contract state. | `uint public marks;` |
| Local | Declared inside a function. | Used while that function executes. | `uint total = 10 + 20;` |
| Global / built-in | Supplied by Solidity/EVM context. | Provides information about the current call or block. | `msg.sender`, `block.number` |

**State example:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Student {
    string public name = "Rahul";
    uint public age = 22;
    bool public passed = true;
}
```

The three values remain available between calls. “Persistent” does not mean a value can never change: a permitted state-changing function can update it.

**Local-variable function fragment:**

```solidity
function add() public pure returns (uint) {
    uint a = 10;
    uint b = 20;
    return a + b;
}
```

It returns **30** and does not update contract state.

**Precision:** Scope and data location are different ideas. A local `storage` reference can point to persistent state; changing through that reference changes storage. Do not claim that everything declared inside a function must be an independent temporary copy.

### 3.4 Global variables used in the unit

| Expression | Meaning | Typical use |
|---|---|---|
| `msg.sender` | Address making the current call; it may be a user account or another contract. | Owner checks, voter identity and per-address balances. |
| `msg.value` | ETH value attached to the current call, expressed in wei. | Record an actual Ether deposit in a payable function. |
| `block.number` | Current block number. | Blockchain monitoring. |
| `block.timestamp` | Current block timestamp, in seconds since the Unix epoch. | Read block time information. |
| `address(this).balance` | Actual Ether balance held by this contract, in wei. | Wallet balance getter. |

Global variables need no user declaration. Reading the sender/block information is not `pure`; the source getters use `view`. If account A calls contract B and B calls contract C, C sees B as `msg.sender`. [Context definitions](https://docs.soliditylang.org/en/v0.8.20/units-and-global-variables.html#block-and-transaction-properties)

### 3.5 Value types

Value-type assignment gives an independent value.

| Type | Meaning | Example |
|---|---|---|
| `bool` | `true` or `false`. | `bool passed = true;` |
| `int` | Signed integer; can represent negative values. | `int change = -5;` |
| `uint` | Unsigned integer; cannot represent negative values. | `uint age = 21;` |
| `address` | Ethereum address, 20 bytes. | `address owner = msg.sender;` |
| `bytes1` … `bytes32` | Fixed-size byte sequences. | `bytes1 initial = 0x41;` |
| `enum` | Named alternatives represented by an enumerated type. | `enum Status { Pending, Passed, Failed }` |

`uint` means `uint256`; `int` means `int256`. Default values include `0` for integers, `false` for booleans and the zero address for an address.

**Slide correction:** Fixed-size `bytes1` to `bytes32` are value types. The unqualified **`bytes`** type is a dynamically sized byte array and therefore a **reference type**. [Type clarification](https://docs.soliditylang.org/en/v0.8.20/types.html)

### 3.6 Reference types and collections

| Type | Meaning | Source-related example |
|---|---|---|
| `string` | Text of variable length. | Student or course name. |
| Dynamic `bytes` | Variable-length raw byte data. | `bytes(name).length` tests whether text is empty. |
| Array | Indexed collection of values of a type. | `bool[] attendance;` |
| Struct | Groups several named fields into one record. | Student name, age and pass status. |
| Mapping | Associates keys with values. | Student ID → name; address → voting status. |

**Declaration fragments:**

```solidity
struct Student {
    string name;
    uint age;
    bool passed;
}

Student public student;
bool[] public attendance;
mapping(uint => string) public students;
```

- An array uses zero-based indices; its valid indices are `0` through `length - 1`.
- A dynamic storage array supports `push()` to append a value.
- A struct makes related fields easier to store and return together.
- A mapping is looked up by key, not by a positional index. A missing key reads as the value type's default value.
- A mapping does not provide a built-in list of all keys or a built-in length. Use an explicit marker such as `registered` or a nonzero ID to distinguish a saved record from an unset one.
- Mapping data is stored in `storage`; it is not copied wholesale into `memory`.

### 3.7 Practical syntax and operator reminders

| Syntax | Meaning / use |
|---|---|
| `=` | Assignment. |
| `==`, `!=` | Equality and inequality tests. |
| `>=`, `<=`, `>`, `<` | Comparisons used in grading and validation. |
| `!flag` | Logical negation; e.g. the caller has not voted. |
| `+`, `-`, `*`, `/` | Arithmetic; integer division discards the fractional part. |
| `%` | Remainder; `i % 2 != 0` identifies an odd number. |
| `++`, `--`, `+=`, `-=` | Increment, decrement and compound updates. |

In Solidity 0.8.x, ordinary integer overflow/underflow is checked and reverts; division by zero also fails. These points matter for factorial, subtraction and balance examples. [Arithmetic clarification](https://docs.soliditylang.org/en/v0.8.20/types.html#integers)

**Exam answer skeleton:** Define Solidity → features → explain the source skeleton → compare three variable categories → classify types → illustrate arrays, structs and mappings.

## Section 4 — Control Structures, Functions and Modifiers

*Source: PDF pages 40–56.*

### 4.1 Control structures

Control structures determine execution order. The unit covers **conditional**, **looping** and **jump** statements.

| Construct | Behaviour | Example use |
|---|---|---|
| `if` | Executes a block if a Boolean condition is true. | Check a minimum age. |
| `if ... else` | Selects one of two paths. | Pass/fail or the larger of two numbers. |
| `else if` chain | Selects the first matching condition. | A/B/C/D/F grades. |
| `for` | Combines initialisation, condition and update. | Sum 1–10 or traverse an array. |
| `while` | Tests before each iteration; may execute zero times. | Factorial calculation. |
| `do ... while` | Tests after the body; executes at least once. | Perform an initial operation before repeating. |

**Conditional function fragments:**

```solidity
function check(uint age) public pure returns (string memory) {
    if (age >= 18) return "Eligible";
    return "Not Eligible";
}

function largest(uint a, uint b) public pure returns (uint) {
    if (a > b) return a;
    else return b;
}
```

For `largest(7, 7)`, the `else` branch returns 7. Conditions must be Boolean expressions.

**Loop syntax fragments:**

```solidity
for (uint i = 1; i <= 5; i++) {
    // Repeated work
}

uint j = 0;
while (j < 5) {
    j++;
}

uint k = 0;
do {
    k++;
} while (k < 5);
```

Always ensure that the loop can progress towards termination. Large/unbounded loops can exceed gas limits. A `view` loop can also be expensive when another on-chain operation executes it.

### 4.2 Jump statements: a common exam comparison

| Statement | What stops? | What happens next? |
|---|---|---|
| `break;` | The nearest enclosing loop. | Execution continues after that loop. |
| `continue;` | The rest of the current iteration. | The loop proceeds towards the next iteration. |
| `return value;` | The current function body. | Returns the specified result to its caller. |

In a `for` loop, `continue` still leads to the loop's update expression. In a `while` loop, putting the increment after a `continue` can accidentally prevent progress.

### 4.3 Functions: definition and syntax

A function is a reusable block of logic that can accept parameters and return results.

**Syntax pattern:**

```text
function functionName(parameters)
    visibility
    [mutability]
    [modifiers]
    returns (returnTypes)
{
    statements
}
```

`returns (...)` declares return types; `return ...;` supplies a result. Functions with no returned value omit `returns`. Multiple results can be returned as a tuple, as in `return (votes1, votes2);`.

**Example fragment:**

```solidity
function add(uint a, uint b) public pure returns (uint) {
    return a + b;
}
```

### 4.4 Function visibility

| Visibility | Same contract via internal call | Derived contract via internal call | External caller |
|---|---|---|---|
| `public` | Yes | Yes | Yes |
| `private` | Yes | No | No |
| `internal` | Yes | Yes | No |
| `external` | No direct internal call | No direct internal call | Yes |

**Clarifications:** An external function may be invoked from the same contract through an external self-call, such as `this.f()`. `private` restricts Solidity access; it does not encrypt blockchain data. [Visibility clarification](https://docs.soliditylang.org/en/v0.8.20/contracts.html#visibility-and-getters)

### 4.5 Pure, view, payable and state-changing functions

Visibility answers **who can call**. Mutability answers **what the function may do**. They are separate properties.

| Kind | Behaviour | Typical example |
|---|---|---|
| `pure` | Does not read or modify contract state; uses allowed inputs/local calculations. | `add(a, b)` or grade calculation from a parameter. |
| `view` | May read state but does not modify it. | Return stored marks or a balance. |
| `payable` | May accept ETH attached to the call. | Deposit using `msg.value`. |
| No mutability keyword | May change state; is nonpayable by default. | Update marks or an internal accounting balance. |

**Do not memorise “pure and view always cost no gas.”** A normal off-chain read/simulation does not submit a fee-paying transaction, but executing the same logic within an on-chain transaction consumes gas. [Call clarification](https://ethereum.org/developers/docs/evm/)

**Payable fragment:**

```solidity
function deposit() public payable {
    totalDeposited += msg.value;
}
```

Here `totalDeposited` must be a declared state variable. `payable` permits ETH receipt; it does not force a positive deposit unless the code validates `msg.value > 0`.

### 4.6 Constructor and modifiers

A **constructor** runs once when a contract is deployed. A common use is `owner = msg.sender;` to record its deploying caller.

A **modifier** is reusable logic attached to functions, often used for access control or validation. It is not an ordinary function called independently. The **`_;` placeholder** marks where the modified function body executes. Code can also appear after the placeholder. [Modifier clarification](https://docs.soliditylang.org/en/v0.8.20/contracts.html#function-modifiers)

**Advanced tracing point:** A `return` in the function body does not skip the modifier's code after `_;`. The returned value can therefore differ from the final stored value if the modifier performs a later update.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Owner {
    address public owner;
    uint public value;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Authorized");
        _;
    }

    function update(uint newValue) public onlyOwner {
        value = newValue;
    }
}
```

**Execution:** Caller reaches `update` → `onlyOwner` checks the caller → failure reverts → success reaches `_;` → `value` is updated.

Benefits: **access control, input validation, reusable checks, clearer security rules and maintainability**. Simply declaring a modifier is insufficient; it must be attached to the relevant function.

**Input-validation fragment:**

```solidity
modifier validMarks(uint marks) {
    require(marks <= 100, "Marks must be between 0 and 100");
    _;
}
```

`uint` already excludes negative values. This check accepts both 0 and 100 and rejects 101.

**Exam answer skeleton:** Classify flow control → distinguish the three loops and three jumps → explain function syntax → compare visibility/mutability → explain constructor and `onlyOwner` step by step.

## Section 5 — Events, Logging, Data Locations and Error Handling

*Source: PDF pages 57–71, extended by the EL examples on pages 84–92.*

### 5.1 Events and logging

An **event** declares a structured log record that a contract can emit. **Logging** is recording those events so that external applications can observe contract activity.

Uses from the slides:

- Record important actions such as deposits and registrations.
- Help DApps monitor outcomes and update their interfaces.
- Support transaction inspection through blockchain explorers.
- Provide transaction records associated with successful activity.

**Syntax and example:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EventDemo {
    event Deposit(address sender, uint amount);

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
    }
}
```

`event` declares the log format; `emit` creates an occurrence. Declaring an event alone produces no log. The amount in this example is in wei.

In the EL examples, `indexed` fields such as student ID, caller address or book ID let external applications filter logs by those values. Ordinary non-anonymous events support up to three indexed parameters. [Event encoding](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html#events)

**Events versus state:** A mapping/variable stores data that contract logic can read. An event records information for external consumers; a contract cannot directly query its historical logs as ordinary storage. [Event clarification](https://docs.soliditylang.org/en/v0.8.20/contracts.html#events)

### 5.2 Storage, memory and calldata

| Property | `storage` | `memory` | `calldata` |
|---|---|---|---|
| Purpose | Persistent contract data. | Temporary working data/copies. | Read-only call input data. |
| Lifetime | Persists across successful calls. | Temporary for the current external call; internal calls may share memory. | Available for the current call. |
| Mutable? | Yes, when state modification is permitted. | Yes. | No. |
| Typical use | State variables, mappings, stored arrays/structs. | Strings/struct copies and temporary return values. | Read-only reference-type input parameters. |
| Cost intuition | Persistent writes are comparatively expensive. | Temporary work usually avoids storage-write cost. | Can avoid an unnecessary input copy. |
| Source example | Stored student name. | Temporary `"Hello"` message. | External `searchByName` input in EL 7.4. |

Do not equate every local variable with EVM memory: local value types and local storage references have different behaviour. [Data-location clarification](https://docs.soliditylang.org/en/v0.8.20/types.html#data-location)

**Temporary-memory function fragment:**

```solidity
function getMessage() public pure returns (string memory) {
    string memory message = "Hello";
    return message;
}
```

Returning a temporary string does not permanently store it.

### 5.3 Storage reference versus memory copy

Assume a stored array `Student[] students` whose structs contain `marks`.

```solidity
// Fragment inside a state-changing function:
Student storage original = students[index];
original.marks = 90;

// Fragment creating a separate temporary copy:
Student memory copy = students[index];
copy.marks = 100;
```

The first assignment makes `original` refer to the stored record. The second creates a temporary copy. Therefore the stored marks become **90**, not 100. Changing a memory copy has no persistent effect unless the updated data is explicitly assigned back to storage.

**Calldata function fragment:**

```solidity
function echoName(string calldata name)
    external pure returns (string memory)
{
    require(bytes(name).length > 0, "Name required");
    return name;
}
```

It validates and returns an input; it does not read a stored database. A function can validate a parameter and still be `pure`.

### 5.4 Error handling: definitions and differences

Error handling prevents invalid execution and protects expected contract behaviour.

| Mechanism | Best use | Example |
|---|---|---|
| `require(condition, message)` | Validate input, permissions or expected preconditions. | `require(amount <= balance, "Insufficient balance");` |
| `assert(condition)` | Check an internal invariant that correct logic should preserve. | `assert(balance == totalDeposited - totalWithdrawn);` |
| `revert(message)` | Explicitly reject execution, often inside a conditional branch. | `if (age < 18) revert("Not Eligible");` |

An **invariant** is a relationship expected to remain true after every valid operation. In the banking example: **current balance = cumulative deposits − cumulative withdrawals**.

**Slide correction:** `assert(balance >= 0)` is not a meaningful accounting check when `balance` is a `uint`: unsigned values cannot be negative. Use an actual relationship between tracked quantities.

In Solidity 0.8.x, a failed `assert` produces a panic and reverts. `require` and `revert` also reject execution and undo the affected call's changes. Do not use the outdated rule that `assert` always consumes every remaining unit of gas. [Error-handling clarification](https://docs.soliditylang.org/en/v0.8.20/control-structures.html#error-handling-assert-require-revert-and-exceptions)

### 5.5 Rollback: state, events and fees

For the examples in this unit, an uncaught failure propagates to the top-level transaction:

- State changes made by that failed transaction are rolled back.
- Logs emitted by reverted execution are discarded.
- Earlier, separate successful transactions remain committed.
- A failed submitted transaction still incurs a fee for gas consumed.

**Trace example:** Suppose `balance` is 100, a call sets it to 80, emits an event and then reaches `require(false, "Invalid")`. The failed call leaves `balance` at **100**, and that call's event is absent from successful logs. [Rollback rules](https://docs.soliditylang.org/en/v0.8.20/control-structures.html#error-handling-assert-require-revert-and-exceptions)

### 5.6 How the concepts work together

For a registration/update operation:

1. Read inputs from permitted parameters/context.
2. Use `require`/`revert` to reject invalid input or access.
3. Update persistent data through storage.
4. Check a meaningful internal invariant when applicable.
5. Emit an event to inform external applications.
6. Use `view` getters and memory copies to read results later.

**Exam answer skeleton:** Define event and logging → explain `event`/`emit`/`indexed` → compare three data locations → demonstrate alias versus copy → compare `require`, `assert`, `revert` → explain rollback.



## Section 6 — EL: Basic Solidity Applications (20 Programs)

*Source: PDF pages 72–83. Exercise numbers below match the first practical collection.*

### 6.0 Practical-answer method

For each program, identify the state variables, decide whether the function is pure/view/state-changing/payable, write validation, trace a normal call and test one boundary or rejection. Use a separate Solidity file for each complete exercise.

### 6.1 Program 1: Student Profile Management

**Concepts:** State variables; string, uint and bool; public getters.

**Working:** Declare the three fields at contract level and initialise them. The compiler provides read-only getter functions; no update function is defined.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentProfile {
    string public name = "Rahul";
    uint public age = 21;
    bool public passed = true;
}
```

**Expected result / test:** `name()` → `"Rahul"`; `age()` → `21`; `passed()` → `true`.

**Exam point:** `public` does not mean any caller can assign directly to these variables.

### 6.2 Program 2: Calculator Using Local Variables

**Concepts:** Local variables; addition; pure function; return value.

**Working:** Create local numbers 10 and 20, add them and return the result. No persistent field is read or updated.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Calculator {
    function add() public pure returns (uint) {
        uint a = 10;
        uint b = 20;
        return a + b;
    }
}
```

**Expected result / test:** `add()` → `30`, on every normal call.

**Exam point:** The calculation uses local data, so `pure` is appropriate.

### 6.3 Program 3: Student Result Management

**Concepts:** State update; view getter; if–else; string memory return.

**Working:** `setMarks` changes persistent marks. `getResult` reads that value and compares it with the passing threshold of 40.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentResult {
    uint public marks;
    function setMarks(uint _marks) public {
        marks = _marks;
    }
    function getResult() public view returns (string memory) {
        if (marks >= 40) {
            return "Pass";
        } else {
            return "Fail";
        }
    }
}
```

**Expected result / test:** Initial marks `0` → `"Fail"`; set `39` → `"Fail"`; set `40` → `"Pass"`.

**Exam point:** This source exercise does not reject marks above 100. Range validation appears separately in Program 18.

### 6.4 Program 4: Voting Eligibility Checker

**Concepts:** Input parameter; if–else; pure function; boundary condition.

**Working:** Compare the supplied age with 18 and return the matching message. No age is stored.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract VotingEligibility {
    function checkEligibility(uint age)
        public
        pure
        returns (string memory)
    {
        if (age >= 18) {
            return "Eligible to Vote";
        } else {
            return "Not Eligible to Vote";
        }
    }
}
```

**Expected result / test:** `checkEligibility(17)` → `"Not Eligible to Vote"`; `(18)` → `"Eligible to Vote"`.

**Exam point:** The result depends on the parameter, not a state variable.

### 6.5 Program 5: Student Grade Calculator

**Concepts:** Descending else-if conditions; range classification; pure function.

**Working:** Test thresholds from highest to lowest. The first matching branch returns the grade.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract GradeCalculator {
    function getGrade(uint marks)
        public
        pure
        returns (string memory)
    {
        if (marks >= 90) {
            return "A";
        } else if (marks >= 75) {
            return "B";
        } else if (marks >= 60) {
            return "C";
        } else if (marks >= 40) {
            return "D";
        } else {
            return "F";
        }
    }
}
```

**Expected result / test:** `90` → A; `75` → B; `60` → C; `40` → D; `39` → F.

**Exam point:** Checking `>= 40` first would incorrectly classify high marks. The source does not cap marks at 100.

### 6.6 Program 6: Identify the Transaction Sender

**Concepts:** msg.sender; address return type; view function.

**Working:** Return the immediate caller address. Switching the calling account changes the result.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ServiceRegistration {
    function getRegisteredUser()
        public
        view
        returns (address)
    {
        return msg.sender;
    }
}
```

**Expected result / test:** A direct call from account A returns A; a direct call from account B returns B.

**Exam point:** Despite the function name, this program does not register or store a user.

### 6.7 Program 7: Blockchain Block Information

**Concepts:** block.number; block.timestamp; global variables; view getters.

**Working:** Return the current block number and timestamp through separate getters.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract BlockchainMonitor {
    function getBlockNumber()
        public
        view
        returns (uint)
    {
        return block.number;
    }
    function getBlockTimestamp()
        public
        view
        returns (uint)
    {
        return block.timestamp;
    }
}
```

**Expected result / test:** Outputs depend on the execution block; timestamp is measured in seconds, not a formatted date.

**Exam point:** Values may change between calls in different blocks. This does not violate EVM determinism.

### 6.8 Program 8: Student Data Using Struct

**Concepts:** Struct; state record; memory parameter and return; state update.

**Working:** Group name, age and pass status into a Student. Registration replaces the stored record; the getter returns its current data as a memory value.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentRegistration {
    struct Student {
        string name;

        uint age;
        bool passed;
    }
    Student public student;
    function registerStudent(
        string memory _name,
        uint _age,
        bool _passed
    ) public {
        student = Student(_name, _age, _passed);
    }
    function getStudent()
        public
        view
        returns (Student memory)
    {
        return student;
    }
}
```

**Expected result / test:** Register `("Ananya", 21, true)` → getter returns those fields.

**Exam point:** This contract has one student record. Registering again overwrites it; it is not an array of students.

### 6.9 Program 9: Student Records Using Mapping

**Concepts:** Mapping; key–value access; public getter; memory string.

**Working:** Associate each numeric student ID with a name. Adding the same ID again overwrites its value.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentRecords {
    mapping(uint => string) public students;
    function addStudent(uint id, string memory name) public {
        students[id] = name;
    }
    function getStudent(uint id)
        public
        view
        returns (string memory)
    {
        return students[id];
    }
}
```

**Expected result / test:** Add `(101, "Ananya")` → `getStudent(101)` returns `"Ananya"`; an unset ID returns `""`.

**Exam point:** No duplicate-ID validation exists in this basic example.

### 6.10 Program 10: Attendance Using an Array

**Concepts:** Dynamic array; push; zero-based indexing; view getter.

**Working:** Append each attendance flag to persistent storage. Retrieve a flag using its index.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Attendance {
    bool[] public attendance;
    function addAttendance(bool present) public {
        attendance.push(present);

    }
    function getAttendance(uint index)
        public
        view
        returns (bool)
    {
        return attendance[index];
    }
}
```

**Expected result / test:** Add `true`, then `false` → index `0` is true and index `1` is false; index `2` is out of bounds.

**Exam point:** The source relies on Solidity array bounds checking rather than its own require message.

### 6.11 Program 11: Calculate Total Marks Using a For Loop

**Concepts:** For loop; local accumulator; pure function.

**Working:** Start sum at 0. For i = 1 through 10 inclusive, add i to sum. Return the total.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract SumCalculator {
    function calculateSum()
        public
        pure
        returns (uint)
    {
        uint sum = 0;
        for (uint i = 1; i <= 10; i++) {
            sum = sum + i;
        }
        return sum;
    }
}
```

**Expected result / test:** `calculateSum()` → `55`.

**Exam point:** `i <= 10` includes 10; replacing it with `i < 10` changes the result to 45.

### 6.12 Program 12: Calculate Factorial Using a While Loop

**Concepts:** While loop; multiplication; initialisation; pure function.

**Working:** Set result and i to 1. Multiply result by i while i <= n; increment i after each multiplication.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Factorial {
    function calculate(uint n)
        public
        pure
        returns (uint)
    {
        uint result = 1;
        uint i = 1;
        while (i <= n) {
            result = result * i;
            i++;
        }
        return result;
    }
}
```

**Expected result / test:** `calculate(0)` → `1`; `(1)` → `1`; `(5)` → `120`.

**Exam point:** Starting result at 0 would make every product 0. Very large n can cause checked overflow or excessive execution cost.

### 6.13 Program 13: Process Even Numbers Using Continue

**Concepts:** For loop; modulo; continue; even-number sum.

**Working:** Skip odd i using `continue`. Add only 2, 4, 6, 8 and 10.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EvenNumberSum {
    function calculate()
        public
        pure
        returns (uint)
    {
        uint sum = 0;
        for (uint i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue;
            }
            sum = sum + i;
        }
        return sum;
    }
}
```

**Expected result / test:** `calculate()` → `30`.

**Exam point:** `continue` skips only the current iteration; it does not exit the loop or function.

### 6.14 Program 14: Stop Processing Using Break

**Concepts:** Break versus return; loop termination; search result.

**Working:** Store the matching value when i equals 5, break out of the loop, then return the stored result.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract SearchNumber {
    function findFive() public pure returns (uint) {
        uint found = 0;
        for (uint i = 1; i <= 10; i++) {
            if (i == 5) {
                found = i;
                break;
            }
        }
        return found;
    }
}
```

**Expected result / test:** `findFive()` → `5`.

**Exam point:** **Source correction:** The handout returns at i == 5 before reaching its `if (i > 5) break;` branch. Its result is 5, but it does not actually demonstrate break. The corrected version below does.

### 6.15 Program 15: Calculator with Function Visibility

**Concepts:** Public, private, internal and external visibility; arithmetic; function calls.

**Working:** `publicAdd` is externally callable. `calculate` invokes privateMultiply internally. internalSubtract is available internally and to derived contracts; externalDivide is an external entry point.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract VisibilityDemo {
    function publicAdd(uint a, uint b)
        public

        pure
        returns (uint)
    {
        return a + b;
    }
    function privateMultiply(uint a, uint b)
        private
        pure
        returns (uint)
    {
        return a * b;
    }
    function internalSubtract(uint a, uint b)
        internal
        pure
        returns (uint)
    {
        return a - b;
    }
    function externalDivide(uint a, uint b)
        external
        pure
        returns (uint)
    {
        return a / b;
    }
    function calculate()
        public
        pure
        returns (uint)
    {
        return privateMultiply(5, 4);
    }
}
```

**Expected result / test:** `publicAdd(5,4)` → `9`; `calculate()` → `20`; `externalDivide(9,2)` → `4`.

**Exam point:** A direct external call to privateMultiply is unavailable; an internal subtraction with a < b underflows, and division by zero fails.

### 6.16 Program 16: Ether Deposit System

**Concepts:** Payable; msg.value; cumulative deposits; actual Ether balance.

**Working:** Attach ETH to deposit. Add the received wei amount to totalDeposited. Read actual funds with address(this).balance.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract EtherWallet {
    uint public totalDeposited;
    function deposit()
        public
        payable
    {
        totalDeposited = totalDeposited + msg.value;
    }
    function getBalance()
        public
        view
        returns (uint)
    {
        return address(this).balance;
    }
}
```

**Expected result / test:** On a fresh contract, deposit `1 ether` then `0.5 ether` → totalDeposited and balance are each `1.5 ether`.

**Exam point:** These values coincide in this simple sequence. A cumulative counter and an actual balance have different meanings; the counter is not a universal substitute for the balance.

### 6.17 Program 17: Owner-Only Administrative Function

**Concepts:** Constructor; owner state; modifier; require; protected update.

**Working:** The constructor records the deployer. onlyOwner compares each caller with owner. An authorised caller can change value.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract AdminControl {
    address public owner;
    uint public value;
    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner allowed"
        );
        _;
    }
    function updateValue(uint _value)
        public
        onlyOwner
    {
        value = _value;
    }
}
```

**Expected result / test:** Deployer sets `42` → succeeds. Another account attempts `99` → reverts; value stays `42`.

**Exam point:** Access control comes from the attached modifier, not the name “AdminControl.”

### 6.18 Program 18: Marks Validation Using a Modifier

**Concepts:** Parameterised modifier; require; uint bounds; persistent marks.

**Working:** The modifier validates `_marks <= 100` before the setter body executes.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract MarksValidation {
    uint public marks;
    modifier validMarks(uint _marks) {
        require(
            _marks <= 100,
            "Marks must be between 0 and 100"
        );
        _;
    }
    function setMarks(uint _marks)
        public
        validMarks(_marks)
    {
        marks = _marks;
    }
}
```

**Expected result / test:** `0` and `100` succeed; `101` reverts and preserves the previous marks.

**Exam point:** A uint cannot encode a negative number, so no separate `_marks >= 0` test is needed.

### 6.19 Program 19: Owner-Controlled Student Registration

**Concepts:** Owner-only registration; constructor; modifier; persistent strings/integers; tuple getter.

**Working:** Record the deploying caller as owner, restrict registration with onlyOwner, and retrieve the stored name and age with a view function.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentRegistration {
    address public owner;
    string public studentName;
    uint public studentAge;
    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can register"
        );
        _;
    }
    function registerStudent(
        string memory _name,
        uint _age
    )
        public
        onlyOwner
    {
        studentName = _name;
        studentAge = _age;

    }
    function getStudent()
        public
        view
        returns (string memory, uint)
    {
        return (studentName, studentAge);
    }
}
```

**Expected result / test:** Owner registers `("Ananya", 21)` → getter returns that tuple; another caller cannot replace it.

**Exam point:** The getter is public even though the setter is owner restricted. The exercise stores one record.

### 6.20 Program 20: Integrated Blockchain Voting System

**Concepts:** Owner; candidate strings; counters; mapping; modifier; msg.sender; require; if–else; revert; view tuple.

**Working:** Only the owner sets the two candidate names. A voter must not already have voted. Candidate 1 or 2 increments its counter; invalid input reverts. After a valid choice, mark the caller as having voted.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ClassElection {
    address public owner;
    string public candidate1;
    string public candidate2;
    uint public votes1;
    uint public votes2;
    mapping(address => bool) public hasVoted;
    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner allowed"
        );
        _;
    }
    function setCandidates(
        string memory _candidate1,
        string memory _candidate2
    )
        public
        onlyOwner
    {
        candidate1 = _candidate1;
        candidate2 = _candidate2;
    }
    function vote(uint candidate)
        public
    {

        require(
            !hasVoted[msg.sender],
            "Already voted"
        );
        if (candidate == 1) {
            votes1++;
        } else if (candidate == 2) {
            votes2++;
        } else {
            revert("Invalid candidate");
        }
        hasVoted[msg.sender] = true;
    }
    function getVotes()
        public
        view
        returns (uint, uint)
    {
        return (votes1, votes2);
    }
}
```

**Expected result / test:** A votes 1 → `(1,0)` and A marked true. A votes again → rejected. Fresh B votes 3 → rejected and B remains false. B then votes 2 → `(1,1)`.

**Exam point:** The rule is one vote per address, not verified one vote per human. The source permits candidate names to be changed later and does not require names to be set before voting.


## Section 7 — EL: Integrated Solidity Practical Programs (8 Programs)

*Source: PDF pages 84–92. Exercise numbers below match the second practical collection.*

### 7.0 What these programs add

This collection integrates event logging, indexed fields, structs/mappings/arrays, storage references, memory copies, calldata, validation, invariants and transaction rollback. Distinguish the internal-accounting examples from the actual Ether wallet in EL 6.16.

### 7.1 Program 1: Student Registration with Events and Logging

**Purpose:** Maintain one record per student ID, reject invalid/duplicate registrations and publish successful registration logs.

**Working and concepts:**

1. `Student` groups id, name, course and a `registered` flag. `students[id]` is persistent mapping data.
2. Check ID > 0, nonempty name, nonempty course and an unused ID before writing.
3. The bool marker is false for an unset mapping entry; registration sets it true.
4. Store the complete struct, then emit StudentRegistered with ID, caller, name and course.
5. The indexed ID and caller support log filtering; getStudent returns a memory copy as four fields.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentRegistration {
    struct Student {
        uint id;
        string name;
        string course;
        bool registered;
    }
    mapping(uint => Student) public students;
    event StudentRegistered(
        uint indexed studentId,
        address indexed registeredBy,
        string studentName,
        string course
    );
    function registerStudent(
        uint _id,
        string memory _name,
        string memory _course
    ) public {
        require(_id > 0, "Student ID must be positive");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_course).length > 0, "Course cannot be empty");
        require(!students[_id].registered, "Student already registered");
        students[_id] = Student({
            id: _id,
            name: _name,
            course: _course,
            registered: true
        });
        emit StudentRegistered(_id, msg.sender, _name, _course);
    }
    function getStudent(uint _id)
        public view
        returns (uint, string memory, string memory, bool)
    {
        Student memory s = students[_id];
        return (s.id, s.name, s.course, s.registered);
    }
}
```

**Expected result / test:** Register `(101, "Ananya", "BCA")` → stored `(101, "Ananya", "BCA", true)` and one registration event. Repeat ID 101 → rejected, no additional successful event. Unset ID 999 → `(0, "", "", false)`.

**Exam point:** No owner restriction is implemented: any caller may register an unused ID. The stored record and the event are separate outputs.

### 7.2 Program 2: Bank Account Using Storage and Memory

**Purpose:** Maintain an account-holder name, an internal numerical balance and a successful-update counter.

**Working and concepts:**

1. The constructor initialises holder and balance; transactionCount starts at 0.
2. updateName validates nonempty text, writes the stored name and increments the counter.
3. deposit validates a positive number, adds it to balance and increments the counter.
4. getAccountDetails reads and returns the three stored values.
5. createTemporaryMessage changes only a local parameter and returns a temporary string; it is pure.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract BankAccount {
    string public accountHolder;
    uint public balance;
    uint public transactionCount;
    constructor(string memory _name, uint _initialBalance) {
        accountHolder = _name;
        balance = _initialBalance;
    }
    function updateName(string memory _newName) public {
        require(bytes(_newName).length > 0, "Name cannot be empty");
        accountHolder = _newName;
        transactionCount++;
    }
    function deposit(uint _amount) public {
        require(_amount > 0, "Deposit must be positive");
        balance += _amount;
        transactionCount++;
    }
    function getAccountDetails()
        public view
        returns (string memory, uint, uint)
    {
        return (accountHolder, balance, transactionCount);
    }
    function createTemporaryMessage(uint _amount)
        public pure returns (string memory)
    {
        string memory message = "Temporary deposit calculation";
        _amount = _amount + 1;
        return message;
    }
}
```

**Expected result / test:** Deploy `("Ananya", 1000)` → `(Ananya,1000,0)`. deposit(500) → `(Ananya,1500,1)`. updateName("Jay") → `(Jay,1500,2)`. createTemporaryMessage(100) returns its message and leaves all state unchanged.

**Exam point:** deposit is nonpayable and credits an internal number, not real ETH. The constructor and getters do not increment transactionCount.

### 7.3 Program 3: Student Marks Management Using Storage and Memory

**Purpose:** Store a list of student records and distinguish direct storage updates from temporary copies.

**Working and concepts:**

1. addStudent rejects an empty name and marks above 100, then appends a struct to the array.
2. updateMarks checks index < length and the marks range.
3. `Student storage s = students[index]` aliases the stored record; changing s.marks updates it.
4. getStudentCopy loads a memory copy and returns name/marks without state modification.
5. getStudentCount returns array length. getTotalMarks loops through all students; its named return variable total starts at 0.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentMarksManagement {
    struct Student {
        string name;
        uint marks;
    }
    Student[] public students;
    function addStudent(string memory _name, uint _marks) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_marks <= 100, "Marks cannot exceed 100");
        students.push(Student(_name, _marks));
    }
    function updateMarks(uint _index, uint _newMarks) public {
        require(_index < students.length, "Invalid student index");
        require(_newMarks <= 100, "Marks cannot exceed 100");
        Student storage s = students[_index];
        s.marks = _newMarks;
    }
    function getStudentCopy(uint _index)
        public view
        returns (string memory, uint)
    {
        require(_index < students.length, "Invalid student index");
        Student memory s = students[_index];
        return (s.name, s.marks);
    }
    function getStudentCount() public view returns (uint) {
        return students.length;
    }
    function getTotalMarks() public view returns (uint total) {
        for (uint i = 0; i < students.length; i++) {
            total += students[i].marks;
        }
    }
}
```

**Expected result / test:** Add marks 75 and 85 → count 2, total 160. Update index 0 to 90 → total 175. Index 2 or marks 101 → rejected; valid data remains intact.

**Exam point:** A local storage reference can persist updates. A memory copy does not. Summing a growing array increases execution work.

### 7.4 Program 4: Read-Only Student Search Using Calldata

**Purpose:** Demonstrate calldata input validation and ID-based retrieval from a stored mapping.

**Working and concepts:**

1. addStudent validates positive ID and nonempty text, then requires the current record ID to be 0.
2. Zero is reserved as the missing-record marker; therefore valid IDs must be positive.
3. searchByName is external pure: it validates nonempty calldata text and returns that same text.
4. getStudent is external view: copy the mapping entry into memory, reject ID 0 and return its fields.
5. The private mapping has no public getter; the explicit getStudent function provides controlled access at the Solidity interface level.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract StudentSearch {
    struct Student {
        uint id;
        string name;
        string course;
    }
    mapping(uint => Student) private studentRecords;
    function addStudent(
        uint _id,
        string memory _name,
        string memory _course
    ) public {
        require(_id > 0, "Invalid student ID");
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_course).length > 0, "Course required");
        require(studentRecords[_id].id == 0, "ID already exists");
        studentRecords[_id] = Student(_id, _name, _course);
    }
    function searchByName(string calldata _searchName)
        external pure returns (string memory)
    {
        require(bytes(_searchName).length > 0, "Search name required");
        return _searchName;
    }
    function getStudent(uint _id)
        external view
        returns (uint, string memory, string memory)
    {
        Student memory s = studentRecords[_id];
        require(s.id != 0, "Student not found");
        return (s.id, s.name, s.course);
    }
}
```

**Expected result / test:** Add `(101,"Ananya","BCA")`; getStudent(101) returns it. getStudent(999), a duplicate ID or an empty name fails. searchByName("Nobody") returns `"Nobody"` even if no such student was stored.

**Exam point:** **The function called searchByName does not search records.** Its purity and body make it an input-validation/echo demonstration.

### 7.5 Program 5: ATM Withdrawal System Using require()

**Purpose:** Simulate a separate numerical balance for each caller and reject invalid deposits, withdrawals and transfers.

**Working and concepts:**

1. balances[address] starts at 0 for an unset address. The constructor stores owner, but no owner-only modifier is used.
2. deposit requires amount > 0, credits the caller and emits Deposited.
3. withdraw requires a positive affordable amount, debits the caller and emits Withdrawn.
4. transferBalance rejects the zero address, self-transfer, zero amount and insufficient funds.
5. A valid transfer decreases the sender and increases the recipient; the source transfer function emits no event.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ATMWithdrawal {
    address public owner;
    mapping(address => uint) public balances;
    event Deposited(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);
    constructor() {
        owner = msg.sender;
    }
    function deposit(uint _amount) public {
        require(_amount > 0, "Deposit must be positive");
        balances[msg.sender] += _amount;
        emit Deposited(msg.sender, _amount);
    }
    function withdraw(uint _amount) public {
        require(_amount > 0, "Withdrawal must be positive");
        require(_amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= _amount;
        emit Withdrawn(msg.sender, _amount);
    }
    function transferBalance(address _recipient, uint _amount) public {
        require(_recipient != address(0), "Invalid recipient");
        require(_recipient != msg.sender, "Cannot transfer to yourself");
        require(_amount > 0, "Amount must be positive");
        require(_amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
    }
}
```

**Expected result / test:** A deposits 1000, withdraws 300 → A = 700. A tries to withdraw 800 → rejected; A stays 700. A transfers 200 to B → A = 500, B = 200.

**Exam point:** These are internal accounting units. No real Ether is received or transferred. A failed transaction does not undo earlier successful transactions.

### 7.6 Program 6: Bank Balance Verification Using assert()

**Purpose:** Maintain cumulative deposit/withdrawal totals and verify the accounting relationship after valid operations.

**Working and concepts:**

1. State begins at balance = totalDeposited = totalWithdrawn = 0.
2. deposit validates a positive input and increases both balance and totalDeposited.
3. withdraw validates a positive affordable input, decreases balance and increases totalWithdrawn.
4. Both operations assert balance == totalDeposited - totalWithdrawn before emitting their event.
5. verifyBalance is a view function returning the Boolean relationship; it is not itself an assert call.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract BankBalanceVerification {
    uint public balance;
    uint public totalDeposited;
    uint public totalWithdrawn;
    event DepositRecorded(uint amount, uint newBalance);
    event WithdrawalRecorded(uint amount, uint newBalance);
    function deposit(uint _amount) public {
        require(_amount > 0, "Amount must be positive");
        balance += _amount;
        totalDeposited += _amount;
        assert(balance == totalDeposited - totalWithdrawn);
        emit DepositRecorded(_amount, balance);
    }
    function withdraw(uint _amount) public {
        require(_amount > 0, "Amount must be positive");
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
        totalWithdrawn += _amount;
        assert(balance == totalDeposited - totalWithdrawn);
        emit WithdrawalRecorded(_amount, balance);
    }
    function verifyBalance() public view returns (bool) {
        return balance == totalDeposited - totalWithdrawn;
    }
}
```

**Expected result / test:** deposit(1000), withdraw(300) → balance 700, totalDeposited 1000, totalWithdrawn 300; verifyBalance() returns true.

**Exam point:** require checks expected user errors; assert detects a broken internal relationship. This is one shared internal ledger, not per-address balances or an Ether wallet.

### 7.7 Program 7: Voting Eligibility Using revert()

**Purpose:** Register an address as eligible only when its supplied age is within the allowed range and it has not already registered.

**Working and concepts:**

1. Voter stores age, eligible and registered. The mapping is keyed by caller address.
2. Reject age < 18 and age > 120 using explicit revert branches.
3. Use require to reject a second registration by the same address; save valid data and emit VoterRegistered.
4. checkEligibility rejects an unregistered caller or an underage stored record, then emits EligibilityChecked.
5. getVoterStatus reads the caller’s fields through a memory copy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract VotingEligibility {
    struct Voter {
        uint age;
        bool eligible;
        bool registered;
    }
    mapping(address => Voter) public voters;
    event VoterRegistered(address indexed voter, uint age);
    event EligibilityChecked(address indexed voter, bool eligible);
    function registerVoter(uint _age) public {
        if (_age < 18) {
            revert("Voter must be at least 18 years old");
        }
        if (_age > 120) {
            revert("Invalid age");
        }
        require(!voters[msg.sender].registered, "Already registered");
        voters[msg.sender] = Voter({
            age: _age,
            eligible: true,
            registered: true
        });
        emit VoterRegistered(msg.sender, _age);
    }
    function checkEligibility() public {
        if (!voters[msg.sender].registered) {
            revert("Voter is not registered");
        }
        if (voters[msg.sender].age < 18) {
            revert("Not eligible to vote");
        }
        emit EligibilityChecked(msg.sender, true);
    }
    function getVoterStatus()
        public view
        returns (uint, bool, bool)
    {
        Voter memory v = voters[msg.sender];
        return (v.age, v.eligible, v.registered);
    }
}
```

**Expected result / test:** Fresh A: registerVoter(16) fails. registerVoter(21) succeeds → `(21,true,true)`. A second registration fails. A successful check emits EligibilityChecked. Fresh B calling checkEligibility fails.

**Exam point:** Age 18 and 120 are accepted. checkEligibility cannot be view because it emits an event. This checks supplied age; it does not verify real-world identity.

### 7.8 Program 8: Integrated Library Management System

**Purpose:** Combine access control, persistent records, borrowing status, validation and logs in a lending workflow.

**Working and concepts:**

1. The constructor stores librarian. onlyLibrarian restricts addBook; issueBook and returnBook are available to members.
2. Book groups id, title, availableCopies and exists. books maps book ID to record.
3. The nested mapping borrowed[member][bookId] tracks each address–book pair independently.
4. addBook validates ID/title/copies, rejects duplicates with revert, stores the record and emits BookAdded.
5. issueBook requires an existing book and no current loan for that member; it rejects zero availability, decreases copies, marks borrowed and emits BookIssued.
6. returnBook requires an existing book and a current loan; it clears borrowed, increases copies and emits BookReturned.
7. getBook returns a memory copy as four values. The source assert after decrement is only a weak sanity check, not a complete inventory invariant.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract LibraryManagement {
    address public librarian;
    struct Book {
        uint id;
        string title;
        uint availableCopies;
        bool exists;
    }
    mapping(uint => Book) public books;
    mapping(address => mapping(uint => bool)) public borrowed;
    event BookAdded(uint indexed bookId, string title, uint copies);
    event BookIssued(address indexed member, uint indexed bookId);
    event BookReturned(address indexed member, uint indexed bookId);
    modifier onlyLibrarian() {
        require(msg.sender == librarian, "Only librarian allowed");
        _;
    }
    constructor() {
        librarian = msg.sender;
    }
    function addBook(
        uint _id,
        string memory _title,
        uint _copies
    ) public onlyLibrarian {
        require(_id > 0, "Invalid book ID");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_copies > 0, "Copies must be positive");
        if (books[_id].exists) {
            revert("Book already exists");
        }
        books[_id] = Book({
            id: _id,
            title: _title,
            availableCopies: _copies,
            exists: true
        });
        emit BookAdded(_id, _title, _copies);
    }
    function issueBook(uint _id) public {
        require(books[_id].exists, "Book does not exist");
        require(!borrowed[msg.sender][_id], "Book already issued");
        if (books[_id].availableCopies == 0) {
            revert("No copies available");
        }
        books[_id].availableCopies--;
        borrowed[msg.sender][_id] = true;
        // Basic sanity check; not a strong invariant.
        assert(books[_id].availableCopies < type(uint).max);
        emit BookIssued(msg.sender, _id);
    }
    function returnBook(uint _id) public {
        require(books[_id].exists, "Book does not exist");
        require(borrowed[msg.sender][_id], "Book not borrowed");
        borrowed[msg.sender][_id] = false;
        books[_id].availableCopies++;
        emit BookReturned(msg.sender, _id);
    }

    function getBook(uint _id)
        public view
        returns (uint, string memory, uint, bool)
    {
        Book memory b = books[_id];
        return (b.id, b.title, b.availableCopies, b.exists);
    }
}
```

**Expected result / test:** Librarian adds `(101,"Blockchain Basics",3)` → 3 available. A issues → 2, borrowed[A][101] true. A issues again → rejected. B issues → 1. A returns → 2, A false. A returns again → rejected.

**Exam point:** One address may hold only one copy of a given book at a time. Distinct addresses can borrow remaining copies. Non-librarians cannot add books, and no-copy/duplicate/missing-book operations must fail.

**Why the library assert is weak:** After a successful decrement from a positive uint, availableCopies is automatically below `type(uint).max`. That assertion does not check that copies were neither lost nor invented. A stronger design would explicitly track total copies and copies on loan and preserve `availableCopies + copiesOnLoan == totalCopies`. This stronger invariant is an explanatory improvement, not code implemented in the supplied exercise. Solidity 0.8.x already checks ordinary arithmetic overflow.

### 7.9 Final exam distinctions to remember

| Pair / trap | Correct distinction |
|---|---|
| Platform / currency / execution | Ethereum / ETH / EVM. |
| Gas / gas fee | Work units / ETH paid for the work. |
| ABI / bytecode | Interaction description / executable program. |
| Compile / test / deploy | Translate / verify behaviour / create a network contract. |
| Public variable / editable variable | Getter generated / mutation still requires executable logic. |
| Visibility / mutability | Caller access / permitted state and ETH behaviour. |
| Storage reference / memory copy | Original persistent object / temporary independent copy from storage. |
| Event / state | External log / data contract code can read. |
| require / assert / revert | Expected precondition / internal invariant / explicit rejection. |
| Real Ether / internal balances | Payable receipt and msg.value / arithmetic on a stored number. |
| One address / one person | Address identity is not real-world identity verification. |
| Source break example | Its return exits before break; use the corrected EL 6.14 version. |
| Calldata search example | Echoes a supplied name; it does not search the mapping. |
| Failed transaction | Its changes/logs revert; previous successful transactions remain. |

### 7.10 Source and clarification references

The uploaded `U3-COMBINED.pdf` is the primary syllabus source. Page ranges in the opening table identify every section. Official references below were used only to resolve technical simplifications and explain the code accurately; they do not add a separate syllabus section.

- [Ethereum history](https://ethereum.org/ethereum-history-founder-and-ownership/)
- [Ethereum gas](https://ethereum.org/developers/docs/gas/)
- [Ethereum Virtual Machine](https://ethereum.org/developers/docs/evm/)
- [Solidity 0.8.20 types and data locations](https://docs.soliditylang.org/en/v0.8.20/types.html)
- [Solidity 0.8.20 contracts, visibility, modifiers and events](https://docs.soliditylang.org/en/v0.8.20/contracts.html)
- [Solidity 0.8.20 control structures and errors](https://docs.soliditylang.org/en/v0.8.20/control-structures.html)
- [Solidity 0.8.20 global variables and units](https://docs.soliditylang.org/en/v0.8.20/units-and-global-variables.html)
- [Solidity 0.8.20 event ABI](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html#events)
