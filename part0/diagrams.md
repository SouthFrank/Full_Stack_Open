## 0.4: New note diagram

```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: POST request to address 'new_note' that sends user input data via a form submit event
    activate server
    server-->>browser: HTTP Status code 302, server asks browser to do new GET request to the address notes
    deactivate server

    browser->>server: Reloads notes page causing 3 more HTTP requests (to fetch css, js, and json data)
    activate server
    server-->>browser: POST request that creates note and adds it to the array
    deactivate server

    Note right of browser: The browser renders an updated version of notes

```

# 0.5: Single page app diagram

When the user visits the SPA (Single Page Application) version of the notes page it will look essentially the same to them. However, there are some key differences:

- It is comprised of only one HTML page, instead of multiple, and that page is updated by JavaScript executing in the browser.
- The HTML form-tag is defined differently. It does not contain action or method attribute to define where to send the data.

# 0.6: New note in Single page app diagram

```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: POST request to address 'new_note' that sends user input data via a form submit event
    activate server
    server-->>browser: HTTP Status code 302, server asks browser to do new GET request to the address notes
    deactivate server

    browser->>server: Reloads notes page causing 3 more HTTP requests (to fetch css, js, and json data)
    activate server
    server-->>browser: POST request that creates note and adds it to the array
    deactivate server

    Note right of browser: The browser renders an updated version of notes

```
