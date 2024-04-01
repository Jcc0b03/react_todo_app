# Simple todo app in React

link: http://todos.jakubwierzchowski.tech/

This project was created in few days to showcase my React skills, I was trying to use as many React concepts as possible.

## How to use app?

I`ve used TypeScript because it's build on top of JavaScript so if I know typescript I also know JavaScript.

I`ve implemented simple todos sync system, with backend written in Node.js([link to backend repo])

How to use sync system?
1. click on "cloud sync icon"
2. generate random sync code or enter your own
3. Click checkmark icon(✅)

If there are no todos displayed app will fetch todos from server but if there are some, app will send this todos to the server

## App schema
App uses two separated docker containers - one with compiled frontend( with serve -s command ), and second one running backend api written in Node.js. Both of them are behind Apache2 web server configured for beeing proxy.

Backend have three endpoints:
- /generateToken
- /uploadTodos
- /getTodos?syncToken=[sync token]

![app schema](https://github.com/Jcc0b03/react_todo_app/blob/master/app_schema.jpg?raw=true)

