# **STA UNIT 2 — TEST DESIGN TECHNIQUES**

---

# **MODULE 1 — BLACK-BOX TEST DESIGN TECHNIQUES**

## **1\. Black-Box Testing**

Black-box testing tests the **functionality of software without knowing its internal implementation/code**.

### **Main idea**

Input

  ↓

┌───────────────┐

│    SYSTEM     │

│  Internal     │

│  workings     │

│  unknown      │

└───────────────┘

  ↓

Output

### **Advantages**

* Tester focuses on functionality.  
* Tester does not need implementation knowledge.  
* Can identify defects not visible from code/architecture.

### **Limitations**

* May miss internal errors.  
* May not identify complex defects effectively.  
* May not be suitable for some performance/security issues.

Black-box techniques in the PDF include:

* Equivalence Partitioning  
* Boundary Value Analysis  
* Decision Table Testing  
* Use-Case Testing

---

# **2\. Equivalence Partitioning**

**Equivalence Partitioning (EP)** divides input data into groups/classes that are expected to behave similarly.

Instead of testing every possible input, test representative values from each class.

### **Example**

Age allowed: **17–25**

Invalid          Valid          Invalid

\< 17             17–25          \> 25

───────────────┬──────────────┬───────────────

     Class 1   │    Class 2   │    Class 3

Possible representatives:

| Class | Example |
| ----- | ----- |
| Below 17 | 16 |
| 17–25 | 20 |
| Above 25 | 26 |

### **Steps**

1. Identify input variables.  
2. Divide inputs into equivalence classes.  
3. Create test cases for each class.  
4. Execute test cases.  
5. Repeat for each input variable.

### **Advantages**

* Reduces number of test cases.  
* Provides good coverage with fewer tests.  
* Easy to apply.

### **Limitations**

* Not ideal when input space is very small.  
* Safety-critical systems may require testing every possible value.

---

# **3\. Boundary Value Analysis**

**Boundary Value Analysis (BVA)** focuses on values at and around the boundaries of an input range.

For a range:

**10–50**

Important values:

9    10    11                    49    50    51

↑     ↑     ↑                     ↑     ↑     ↑

Below Min   Above Min             Below Max   Above Max

### **Typical boundary values**

* Minimum  
* Just above minimum  
* Maximum  
* Just below maximum

Example: Age **18–60**

| Input | Expected |
| ----- | ----- |
| 17 | Reject |
| 18 | Accept |
| 60 | Accept |
| 61 | Reject |

### **Important distinction**

**EP** → divides inputs into classes.

**BVA** → concentrates on boundaries.

---

# **4\. Decision Table Testing**

Decision Table Testing is a black-box technique used when **multiple conditions combine to produce different outputs/actions**.

A decision table contains:

* Conditions  
* Rules  
* Actions

### **Basic structure**

| Conditions | Rule 1 | Rule 2 |
| ----- | ----- | ----- |
| Condition 1 | T | F |
| Condition 2 | T | T |
| **Action** | Execute A | Execute B |

Each combination of conditions is called a **rule**.

### **Example: ATM**

Conditions:

1. Card valid?  
2. PIN correct?  
3. Balance sufficient?  
4. ATM cash sufficient?

Card invalid

      ↓

 Transaction Rejected

Card valid

   ↓

PIN incorrect

   ↓

 Transaction Rejected

Card \+ PIN valid

   ↓

Balance insufficient

   ↓

 Transaction Rejected

Everything valid

   ↓

 Cash Dispensed

### **When useful?**

When there are **many combinations of conditions and actions**.

---

# **MODULE 2 — PAIRWISE, USE-CASE & STATE TRANSITION TESTING**

## **1\. Pairwise Testing**

Pairwise testing is also called **All-Pairs Testing**.

Its goal is to ensure that **every pair of parameter values is tested at least once**.

It is a combinatorial testing technique that reduces the number of test cases.

### **Example**

Suppose:

* OS \= Android, iOS  
* Network \= Wi-Fi, 4G, 5G  
* Login \= Password, Fingerprint, Face ID

Testing every combination can create many test cases.

Pairwise testing ensures important **pairs of parameter values** occur at least once.

### **Important formula**

If there are:

* 3 parameters  
* each has 4 values

Total combinations:

**4 × 4 × 4 \= 64**

The PDF example says pairwise testing can reduce this to **24 test cases**.

---

# **2\. Use-Case Testing**

Use-case testing evaluates whether software satisfies **user requirements from the user's perspective**.

A **use case** describes how an actor/user interacts with a system.

### **Example: ATM**

User

 ↓

