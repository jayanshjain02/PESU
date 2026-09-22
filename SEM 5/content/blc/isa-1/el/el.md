# Solidity Lab — How Smart-Contract Code Works

This lab uses **Remix + MetaMask + Ganache** so every action is visible immediately on a local blockchain. Ganache ETH and accounts are only for development: do not use real wallet private keys or send real funds while practising.

## The Solidity execution model

A Solidity contract is code plus data stored at a blockchain address.

| Code element | What it does | What you observe in Remix/Ganache |
| --- | --- | --- |
| `uint`, `string`, `mapping` | Stores contract state on-chain | A value remains after the transaction is mined |
| `view` function | Reads state; does not change it | Remix returns a value and MetaMask does not ask for confirmation |
| Normal `public` function | Changes state | MetaMask opens, then Ganache records a transaction and a new block |
| `require` | Stops invalid calls and reverts their changes | Remix shows the reason; state stays unchanged |
| Event | Writes a log that apps can listen for | The transaction receipt contains the emitted event |

## Example 1 — Live counter: deploy, call, and inspect

Paste this contract into `CounterLab.sol` in Remix. The `count` variable is state. `getCount()` only reads it, but `increment()` changes it, so it needs a signed transaction.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CounterLab {
    uint256 private count;

    event CountChanged(uint256 newCount, address indexed changedBy);

    function increment() external {
        count += 1;
        emit CountChanged(count, msg.sender);
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}
```

### Run it on your local blockchain

1. Start Ganache and copy its RPC endpoint, for example `http://127.0.0.1:7545`.
2. In MetaMask, add that endpoint as a custom network with chain ID `1337`, then import **one Ganache test account**.
3. In Remix, compile `CounterLab.sol` with compiler `0.8.19` (or a compatible `0.8.x` version).
4. In **Deploy & Run Transactions**, choose **Injected Provider — MetaMask**, confirm the account/network, and click **Deploy**.
5. Expand the deployed contract and call `getCount`. It returns `0`; no MetaMask window appears because this is a read.
6. Click `increment`, approve the MetaMask request, and wait for confirmation. Call `getCount` again: it returns `1`.
7. Open Ganache: deployment and `increment` are separate transactions/blocks. Open the second transaction to inspect its sender, gas use, and emitted `CountChanged` log.

This is the real development loop: **edit → compile → deploy → send a transaction → read the updated state → inspect the receipt**.

## Example 2 — Student marks: mapping and validation

`mapping` behaves like key-value storage. Here, a student ID selects a mark. The `require` statement prevents an invalid mark from being saved.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StudentMarksLab {
    mapping(uint256 => uint256) private marks;

    event MarkRecorded(uint256 indexed studentId, uint256 mark);

    function setMarks(uint256 studentId, uint256 studentMark) external {
        require(studentMark <= 100, "Mark must be between 0 and 100");
        marks[studentId] = studentMark;
        emit MarkRecorded(studentId, studentMark);
    }

    function getMarks(uint256 studentId) external view returns (uint256) {
        return marks[studentId];
    }
}
```

Deploy it using the same Ganache-connected MetaMask account, then try these live calls in Remix:

| Action | Result |
| --- | --- |
| `getMarks(101)` | Returns `0`, the default value before anything is stored |
| `setMarks(101, 86)` | MetaMask asks for approval; Ganache records the transaction |
| `getMarks(101)` | Returns `86` after the transaction is mined |
| `setMarks(101, 120)` | Reverts with `Mark must be between 0 and 100`; `86` remains stored |

## Example 3 — a payable deposit contract

Contracts can receive test ETH. This example makes the amount visible and lets a user withdraw only their own deposited test ETH. Use it only on Ganache while learning.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TestVault {
    mapping(address => uint256) public deposits;

    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);

    function deposit() external payable {
        require(msg.value > 0, "Send test ETH");
        deposits[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount <= deposits[msg.sender], "Insufficient deposited balance");
        deposits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }
}
```

To observe it, deploy `TestVault`, enter a small value such as `1` and select **ether** in Remix’s value field, then call `deposit`. MetaMask shows the value and gas before approval. After it is mined, call `deposits(yourAddress)` to see the balance in wei. Withdraw an amount no greater than that balance, then inspect the second Ganache transaction.

## Before deploying beyond Ganache

Local deployment is fast and safe because Ganache can be reset. A public testnet or mainnet transaction costs real network fees and cannot be undone. Before leaving Ganache: test success and failure cases, restrict privileged functions, avoid hard-coded private keys, and have someone review any contract that will handle real value.

---

**UNIT \- 1** 

#### Practical Part: Adding Ganache Network to MetaMask

The PPT then moves from concepts to a local blockchain-development workflow using Ganache and MetaMask. Ganache provides a local blockchain environment for development and testing, while MetaMask acts as the user's wallet interface for interacting with that local network.

1. Open MetaMask in the browser extension.  
2. Open the network selector in the MetaMask interface.  
3. Choose the option to add a network manually.  
4. Enter a recognizable network name such as “Ganache Local.”  
5. Enter the RPC URL supplied by the running Ganache instance. The PPT mentions http://127.0.0.1:7545 or http://127.0.0.1:8545 and specifically notes localhost:8545.  
6. Enter Chain ID 1337 as specified in the PPT.  
7. Enter ETH as the currency symbol.  
8. Save the network configuration and select the newly added Ganache network.

What this achieves: MetaMask is now configured to communicate with the local Ganache blockchain through its RPC endpoint. This is useful for dApp development because transactions can be tested locally without using the public Ethereum network.

#### Importing a Ganache Test Account into MetaMask

Ganache creates development accounts that are pre-funded with test ETH. The PPT describes importing one of these accounts into MetaMask by using its private key.

1. Open Ganache and go to the Accounts section.  
2. Identify one of the pre-funded test accounts.  
3. Use the key icon associated with the account to display its private key.  
4. Copy the private key.  
5. Open MetaMask and use the account-management/import option.  
6. Paste the private key and complete the import.  
7. The imported account should then appear in MetaMask with the corresponding local test balance.

Security note: The private key of a Ganache test account is suitable for a local development environment, but it should never be treated as a production secret. Never import a real mainnet private key into a tutorial environment merely for convenience, and never publish private keys.

UNIT \- 2 

#### Steps to create smart contract on Remix IDE

### Part A – Create

1. Open Remix IDE.  
2. Create SimpleStorage.sol.  
3. Write the Solidity code.  
4. Save the file.

### Part B – Compile

5. Open **Solidity Compiler**.  
6. Select a compatible compiler version(0.08.19).  
7. Click **Compile SimpleStorage.sol**.  
8. Ensure compilation is successful.

### Part C – Connect

9. Open **Deploy & Run Transactions**.  
10. Under **Environment select Browser extensions- metamask**.  
11. Connect/approve MetaMask.  
12. Make sure the selected MetaMask account is connected to Ganache.

### Part D – Deploy

13. Select SimpleStorage.  
14. Click **Deploy**.  
15. Confirm the transaction in MetaMask.  
16. Wait for deployment.  
17. Observe the deployed contract under **Deployed Contracts**.

### Part E – Interact

18. Expand the deployed SimpleStorage contract.  
19. Click getNumber() → observe 0.  
20. Enter 100 in setNumber.  
21. Click setNumber.  
22. Confirm the transaction in MetaMask.  
23. Click getNumber() again → observe 100.

### Part F – Observe Blockchain

24. Open Ganache.  
25. Observe the transaction/block created by deployment.  
26. Observe the transaction/block created by setNumber(100).  
27. Change the value to 250.  
28. Confirm the transaction.  
29. Check Ganache again.  
30. Return to Remix and call getNumber() → observe 250.

### **Codes :**   **1\. Student Marks Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract StudentMarks {  
    mapping(uint \=\> uint) public marks;

    function setMarks(uint studentId, uint studentMarks) public {  
        marks\[studentId\] \= studentMarks;  
    }

    function getMarks(uint studentId) public view returns (uint) {  
        return marks\[studentId\];  
    }  
}

