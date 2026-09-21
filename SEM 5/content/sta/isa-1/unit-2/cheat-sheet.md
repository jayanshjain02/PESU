# **⭐ STA UNIT 2 — FINAL CHEAT SHEET**

## **Black-Box**

**Black-box \= Don't know internal code**

Main techniques:

EP

BVA

Decision Table

Use Case

State Transition

Pairwise

---

## **Equivalence Partitioning**

**Divide inputs into similar-behaving classes.**

Example:

Age 17–25

\<17    → Invalid

17–25  → Valid

\>25    → Invalid

---

## **BVA**

**Test boundaries and nearby values.**

For 10–50:

9, 10, 11, 49, 50, 51

---

## **Decision Table**

**Multiple conditions → multiple rules → actions**

---

## **Pairwise**

**Every pair of parameter values at least once.**

Reduces test cases.

---

## **Use Case**

**User interaction → test scenario**

Remember:

**Actor \+ Use Case \+ Main/Alternative/Exception flows**

---

## **State Transition**

State \+ Event → New State

Example:

Empty Cart

    ↓ Add Item

One Item

---

# **WHITE-BOX**

**White-box \= Internal code is known**

Techniques:

Statement

Branch

Path

Condition

Decision

MCC

MC/DC

Loop

Data Flow

---

# **Coverage Formulas**

### **Statement**

Executed StatementsTotal Statements×100\\boxed{\\frac{Executed\\ Statements}{Total\\ Statements}\\times100}

### **Decision**

Executed Decision OutcomesTotal Decision Outcomes×100\\boxed{\\frac{Executed\\ Decision\\ Outcomes}{Total\\ Decision\\ Outcomes}\\times100}

### **MCC**

2n\\boxed{2^n}

### **MC/DC — given approach in your PDF**

n+1\\boxed{n+1}

---

# **Coverage Differences**

### **Statement**

**Every statement executes**

### **Branch**

**Every branch executes**

### **Path**

**Every execution path**

### **Condition**

**Every individual condition \= TRUE \+ FALSE**

### **Decision**

**Overall decision \= TRUE \+ FALSE**

### **MCC**

**Every combination**

### **MC/DC**

**Every condition independently affects decision**

---

# **MCC vs MC/DC**

3 conditions

MCC:

2³ \= 8 tests

MC/DC:

3 \+ 1 \= 4 tests

**MCC \= all combinations**

**MC/DC \= independent effect**

---

# **Loop Testing**

4 types:

1\. Simple

2\. Nested

3\. Concatenated

4\. Iterative

Remember:

**Nested \= inside**

**Concatenated \= one after another**

**Iterative \= different input values**

---

# **Data Flow**

DEF → PROCESS → USE

**Definition \= assign value**

**Use \= use value in calculation/decision**

---

# **Agile Testing**

### **Principles**

Collaborate

Test early

Automate

CI/CD

Exploratory

Risk-based

Metrics

Embrace change

### **Quadrants**

Q1 → Technology \+ Automated

Q2 → Business \+ Automated

Q3 → Business \+ Manual

Q4 → Technology \+ Manual

### **TDD**

Test

 ↓

FAIL

 ↓

Code

 ↓

PASS

 ↓

Refactor

### **CI/CD**

CI → Integrate \+ Build \+ Test

CD → Build \+ Test \+ Deploy

---

