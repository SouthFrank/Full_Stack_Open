```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```

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
    server-->>POST request that creates note and adds it to the array
    deactivate server

    Note right of browser: The browser renders an updated version of notes

```
