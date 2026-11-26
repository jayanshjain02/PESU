# STA Unit 3 - Practice Questions

**Format:** 32 MCQs: 8 Easy (25%) and 24 Tough (75%). Each topic section contains one easy and three tough questions.

**Instructions:** Choose one best answer. Assume Selenium 4 with Python and native HTML controls unless stated otherwise. Code using self.assert methods runs inside unittest.TestCase. Questions are independent; all unspecified preconditions are satisfied.

## Section 1 - Selenium and Browser Automation

### Q1 - Easy

What does Selenium primarily automate?

- A. Interactions with web browsers.
- B. Direct repair of database tables.
- C. Compilation of Python source code.
- D. Creation of operating-system processes.

### Q2 - Tough

A test clicks Submit and exits without errors, but the application discards the form. What is the strongest diagnosis of the test?

- A. It needs more input combinations before any assertion.
- B. It must replace every explicit wait with sleep.
- C. It proves the form is correct but not its layout.
- D. It lacks an assertion of the intended outcome.

### Q3 - Tough

An automated test calculates its expected total by calling the same faulty calculation routine used by the application. What risk remains even if every run passes?

- A. The browser driver cannot execute arithmetic checks.
- B. The test can reproduce the same defect as its oracle.
- C. A passing assertion establishes independent correctness.
- D. Repetition makes the browser actions nondeterministic.

### Q4 - Tough

A checkout test passes alone but fails after another test leaves an item in the cart. Which change addresses the cause?

- A. Run the dependent tests in a fixed alphabetical order.
- B. Increase the click timeout for the checkout button.
- C. Establish the required cart state before each test.
- D. Reuse one browser session without resetting its state.

## Section 2 - Selenium Components, Versions and Architecture

### Q5 - Easy

Which Selenium component supports distributed browser sessions?

- A. Selenium IDE recording alone.
- B. Selenium Grid.
- C. A CSS selector.
- D. A Page Object class.

### Q6 - Tough

Chrome and Firefox sessions on Grid update the same test account. Assertions intermittently see the other session's data. What is the best fix?

- A. Give concurrent tests isolated application data.
- B. Use the same window handle in both sessions.
- C. Replace the browser driver with Selenium IDE.
- D. Put both sessions on the same Grid node.

### Q7 - Tough

A script cannot create a browser session because the selected driver is incompatible with the browser. Which change is directly relevant?

- A. Replace CSS locators with XPath locators throughout.
- B. Add a longer explicit wait after the login action.
- C. Align the driver and browser versions or their management.
- D. Move the assertions into a Page Object class.

### Q8 - Tough

A valid WebDriver command reaches the browser, but the application renders a validation error. Which conclusion follows?

- A. Grid automatically retries until the form is accepted.
- B. The client library has verified the business outcome.
- C. The driver must have rejected the command syntax.
- D. Transport success does not establish application success.

## Section 3 - Installation and Browser Commands

### Q9 - Easy

Which command ends the WebDriver session and closes its associated windows?

- A. driver.refresh()
- B. driver.close()
- C. driver.quit()
- D. driver.back()

### Q10 - Tough

Two windows are open. The current one is closed with driver.close(); the other remains open. What should precede commands directed at the remaining window?

- A. Switch to its valid window handle.
- B. Call back() to restore the remaining window context.
- C. Refresh the handle of the already closed window.
- D. Create a fresh browser driver for that same window.

### Q11 - Tough

A script uses driver.get(url), then immediately clicks a button that JavaScript inserts later. Why may get() returning be insufficient?

- A. get() waits only for the URL text to be typed.
- B. A successful get() proves all future elements are present.
- C. The browser driver cannot click JavaScript-created elements.
- D. Navigation completion need not include later dynamic rendering.

### Q12 - Tough

A test calls driver.quit(), then calls driver.get(url) on that same driver. What is needed to continue testing?

- A. Set a longer implicit wait on the ended session.
- B. Create a new WebDriver session.
- C. Switch to the session's previous window handle.
- D. Refresh the page before calling get() again.

## Section 4 - Waits in Selenium

### Q13 - Easy

Which wait is tied to a specific condition such as a button becoming clickable?

- A. A screenshot command.
- B. A fixed sleep alone.
- C. Browser history navigation.
- D. An explicit wait.

### Q14 - Tough

A button is present in the DOM but disabled while data loads. A wait for presence succeeds; click still fails. Which condition better matches the action?

- A. A nonempty list returned by find_elements().
- B. Completion of a fixed delay unrelated to the button.
- C. Visibility and enabled state of the intended button.
- D. Presence of any element with the same tag name.

### Q15 - Tough

An explicit wait polls a locator while a long implicit wait also applies. Why can the elapsed time be surprising?

