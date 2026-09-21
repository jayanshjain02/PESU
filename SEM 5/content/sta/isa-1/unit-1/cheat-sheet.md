# **MODULE 1 — SOFTWARE TESTING FUNDAMENTALS**

## **1.1 What is Software Testing?**

**Software Testing** is the process of evaluating a software application/system to:

* Identify defects.  
* Check whether requirements are satisfied.  
* Verify that the software behaves as expected.  
* Improve software quality.

### **Why is Software Testing Important?**

1. **Error Detection** – Finds bugs and defects early.  
2. **Quality Assurance** – Ensures reliability, security and performance.  
3. **Cost-Effective** – Early bug fixing is cheaper.  
4. **Customer Satisfaction** – Helps meet user expectations.  
5. **Compliance** – Ensures industry standards/regulations are followed.

---

## **1.2 Important Testing Terminology**

| Term | Meaning |
| ----- | ----- |
| **Error/Mistake** | Human mistake made during coding/design |
| **Fault/Defect/Bug** | Flaw in software caused by an error |
| **Failure** | Software behaves incorrectly during execution |
| **Test** | Execution of software to find defects |
| **Test Case** | Inputs \+ conditions \+ expected results |
| **Test Plan** | Document describing testing scope, approach and schedule |
| **Test Script** | Written/automated sequence used to perform a test |
| **Test Suite** | Collection of related test cases |
| **Test Scenario** | High-level description of what to test |
| **Test Data** | Data used for executing test cases |
| **Test Environment** | Hardware/software/network setup for testing |
| **Pass** | Actual result matches expected result |
| **Fail** | Actual result does not match expected result |

### **Easy sequence to remember**

**Error → Fault → Failure**

Example:

> Developer makes mistake → Wrong code exists → Program gives wrong output.

---

## **1.3 Scope of Testing**

**Testing scope** identifies:

* What features must be tested.  
* What features are excluded.  
* Testing boundaries.

### **Factors affecting scope**

1. **Complexity**  
2. **Risk**  
3. **Available resources**

Example: In a banking app, **fund transfer** is highly complex and high-risk, so it receives more testing attention.

### **Scope should be reviewed regularly**

Scope may change when:

* New features are added.  
* UI changes.  
* Requirements change.  
* Risks change.

---

## **1.4 In-Scope vs Out-of-Scope**

Example: **Online Food Delivery App**

### **In-Scope**

* Registration/login  
* Restaurant search  
* Cart  
* Coupons  
* Food ordering  
* Order tracking  
* Order history  
* Cancellation

### **Out-of-Scope**

* Restaurant internal kitchen operations  
* Payment gateway's internal processing  
* Delivery partner payroll  
* Cloud infrastructure managed by provider

# **MODULE 2 — TESTING APPROACHES, RESOURCES & SCHEDULE**

## **2.1 Testing Approaches**

The PDF discusses:

1. Black-box testing  
2. White-box testing  
3. Gray-box testing  
4. Manual testing  
5. Automated testing  
6. Exploratory testing  
7. Regression testing

The approach depends on:

* Software complexity  
* Project timeline  
* Available resources

---

## **2.2 Black-box, White-box and Gray-box**

### **Black-box Testing**

Tests functionality **without knowing internal implementation**.

Focus:

> Input → System → Output

Example: ATM withdrawal.

Tester checks:

* Correct PIN  
* Incorrect PIN  
* Insufficient balance  
* Expired card

### **White-box Testing**

Tests:

* Internal code  
* Logic  
* Conditions  
* Algorithms

Requires programming knowledge.

Example: testing every condition in a PIN verification function.

### **Gray-box Testing**

Combination of black-box and white-box testing.

Tester has **limited internal knowledge**.

Example:

> Testing an e-commerce checkout by checking both UI behaviour and backend/API/database behaviour.

---

## **2.3 Manual, Automated, Exploratory & Regression Testing**

### **Manual Testing**

Tester executes test cases manually and records results.

### **Automated Testing**

Software tools execute test cases automatically.

Examples:

* Selenium  
* Cypress  
* Playwright  
* Appium  
* Robot Framework

### **Exploratory Testing**

Testing without a formal test plan.

Tester uses knowledge and exploration to discover defects.

### **Regression Testing**

Retesting software **after changes** to ensure existing functionality still works.

Example:

After adding emoji reactions to a messaging app, retest:

