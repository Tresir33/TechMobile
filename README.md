# Welcome to my TechMobile app - quick summary👋

This is an ecommerce product sales app where we sell phones & accesories to clients and admin oversees it all.

## Pre-requirements

install node.js
install react-vite
install express 
install Docker Desktop
install Postman
install pgAdmin/Postgres
install vscode

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx run dev
   ```

3. Extra dependecies installation
    
    ```bash
    npm install @react-native-firebase/app
    ```
    ```bash
    npm install @react-native-firebase/auth
    ```
    ```bash
    npm install styled-components
    ```
    ```bash
    npm install pg exos cors react-router-dom etc...
    ```

4. Github

    ```bash/prompt/powershell etc...
    nevigate to project root & git clone git@github.com:Tresir33/TechMobile.git
    ```

## Start frontend/backend project

When you're ready, run:

```bash
npm run dev
```
This command will launch the frontend side of the app.

```bash
npm start
```
This command will launch the backend side of the app.


## Tech Stack

* Frontend: React-Native
* Backend: node.js
* Database: 
   - Firebase: save user auth, eg. username, email etc...& reveiws.
   - pgAdmin/Postgres: save product data, users, complains etc
* test: 
   - Console for errors
   - Postman for API's
* Deployment: Docker Desktop & Connectify
* tools:
   - Trello: task manager
   - Github: Version control.
   - VSCode: Coding environment
   -Postman: testings
   -pgAdmin: relational database
   -Firebase: NoSQL database
   -Grok: debug & helping tool
   -Figma: conceptual app design
   -Canva: Documentation
        

## Project structure

* TechMobile/:
   - src/: Code source (components, config, pages, assets, etc...). Uses Vite & React for frontend purposes.
   - .gitignore/: Ignore node_modules/, .vscode/.
   -.env: saves secret credentials & configs from being leaked in Github
   - eslint.config/:
   - App.jsx: main app view module.
   -firebase: firebase config
   -router.jsx: main page router.
   -backend/src/: principale backend root code source (config, middleware, routes...). Uses Node.js & express for backend.
   -uploads/images: saved images that are linked to my backend for easier backend retrival.
   - package.json : Dependancies (both front/back-end as it's own package.json).
   - package-lock.json : Existing versions.
   -public: 
   -index.html
   -vite.config.js


## Functionality

* Sign-up: users register their name, surname, date of birth, gender, role, email, password.
* log-in: users log in through email verification.
* Customers: order products from the product page & have it appear in the cart page.
* visitors: can navigate the whole site: Homepage, productpage, contact page & signup/login pages.
*Admin: can modify products, add/delete users (employee & customers), modify/add/delete products.
*Employees: handle customer orders & update their status, update products stock, respond to customer complaints. 

## Technologies

* Trello
* Canvas
* VSCode
* Postman
* Github
*Firebase/Firestore
*Postgres/pgAdmin