- A. Implicit waits apply only after the explicit wait fails.
- B. A locator call inside a poll can itself wait implicitly.
- C. Each failed poll restarts the complete browser session.
- D. The explicit and implicit values always cancel out.

### Q16 - Tough

A wait succeeds for a stored WebElement. The page replaces that node before the next action, producing a stale-element error. What best addresses this race?

- A. Re-locate using the locator while waiting for the fresh element.
- B. Make the stale object valid by increasing its implicit wait.
- C. Keep retrying the old WebElement reference indefinitely.
- D. Reuse the element's old Python variable in a new session.

## Section 5 - Page Object Model

### Q17 - Easy

What is normally encapsulated by a Page Object?

- A. Page-specific locators and interactions.
- B. The browser driver's compiled executable.
- C. The operating system's network settings.
- D. Every possible expected business result.

### Q18 - Tough

A page redraw replaces its Save button. A Page Object cached the original WebElement in its constructor. Which design change best handles repeated redraws?

- A. Cache another copy of the same WebElement reference.
- B. Assume the Page Object preserves the DOM node itself.
- C. Keep a locator and obtain a fresh element when needed.
- D. Move the cached element into a global test variable.

### Q19 - Tough

A Page Object's save() method performs a click. Several tests interpret its return as proof that a record was saved. What is the missing distinction?

- A. A Page Object can never contain an explicit wait.
- B. Any method return proves that the backend committed data.
- C. Separating test code makes application failures impossible.
- D. An interaction method need not verify the saved business state.

### Q20 - Tough

A reusable LoginPage method contains a fixed assertion that every login must succeed. Why is this awkward for an invalid-password test?

- A. Every Page Object must use a separate browser process.
- B. The page method embeds an expectation that varies by test.
- C. Negative tests cannot use browser automation.
- D. Assertions cannot inspect text from a Page Object.

## Section 6 - ActionChains, Mouse and Keyboard

### Q21 - Easy

Which call executes the actions queued in an ActionChains object?

- A. queue()
- B. start_chain()
- C. perform()
- D. execute_all()

### Q22 - Tough

The code builds ActionChains(driver).move_to_element(menu).click(item), but never calls perform(). What follows?

- A. The click executes when the Python expression ends.
- B. The actions are queued but have not been executed.
- C. The next ordinary assertion performs the queued actions.
- D. Only the hover executes because it appears first.

### Q23 - Tough

A script clicks a text field, presses CONTROL down, sends "a", then types "report" without releasing CONTROL. Which change best matches replacing the field text?

- A. Replace the field locator but retain the modifier state.
- B. Press CONTROL down again before typing the text.
- C. Use more move_to_element calls while CONTROL is held.
- D. Release CONTROL after the select-all shortcut.

### Q24 - Tough

A submenu is created only after a hover. The script tries to locate its item before performing that hover and gets no match. Which order is most appropriate?

- A. Perform the hover, wait for the item, then locate/click it.
- B. Replace the hover with a double-click on the page title.
- C. Queue a click on the absent item, then call back().
- D. Locate the missing item repeatedly before any hover.

## Section 7 - Web Elements and Locators

### Q25 - Easy

What does find_elements() return when no elements match after the applicable wait?

- A. An empty list.
- B. A newly created DOM element.
- C. A single None WebElement.
- D. The last previously matched element.

### Q26 - Tough

A page contains three matching buttons. find_element() returns one without error. What has the successful lookup actually established?

- A. Exactly one matching button exists in the whole page.
- B. All matching buttons have the same enabled state.
- C. At least one match exists, not that the locator is unique.
- D. The returned button has the intended business purpose.

### Q27 - Tough

A locator identifies id="email_4821", but the numeric suffix changes on each render. Which choice is most robust if a unique stable name exists?

- A. Hard-code the new numeric suffix after every failure.
- B. Use the stable name scoped to the intended form.
- C. Add a longer wait for the old exact ID to appear.
- D. Use the first input element on the whole page.

### Q28 - Tough

An element is visible, but clicking it fails because an overlay intercepts the click. Which conclusion is justified?

- A. The element must be absent from the DOM.
- B. is_displayed() is equivalent to overlay removal.
- C. Changing the locator type removes the overlay.
- D. Visibility alone does not prove the click can reach it.

## Section 8 - XPath, CSS and Locator Troubleshooting

### Q29 - Easy

Which CSS selector targets an element whose ID is login?

- A. login.class
- B. .login
- C. [class="login"]
- D. #login

### Q30 - Tough

A button contains <span>Save</span> Changes. Which XPath best checks its combined text while tolerating extra whitespace?

- A. //button[normalize-space(text())="Save Changes"]
- B. //button[normalize-space(.)="Save Changes"]
- C. //button[contains(text()="Save Changes")]
- D. //button[@text="Save Changes"]

### Q31 - Tough

Starting from a form WebElement, a search must stay inside that form. Which XPath expresses this scope?

