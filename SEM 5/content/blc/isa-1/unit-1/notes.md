# **BLOCKCHAIN — UNIT 1**

## **Introduction to Blockchain**

---

# **MODULE 1 — INTRODUCTION TO BLOCKCHAIN**

## **1\. What is Blockchain?**

Blockchain is a **distributed digital ledger** used to record transactions securely across multiple computers or nodes.

Instead of storing information in one central location, copies of the ledger are maintained across the network.

### **Simple definition**

> Blockchain is a decentralized and distributed ledger technology that records transactions in a secure, transparent and tamper-resistant manner.

---

## **2\. Why Blockchain?**

Traditional systems have several problems:

* Dependence on intermediaries  
* Transaction delays  
* Transaction fees  
* Single point of failure  
* Limited transparency  
* Risk of data tampering

Blockchain attempts to solve these problems using:

* Decentralization  
* Cryptography  
* Distributed ledger  
* Consensus  
* Peer-to-peer networking

---

## **3\. Main Features of Blockchain**

### **1\. Decentralization**

No single central authority controls the entire network.

### **2\. Transparency**

Transactions can be visible to authorized participants depending on the blockchain type.

### **3\. Immutability**

Once data is recorded and confirmed, it is difficult to modify.

### **4\. Security**

Cryptography protects transactions and blockchain records.

### **5\. Distributed Ledger**

Copies of the ledger are maintained across multiple nodes.

### **6\. Consensus**

Network participants agree on the validity of transactions.

---

## **4\. Centralized vs Decentralized vs Distributed**

| Feature | Centralized | Decentralized | Distributed |
| ----- | ----- | ----- | ----- |
| Control | Single authority | Multiple participants | Multiple nodes |
| Data | Central location | Shared among participants | Replicated |
| Failure | Single point of failure | Reduced | No single central failure |
| Example | Bank database | Blockchain network | Distributed ledger |

---

## **5\. Peer-to-Peer Network**

Blockchain uses a **P2P network**.

In a P2P network:

* Nodes communicate directly with each other.  
* There is no central server controlling every transaction.  
* Transactions are broadcast across the network.  
* Nodes validate transactions.  
* Valid transactions are added to the blockchain.

### **Basic flow**

**User → Transaction → P2P Network → Validation → Block → Blockchain**

---

## **6\. Blockchain vs Cryptocurrency**

Blockchain and cryptocurrency are **not the same thing**.

### **Blockchain**

* Technology/platform  
* Stores transactions and other records  
* Can be used without cryptocurrency  
* Used in many industries

### **Cryptocurrency**

* Digital asset/currency  
* Can operate using blockchain technology  
* Example: Bitcoin

**Remember:**  
**Blockchain \= Technology**  
**Cryptocurrency \= Digital Asset**

---

# **MODULE 2 — TYPES, EVOLUTION AND APPLICATIONS OF BLOCKCHAIN**

## **1\. Types of Blockchain**

The material describes four major types.

### **Public Blockchain**

Open to everyone.

Features:

* Anyone can participate.  
* Highly decentralized.  
* Transactions are generally transparent.  
* Examples include Bitcoin and Ethereum.

### **Private Blockchain**

Controlled by a single organization.

Features:

* Restricted participation.  
* Higher control.  
* Suitable for organizations.

### **Consortium Blockchain**

Controlled by a group of organizations.

Features:

* Multiple organizations participate.  
* More controlled than public blockchain.  
* Useful for business networks.

### **Hybrid Blockchain**

Combines characteristics of public and private blockchains.

Features:

* Some information can be public.  
* Sensitive information can remain restricted.  
* Provides flexibility.

---

## **2\. Evolution of Blockchain**

### **Blockchain 1.0 — Cryptocurrency**

Focus:

* Digital currency  
* Financial transactions

Example:

**Bitcoin**

---

### **Blockchain 2.0 — Smart Contracts**

Focus:

* Smart contracts  
* Programmable transactions  
* Decentralized applications

Example:

**Ethereum**

---

### **Blockchain 3.0 — Decentralized Applications**

Focus:

* DApps  
* Scalability  
* Better user experience  
* Cross-industry applications

Applications:

