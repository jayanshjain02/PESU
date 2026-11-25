# STA Unit 3 — Browser Automation (Selenium): Practice Questions

**Format:** 8 topic sections; each section has 4 MCQs (1 easy + 3 challenging). Answers are at the end. Questions are based on the supplied Unit 3 PDF.

## Section 1 — Selenium and Browser Automation

**1. [Easy] What is Selenium primarily used for?**  
A. Database administration  
B. Automating web browsers using code  
C. Designing images  
D. Compiling Python programs

**2. [Tough] A tester must execute the same registration workflow with 500 input combinations. Which is the strongest reason to automate it with Selenium?**  
A. Selenium removes the need to define expected results  
B. Selenium makes every test case correct automatically  
C. Selenium makes repetitive browser actions easier to repeat consistently  
D. Selenium replaces all exploratory testing

**3. [Tough] Which statement best describes the relationship between manual and automated testing in the PDF?**  
A. Manual testing is obsolete once Selenium is installed  
B. Manual testing is useful for exploratory testing, while Selenium suits repeatable functional/regression tests  
C. Selenium is used only to observe results manually  
D. Both approaches require the tester to click every control

**4. [Tough] Which task is within the browser actions Selenium can automate?**  
A. Directly repairing a database schema  
B. Capturing a browser screenshot  
C. Replacing the operating system  
D. Designing a network protocol

## Section 2 — Selenium Components, Versions and Architecture

**5. [Easy] Which Selenium component records and replays browser actions?**  
A. Selenium Grid  
B. Selenium IDE  
C. Selenium RC Server  
D. ChromeDriver

**6. [Tough] Which sequence correctly represents the general WebDriver command path?**  
A. Browser → test script → browser driver → client library  
B. Test script/client library → WebDriver → browser driver → browser  
C. Browser driver → browser → IDE → test script  
D. WebDriver → test script → browser → operating system

**7. [Tough] A test team wants to run the same test simultaneously on Chrome/Windows, Firefox/Linux and Edge/Windows. Which component best fits this requirement?**  
A. Selenium IDE  
B. Selenium RC  
C. Selenium Grid  
D. `driver.close()`

**8. [Tough] What was the key improvement introduced by Selenium 2.0 according to the slides?**  
A. Browser recording without code  
B. WebDriver and direct browser control  
C. Removal of all browser drivers  
D. Replacing Python with Java

## Section 3 — Installation and Browser Commands

**9. [Easy] Which command installs Selenium using pip?**  
A. `python selenium start`  
B. `pip install selenium`  
C. `selenium --install python`  
D. `webdriver install`

**10. [Tough] What is the difference between `driver.close()` and `driver.quit()`?**  
A. Both always close every browser window and end the session  
B. `close()` closes the current window; `quit()` closes all session windows and ends the session  
C. `close()` refreshes the page; `quit()` navigates backward  
D. `close()` ends Python; `quit()` only hides Chrome

**11. [Tough] What does `print(driver.title)` retrieve?**  
A. The browser executable path  
B. The title of the current webpage  
C. The HTML source code  
D. The current browser history

**12. [Tough] After opening page B from page A, which command returns to page A using browser history?**  
A. `driver.refresh()`  
B. `driver.forward()`  
C. `driver.back()`  
D. `driver.quit()`

## Section 4 — Waits in Selenium

**13. [Easy] Which wait is configured using `driver.implicitly_wait(10)`?**  
A. Explicit wait  
B. Implicit wait  
C. Fluent wait  
D. Page-load timeout only

**14. [Tough] A script should click a button only when it becomes clickable. Which approach is most appropriate?**  
A. Use an explicit wait for `element_to_be_clickable`  
B. Use `driver.quit()` repeatedly  
C. Use only `print(driver.title)`  
D. Use a locator without waiting under all conditions

**15. [Tough] Which description best distinguishes fluent wait from a simple fixed sleep?**  
A. Fluent wait repeatedly checks a condition until success or timeout  
B. Fluent wait always pauses for exactly one second  
C. Fluent wait closes and reopens the browser  
D. Fluent wait works only with mouse clicks

**16. [Tough] An element is found quickly on one run but appears after a delay on another. What is the main purpose of Selenium waits here?**  
A. To increase the browser's internet speed  
B. To synchronise test execution with page/element readiness  
C. To change the element's HTML ID  
D. To bypass the browser driver

## Section 5 — Page Object Model

**17. [Easy] What is POM in Selenium?**  
A. A browser engine  
B. A design pattern for organising page elements/actions and test code  
C. A Python package installer  
D. A type of XPath

**18. [Tough] In a POM design, where should the login page's username locator and login action normally be placed?**  
A. In a page object class representing the login page  
B. In the browser's address bar  
C. In the operating system registry  
D. Only inside the test report

**19. [Tough] Which is a key advantage of POM?**  
A. It eliminates the need for locators  
B. It reduces duplication and improves maintainability  
C. It guarantees that the application has no bugs  
D. It removes the need for test cases

**20. [Tough] A webpage's login button ID changes. In a well-structured POM project, what is the likely maintenance benefit?**  
A. The browser driver changes automatically  
B. The locator can be updated in the page class rather than duplicated across many tests  
C. All test data is deleted  
D. No code change is ever needed