* Sending messages  
* Group chats  
* Notifications  
* Chat deletion  
* Media sharing

---

## **2.4 Testing Resources**

Testing resources include:

1. **Personnel**  
2. **Testing Tools**  
3. **Infrastructure**  
4. **Data**  
5. **Budget**

### **Personnel**

* Testers/QA engineers  
* Developers  
* Test managers  
* Domain experts  
* Stakeholders

### **Tools**

* Selenium  
* JUnit  
* PyTest  
* Postman  
* Jira  
* TestRail

### **Infrastructure**

* Test servers  
* Staging environments  
* Cloud instances  
* PCs/mobile devices  
* Network configurations

### **Data**

* Customer data  
* Product data  
* Transaction data

### **Budget**

* Tester salaries  
* Tool licenses  
* Training  
* Infrastructure  
* Testing time

---

## **2.5 Test Schedule**

A **test schedule** is a detailed plan showing:

* Testing activities  
* Timelines  
* Resources

### **Steps**

**1\. Determine testing timeline**  
↓  
**2\. Identify testing activities**  
↓  
**3\. Determine order of activities**  
↓  
**4\. Allocate resources**  
↓  
**5\. Develop test schedule**  
↓  
**6\. Review and refine**  
↓  
**7\. Communicate schedule**

---

# **MODULE 3 — TEST CASES & TEST DATA**

## **3.1 Defining Test Cases**

A **test case** is a set of conditions/variables used to determine whether software works correctly.

### **Steps**

1. Identify objective.  
2. Determine input data.  
3. Define expected output.  
4. Specify execution steps.  
5. Document test case.  
6. Review/refine.  
7. Group related cases.  
8. Prioritize cases.  
9. Define test coverage.

---

## **3.2 Test Case Structure**

Important fields:

| Field | Purpose |
| ----- | ----- |
| Test Case ID | Unique identifier |
| Test Scenario | What is being tested |
| Test Steps | Steps to perform |
| Test Data | Input values |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Status | Pass/Fail |

Example:

**TC-01 — Verify valid login**

Input:

> Username \= abc123  
> Password \= Pass@123

Expected:

> Home page displayed.

---

## **3.3 Test Case Prioritization**

### **High**

Critical functionality.

Examples:

* Login  
* Flight search  
* Booking  
* Payment

### **Medium**

Important but not core.

Examples:

* Filters  
* Sorting  
* Notifications  
* Booking history

### **Low**

Cosmetic/non-critical.

Examples:

* UI colour  
* Font size  
* Animations

---

## **3.4 Types of Test Data**

### **1\. Normal Data**

Valid, typical inputs.

Example:

> Bangalore → Delhi, valid date, valid card.

### **2\. Boundary Values**

Tests limits.

Example:

> Passenger limit \= 1 to 9\.

Test:

* 1  
* 9  
* 10

### **3\. Negative Data**

Invalid input.

Example:

* Past date  
* 0 passengers  
* Expired card  
* Same source/destination

### **4\. Error Messages**

Checks whether appropriate messages appear for invalid input.

---

## **3.5 Data Generators & Test Data Management**

### **Data Generator**

Automatically creates large amounts of test data.

Example:

> Generate 5,000 customer records.

### **Test Data Management (TDM)**

Helps manage test data.

It can also **mask sensitive information**.

Example:

`4111 1111 1111 1111`

becomes

`XXXX XXXX XXXX 1111`

---

# **MODULE 4 — DEFECT MANAGEMENT, STOP CRITERIA & TEST PLAN**

## **4.1 Defect Management Process**

When defects are found, they must be recorded, tracked and managed.

### **Flow**

**Defect Logging**  
↓  
**Defect Classification**  
↓  
**Defect Analysis**  
↓  
**Defect Assignment**  
↓  
**Defect Fixing**  
↓  
**Defect Verification**  
↓  
**Defect Closure**

---

### **1\. Defect Logging**

Record:

* Unique ID  
* Summary  
* Description  
* Reproduction steps  
* Severity

### **2\. Classification**

Classify according to:

* Severity  
* Priority

### **3\. Analysis**

Find the **root cause**.

### **4\. Assignment**

Assign defect to developer/team.

### **5\. Fixing**

Developer fixes defect and updates status.

### **6\. Verification**

Tester checks whether defect is fixed and no side effects exist.

### **7\. Closure**

Defect is marked **Closed**.

---

