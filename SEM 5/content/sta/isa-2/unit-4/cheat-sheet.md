# STA Unit 4 — Last-Minute Cheat Sheet

**UQ24CA342A · Software Testing and Automation**  
Based on *STA Unit 4.pdf*. Seven sections: **five theory + two EL**. Selenium 4 Python syntax. Full explanations and corrections are in `notes.md`; practise using `questions.md`.

**Core test pattern:** establish preconditions → locate → act → wait → read actual result → assert expected result → clean up. **A click or a “PASS” print is not proof.**

## 1. Functional Testing, Buttons and Checkboxes

**Functional testing:** Check observable behaviour against requirements. Selenium controls the browser; assertions verify outcomes.

| Control | HTML / locator clue | Remember |
|---|---|---|
| Ordinary button | `<button type="button">Go</button>` | Caption is element text; action depends on application code |
| Submit button | `<input type="submit" value="Go">` | Caption is `value`; initiates form submission |
| Image button | `<input type="image" src="go.jpg">` | Image submit control; a plain `<img>` is not automatically one |
| Checkbox | `<input type="checkbox" checked>` | `checked` sets initial checked state; click toggles current state |

Inside a form, `<button>` normally defaults to submit if `type` is omitted. Empty fields are **not automatically forbidden**: validation/`required` must impose that rule. Reset restores defaults, which need not be empty.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
button = driver.find_element(By.ID, "default_btn")
button.click()
# Finish the test with driver.quit(), preferably through cleanup/finally.
```

**Locator patterns:**

| Need | Correct syntax |
|---|---|
| ID | `find_element(By.ID, "default_btn")` |
| Name | `find_element(By.NAME, "dft_btn")` |
| Exact button text, whitespace tolerant | `//button[normalize-space(.)='Default Button']` |
| Partial text | `//button[contains(normalize-space(.), 'Default Button')]` |
| Submit caption | `//input[@value='Submit Button']` |
| Image source contains | `//input[contains(@src, 'go.jpg')]` |

**Single lookup:** `find_element` → WebElement or exception. **Plural lookup:** `find_elements` → list, possibly `[]`; a list cannot `.click()`. **Click returns `None`**: retain the element first if you need it later.

| Question | Check |
|---|---|
| Exists in current DOM? | `bool(driver.find_elements(...))` |
| Visible? | `element.is_displayed()` |
| Enabled? | `element.is_enabled()` |
| Checked/selected? | `element.is_selected()` |

**Hidden ≠ absent. Enabled ≠ visible. Visible + enabled does not exclude an intercepting overlay.**

```python
if not checkbox.is_selected():
    checkbox.click()                 # Ensure checked.
assert checkbox.is_selected()

if checkbox.is_selected():
    checkbox.click()                 # Ensure unchecked.
assert not checkbox.is_selected()
```

Do not use `.clear()` to deselect a checkbox. Multiple checkboxes can be selected, subject to application rules. Initialize `options = Options()` if using that variable in the slides' Chrome setup.

## 2. Labels, Lists, Textboxes and Textareas

**Label:** `<label for="name">Student Name:</label>` associates with **`id="name"`**, not necessarily `name="name"`.

```python
label = driver.find_element(By.XPATH, "//label[@for='name']")
field = driver.find_element(By.ID, label.get_attribute("for"))
```

`following-sibling::` and `preceding-sibling::` require the **same parent**. They do not locate arbitrary nearby descendants. Prefer the `for` → ID association when available. Clicking an associated checkbox label can toggle its checkbox.

**Native lists:**

```python
from selenium.webdriver.support.ui import Select

courses = Select(driver.find_element(By.ID, "course"))
courses.select_by_visible_text("MCA")
courses.select_by_value("MCA")
courses.select_by_index(2)
```

| Member / method | Recall |
|---|---|
| `.options` | Every option, including placeholders |
| `.first_selected_option.text` | First selected option in document order |
| `.all_selected_options` | List of selected option elements |
| `.is_multiple` | Whether multiple selection is permitted |
| `.deselect_by_visible_text("MCA")` | Deselect matching choice in multi-select |
| `.deselect_all()` | Clear selection in multi-select |

**Index is zero-based.** In the slides' single-select: Choose Course **0**, BCA **1**, MCA **2**, BSc **3**, BCom **4**. In the multi-select without a placeholder: BCA **0**, MCA **1**, BSc **2**, BCom **3**.