## Section 6 — ActionChains, Mouse and Keyboard

**21. [Easy] Which Selenium class is used for advanced mouse and keyboard interactions?**  
A. `WebDriverWait`  
B. `ActionChains`  
C. `By`  
D. `KeysOnly`

**22. [Tough] Which method is most suitable for displaying a hover menu?**  
A. `move_to_element()`  
B. `quit()`  
C. `refresh()`  
D. `find_elements()`

**23. [Tough] Which sequence represents a typical drag-and-drop operation?**  
A. `refresh()` then `quit()`  
B. `drag_and_drop(source, target).perform()`  
C. `send_keys(source, target)`  
D. `back().forward()`

**24. [Tough] What is the purpose of pairing `key_down()` with `key_up()`?**  
A. To open and close a browser window  
B. To press and then release a keyboard key  
C. To find two HTML elements  
D. To wait for a page to load

## Section 7 — Web Elements and Locators

**25. [Easy] Which locator uses an element's HTML `id` attribute?**  
A. `By.ID`  
B. `By.TAG_NAME`  
C. `By.LINK_TEXT`  
D. `By.CLASS_NAME`

**26. [Tough] Which XPath expression requires both conditions to be true?**  
A. `//input[@name='user' or @type='text']`  
B. `//input[@name='user' and @type='text']`  
C. `//input[contains(@name,'user')]`  
D. `//input[last()]`

**27. [Tough] Which statement about `find_elements()` is correct?**  
A. It always returns exactly one element  
B. It returns a list of matching elements and an empty list if none match  
C. It returns the page title  
D. It closes the browser if no element is found

**28. [Tough] A page has several hyperlinks and the tester wants the one whose complete visible text is `Contact Us`. Which locator is most specific?**  
A. `By.PARTIAL_LINK_TEXT, "Contact"`  
B. `By.LINK_TEXT, "Contact Us"`  
C. `By.TAG_NAME, "div"`  
D. `By.CLASS_NAME, "a"`

## Section 8 — XPath, CSS and Locator Troubleshooting

**29. [Easy] In a CSS selector, what does `#login` normally identify?**  
A. An element with ID `login`  
B. An element with class `login`  
C. Every paragraph  
D. A link containing the word login

**30. [Tough] Which XPath expression selects a button based on its visible text?**  
A. `//button[text()='Submit']`  
B. `#button.Submit`  
C. `By.ID, "text()"`  
D. `//button[last()='Submit']`

**31. [Tough] A web element exists in the page DOM but is currently hidden. Which locator issue from the PDF best describes this?**  
A. Attribute change  
B. Web element not visible  
C. Selenium Grid failure  
D. Browser history mismatch

**32. [Tough] A test throws a missing-element error because it runs before the page creates the element. What is the most appropriate response?**  
A. Increase the number of clicks  
B. Add a suitable wait for the element/condition and verify the locator  
C. Replace `driver.quit()` with `driver.close()`  
D. Use `By.TAG_NAME` for every element

---

## Short-answer / 4-mark practice

1. Define Selenium and list any six browser actions it can automate.
2. Explain the problems with manual testing and compare manual testing with Selenium automation.
3. Explain Selenium IDE, Grid, WebDriver and RC.
4. Draw and explain the Selenium WebDriver architecture.
5. Explain the purpose of `get()`, `back()`, `forward()`, `refresh()`, `close()` and `quit()`.
6. Differentiate implicit, explicit and fluent waits with syntax.
7. Define Page Object Model. Explain its working, advantages and limitations.
8. Explain ActionChains and describe any five mouse methods.
9. Explain the four keyboard actions discussed in the PDF.
10. Explain ID, Name, XPath and CSS Selector locators with examples.
11. Differentiate Link Text and Partial Link Text.
12. Differentiate `find_element()` and `find_elements()`.
13. Explain XPath attribute, text, logical operator and function-based expressions.
14. Describe common locator issues and how waits help avoid timing-related failures.

## Practical / programming questions

1. Write a Selenium program to open Google, print its title and close the session.
2. Write a program to navigate to two websites, go back, go forward and refresh.
3. Write a program to locate all paragraph elements and print their text.
4. Write a program to fill a registration form using ID locators and click Register.
5. Write a program using explicit wait to click a button when it becomes clickable.
6. Create a `LoginPage` class using POM and call its `login()` method from a test script.
7. Write ActionChains code to hover over a menu and drag one element onto another.
8. Write XPath expressions for an element by attribute, multiple attributes, visible text, `contains()` and `last()`.

---

## MCQ Answer Key

| Q | Answer | Q | Answer | Q | Answer | Q | Answer |
|---:|:---:|---:|:---:|---:|:---:|---:|:---:|
| 1 | B | 9 | B | 17 | B | 25 | A |
| 2 | C | 10 | B | 18 | A | 26 | B |
| 3 | B | 11 | B | 19 | B | 27 | B |
| 4 | B | 12 | C | 20 | B | 28 | B |
| 5 | B | 13 | B | 21 | B | 29 | A |
| 6 | B | 14 | A | 22 | A | 30 | A |
| 7 | C | 15 | A | 23 | B | 31 | B |
| 8 | B | 16 | B | 24 | B | 32 | B |
