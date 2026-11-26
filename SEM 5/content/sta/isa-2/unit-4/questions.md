# STA Unit 4 - Practice Questions

**Format:** 28 MCQs: 7 Easy (25%) and 21 Tough (75%). Each topic section contains one easy and three tough questions.

**Instructions:** Choose one best answer. Assume Selenium 4 with Python and native HTML controls unless stated otherwise. Code using self.assert methods runs inside unittest.TestCase. Questions are independent; all unspecified preconditions are satisfied.

## Section 1 - Functional Testing, Buttons and Checkboxes

### Q1 - Easy

Which method reads a checkbox's selected state?

- A. click()
- B. is_enabled()
- C. is_selected()
- D. is_displayed()

### Q2 - Tough

A checkbox starts checked. The test clicks it unconditionally to ensure it is checked, then asserts selection. What is the defect?

- A. A checked checkbox cannot be found by its ID.
- B. is_selected() reads visibility rather than selection.
- C. click() cannot interact with a native checkbox.
- D. The action toggles an already correct precondition to false.

### Q3 - Tough

button = driver.find_element(By.ID, "save").click() executes the click. What is the main issue with then calling button.is_enabled()?

- A. A click always deletes the original button from the DOM.
- B. button holds the click return value, not the WebElement.
- C. The locator automatically becomes a list after clicking.
- D. is_enabled() is valid only before any click.

### Q4 - Tough

A submit control is hidden by CSS but remains enabled in the DOM. Which pair is consistent with that fixture?

- A. is_displayed() is False; is_enabled() may be True.
- B. Both methods must return False because it is hidden.
- C. is_displayed() is True; is_enabled() must be False.
- D. Both methods must return True because it is present.

## Section 2 - Labels, Lists, Textboxes and Textareas

### Q5 - Easy

A label's for attribute identifies which attribute of its associated control?

- A. value
- B. placeholder
- C. id
- D. name

### Q6 - Tough

A native select has options Choose, BCA, MCA in that order. The requirement is to select MCA even if a placeholder is later inserted. Which approach best expresses that intent?

- A. Select by a stable MCA value or unique visible text.
- B. Select the first option and assert the list is nonempty.
- C. Read the select's tag name to infer the selected course.
- D. Always use select_by_index(2).

### Q7 - Tough

A text input starts with "Old". Calling send_keys("New") appends text. What does a correct replacement test need?

- A. Read input.text and assume it equals the entered value.
- B. Clear or select the existing text, then enter and verify New.
- C. Check only that the placeholder contains a string.
- D. Enter New twice to overwrite the previous characters.

### Q8 - Tough

A multi-select already contains BCA and MCA selections. A test deselects MCA and checks only that BCA remains selected. What could this assertion miss?

- A. Native multi-selects cannot expose selected options.
- B. Deselection always resets the complete select element.
- C. BCA must become unselected whenever MCA is deselected.
- D. An unrelated third option may still be selected.

## Section 3 - IFrames and Switching Context

### Q9 - Easy

Which call returns directly to the top-level document from a frame?

- A. driver.switch_to.default_content()
- B. driver.switch_to.window("parent")
- C. driver.back()
- D. driver.switch_to.parent_frame() in every nesting depth

### Q10 - Tough

The driver is inside child frame C, nested in frame P. The target button is in the top-level page. Why can one parent_frame() call be insufficient?

- A. It closes P while leaving its child frame selected.
- B. It always switches from C to a sibling frame.
- C. It preserves C as the active frame until refresh.
- D. It moves from C to P, not necessarily to the top level.

### Q11 - Tough

From the top level, the driver enters frame A. It then tries to locate sibling frame B inside A and fails. Which sequence matches the intended transition?

- A. Switch windows before looking for the sibling frame.
- B. Return to the top level, then locate and enter B.
- C. Rename the locator variable from A to B.
- D. Wait longer for B inside the unchanged A context.

### Q12 - Tough

A frame has loaded, but its inner button appears later. A successful frame-availability wait switches into that frame. What still may be required?

- A. An assumption that every inner control is already ready.
- B. Another switch to the same frame from inside itself.
- C. A separate wait for the button's required state inside it.
- D. A top-level button search before any inner lookup.

## Section 4 - Basic and Collection Assertions

### Q13 - Easy

Which unittest assertion checks value equality?

- A. assertTrue(a is b)
- B. assertEqual(a, b)
- C. assertIs(a, b)
- D. assertIsNone(a)