- A. .//input[@name="email"]
- B. //input[@name="email"]
- C. /input[@name="email"]
- D. ..//input[@name="email"]

### Q32 - Tough

An input has class="field required". Which CSS selector tests that both class tokens are present without requiring their order?

- A. input[class="required field"]
- B. input[class="field"]
- C. input.field.required
- D. input.field required

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

| Section | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| 1 | Q1 **A** | Q2 **D** | Q3 **B** | Q4 **C** |
| 2 | Q5 **B** | Q6 **A** | Q7 **C** | Q8 **D** |
| 3 | Q9 **C** | Q10 **A** | Q11 **D** | Q12 **B** |
| 4 | Q13 **D** | Q14 **C** | Q15 **B** | Q16 **A** |
| 5 | Q17 **A** | Q18 **C** | Q19 **D** | Q20 **B** |
| 6 | Q21 **C** | Q22 **B** | Q23 **D** | Q24 **A** |
| 7 | Q25 **A** | Q26 **C** | Q27 **B** | Q28 **D** |
| 8 | Q29 **D** | Q30 **B** | Q31 **A** | Q32 **C** |

### Answer explanations

1. **A:** Selenium drives browser interactions; it is not a compiler or database repair tool.
2. **D:** An interaction completing is not evidence that the business outcome occurred. The test must verify the expected result.
3. **B:** If expected and actual results share the same faulty logic, agreement can hide the defect. Repetition does not create an independent oracle.
4. **C:** The failure depends on leaked state. Establishing test preconditions removes the accidental dependency instead of relying on execution order.
5. **B:** Grid supports running browser sessions across machines and browser configurations.
6. **A:** Separate browser sessions do not isolate shared server-side records. Use distinct data or an explicit isolation strategy.
7. **C:** Session creation must succeed before locators, waits or application assertions can run. The driver/browser compatibility is the relevant layer.
8. **D:** The command path and the application's result are separate. Assertions must check what the application actually did.
9. **C:** quit ends the session. close closes the current window.
10. **A:** Closing a window does not mean subsequent commands automatically target another valid handle. Explicitly switch to the intended surviving window.
11. **D:** A navigation readiness state does not guarantee that later asynchronous application work has finished. Wait for the required condition.
12. **B:** quit ends the session. A wait, navigation or old handle does not revive it.
13. **D:** An explicit wait polls for a chosen condition until success or timeout.
14. **C:** Presence alone does not establish interactability. A clickable condition normally checks visibility and enabled state; it is not a guarantee against every possible obstruction.
15. **B:** Element searches inside polling can wait under the implicit timeout. Mixing wait strategies can therefore produce unexpected overall timing.
16. **A:** A WebElement refers to a particular DOM node. Waiting longer on an obsolete reference does not turn it into the replacement node.
17. **A:** Page Objects organize the page interface and operations used by tests.
18. **C:** A Page Object is an abstraction, not a guarantee that DOM nodes survive. Locator-based retrieval can obtain the current element after redraws.
19. **D:** Encapsulating the click improves organization, but tests still need evidence of the intended saved result.
20. **B:** The interaction can be reused for both valid and invalid logins, while the expected outcome belongs to the particular scenario.
21. **C:** ActionChains builds an action sequence; perform sends the queued actions for execution.
22. **B:** Constructing the chain is not the same as executing it. The perform call is required.
23. **D:** A held modifier can affect later keystrokes. Release it after the shortcut so the replacement text is entered normally.
24. **A:** The action that creates or reveals the target must occur before waiting for and interacting with that target.
25. **A:** The plural finder returns an empty list when there are no matches. The singular finder instead raises a missing-element error.
26. **C:** The singular finder selects the first matching element. Success does not prove uniqueness or correctness of the chosen target.
27. **B:** Prefer stable identifying attributes with appropriate scope. Waiting longer does not repair an obsolete locator.
28. **D:** An element can be visible yet obstructed. Wait for the relevant overlay or page state rather than treating visibility as a complete interaction guarantee.
29. **D:** The hash prefix selects an ID. A dot selects a class.
30. **B:** The dot uses the element's combined string value, including descendant text. text() refers to direct text nodes, @text is an attribute, and the final contains expression is malformed.
31. **A:** The leading dot makes the descendant search relative to the current form. A leading // starts from the document rather than restricting the search to that form.
32. **C:** Chained class selectors require both tokens regardless of ordering. Exact class-attribute equality also constrains the complete attribute string.

### Verification references

- [Selenium waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)
- [Selenium element finders](https://www.selenium.dev/documentation/webdriver/elements/finders/)
- [Selenium frame contexts](https://www.selenium.dev/documentation/webdriver/interactions/frames/)
- [Python unittest assertions](https://docs.python.org/3/library/unittest.html)