Insert Card

 ↓

Enter PIN

 ↓

Authenticate

 ↓

Select Withdrawal

 ↓

Enter Amount

 ↓

Receive Cash

Test cases can verify:

* ATM functioning  
* User authentication  
* Balance update  
* Correct cash amount

### **Benefits**

* Improved software quality  
* Better coverage  
* Easy for stakeholders to understand  
* Focuses on important scenarios

### **Limitations**

* Can be time-consuming.  
* Requires sufficient information about use cases.  
* Less useful for very simple systems.

---

# **3\. State Transition Testing**

State Transition Testing tests how a system moves from **one state to another based on events/actions**.

### **Basic model**

State A

   │

 Event

   ↓

State B

   │

 Event

   ↓

State C

### **Steps**

1. Identify states.  
2. Identify events causing transitions.  
3. Create state transition diagram.  
4. Design test cases.  
5. Execute test cases.

### **Example: Traffic Light**

      Timer

Red ─────────→ Green

 ↑              │

 │              │ Timer

 │              ↓

 └──────────── Yellow

       Timer

States:

* Red  
* Green  
* Yellow

---

## **Online Shopping Example**

States:

Empty Cart

    ↓ Add Item

One Item

    ↓ Add Item

Two Items

    ↓ Add Item

Three Items

    ↓ Checkout

Checkout

The state transition table records the current state, event and resulting next state.

---

# **MODULE 3 — WHITE-BOX TESTING & STATEMENT/BRANCH COVERAGE**

## **1\. White-Box Testing**

White-box testing tests the **internal workings and implementation of software**.

The tester has knowledge of the source code/internal structure.

Techniques mentioned in the PDF include:

* Statement Coverage  
* Branch Coverage  
* Path Coverage  
* Condition Coverage  
* Decision Coverage  
* Multiple Condition Coverage  
* MC/DC  
* Loop Testing  
* Data Flow Testing

---

# **2\. Statement Coverage**

Statement Coverage checks whether **every executable statement has been executed at least once**.

### **Formula**

**Statement Coverage \=**

Executed StatementsTotal Statements×100\\frac{\\text{Executed Statements}}{\\text{Total Statements}}\\times100

### **Example**

1\. if a \> b

2\.     largest \= a

3\. else

4\.     largest \= b

5\. return largest

Suppose the executable statements are:

1, 2, 3, 4

Test Case 1:

a \= 10

b \= 5

Executes:

1 → 2 → 4

Coverage:

3/4×100=75%3/4 × 100 \= 75\\%

Another test:

a \= 5

b \= 10

executes statement 3\.

Therefore all statements are covered.

**100% Statement Coverage.**

### **Important**

100% statement coverage **does NOT guarantee that the software is defect-free**.

---

# **3\. Branch Coverage**

Branch Coverage checks whether **all branches/outcomes of decisions are executed**.

For an `if-else`:

       Condition

        /       \\

     TRUE      FALSE

       ↓          ↓

    Branch 1   Branch 2

Both must be executed for 100% branch coverage.

### **Example**

if x \> y:

    return x

else:

    return y

Test 1:

x \= 4, y \= 3

→ True branch

Test 2:

x \= 3, y \= 4

→ False branch

Therefore:

**100% branch coverage.**

The PDF explicitly notes that branch coverage checks each decision branch and that additional techniques may still be necessary.

---

# **Statement vs Branch Coverage**

| Statement Coverage | Branch Coverage |
| ----- | ----- |
| Tests executable statements | Tests decision outcomes |
| Focuses on statements | Focuses on branches |
| Every statement at least once | Every branch at least once |
| Can miss some branches | Stronger than statement coverage |

---

# **MODULE 4 — PATH, CONDITION & DECISION COVERAGE**

## **1\. Path Coverage**

Path Coverage tests **all possible execution paths** through a program.

A path is a sequence of statements from **entry to exit**.

### **Example**

def add\_numbers(a,b):

    if a \> 0 and b \> 0:

        result \= a+b

    else:

        result \= 0

    return result

Possible paths:

Path 1:

1 → 2 → 3 → 5

Path 2:

1 → 2 → 4 → 5

Two test cases are required to cover both paths.

### **Important**

Path Coverage is more thorough than Statement Coverage or Branch Coverage, but can become difficult/time-consuming for complex programs.

---

# **2\. Condition Coverage**

Condition Coverage focuses on **individual Boolean conditions**.

Every individual condition must evaluate to:

* TRUE at least once  
* FALSE at least once

Example:

if A and B:

For condition coverage:

A → TRUE and FALSE

B → TRUE and FALSE