## **4.2 Stop Testing Criteria**

Conditions under which testing can stop.

Examples:

* Predefined requirements are met.  
* Required number of test cases passed.  
* Required test coverage reached.  
* Acceptable performance achieved.  
* Acceptable quality level achieved.

Stakeholders should agree on these criteria **before testing begins**.

---

## **4.3 Reviewing & Approving Test Plan**

Review checks whether the test plan is:

* Accurate  
* Complete  
* Suitable for project requirements

Stakeholders may include:

* Project team  
* QA team  
* Management

The plan should cover:

* Objectives  
* Scope  
* Approach  
* Resources  
* Schedule  
* Test cases  
* Test data

The test plan is a **living document**, so it can be updated as the project changes.

---

## **4.4 Benefits of Test Planning**

1. Clear roadmap  
2. Minimizes risk  
3. Reduces costs  
4. Improves test coverage  
5. Increases test efficiency  
6. Provides basis for review/approval

---

## **4.5 Test Plan Document**

Typical contents:

1. Introduction  
2. Testing objectives  
3. Testing approach  
4. Testing schedule  
5. Test environment  
6. Test data  
7. Test cases  
8. Test automation  
9. Risks and issues  
10. Reporting and communication  
11. Conclusion

---

# **MODULE 5 — FUNCTIONAL TESTING & TESTING LEVELS**

## **5.1 Functional Testing**

Functional testing checks whether software:

> **Works as expected and satisfies user requirements.**

It includes:

* Unit Testing  
* Integration Testing  
* System Testing  
* Acceptance Testing

---

## **5.2 Unit Testing**

Tests the **smallest testable component**.

Examples:

* Function  
* Method  
* Class

Characteristics:

* Tests components in isolation.  
* Usually written by developers.  
* Uses **stubs and drivers**.  
* Can be automated.  
* Should have good coverage.  
* Tests should be independent and maintainable.

### **Stub**

A temporary dummy module that **provides data to the unit under test**.

> Stub \= Fake supplier.

### **Driver**

A temporary dummy module that **calls the unit under test**.

> Driver \= Fake caller.

### **Memory trick**

**Stub → supplies**  
**Driver → drives/calls**

---

## **5.3 Integration Testing**

Checks interaction between different modules/components.

Goal:

> Verify that integrated components communicate and work correctly.

### **Levels**

1. Component-level  
2. System-level  
3. End-to-end

### **Integration Approaches**

* Big Bang  
* Incremental  
* Top-down  
* Bottom-up  
* Sandpit

### **Big Bang**

Integrate everything at once.

### **Incremental**

Integrate modules gradually.

### **Top-down**

Start from high-level modules and move downward.

Uses **stubs** where lower modules are unavailable.

### **Bottom-up**

Start from low-level modules and move upward.

Uses **drivers** where higher modules are unavailable.

### **Sandpit**

New module is tested in a separate controlled environment.

---

## **5.4 System Testing & Validation**

### **System Testing**

Tests the **complete integrated system** against requirements.

Usually black-box.

Performed after integration testing.

Example:

Online shopping:

> Login → Search → Cart → Payment → Order Confirmation.

### **Validation**

Checks whether the software satisfies **user/business needs**.

Easy memory:

> **Validation \= Are we building the right product?**

> **System Testing \= Does the complete system work correctly?**

---

## **5.5 User Acceptance Testing (UAT)**

UAT checks whether the system works properly in a **real-world scenario**.

Performed by:

* End users  
* Business stakeholders  
* Domain experts

### **Objectives**

1. Validate from user's perspective.  
2. Check business requirements.  
3. Ensure usability.  
4. Find defects missed earlier.  
5. Reduce production failure risk.

### **Types**

* **Alpha Testing** – In-house testing.  
* **Beta Testing** – Selected end users in real-world environment.  
* **Acceptance Testing** – End users/stakeholders validate requirements.

---

# **MODULE 6 — NON-FUNCTIONAL TESTING**

## **6.1 Non-functional Testing**

Tests **how well** the software performs rather than what functions it performs.

Main areas in the PDF:

* Performance  
* Security  
* Usability

---

## **6.2 Performance Testing**

Checks software performance under different conditions.

### **Load Testing**

Tests expected/normal peak load.

Example:

> 10,000 concurrent users during a normal sale.

### **Stress Testing**

Pushes system **beyond its expected maximum**.

Example:

