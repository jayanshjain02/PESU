# **BLOCKCHAIN — UNIT 2**

## **Consensus Mechanisms and Smart Contracts**

---

# **MODULE 1 — CONSENSUS MECHANISMS, PoW, PoS, PoA AND PoB**

## **1\. Consensus Mechanism**

A **consensus mechanism** is a protocol that enables all nodes in a blockchain network to agree on the validity of transactions and maintain a consistent version of the ledger without a central authority.

### **Why is Consensus Needed?**

* Validates blockchain transactions  
* Prevents double spending  
* Ensures all nodes maintain the same ledger  
* Builds trust in decentralized networks  
* Protects against malicious activities

### **General Working**

Transaction Created  
        ↓  
Transaction Broadcast  
        ↓  
Nodes Verify Transaction  
        ↓  
Consensus Mechanism  
        ↓  
New Block Created  
        ↓  
Block Added to Blockchain  
        ↓  
Ledger Updated  
---

# **2\. Types of Consensus Mechanisms**

The unit covers:

1. Proof of Work — PoW  
2. Proof of Stake — PoS  
3. Proof of Activity  
4. Proof of Burn — PoB  
5. Proof of Elapsed Time — PoET  
6. Proof of Authority — PoA  
7. Proof of Importance — PoI

---

# **3\. Proof of Work — PoW**

Proof of Work is a consensus mechanism where **miners compete to solve complex mathematical puzzles**.

The first miner to solve the puzzle gets the right to add the next block and receives a reward.

### **Working**

1. Transactions are collected.  
2. Miners solve a cryptographic puzzle.  
3. First successful miner creates the block.  
4. Other nodes verify the block.  
5. Block is added to blockchain.

### **Advantages**

* Strong security  
* Resistant to attacks  
* Proven and reliable

### **Limitations**

* High electricity consumption  
* Lower transaction speed  
* Expensive mining hardware

### **Example**

**Bitcoin**

---

# **4\. Proof of Stake — PoS**

Proof of Stake selects validators based on the **amount of cryptocurrency they stake**, rather than computational power.

### **Key Points**

* Energy efficient  
* Faster than PoW  
* No mining required  
* Used in Ethereum 2.0

### **Advantages**

* Low energy usage  
* Faster block creation  
* Lower hardware requirements

### **Limitations**

* Wealth concentration concerns  
* Requires sufficient stake  
* Validator selection depends on network rules

---

# **5\. Proof of Activity**

Proof of Activity combines:

**Proof of Work \+ Proof of Stake**

### **Working**

1. Miners generate an empty block using PoW.  
2. Validators are selected based on stake.  
3. Validators verify the block.  
4. Block is finalized and added.

### **Advantages**

* Better security  
* Shared responsibility  
* Reduced attack risk

### **Limitation**

* More complex implementation  
* Requires both miners and validators

---

# **6\. Proof of Burn — PoB**

Proof of Burn allows participants to **permanently destroy cryptocurrency** to gain the right to validate transactions and create blocks.

### **Working**

1. Coins are sent to an unspendable address.  
2. Burned coins demonstrate commitment.  
3. Validator gains mining rights.  
4. Validator creates blocks and earns rewards.

### **Advantages**

* Low energy consumption  
* Encourages network commitment  
* Reduced hardware requirements

### **Limitations**

* Permanent loss of coins  
* Less commonly adopted  
* Risk associated with burning assets

### **Example**

**Slimcoin**

---

## **Consensus Comparison**

| Mechanism | Main Method | Energy | Example |
| ----- | ----- | ----- | ----- |
| PoW | Mining | High | Bitcoin |
| PoS | Staking | Low | Ethereum |
| Proof of Activity | Mining \+ Staking | Medium | Decred |
| PoB | Burning coins | Low | Slimcoin |

---

# **MODULE 2 — PoET, PoA AND PoI**

## **1\. Proof of Elapsed Time — PoET**

PoET is a consensus mechanism where each participating node receives a **randomly assigned waiting time**.

The node with the shortest waiting time is selected to create the next block.

### **Example**

**Hyperledger Sawtooth**

### **Working**

Each Node Gets Random Waiting Time  
              ↓  
             Wait  
              ↓  
Shortest Timer Expires  
              ↓  
Node Creates Block  
              ↓  
Other Nodes Verify  
              ↓  
Block Added

### **Advantages**

* Low power consumption  
* Fair and random block selection  
* Fast block creation