The PDF describes condition coverage as checking possible Boolean outcomes of individual conditions.

### **Example**

Conditions:

A \= a \> b

B \= c \< d

Required combinations in the PDF example:

| A | B |
| ----- | ----- |
| T | T |
| T | F |
| F | T |
| F | F |

---

# **3\. Decision Coverage**

Decision Coverage focuses on the **overall decision outcome**.

Every decision should produce:

* TRUE  
* FALSE

### **Example**

if age \>= 60:

    senior \= True

else:

    senior \= False

Test:

Age \= 65 → TRUE

Age \= 50 → FALSE

→ 100% decision coverage.

The PDF explicitly distinguishes decision coverage from condition coverage.

---

# **Condition vs Decision Coverage**

| Condition Coverage | Decision Coverage |
| ----- | ----- |
| Individual conditions | Overall decision |
| Each condition T/F | Decision T/F |
| Example: A and B | Overall `A and B` |
| Focuses on Boolean conditions | Focuses on decision outcomes |

### **Easy memory trick**

**Condition \= Individual**

**Decision \= Overall**

---

# **MODULE 5 — MCC & MC/DC**

## **1\. Multiple Condition Coverage (MCC)**

MCC is a white-box technique that tests **all possible combinations of Boolean conditions**.

If there are **n independent Boolean conditions**:

2n\\boxed{2^n}

combinations are possible.

### **Example**

For 2 conditions:

A B

T T

T F

F T

F F

Total:

22=42^2=4

For 3 conditions:

23=82^3=8

The PDF specifically gives this relationship.

### **Advantage**

* Finds complex logic errors.  
* Gives extensive condition coverage.

### **Limitation**

Number of test cases grows rapidly.

For 4 conditions:

24=162^4=16

---

# **2\. MC/DC**

**Modified Condition/Decision Coverage (MC/DC)** checks that:

> Each individual condition can independently affect the overall decision outcome.

It is particularly stringent and is discussed in the PDF in the context of safety-critical systems.

### **Key idea**

Change **one condition at a time** while keeping the other conditions unchanged.

If changing C1 changes the decision:

C1: TRUE → FALSE

Decision: TRUE → FALSE

then C1 independently affects the decision.

---

# **MC/DC Example**

if attendance \>= 75 and marks \>= 40 and fees\_paid \== True:

    return "Eligible"

else:

    return "Not Eligible"

Conditions:

C1 \= attendance \>= 75

C2 \= marks \>= 40

C3 \= fees\_paid \== True

Test cases:

| TC | C1 | C2 | C3 | Decision |
| ----- | ----- | ----- | ----- | ----- |
| TC1 | T | T | T | T |
| TC2 | F | T | T | F |
| TC3 | T | F | T | F |
| TC4 | T | T | F | F |

Now compare:

TC1 → TC2

Only C1 changes

Decision changes

TC1 → TC3

Only C2 changes

Decision changes

TC1 → TC4

Only C3 changes

Decision changes

Therefore:

**100% MC/DC coverage.**

### **Important formula from the PDF**

For **N inputs**, MC/DC can use:

N+1\\boxed{N+1}

test cases in the given approach.

So:

| Inputs | MC/DC tests |
| ----- | ----- |
| 2 | 3 |
| 3 | 4 |
| 4 | 5 |

Compared with MCC:

| Conditions | MCC | MC/DC |
| ----- | ----- | ----- |
| 2 | 4 | 3 |
| 3 | 8 | 4 |
| 4 | 16 | 5 |

---

# **MCC vs MC/DC**

| MCC | MC/DC |
| ----- | ----- |
| Tests all combinations | Tests independent effect of each condition |
| 2n2^n combinations | Given approach uses n+1n+1 |
| Very large number of tests | Fewer tests |
| Strong but expensive | Efficient and stringent |
| Uses truth table | Uses pairs showing independent effect |

---

# **MODULE 6 — LOOP TESTING & DATA FLOW TESTING**

# **1\. Loop Testing**

Loop testing checks whether loops:

* Execute the correct number of times.  
* Terminate correctly.  
* Handle boundary conditions.  
* Handle error conditions.  
* Produce correct inputs/outputs.

## **Types of Loop Testing**

### **1\. Simple Loop Testing**

Tests:

* Minimum iterations  
* Maximum iterations  
* Values between minimum and maximum

### **2\. Nested Loop Testing**

One loop exists inside another.

Outer Loop

   ↓

 ┌──────────────┐

 │ Inner Loop   │

 │   ↓          │

 │   ↓          │

 └──────────────┘

Both loops are tested individually and together.

