# STA Unit 3 — Browser Automation (Selenium)

**Course:** UQ24CA342A — Software Testing and Automation  
**Source:** PES University, Unit 3 PDF, 142 pages  
**Focus:** Exam-ready theory + copyable Selenium Python programs.

> These notes follow the topics and terminology in the supplied PDF. Selenium examples use the Python WebDriver API shown in the material.

## 1. Selenium and Browser Automation

### What is Selenium?
Selenium is a tool that controls a web browser automatically using code. Instead of manually opening a browser, entering URLs, filling forms and clicking buttons, a program performs these actions.

Selenium can:
- Open a browser and navigate to a URL.
- Enter text and click buttons.
- Select options and move the mouse.
- Handle alerts, switch windows and work with frames.
- Capture screenshots and validate web-page behaviour.

### Example: manual testing vs Selenium
For a college student registration form, test data may include SRN, name, course and expected result. Manual testing requires the tester to open the browser, enter each value, click Register, observe and record the result, then repeat for every test case.

**Problems with repeated manual testing:** more execution time, repetitive work, human errors, difficulty with regression testing and multiple browsers, inconsistent execution and higher effort.

**Selenium automation:** a Python script repeats browser actions consistently. It is especially useful for repeatable functional and regression tests. Manual testing remains useful for exploratory testing.

| Manual testing | Selenium automation |
|---|---|
| Tester performs actions | Program performs actions |
| Repetitive tests take more time | Repetitive tests run faster |
| Human interaction is required | Browser interaction is automated |
| Repetition is difficult | Tests are easy to repeat |
| Manual observation | Automated validation can be added |
| Multiple browsers are harder to test | Supported browsers can be automated |
| Useful for exploratory testing | Useful for repeatable functional/regression tests |

## 2. Selenium Components, History and Architecture

### History and components
- Selenium originated in 2004 at ThoughtWorks. Jason Huggins developed it to test the front-end behaviour of an application.
- **Selenium RC (Remote Control):** older component. Test scripts sent commands to an RC server, which then controlled the browser. It was slower because of the extra server step, required a Java server in the background and had limitations with modern browsers.
- **Selenium IDE:** browser extension for Chrome/Firefox that records and replays browser actions such as clicks, typing and navigation. It requires no coding for basic record-and-playback.
- **Selenium Grid:** runs tests across multiple computers, browsers and operating systems, often in parallel. Example: same login test on Chrome/Windows, Firefox/Linux and Edge/Windows.
- **Selenium WebDriver:** modern component that controls browsers through browser-specific drivers. Code can be written in Python, Java, C# and other supported languages.

### Selenium versions
- **Selenium 2.0 (2011):** introduced WebDriver; direct browser control was a major improvement over RC. RC remained for backward compatibility.
- **Selenium 3.0 (2016):** deprecated Selenium RC and focused on WebDriver.
- **Selenium 4.0 (2021 onward):** major improvements over Selenium 3; the PDF introduces the 4.x generation.

### WebDriver architecture
The general command flow is:

**Test script / Selenium client library → WebDriver interface/protocol → browser driver → browser**