**Traps:** `multiple` enables multi-selection; `size` controls visible rows. Deselection methods on single-select raise `NotImplementedError`. `Select` is for native `<select>`, not a custom `<div>` dropdown. First selected ≠ last clicked.

**Text input:** `<input type="text">` is single-line; `<textarea>` supports multiple lines. `rows`/`cols` describe dimensions, not maximum text length.

```python
field.clear()
field.send_keys("Rahul")
assert field.get_attribute("value") == "Rahul"
address.send_keys("Bangalore\nKarnataka")
```

`send_keys()` types at the caret; clear before replacing. Read **`.text` for labels/headings**, **`value` for current field input**. Clicking a button with no submission behaviour does not submit a form.

**JavaScript alert:** click trigger → wait for `EC.alert_is_present()` → assert `alert.text` → `alert.accept()` → continue page interaction. An alert is not an ordinary DOM element.

## 3. IFrames and Switching Context

**IFrame:** An embedded HTML document with its own context. `src` loads a document; `srcdoc` supplies embedded HTML. Switch in before locating its contents.

| Operation | Code |
|---|---|
| Enter by ID/name | `driver.switch_to.frame("studentFrame")` |
| Enter first child frame of current context | `driver.switch_to.frame(0)` |
| Enter using actual iframe WebElement | `driver.switch_to.frame(frame_element)` |
| Move up one level | `driver.switch_to.parent_frame()` |
| Return to top document of current window | `driver.switch_to.default_content()` |

**Nested example:** Top contains A and B; A contains C. From C, `parent_frame()` → A; `default_content()` → Top. To reach sibling B, go to Top, then enter B.

```python
WebDriverWait(driver, 10).until(
    EC.frame_to_be_available_and_switch_to_it((By.ID, "studentFrame"))
)
driver.find_element(By.ID, "name").send_keys("Rahul")
driver.switch_to.default_content()
```

This condition **already switches**; do not repeat the switch. Frame indexes are local to the current context. A frame title is not automatically its ID/name: locate it by CSS/XPath and pass the iframe element. Waiting longer cannot fix the wrong context. Frame switching is different from window/tab switching.

## 4. Basic and Collection Assertions

**Assertion:** Check actual against expected; failure stops the current test method unless handled. These methods belong to **`unittest.TestCase`**, not WebDriver.

| Basic assertion | Passing condition |
|---|---|
| `self.assertTrue(x)` | `x` is truthy |
| `self.assertFalse(x)` | `x` is falsey |
| `self.assertIs(a, b)` | Same Python object |
| `self.assertIsNot(a, b)` | Different Python objects |
| `self.assertIsNone(x)` | `x is None` |
| `self.assertIsNotNone(x)` | `x is not None` |
| `self.assertIsInstance(x, T)` | Instance of T, including subclasses |
| `self.assertNotIsInstance(x, T)` | Not an instance of T |

**Remember the spelling:** `assertNotIsInstance`.

- Falsey values include `False`, `0`, `""`, `[]`, `{}` and `None`.
- Empty list is falsey **and not None**: both `assertFalse([])` and `assertIsNotNone([])` pass.
- `a = []; b = a; c = []`: a and b are identical; a and c are equal but not identical.
- Passing unittest assertion methods return `None`, not `True`.
- A missing attribute/property can return None; a missing **singular element lookup raises** an exception.
- Separate WebElement lookups need not return the same Python wrapper; avoid `assertIs` for general DOM-identity checks.

| Collection | Key properties |
|---|---|
| List | Ordered, mutable, duplicates allowed |
| Tuple | Ordered, immutable sequence, duplicates allowed |
| Set | Unique members; no positional-order assumption |
| Dictionary | Key → value mapping; ordinary membership checks keys |

**Membership:** `self.assertIn(item, collection)` / `self.assertNotIn(item, collection)`.

For `student = {"name": "Rahul"}`: `"name" in student` is true; `"Rahul" in student` is false; `"Rahul" in student.values()` is true. String membership checks substrings.

**unittest lifecycle:** `setUp()` → `test_...()` → `tearDown()`. Subclass `unittest.TestCase`; run with `unittest.main()` or `python -m unittest -v`. After an assertion failure, teardown still runs **if setup succeeded**, and other tests can run. Setup failure is different; registered cleanup functions can help.

**Course example:** `["Choose Course", "BCA", "MCA", "BSc", "BCom"]` → BCA present, MBA absent, **5 options / 4 real courses**.

## 5. Comparison Assertions