### **3\. Concatenated Loop Testing**

Multiple loops execute one after another.

Loop 1 → Loop 2 → Loop 3

### **4\. Iterative Loop Testing**

The loop is tested with different input values/conditions.

---

# **Loop Example**

Suppose:

for i in range(n):

    process()

Useful test cases:

n \= 0

n \= 1

n \= 2

n \= normal value

n \= maximum/large value

The PDF also discusses:

* empty array  
* one element  
* two elements  
* many elements  
* all negative  
* all positive  
* mixed values  
* large values

---

# **2\. Data Flow Testing**

Data Flow Testing focuses on the **flow of variables/data through a program**.

It checks whether data is correctly processed as it moves through program components.

### **Important terms**

**Definition (Def):**

When a variable is assigned a value.

Example:

x \= 10

`x` is defined.

**Use:**

When the value of a variable is used in a calculation or decision.

if x \> 5:

Here `x` is used.

---

# **Example**

1\. read x,y

2\. if x \> y

3\.     a \= x \+ 1

4\. else

5\.     a \= y \- 1

6\. print a

Data flow:

| Variable | Defined at | Used at |
| ----- | ----- | ----- |
| x | 1 | 2, 3 |
| y | 1 | 2, 4 |
| a | 3, 4 | 5 |

### **Main purpose**

Ensure that data:

Definition

    ↓

Processing

    ↓

Use

flows correctly without being corrupted or improperly handled.

---

# **MODULE 7 — AGILE TESTING, TDD & CI/CD**

# **1\. Agile Testing**

Agile develops software in **small, frequent increments called iterations or sprints**.

Basic idea:

Build

  ↓

Test

  ↓

Feedback

  ↓

Improve

  ↓

Build next part

---

# **Agile Testing Principles**

The PDF lists:

1. Collaborate and communicate  
2. Test early and often  
3. Automate testing  
4. Use continuous integration and delivery  
5. Emphasize exploratory testing  
6. Prioritize testing based on risk  
7. Use metrics to track progress  
8. Embrace change

---

# **2\. Agile Testing Quadrants**

## **Q1 — Technology \+ Automated**

Examples:

* Unit tests  
* Component tests  
* API tests  
* Database tests

## **Q2 — Business \+ Automated**

Examples:

* Acceptance tests  
* Functional tests  
* End-to-end tests

## **Q3 — Business \+ Manual**

Examples:

* Exploratory testing  
* Usability testing  
* Accessibility testing

## **Q4 — Technology \+ Manual**

Examples:

* Performance testing  
* Security testing  
* Reliability testing

### **Easy memory**

            AGILE QUADRANTS

             Automated       Manual

          ┌─────────────┬─────────────┐

Business  │ Q2          │ Q3          │

          │ Acceptance  │ Exploratory │

          │ Functional  │ Usability   │

          ├─────────────┼─────────────┤

Technology│ Q1          │ Q4          │

          │ Unit/API    │ Performance │

          │ Component   │ Security    │

          └─────────────┴─────────────┘

---

# **3\. Test-Driven Development (TDD)**

TDD means **writing test cases before writing the actual code**.

### **TDD Cycle**

Write Test

    ↓

Run Test → FAIL

    ↓

Write Code

    ↓

Run Test → PASS

    ↓

Refactor

    ↓

Repeat

### **Steps**

1. Write test case.  
2. Run test and verify it fails.  
3. Write code.  
4. Run test again.  
5. Refactor code.

### **Benefits**

* Better code quality  
* Faster development  
* Early error detection  
* Improved collaboration  
* Greater confidence

---

# **4\. Continuous Integration and Continuous Delivery**

### **CI — Continuous Integration**

Developers regularly integrate code changes into a shared repository.

Developer Code

      ↓

Shared Repository

      ↓

Build

      ↓

Automated Tests

CI helps detect problems early.

### **CD — Continuous Delivery**

Automates the process of preparing/deploying software changes.

Code

 ↓

Build

 ↓

Test

 ↓

Deploy

 ↓

Production

CD keeps software in a **releasable state**.

### **CI vs CD**

| CI | CD |
| ----- | ----- |
| Integrates code regularly | Automates delivery/deployment |
| Shared repository | Production/release process |
| Build and test | Build \+ test \+ deploy |
| Finds integration issues early | Makes releases faster/repeatable |

---

# **5\. Test Automation in Agile**

Automation helps Agile teams test quickly and repeatedly.

The PDF specifically lists:

* Unit Testing  
* Functional Testing  
* Integration Testing  
* Acceptance Testing  
* Regression Testing

---

