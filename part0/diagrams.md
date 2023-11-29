## 0.4: New Note Diagram

```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: POST request to address 'new_note' that sends user input data via a form submit event.
    activate server
    server-->>browser: HTTP Status code 302, server asks browser to do new GET request to the address notes.
    deactivate server

    browser->>server: Reloads notes page causing 3 more HTTP requests (to fetch css, js, and JSON data)
    activate server
    server-->>browser: POST request that creates note and adds it to the array.
    deactivate server

    Note right of browser: The browser renders an updated version of notes.

```

# 0.5: SPA (Single Page Application)

When the user visits the SPA (Single Page Application) version of the notes page it will look essentially the same to them. However, there are some key differences:

- It is comprised of only one HTML page, instead of multiple, and that page is updated by JavaScript executing in the browser.
- The HTML form-tag is defined differently. It does not contain an action or method attribute to define where to send the data.

# 0.6: New Note SPA Diagram

```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: POST request to address 'new_note_spa' that contains note as JSON data.
    activate server
    server-->>browser: Responds with status code 201 created. No further HTTP requests sent.
    deactivate server

    Note right of browser: The browser uses JavaScript and an event handler to create a new note, re-render the page, and send the new page to server.

```