* Healthcare  
* Education  
* Voting  
* Real estate  
* Gaming

---

### **Blockchain 4.0 — Enterprise Blockchain**

Focus:

* Business and enterprise applications  
* High scalability  
* AI integration  
* IoT integration  
* Cloud integration  
* Faster and energy-efficient consensus

Applications:

* Smart cities  
* Industry 4.0  
* Supply chain  
* Healthcare  
* Banking

---

## **3\. Applications of Blockchain**

Major applications include:

1. Banking and Finance  
2. Supply Chain Management  
3. Healthcare  
4. Education  
5. Voting Systems  
6. Real Estate  
7. Insurance  
8. E-Commerce  
9. Government Services  
10. Internet of Things

---

# **MODULE 3 — CRYPTOGRAPHY, HASHING AND MERKLE TREES**

## **1\. Cryptography**

Cryptography is the technique of securing data by transforming it so that only authorized users can access or understand it.

### **Goals of Cryptography**

1. Confidentiality  
2. Integrity  
3. Authentication  
4. Non-repudiation

---

## **2\. Why Blockchain Needs Cryptography?**

Cryptography helps blockchain to:

* Protect transaction data  
* Verify user identity  
* Prevent unauthorized access  
* Ensure data integrity  
* Make blockchain tamper-resistant

---

## **3\. Types of Cryptography**

### **Symmetric Key Cryptography**

Uses the **same key** for encryption and decryption.

**One key → Encryption \+ Decryption**

---

### **Asymmetric Key Cryptography**

Uses two related keys:

* Public key  
* Private key

**Public key → Can be shared**

**Private key → Must remain secret**

---

### **Hash Functions**

Hashing converts data of any size into a fixed-length hash value.

---

# **4\. Hashing**

### **Definition**

Hashing is the process of converting data into a fixed-length value using a mathematical hash function.

### **Characteristics**

* Deterministic  
* Fixed-length output  
* Fast computation  
* Avalanche effect  
* One-way function  
* Collision resistant

### **Avalanche Effect**

A small change in the input produces a completely different hash.

Example:

**Input A → Hash X**

Small change:

**Input B → Completely different Hash Y**

---

## **5\. Hashing in Blockchain**

Hashing is used to:

* Generate a unique identity for blocks  
* Link blocks  
* Detect unauthorized changes  
* Verify transaction integrity  
* Secure blockchain records

---

# **6\. Merkle Tree**

A **Merkle Tree** is a hierarchical structure that organizes transaction hashes into a tree and produces a single hash called the **Merkle Root**.

### **Basic structure**

            Merkle Root

                /    \\

             H12      H34

             / \\      / \\

           H1  H2   H3  H4

           |   |    |   |

          T1  T2   T3  T4

Where:

* T1–T4 \= Transactions  
* H1–H4 \= Transaction hashes  
* H12/H34 \= Combined hashes  
* Merkle Root \= Final hash

### **Advantages**

* Faster transaction verification  
* Improves blockchain efficiency  
* Detects tampering  
* Reduces storage/bandwidth requirements  
* Enhances security and scalability

---

# **MODULE 4 — BLOCKS, PUBLIC/PRIVATE KEYS, WALLETS AND ADDRESSES**

## **1\. Block**

A block is a container that stores a group of verified transactions.

Each block is linked to the previous block using a cryptographic hash.

### **Main characteristics**

* Stores verified transactions  
* Linked to previous block  
* Immutable after validation  
* Ensures data integrity

---

## **2\. Components of a Block**

A block contains:

1. Block Header  
2. Transaction Data  
3. Previous Block Hash  
4. Timestamp  
5. Nonce  
6. Merkle Root

---

## **3\. Public Key and Private Key**

Blockchain uses asymmetric cryptography.

### **Private Key**

* Secret  
* Used to sign transactions  
* Must never be shared  
* Provides ownership/control of funds

### **Public Key**

* Can be shared  
* Used to verify signatures  
* Can be used to generate wallet addresses

### **Easy memory trick**

**Private \= Sign**

**Public \= Verify**

---

# **4\. Blockchain Wallet**

A blockchain wallet is a digital application or device that securely manages cryptographic keys and allows users to send, receive and manage digital assets.

