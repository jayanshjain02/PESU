# STA Unit 3 — Browser Automation (Selenium): Cheat Sheet

## Selenium
- Automates browser actions through code: open URL, type, click, select, alerts, windows, frames, screenshots and validation.
- Best for repeatable functional/regression tests; manual testing is useful for exploratory testing.
- Manual testing issues: time, repetition, human error, regression effort, browser coverage, inconsistency.

## Components and versions
| Component | Remember |
|---|---|
| Selenium RC | Older; script → RC server → browser; slower |
| Selenium IDE | Browser extension; record/replay; little/no code |
| Selenium Grid | Run tests across machines, browsers and OS |
| Selenium WebDriver | Modern browser control through browser drivers |
- Selenium began in 2004 at ThoughtWorks (Jason Huggins).
- 2.0 (2011): WebDriver introduced.
- 3.0 (2016): RC deprecated; WebDriver focus.
- 4.x (2021 onward): improvements over 3.x.

## WebDriver architecture
**Client library/test script → WebDriver → browser driver → browser**
Examples of browser drivers: ChromeDriver, GeckoDriver, EdgeDriver.

## Install and run
```bash
python --version
pip install selenium
pip show selenium
```
```python
from selenium import webdriver
driver = webdriver.Chrome()
driver.get("https://www.google.com")
print(driver.title)
driver.quit()
```

## Browser commands
| Command | Meaning |
|---|---|
| `webdriver.Chrome()` | Start Chrome session |
| `get(url)` | Open URL |
| `driver.title` | Page title |
| `current_url` | Current URL |
| `back()` / `forward()` | History navigation |
| `refresh()` | Reload |
| `close()` | Close current window |
| `quit()` | Close all session windows and end session |

## Waits
| Type | Meaning / syntax |
|---|---|
| Implicit | Global element-search wait: `driver.implicitly_wait(10)` |
| Explicit | Wait for a specific condition using `WebDriverWait` |
| Fluent | Repeated condition polling; timeout + polling interval |

Explicit wait pattern:
```python
wait = WebDriverWait(driver, 10)
element = wait.until(EC.element_to_be_clickable((By.ID, "login")))
```

## POM
- Page Object = class for elements/actions of one page.
- POM = design pattern separating page details from test logic.
- Benefits: less duplication, maintainability, reuse, clear organisation.
- Limitation: initial time/effort to create page classes.

## ActionChains
```python
actions = ActionChains(driver)
actions.move_to_element(element).click().perform()
```
| Method | Action |
|---|---|
| `click()` | Left click |
| `click_and_hold()` | Press/hold |
| `context_click()` | Right click |
| `double_click()` | Double click |
| `move_to_element()` | Hover |
| `move_by_offset(x,y)` | Move by pixels |
| `drag_and_drop(a,b)` | Drag/drop |
| `drag_and_drop_by_offset()` | Drag by offset |
| `release()` | Release held button |

Keyboard: `key_down()`, `key_up()`, `send_keys()`, `element.send_keys()`.

## Locators
```python
By.ID, "email"
By.NAME, "username"
By.XPATH, "//input[@id='email']"
By.CSS_SELECTOR, "#submit"
By.LINK_TEXT, "About"
By.PARTIAL_LINK_TEXT, "About"
By.TAG_NAME, "p"
By.CLASS_NAME, "form-control"
```
- XPath attribute: `//tag[@attribute='value']`
- Multiple attributes: `//input[@name='email' and @type='text']`
- Text: `//button[text()='Login']`
- `contains()`, `starts-with()`, `last()`, `position()`, `count()`
- `and` = all conditions; `or` = at least one.
- CSS: `#id`, `.class`, `tag`, `tag[attr='value']`.
- Link Text = complete visible text; Partial Link Text = part of visible text.
- `find_element()` = first match; `find_elements()` = list (empty if none).

## Common locator failures
- Attribute changed.
- Element not yet created.
- Element exists but is not visible.
- Script runs before page/element is ready.
**Fix:** inspect HTML, use stable locator, wait for condition, check visibility/interactability.

## Must-remember distinctions
1. `close()` vs `quit()`.
2. Implicit vs explicit vs fluent wait.
3. IDE vs Grid vs WebDriver vs RC.
4. Link Text vs Partial Link Text.
5. `find_element()` vs `find_elements()`.
6. XPath `and` vs `or`.
7. Manual testing vs Selenium automation.
