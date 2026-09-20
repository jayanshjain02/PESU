# **🚨 LAST-MINUTE CHEAT REVISION SHEET**

## **1\. AI BASICS**

**AI \=** Creating machines capable of tasks requiring human intelligence.

### **Four major AI abilities**

Learning  
Reasoning  
Problem Solving  
Decision Making

### **Father of AI**

**John McCarthy — 1956**

### **Timeline**

1950 → Thinking machines  
1951 → Game AI  
1956 → AI term  
1961 → ELIZA  
2002 → Roomba  
2014 → Alexa  
2018 → NLP/Generative AI  
2022 → ChatGPT  
---

# **2\. TYPES OF AI**

### **Capability**

ANI → One specialized task  
AGI → Human-level general intelligence  
ASI → Beyond human intelligence

**Current:** Mostly ANI  
**AGI:** No true AGI currently exists  
**ASI:** Hypothetical

### **Functionality**

Reactive → No memory  
Limited Memory → Past \+ current information  
Theory of Mind → Understand emotions/beliefs/intentions  
Self-Aware → Consciousness/self-awareness  
---

# **3\. INTELLIGENT AGENT**

### **Definition**

**Perceives → Decides → Acts**

Environment  
     ↓  
  Sensors  
     ↓  
   Agent  
     ↓  
 Actuators  
     ↓  
Environment

### **Agent types**

Simple Reflex  
Model-Based  
Goal-Based  
Utility-Based  
Learning

### **Agent Function vs Program**

**Function \= what action should happen**

**Program \= code that implements it**

---

# **4\. PEAS**

# **P E A S**

P → Performance Measure  
E → Environment  
A → Actuators  
S → Sensors

### **Example: Self-driving car**

P → Safety \+ efficient navigation  
E → Roads \+ traffic \+ pedestrians  
A → Steering \+ brakes \+ acceleration  
S → Camera \+ LiDAR \+ GPS \+ radar  
---

# **5\. ENVIRONMENT TYPES**

Memorize these six pairs:

Fully Observable ↔ Partially Observable

Deterministic ↔ Stochastic

Episodic ↔ Sequential

Static ↔ Dynamic

Discrete ↔ Continuous

Single-Agent ↔ Multi-Agent

### **Fast examples**

| Type | Example |
| ----- | ----- |
| Fully observable | Chess |
| Partially observable | Driving in fog |
| Deterministic | Crossword |
| Stochastic | Weather |
| Episodic | Image classification |
| Sequential | Chess/driving |
| Static | Sudoku |
| Dynamic | Traffic |
| Discrete | Tic-Tac-Toe |
| Continuous | Health monitoring |
| Single-agent | Puzzle bot |
| Multi-agent | Warehouse robots |

---

# **6\. STATE SPACE SEARCH**

### **Components**

State  
State Space  
Initial State  
Goal State  
Transition  
Path  
Search Strategy

### **State-space tree**

          Initial  
          /       \\  
       Action     Action  
        /           \\  
     State          State  
       |              |  
     Goal          Dead End  
---

# **7\. SEARCH STRATEGIES**

                SEARCH  
                   │  
          ┌────────┴────────┐  
          ↓                 ↓  
     UNINFORMED          INFORMED  
       (Blind)           (Heuristic)  
          │                 │  
      ┌───┼───┐       ┌─────┼──────┐  
      ↓   ↓   ↓       ↓     ↓      ↓  
     BFS DFS UCS      A\*  Greedy  AO\*  
                              \+  
                        Hill Climbing  
---

# **8\. BFS — MUST KNOW**

**Breadth-First Search**

Level 0  
   ↓  
Level 1  
   ↓  
Level 2  
   ↓  
Level 3

### **Data structure**

# **FIFO Queue**

### **Algorithm**

START  
 ↓  
Put start in queue  
 ↓  
Remove first node  
 ↓  
Goal?  
 ├─ YES → Return solution  
 └─ NO  
     ↓  
Expand node  
 ↓  
Add successors to queue  
 ↓  
Repeat

### **Properties**

* Uninformed  
* Complete  
* Optimal when path costs are uniform  
* Level-by-level

---

# **9\. A\* — MOST IMPORTANT FORMULA**

# **f(n) \= g(n) \+ h(n)**

g(n) \= Actual cost  
       Start → Current

h(n) \= Estimated cost  
       Current → Goal

f(n) \= Estimated total cost

### **Rule**

# **Choose the node with smallest f(n).**

Example:

A:  
g \= 2  
h \= 3  
f \= 5

B:  
g \= 1  
h \= 3  
f \= 4

Therefore → Choose B

### **A\* is:**

* Informed  
* Heuristic-based  
* Complete and optimal when heuristic is admissible

---