### **Limitations**

* Requires trusted hardware such as Intel SGX  
* Mainly suitable for private/enterprise blockchains

---

# **2\. Proof of Authority — PoA**

PoA is a consensus mechanism where **pre-approved and trusted validators** verify transactions and create new blocks.

### **Key Points**

* Identity-based validation  
* No mining  
* No staking  
* High transaction speed  
* Used in private and consortium blockchains

### **Working**

1. Trusted validators are selected.  
2. Validators verify transactions.  
3. One validator creates the block.  
4. Block is shared with the network.  
5. Other validators confirm the block.

### **Advantages**

* Fast transaction processing  
* Low computational cost  
* High scalability  
* Suitable for enterprise applications

### **Limitations**

* Less decentralized  
* Requires trust in validators  
* Validator selection is controlled

### **Example**

**VeChain**

---

# **3\. Proof of Importance — PoI**

PoI selects validators based on their **overall contribution to the blockchain network**, rather than only the amount of cryptocurrency they own.

### **Selection Factors**

* Cryptocurrency held  
* Transaction activity  
* Network participation  
* Reputation and contribution

### **Working**

1. Users hold cryptocurrency.  
2. Network calculates an importance score.  
3. Users with higher scores are more likely to validate blocks.  
4. Validators receive rewards.

### **Advantages**

* Promotes active network usage  
* Encourages regular transactions  
* Reduces wealth-based domination  
* Improves network participation

### **Limitations**

* More complex calculation  
* Less widely adopted  
* Requires continuous network activity

### **Example**

**NEM**

---

## **PoET vs PoA vs PoI**

| Feature | PoET | PoA | PoI |
| ----- | ----- | ----- | ----- |
| Selection | Random waiting time | Trusted validators | Importance score |
| Energy | Very low | Very low | Low |
| Mining | No | No | No |
| Decentralization | Medium | Low | High |
| Best suited | Enterprise | Private/Consortium | Public |
| Example | Hyperledger Sawtooth | VeChain | NEM |

---

# **MODULE 3 — SMART CONTRACTS**

## **1\. What is a Smart Contract?**

A **smart contract** is a self-executing digital agreement stored on a blockchain.

Its terms and conditions are automatically executed when predefined conditions are met.

---

## **2\. Problems with Traditional Contracts**

Traditional contracts may:

* Depend on intermediaries  
* Be time-consuming  
* Have higher transaction costs  
* Have possibility of fraud  
* Require manual execution

---

## **3\. Need for Smart Contracts**

Smart contracts help by:

* Automating execution  
* Reducing costs  
* Increasing transparency  
* Improving security  
* Eliminating intermediaries

---

# **4\. Working of Smart Contracts**

Contract Terms Written as Code  
             ↓  
Contract Deployed on Blockchain  
             ↓  
Users Interact with Contract  
             ↓  
Blockchain Verifies Conditions  
             ↓  
Conditions Satisfied?  
       ↓              ↓  
      YES             NO  
       ↓              ↓  
Automatic          No Execution  
Execution  
       ↓  
Result Recorded on Blockchain

Once deployed, smart contracts execute automatically without human intervention.

---

# **5\. Features of Smart Contracts**

* Automated execution  
* Immutable  
* Transparent  
* Secure  
* Decentralized  
* Cost-effective  
* Trustworthy

---

# **6\. Smart Contract Platforms**

The unit covers:

### **Ethereum**

Most widely used platform for smart contract development.

### **BNB Smart Chain**

Supports fast and low-cost smart contract execution.

### **Hyperledger Fabric**

Enterprise blockchain platform for business applications.

### **Solana**

High-performance blockchain with fast transaction processing.

### **Cardano**

Focuses on security and scalability.

### **Polygon**

A blockchain platform used for scalable applications.

---

# **MODULE 4 — SMART CONTRACT DEVELOPMENT TOOLS AND WORKFLOW**

## **1\. Smart Contract Development**

Smart contract development involves:

1. Designing the contract  
2. Writing the code  
3. Compiling  
4. Debugging  
5. Testing  
6. Deployment

The unit states that **Solidity** is the most widely used language for Ethereum smart contract development.

---

# **2\. Development Process**

Define Requirements  
        ↓  
Design Contract Logic  
        ↓  
Write Solidity Code  
        ↓  
Compile  
        ↓  
Fix Errors  
        ↓  
Test  
        ↓  