### Q14 - Tough

Evaluate independently: assertTrue([1]) and assertIs([1], True). Which result is correct?

- A. Both pass because a nonempty list is truthy.
- B. Both fail because neither value is the bool True.
- C. The first fails; the second passes by coercion.
- D. The first passes; the second fails.

### Q15 - Tough

a = [1, 2] and b = [1, 2] create two separate lists. Which pair passes?

- A. assertEqual(a, b); assertIsNot(a, b)
- B. assertEqual(a, b); assertIs(a, b)
- C. assertIs(a, b); assertNotEqual(a, b)
- D. assertNotEqual(a, b); assertIsNot(a, b)

### Q16 - Tough

A test uses assertIn("MCA", actual_courses), where actual_courses also contains an unexpected extra course. What does the passing assertion prove?

- A. The collection has exactly one MCA and no extra entries.
- B. The collection matches the expected order and length.
- C. MCA is present, but the full collection may still be wrong.
- D. Every member belongs to the required course list.

## Section 5 - Comparison Assertions

### Q17 - Easy

Which assertion accepts a count equal to the minimum as well as greater counts?

- A. assertGreaterEqual(count, minimum)
- B. assertGreater(count, minimum)
- C. assertLess(count, minimum)
- D. assertNotEqual(count, minimum)

### Q18 - Tough

Independently evaluate assertLess("100", "20") and assertLess(100, 20). Which result occurs?

- A. Both pass because the first digit is smaller.
- B. The string comparison raises a type error for two strings.
- C. The string comparison passes; the numeric one fails.
- D. Both fail because 100 is larger than 20.

### Q19 - Tough

The specification requires exactly three cart items. A test asserts count >= 3 and passes when count is four. Which change closes the gap?

- A. Assert that count is not two.
- B. Assert equality with three.
- C. Assert that count is truthy.
- D. Assert that count is greater than zero.

### Q20 - Tough

A minimum permitted age is 18. Which test/expectation pair directly distinguishes >= 18 from an incorrect > 18 implementation?

- A. Input 25 should be accepted.
- B. Input 0 should be rejected.
- C. Input 17 should be rejected.
- D. Input 18 should be accepted.

## Section 6 - EL - SauceDemo Automation

### Q21 - Easy

What should a successful add-to-cart test verify?

- A. The intended product appears in the cart.
- B. Only that the browser session remains open.
- C. Only that the Add button was clickable.
- D. Only that the page contains some text.

### Q22 - Tough

A cart badge shows 1 after adding product A. A defect actually added product B instead. What must the assertion include to catch this?

- A. A larger implicit wait for the badge element.
- B. The identity of the cart product, not just its count.
- C. The fact that the Add button click returned None.
- D. The existence of any Remove button anywhere.

### Q23 - Tough

Prices shown after a low-to-high sort are "$10.00", "$2.00", "$9.00". Comparing the strings with sorted(strings) passes. What is wrong with the oracle?

- A. A currency symbol makes any assertion necessarily fail.
- B. A sort assertion must compare object identities instead.
- C. Lexicographic order is being mistaken for numeric order.
- D. sorted cannot accept a list of price strings.

### Q24 - Tough

Checkout shows subtotal 20.00, tax 2.00 and total 22.00, but one required item is missing. Which conclusion is justified?

- A. The tax assertion makes product checks redundant.
- B. The test must accept any cart whose totals add up.
- C. A correct total implies all required items are present.
- D. Arithmetic consistency alone does not prove the cart is correct.

## Section 7 - EL - ParaBank Automation

### Q25 - Easy

Which verification best checks a successful transfer between two distinct accounts?

- A. Check only that a source-account dropdown has options.
- B. Check only that a transfer button exists.
- C. Check the expected changes to both account balances.
- D. Check only that the confirmation text is nonempty.

### Q26 - Tough

Source/destination balances are 1000/200. A transfer of 125 has no fees or concurrent changes. Which observed result preserves their sum but still proves the direction is wrong?

- A. 875 / 200
- B. 1125 / 75
- C. 875 / 325
- D. 1000 / 325

### Q27 - Tough

A profile-update test sees the new address immediately after typing it. Which extra observation best checks server-side persistence?

- A. Open a fresh browser and assume the server was reset.
- B. Assert the input has a nonempty id attribute.
- C. Check the field's placeholder without saving.
- D. Reload or revisit the profile and verify the saved address.