### **Functions**

* Stores public/private keys  
* Sends cryptocurrency  
* Receives cryptocurrency  
* Signs transactions  
* Manages digital assets

---

## **5\. Types of Wallets**

### **Software Wallet**

Application installed on a computer.

Example:

**Exodus, Electrum**

### **Hardware Wallet**

Physical device that stores keys offline.

Example:

**Ledger Nano X, Trezor**

### **Web Wallet**

Accessed through a web browser.

Example:

**MetaMask**

### **Mobile Wallet**

Smartphone application.

Example:

**Trust Wallet**

### **Paper Wallet**

Printed document containing keys, generally represented as text or QR codes.

---

# **6\. Blockchain Address**

A blockchain address is used to **send and receive digital assets**.

It is generated from the public key.

Example:

`0x71C7656EC7ab88b098defB751B740B1B5f6d8976F`

### **Important**

**Private Key → Sign**

**Public Key → Verify / Generate Address**

**Address → Send & Receive**

---

# **MODULE 5 — DISTRIBUTED LEDGER AND DECENTRALIZED WEB**

## **1\. Distributed Ledger**

A distributed ledger is a **shared digital database replicated and synchronized across multiple computers/nodes**.

### **Features**

* Shared among participants  
* No central authority  
* Multiple synchronized copies  
* Transactions synchronized across network  
* Uses cryptography

---

## **2\. Traditional Database vs Distributed Ledger**

| Traditional Database | Distributed Ledger |
| ----- | ----- |
| Central authority | Multiple participants |
| Single/main controlled copy | Multiple synchronized copies |
| Records can be modified | Records are generally immutable |
| Lower transparency | Higher transparency |
| Central point of failure | No single central point of failure |

---

## **3\. How Distributed Ledger Works**

Transaction Created

        ↓

Broadcast to Nodes

        ↓

Nodes Validate

        ↓

Consensus Achieved

        ↓

Transaction Recorded

        ↓

Ledger Synchronized

---

## **4\. Advantages**

* Improved security  
* Increased transparency  
* High data integrity  
* Reduced intermediaries  
* Better traceability  
* Enhanced reliability

---

## **5\. Limitations**

* Scalability challenges  
* High storage requirements  
* Network latency  
* Complex governance  
* Initial implementation cost

---

# **6\. Decentralized Web — Web3**

Web3 is the next generation of the internet where users can **own and control their data and digital assets using decentralized technologies such as blockchain**.

### **Characteristics**

* Decentralized architecture  
* User ownership of data  
* Peer-to-peer interactions  
* Enhanced privacy  
* Smart contract automation  
* Token-based economy  
* Open ecosystem

---

## **7\. Evolution of the Web**

| Web | Description |
| ----- | ----- |
| Web 1.0 | Read |
| Web 2.0 | Read \+ Write |
| Web 3.0 | Read \+ Write \+ Own |

### **Web 1.0**

Mostly static websites.

### **Web 2.0**

Interactive websites and user-generated content.

### **Web 3.0**

Decentralized applications and user ownership.

---

## **8\. Web2 vs Web3**

| Web2 | Web3 |
| ----- | ----- |
| Data owned by companies | Data owned by users |
| Centralized servers | Distributed blockchain network |
| Username/password login | Wallet-based authentication |
| Platform controls identity | User controls identity |
| Intermediaries | Peer-to-peer interactions |

---

## **9\. Components of Web3**

Main components:

* Blockchain  
* Smart Contracts  
* Cryptocurrency  
* Digital Wallets  
* DApps  
* Decentralized Storage  
* Digital Identity

---

## **10\. Applications of Web3**

* DeFi  
* NFTs  
* Blockchain gaming  
* Digital identity  
* Healthcare  
* Supply chain  
* Education  
* Voting  
* Metaverse  
* Social media

---

## **11\. Case Study — University Digital Certificate System**

A university wants to issue digital degree certificates.

Blockchain can provide:

* Secure certificate storage  
* Tamper resistance  
* Easy verification  
* Reduced paperwork  
* Distributed verification

### **Basic flow**

University

    ↓

Issue Certificate

    ↓

Blockchain

    ↓

Student

    ↓

Employer Verification

---