Deploy  
---

# **3\. Remix IDE**

**Remix IDE** is a web-based development environment used to:

* Write smart contracts  
* Compile contracts  
* Deploy contracts  
* Interact with contracts

### **Advantage**

No installation is required because it is web-based.

---

# **4\. Ganache**

Ganache is a **local blockchain environment** used for development and testing.

It provides:

* Local blockchain  
* Test accounts  
* Test transactions  
* Development environment

---

# **5\. MetaMask**

MetaMask is a **crypto wallet** that can be used to:

* Manage blockchain accounts  
* Manage transactions  
* Connect to Remix  
* Connect to blockchain networks  
* Interact with DApps

---

# **Tool Comparison**

| Feature | Remix | Ganache | MetaMask |
| ----- | ----- | ----- | ----- |
| Type | Web IDE | Local Blockchain | Crypto Wallet |
| Main purpose | Write/compile contracts | Test blockchain | Manage accounts/transactions |
| Installation | No | Yes | Browser extension/mobile |
| Cost | Free | Free | Free |

---

# **6\. Real-World Development Workflow**

Write Contract in Remix  
          ↓  
Compile in Remix  
          ↓  
Connect MetaMask  
          ↓  
Connect MetaMask to Ganache  
          ↓  
Deploy Contract  
          ↓  
Interact with Contract  
---

# **MODULE 5 — DEPLOYMENT, TESTING, USE CASES AND CASE STUDIES**

# **1\. Deployment of Smart Contracts**

Deployment is the process of **publishing a compiled smart contract onto a blockchain network**, making it available for execution.

### **Important Points**

* Creates a permanent contract instance  
* Every deployed contract has a unique address  
* Requires blockchain transaction confirmation

---

## **Deployment Process**

1. Connect MetaMask wallet.  
2. Select blockchain network.  
3. Deploy compiled contract.  
4. Confirm deployment transaction.  
5. Obtain contract address.

---

# **2\. Testing Smart Contracts**

Testing verifies that a smart contract works:

* Correctly  
* Securely  
* Efficiently

### **Why Testing?**

* Detect coding errors  
* Verify contract logic  
* Prevent security vulnerabilities  
* Reduce deployment risks  
* Ensure expected outputs

---

# **3\. Types of Testing**

### **Functional Testing**

Checks whether functions work correctly.

### **Unit Testing**

Tests individual functions independently.

### **Integration Testing**

Tests interaction between multiple contracts.

### **Security Testing**

Identifies vulnerabilities.

### **Performance Testing**

Evaluates execution efficiency.

---

# **4\. Smart Contract Best Practices**

### **During Development**

* Write simple and readable code  
* Use meaningful variable names  
* Avoid unnecessary complexity

### **During Deployment**

* Verify network selection  
* Keep backup of contract information  
* Review deployment parameters

### **During Testing**

* Test all possible inputs  
* Validate outputs  
* Test security scenarios

---

# **5\. Use Cases of Smart Contracts**

| Industry | Application |
| ----- | ----- |
| Banking | Automated payments |
| Healthcare | Secure patient records |
| Supply Chain | Product tracking |
| Real Estate | Property registration |
| Insurance | Automatic claim settlement |
| Education | Certificate verification |
| Government | Digital identity |
| Voting | Electronic voting |

---

# **6\. Case Study — Supply Chain Management**

### **Problem**

Tracking products across multiple suppliers can be time-consuming and lack transparency.

### **Smart Contract Solution**

* Records every stage of product journey  
* Automatically updates ownership  
* Verifies product authenticity  
* Releases payment after successful delivery

### **Benefits**

* Improved transparency  
* Reduced fraud  
* Faster payments  
* Better traceability

---

# **7\. Case Study — Education Certificate Verification**

### **Problem**

Employers spend time verifying certificates and may encounter fake documents.

### **Smart Contract Solution**

* Universities issue certificates on blockchain  
* Students receive secure digital certificates  
* Employers verify certificates instantly  
* Records cannot be altered

### **Benefits**

* Tamper-proof certificates  
* Instant verification  
* Reduced paperwork  
* Increased trust

---

# **8\. Case Study — Insurance Claim Processing**

### **Problem**

Traditional insurance claims involve manual verification and long processing times.

### **Smart Contract Solution**

* Claim conditions are defined in the smart contract  
* Required documents are verified automatically  
* If conditions are satisfied, payment is released automatically

---