1. **Selenium client libraries:** language bindings used by the test script (Python, Java, C#, etc.).
2. **WebDriver:** receives commands from the client and communicates them to the browser driver.
3. **Browser driver:** browser-specific component, such as ChromeDriver, GeckoDriver or EdgeDriver.
4. **Browser:** executes the requested action and returns the result.

The test script does not directly manipulate the browser's internal implementation; WebDriver and the browser driver form the communication path.

### Why Selenium?
The PDF highlights benefits such as open-source availability, support for multiple programming languages, browser support, automation of repetitive tasks and flexibility/reusability of test scripts.

### Why Python with Selenium?
Python is readable and comparatively less verbose, making test scripts easier to write and maintain. Selenium provides a Python API that connects to the browser.

## 3. Selenium Installation and Basic Browser Commands

### Installation (as presented in the PDF)
1. Install Python.
2. Check Python: `python --version` or `py --version`.
3. Check/install pip if required.
4. Install Selenium:
   ```bash
   pip install selenium
   ```
5. Check Selenium:
   ```bash
   pip show selenium
   ```
6. Selenium 4.6+ can use Selenium Manager to obtain compatible drivers automatically in common setups. The slides also discuss installing a browser driver.
7. Save and run a Python file to verify the installation.

### Basic program
```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.google.com")
print(driver.title)
driver.quit()
```

**Line-by-line meaning**
- `from selenium import webdriver`: imports Selenium's WebDriver module.
- `webdriver.Chrome()`: creates a Chrome WebDriver session and opens Chrome.
- `driver.get(url)`: navigates to the given URL.
- `driver.title`: reads the page title.
- `driver.quit()`: closes all browser windows and ends the WebDriver session.

### Important browser commands
```python
driver = webdriver.Chrome()                 # Open Chrome
driver.get("https://example.com")            # Open a URL
driver.title                                 # Read page title
driver.current_url                           # Read current URL
driver.back()                                # Browser Back
driver.forward()                             # Browser Forward
driver.refresh()                             # Refresh current page
driver.close()                               # Close current window
driver.quit()                                # Close all windows and end session
```

**`close()` vs `quit()`**
- `close()` closes the current browser window.
- `quit()` closes all windows associated with the session and terminates the WebDriver session.

### Navigation example
```python
from selenium import webdriver
import time

driver = webdriver.Chrome()
driver.get("https://www.google.com")
time.sleep(2)
driver.get("https://www.python.org")
time.sleep(2)
driver.back()
time.sleep(2)
driver.forward()
time.sleep(2)
driver.refresh()
driver.quit()
```

The PDF also includes a classroom activity to create `home.html`, `about.html` and `contact.html`, then use Selenium to navigate among them and practise browser commands.

## 4. Waits in Selenium

### Meaning
A wait pauses Selenium until a page or web element is ready. It prevents the script from trying to interact with an element before it is available.

### Types of waits

**1. Implicit wait**
- Applies globally when Selenium searches for elements.
- Selenium waits up to the configured maximum time for an element to be found.
```python
driver.implicitly_wait(10)
```

**2. Explicit wait**
- Waits for a particular condition on a particular element.
- Uses `WebDriverWait` with an expected condition.
```python
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)
login_button = wait.until(
    EC.element_to_be_clickable((By.ID, "login"))
)
login_button.click()
```

**3. Fluent wait**
- Checks a condition repeatedly at a specified polling interval until it becomes true or the timeout is reached.
- The PDF describes timeout and polling interval as its important settings.
```python
from selenium.webdriver.support.ui import WebDriverWait

wait = WebDriverWait(driver, timeout=10, poll_frequency=0.5)
element = wait.until(
    lambda d: d.find_element(By.ID, "status")
)
```

| Implicit wait | Explicit wait | Fluent wait |
|---|---|---|
| Applies while searching for elements | Waits for a specific condition | Repeatedly checks a condition |
| Set once for the driver | Applied where needed | Timeout and polling interval can be configured |
| Maximum wait time | Maximum wait time | Maximum wait time + polling frequency |

## 5. Page Objects and Page Object Model (POM)

### Page Object
A Page Object is a class created to handle the elements and actions of a particular webpage.

### Page Object Model
POM is a design pattern used in Selenium automation to organise and maintain test code. Webpage locators and actions are placed in a page class; the test script calls the class methods.

### Example
Assume a login page contains fields with IDs `username` and `password`, and a button with ID `login`.

**Page class — `login_page.py`**
```python
from selenium.webdriver.common.by import By

class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username = (By.ID, "username")
        self.password = (By.ID, "password")
        self.login_button = (By.ID, "login")

    def login(self, username, password):
        self.driver.find_element(*self.username).send_keys(username)
        self.driver.find_element(*self.password).send_keys(password)
        self.driver.find_element(*self.login_button).click()
```

**Test script**
```python
from selenium import webdriver
from login_page import LoginPage

driver = webdriver.Chrome()
driver.get("file:///path/to/login.html")

login_page = LoginPage(driver)
login_page.login("John", "pass123")

driver.quit()
```

### How it works
1. The test script opens the login page.
2. It creates a `LoginPage` object and passes the driver.
3. The page object locates the username, password and login button.
4. The `login()` method enters values and clicks the button.
5. The test script can then validate the result.

### Advantages
- Reduces code duplication.
- Improves maintainability when page elements change.
- Separates test logic from page-specific details.
- Increases code reusability across test cases.

### Limitations
- Takes time and effort to create page classes, especially for large applications.
- Requires an initial design/organisation effort.

## 6. ActionChains, Mouse and Keyboard Actions

### ActionChains
`ActionChains` is a Selenium class used for advanced mouse and keyboard interactions with web elements. Actions are usually queued and then performed using `.perform()`.

```python
from selenium.webdriver.common.action_chains import ActionChains

actions = ActionChains(driver)
actions.move_to_element(element).click().perform()
```

### Common ActionChains methods
| Method | Meaning |
|---|---|
| `click(element)` | Single left-click |
| `click_and_hold(element)` | Press and hold left mouse button |
| `context_click(element)` | Right-click |
| `double_click(element)` | Double-click |
| `move_to_element(element)` | Move pointer to an element |
| `move_by_offset(x, y)` | Move pointer by x/y pixels |
| `drag_and_drop(source, target)` | Drag source and drop on target |
| `drag_and_drop_by_offset(source, x, y)` | Drag by pixel offset |
| `release()` | Release a held mouse button |

**Examples**
```python
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

actions = ActionChains(driver)
button = driver.find_element(By.ID, "submit")
actions.click(button).perform()

menu = driver.find_element(By.ID, "menu")
actions.move_to_element(menu).perform()

source = driver.find_element(By.ID, "source")
target = driver.find_element(By.ID, "target")
actions.drag_and_drop(source, target).perform()
```

### Keyboard actions
The PDF discusses four primary keyboard actions:

- **Key Down:** presses and holds a specified key until a matching `key_up()`.
- **Key Up:** releases a previously pressed key.
- **Send Keys:** sends normal or special keyboard keys to the active element/browser.
- **Send Keys to Element:** sends keyboard input directly to a specified web element.

```python
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

actions = ActionChains(driver)
search = driver.find_element(By.ID, "search")

actions.click(search).send_keys("Selenium").perform()
actions.key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL).perform()
search.send_keys(Keys.ENTER)
```

## 7. Web Elements and Locators

### Web elements
A web element is an element in an HTML page, generally represented by content between start and end HTML tags or by an input element. Selenium locators identify the elements so that scripts can interact with them.

### `find_element()` vs `find_elements()`
- `find_element()` returns the first matching element; if none is found, Selenium raises `NoSuchElementException`.
- `find_elements()` returns a list of all matching elements; if none match, it returns an empty list.

Modern locator syntax:
```python
from selenium.webdriver.common.by import By

driver.find_element(By.ID, "username")
driver.find_elements(By.TAG_NAME, "p")
```

### Main locator types

**1. ID locator**
- Uses the element's `id` attribute.
- IDs are intended to identify an element uniquely and are generally less likely to be affected by page changes.
```python
driver.find_element(By.ID, "email").send_keys("a@example.com")
```

**2. Name locator**
- Uses the HTML `name` attribute, often found in form inputs.
```python
driver.find_element(By.NAME, "username").send_keys("John")
```

**3. XPath locator**
XPath locates an HTML element by describing its position or attributes.

- Attribute: `//tagname[@attribute='value']`
- Multiple attributes: `//input[@name='email' and @type='text']`
- Text: `//button[text()='Login']`
- Absolute XPath: starts from the root of the document and follows a full path.
- Relative XPath: starts from a matching point in the document, commonly using `//`.

Examples:
```python
driver.find_element(By.XPATH, "//input[@id='email']")
driver.find_element(By.XPATH, "//input[@name='email' and @type='text']")
driver.find_element(By.XPATH, "//button[text()='Login']")
```

**XPath logical operators**
```python
# AND: both conditions must be true
driver.find_element(By.XPATH, "//input[@name='user' and @type='text']")

# OR: at least one condition must be true
driver.find_element(By.XPATH, "//input[@name='user' or @id='username']")
```

**XPath functions covered in the slides**
- `text()` — match visible text.
- `contains()` — match an attribute/text containing a given substring.
- `starts-with()` — match a value beginning with given text.
- `last()` — select the last matching node.
- `position()` — select by position.
- `count()` — count matching nodes.

Examples:
```python
driver.find_element(By.XPATH, "//button[text()='Submit']")
driver.find_element(By.XPATH, "//input[contains(@id, 'user')]")
driver.find_element(By.XPATH, "(//input[@type='text'])[last()]")
```

**4. CSS Selector**
A CSS selector identifies elements using CSS-style patterns.
- ID: `#login`
- Class: `.input-field`
- Tag: `input`
- Attribute: `input[name='email']`
```python
driver.find_element(By.CSS_SELECTOR, "#login")
driver.find_element(By.CSS_SELECTOR, ".input-field")
driver.find_element(By.CSS_SELECTOR, "input[name='email']")
```

**5. Link Text locator**
Used for hyperlinks based on their visible text.
```python
driver.find_element(By.LINK_TEXT, "About")
```

**6. Partial Link Text locator**
Matches part of a hyperlink's visible text.
```python
driver.find_element(By.PARTIAL_LINK_TEXT, "About")
```

| Link Text | Partial Link Text |
|---|---|
| Matches the complete visible link text | Matches a portion of visible link text |
| More specific | More flexible, but may match more than one link |

**7. Tag Name locator**
Uses the HTML tag such as `p`, `h1`, `input`, `button` or `a`.
```python
paragraphs = driver.find_elements(By.TAG_NAME, "p")
for paragraph in paragraphs:
    print(paragraph.text)
```

**8. Class Name locator**
Uses the element's class attribute.
```python
driver.find_element(By.CLASS_NAME, "form-control")
```

### Locator issues
The PDF discusses common reasons locators/actions may fail:
- **Attribute change:** a web element's attributes may change after an action or page update.
- **No web element:** an element may be created only after an event or some page operation.
- **Web element not visible:** an element may exist in the DOM but not currently be visible.
- **Test case mismatch / timing:** a test may run before the application is ready, leading to a missing-element error.

**Practical response:** inspect the current HTML, choose a stable locator, wait for the required condition, and verify that the element is visible/interactable before acting.

## 8. Practical Programs — Registration Form and Locator Patterns

### A. Basic form automation
```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/registration")

driver.find_element(By.ID, "student_id").send_keys("BCA001")
driver.find_element(By.ID, "name").send_keys("Ravi")
driver.find_element(By.ID, "email").send_keys("ravi@example.com")
driver.find_element(By.ID, "register").click()

print(driver.title)
driver.quit()
```

### B. Locate all paragraphs
```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

paragraphs = driver.find_elements(By.TAG_NAME, "p")
for p in paragraphs:
    print(p.text)

driver.quit()
```

### C. Locator syntax quick reference
```python
By.ID, "email"
By.NAME, "username"
By.XPATH, "//input[@type='text']"
By.CSS_SELECTOR, "#submit"
By.LINK_TEXT, "Home"
By.PARTIAL_LINK_TEXT, "Hom"
By.TAG_NAME, "p"
By.CLASS_NAME, "form-control"
```

### D. Basic test cases for a registration form
| Test | Input | Expected result |
|---|---|---|
| Valid SRN/name/course | BCA001, Ravi, BCA | Registration successful |
| Different valid student | BCA002, Anu, BCA | Registration successful |
| Another course | BCA003, Kumar, MCA | Registration successful |
| Blank SRN | Blank, Anu, BCA | Error message |
| Blank name | BCA005, Blank, BCA | Error message |

## 9. Exam Quick Revision

- Selenium = browser automation tool.
- WebDriver = controls browser through browser-specific driver.
- IDE = record and replay.
- Grid = parallel/cross-browser/cross-platform execution.
- RC = older server-based architecture; slower due to extra server step.
- `get()` = navigate; `back()` / `forward()` = history navigation; `refresh()` = reload.
- `close()` = current window; `quit()` = all session windows + end session.
- Implicit = element-search wait; explicit = condition-specific wait; fluent = repeated polling with configurable interval.
- POM = page-specific locators/actions in classes; test logic calls page methods.
- ActionChains = advanced mouse/keyboard interactions; call `perform()`.
- ID/name/class/tag/CSS/XPath/link text/partial link text = common locators.
- XPath `and` requires both conditions; `or` requires at least one.
- `find_element()` returns one match; `find_elements()` returns a list.
- Use waits and stable locators to reduce timing/locator failures.