### Q28 - Tough

An account-creation test sees the account count rise from two to three. What stronger check establishes that the intended new account was added?

- A. Check the returned new ID is new and present in the refreshed list.
- B. Assert only that some old account remains visible.
- C. Check the count is greater than zero after creation.
- D. Select dropdown index zero and assume it is the new account.

### Topic coverage map

| Section | Focus |
|---|---|
| 1 | Functional Testing, Buttons and Checkboxes |
| 2 | Labels, Lists, Textboxes and Textareas |
| 3 | IFrames and Switching Context |
| 4 | Basic and Collection Assertions |
| 5 | Comparison Assertions |
| 6 | EL - SauceDemo Automation |
| 7 | EL - ParaBank Automation |

## MCQ Answer Key

| Section | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| 1 | Q1 **C** | Q2 **D** | Q3 **B** | Q4 **A** |
| 2 | Q5 **C** | Q6 **A** | Q7 **B** | Q8 **D** |
| 3 | Q9 **A** | Q10 **D** | Q11 **B** | Q12 **C** |
| 4 | Q13 **B** | Q14 **D** | Q15 **A** | Q16 **C** |
| 5 | Q17 **A** | Q18 **C** | Q19 **B** | Q20 **D** |
| 6 | Q21 **A** | Q22 **B** | Q23 **C** | Q24 **D** |
| 7 | Q25 **C** | Q26 **B** | Q27 **D** | Q28 **A** |

### Answer explanations

1. **C:** Selection is distinct from visibility and enabled state.
2. **D:** A click toggles a checkbox. Check the current state and click only when a change is needed.
3. **B:** The click method returns None. Retain the WebElement separately, then call click on it.
4. **A:** Presence, display and enabled state are separate. Hidden does not by itself mean disabled.
5. **C:** The label's for value refers to the control ID.
6. **A:** An index depends on option order. Stable values or unique visible text express which course is intended.
7. **B:** Typing normally appends. Replace existing contents explicitly and verify the input's value, not merely its placeholder or element text.
8. **D:** Checking membership proves BCA is included, not that it is the only selected value. Compare the complete expected selection when exclusivity matters.
9. **A:** default_content returns to the top-level browsing context. parent_frame moves up one level.
10. **D:** One parent_frame call moves up one frame level. Use the correct context transition for the target.
11. **B:** Element searches operate in the current frame context. A sibling in the top-level page is not a child of A.
12. **C:** Frame availability and readiness of later content inside the frame are separate conditions.
13. **B:** assertEqual checks equality; assertIs checks object identity.
14. **D:** assertTrue uses truthiness. assertIs requires the identical object, and a list is not the True singleton.
15. **A:** The lists have equal contents but distinct identities. Equality and identity answer different questions.
16. **C:** Membership is weaker than complete collection equality. It does not exclude extras or establish order, length or duplicate counts.
17. **A:** GreaterEqual includes the equality boundary; Greater does not.
18. **C:** Strings compare lexicographically; numbers compare numerically. Convert extracted numeric text before numeric assertions.
19. **B:** A lower-bound check accepts extra items. An exact count requirement needs an equality check.
20. **D:** Both implementations reject 17 and accept 25. The boundary value 18 distinguishes inclusive from exclusive comparison.
21. **A:** The expected business outcome is that the intended product was added.
22. **B:** A correct quantity does not prove correct product identity. Verify which item appears in the cart.
23. **C:** Text sorting can place 10 before 2. Parse currency strings to numeric amounts before checking numeric ordering.
24. **D:** An internally consistent total can still describe the wrong cart. Verify item identity/quantity as well as the calculation.
25. **C:** The test should verify the intended financial outcome, including the appropriate debit and credit.
26. **B:** 1125 + 75 preserves 1200 but credits the source and debits the destination. Conservation alone does not prove transfer direction.
27. **D:** A local field change is not proof of a committed update. Revisit the saved record under the same intended account and verify it.
28. **A:** A count increase does not identify the new account. Check its returned identity against the before/after account lists.

### Verification references

- [Selenium waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)
- [Selenium element finders](https://www.selenium.dev/documentation/webdriver/elements/finders/)
- [Selenium frame contexts](https://www.selenium.dev/documentation/webdriver/interactions/frames/)
- [Python unittest assertions](https://docs.python.org/3/library/unittest.html)