| Method | Operator | Typical use |
|---|---|---|
| `assertEqual(a, b)` | `==` | Exact field value, expected title/count |
| `assertNotEqual(a, b)` | `!=` | Values must differ |
| `assertGreater(a, b)` | `>` | More than a threshold |
| `assertGreaterEqual(a, b)` | `>=` | At least a minimum |
| `assertLess(a, b)` | `<` | Fewer/less than a threshold |
| `assertLessEqual(a, b)` | `<=` | At most a maximum |

**Boundary memory:** “at least” → `>=`; “at most” → `<=`; “more than” → `>`; “fewer than” → `<`; “exactly” → `==`.

- `assertGreaterEqual(18, 18)` passes; `assertGreater(18, 18)` fails.
- For five options: count > 2, count >= 4 and count < 10 all pass.
- Name length 20 passes `<= 20`, fails `< 20`.
- Filter placeholders before counting actual choices.
- `"100" < "20"` is true **as strings**; `int("100") < int("20")` is false.
- Convert browser numeric text before comparisons. Use `Decimal` from decimal strings for exact money calculations.
- `assertNotEqual(title, "Login Page")` also accepts Error Page. Verify the actual required success state.
- **Equality (`==`) ≠ identity (`is`).**

## 6. EL — SauceDemo

**Aim:** Automate login, products/cart and checkout on [SauceDemo](https://www.saucedemo.com/). Use the demo account shown on the login page; the notes illustrate `standard_user` / `secret_sauce`.

| Test area | Strong expected-result check |
|---|---|
| Valid login | Inventory and expected authenticated content appear |
| Invalid/missing credentials | Specified error appears and inventory stays inaccessible |
| Add products | Exact identities, quantities and cart count agree |
| Remove product | Removed identity absent; correct remaining contents/count |
| Price sorting | Convert prices to numbers; compare with sorted numeric values |
| Missing checkout data | Required validation appears and progression is blocked |
| Checkout review | Expected items; subtotal = sum of price × quantity |
| Finish | Expected order-completion state appears |
| Logout | Login form returns; protected inventory inaccessible |

**Typical locators:** `user-name`, `password`, `login-button`; `.inventory_item`, `.shopping_cart_link`, `.cart_item`; `[data-test='error']`. Recheck against the page when practising.

**Traps:** Correct count can contain wrong products. One expected member does not exclude extra items. String price sorting is not numeric sorting. Use displayed/specified tax rules; total = subtotal + tax/charges. Wait for actual outcomes. Fresh browser helps session isolation, but prepare any retained application data separately.

## 7. EL — ParaBank

**Aim:** Automate registration/login, account information and selected banking-demo operations on [ParaBank](https://parabank.parasoft.com/parabank/index.htm).

| Test area | Strong expected-result check |
|---|---|
| Registration | Unique demo username; valid data creates account; invalid data does not |
| Login | Known valid account reaches Accounts Overview; invalid login is rejected |
| Account list | Expected exact account IDs are present |
| New account | Returned ID absent before and present after creation |
| Transfer | Amount/accounts correct; both individual balance changes verified |
| Bill payment | Correct payee, amount and source account confirmed |
| Profile update | Save, revisit/reload, then compare persisted values |
| Logout | Login available; protected information requires authentication |

**Transfer formula**, for distinct accounts with no fees/concurrent activity:

\[
S_{after}=S_{before}-A,\qquad D_{after}=D_{before}+A
\]

Combined balance must remain equal, but **sum equality alone is insufficient**. Example: 1,000 + 200 with a 125 transfer must become **875 + 325**. A mistaken 100 transfer also preserves the total.

**Practical traps:** Choose intended accounts by stable values, not shifting list indexes. Fresh browser ≠ reset server accounts/balances. Text typed into a profile ≠ saved profile. Error visible ≠ no unintended account creation. Use fictional demo details and prepared test data; identify the expected rule before testing an unspecified restriction.

### Final 30-second recall

**Locate → act → wait → assert → cleanup.**  
**Presence / visibility / enabled / selected are different.**  
**Label for → input ID. Input text → value.**  
**Select indexes start at zero; deselection requires multiple.**  
**Frames change context; default = Top, parent = one level.**  
**Truthy ≠ literal True; empty ≠ None; equal ≠ identical.**  
**Dictionary membership checks keys. Inclusive boundaries include equality.**  
**An EL plan is not a test result: record actual evidence before PASS/FAIL.**