> 50,000 users during a flash sale.

Checks whether system:

* Crashes  
* Slows down  
* Gracefully handles excess users

### **Scalability Testing**

Checks whether system can handle increased/decreased resources or workload.

Example:

> Traffic increases from 10,000 to 30,000 users and additional cloud servers are added.

---

## **6.3 Security Testing**

Checks whether software protects:

* Data  
* Authentication  
* User information  
* System resources

from unauthorized access and vulnerabilities.

Example:

> Testing an online banking login system.

---

## **6.4 Usability Testing**

Checks whether the software is:

* Easy to use  
* User-friendly  
* Clear  
* Convenient

Example:

> Testing whether a food-delivery app allows users to order food easily.

---

## **6.5 Functional vs Non-functional**

| Functional | Non-functional |
| ----- | ----- |
| What the system does | How well it works |
| Login works | Login responds quickly |
| Payment succeeds | Payment is secure |
| Order can be placed | App is easy to use |
| Search works | Search performs quickly |

---

# **MODULE 7 — TEST AUTOMATION, FRAMEWORKS & EL**

## **7.1 Test Automation**

**Test automation** uses software tools to execute test cases automatically.

### **Benefits**

1. Saves time and cost.  
2. Improves test coverage.  
3. Increases accuracy.  
4. Allows reuse of test scripts.  
5. Improves efficiency.  
6. Can run tests continuously/24×7.

---

## **7.2 When to Consider Automation**

Before automation, consider:

### **Cost-benefit analysis**

Is automation worth the cost?

### **Technical feasibility**

Does the tool support the technology?

### **Skillset**

Does the team have required skills?

### **Scope**

Which tests are good automation candidates?

---

## **7.3 Types of Automation Tools**

### **1\. Record & Playback**

Records user actions and generates scripts.

Useful for:

* Regression testing  
* Smoke testing

**Limitation:** Application changes can break recorded scripts.

### **2\. Scripting Tools**

Testers write scripts using languages such as:

* Python  
* Java  
* Ruby

Advantages:

* Flexible  
* Supports complex scenarios

Limitation:

* Requires programming skills.

### **3\. Hybrid Tools**

Combine:

> Record & Playback \+ Scripting

### **4\. Frameworks**

Provide reusable components and standardized testing structure.

---

## **7.4 Automation Frameworks**

### **Linear Scripting Framework**

Simple predefined scripts.

* Easy  
* Less flexible/scalable

### **Modular Framework**

Application divided into modules.

* Better reuse  
* More design effort

### **Data-driven Framework**

Test data is separated from test scripts.

Useful for many input combinations.

### **Keyword-driven Framework**

Uses keywords/commands to define test steps.

Useful for testers with less programming experience.

### **Hybrid Framework**

Combines multiple framework approaches.

Useful for larger/complex projects.

---

## **7.5 EL — Python Programs**

The PDF contains **EL on Python Programs**.

The activity asks you to:

1. Identify the error.  
2. Correct the code.  
3. Update failed test cases to passed status.

The EL examples include:

* Odd/Even program  
* Login verification  
* ATM withdrawal  
* Student result  
* Online shopping  
* Voting eligibility

### **EL Example 1 — Odd/Even**

Original logic:

def check\_number(n):  
    if n % 2 \== 0:  
        return "Even"  
    else:  
        return "Odd"

Important test cases:

| Input | Expected |
| ----- | ----- |
| 10 | Even |
| 7 | Odd |
| "a" | Invalid Input |
| "20" | Even |
| "@" | Invalid Input |

The corrected program in the PDF adds input validation using `isdigit()`.

---

### **EL Example 2 — Login**

Original:

username \== "admin"  
password \== "1234"

Corrected version additionally handles:

> Missing username/password.

Important cases:

* admin \+ 1234 → Login Successful  
* admin \+ 1111 → Invalid Login  
* user \+ 1234 → Invalid Login  
* blank username → Missing username/password  
* other usernames → Invalid Login

---

### **EL Important Boundary/Negative Cases**

The PDF specifically asks you to test:

| Program | Special Test |
| ----- | ----- |
| ATM Withdrawal | Balance \= 5000, Amount \= **\-500** |
| Student Result | Marks \= **101** |
| Online Shopping | Amount \= **1000** |
| Voting Eligibility | Age \= **\-5** |

These are important because they demonstrate **boundary and invalid-input testing**.

---