### **2\. Counter Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract Counter {  
    uint public count;

    function increment() public {  
        count++;  
    }

    function decrement() public {  
        count--;  
    }

    function getCount() public view returns (uint) {  
        return count;  
    }  
}

### **3\. Name Storage Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract NameStorage {  
    string public name;

    function setName(string memory newName) public {  
        name \= newName;  
    }

    function getName() public view returns (string memory) {  
        return name;  
    }  
}

### **4\. Voting Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract Voting {  
    uint public candidate1Votes;  
    uint public candidate2Votes;

    function voteCandidate1() public {  
        candidate1Votes++;  
    }

    function voteCandidate2() public {  
        candidate2Votes++;  
    }

    function getVotes() public view returns (uint, uint) {  
        return (candidate1Votes, candidate2Votes);  
    }  
}

The voting contract in the PDF contains two vote counters and functions to increment either candidate's votes.

### **5\. Student Attendance Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract StudentAttendance {  
    mapping(uint \=\> bool) public attendance;

    function markAttendance(uint studentId) public {  
        attendance\[studentId\] \= true;  
    }

    function getAttendance(uint studentId) public view returns (bool) {  
        return attendance\[studentId\];  
    }  
}

### **6\. Account Balance Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract AccountBalance {  
    uint public balance;

    function deposit(uint amount) public {  
        balance \+= amount;  
    }

    function withdraw(uint amount) public {  
        require(amount \<= balance, "Insufficient balance");  
        balance \-= amount;  
    }

    function getBalance() public view returns (uint) {  
        return balance;  
    }  
}

The PDF's withdrawal function uses `require()` to prevent withdrawing more than the current balance.

### **7\. Product Price Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract ProductPrice {  
    uint public price;

    function setPrice(uint newPrice) public {  
        price \= newPrice;  
    }

    function getPrice() public view returns (uint) {  
        return price;  
    }  
}

### **8\. Employee Salary Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract EmployeeSalary {  
    mapping(uint \=\> uint) public salary;

    function setSalary(uint employeeId, uint amount) public {  
        salary\[employeeId\] \= amount;  
    }

    function getSalary(uint employeeId) public view returns (uint) {  
        return salary\[employeeId\];  
    }  
}

### **9\. Book Library Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract BookLibrary {  
    bool public bookAvailable \= true;

    function borrowBook() public {  
        require(bookAvailable \== true, "Book is already borrowed");  
        bookAvailable \= false;  
    }

    function returnBook() public {  
        bookAvailable \= true;  
    }

    function checkAvailability() public view returns (bool) {  
        return bookAvailable;  
    }  
}

### **10\. To-Do List Contract**

// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;

contract TodoList {  
    string\[\] public tasks;

    function addTask(string memory task) public {  
        tasks.push(task);  
    }

    function getTask(uint index) public view returns (string memory) {  
        return tasks\[index\];  
    }

    function getTaskCount() public view returns (uint) {  
        return tasks.length;  
    }  
}  
