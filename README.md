This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About the application

The application has a simple dummy login flow using basic authentication. To sign in, use the following credentials:

Username: usertest
Password: secret

To test the login flow and ensure it is working, enter incorrect login details and verify that the error is handled and feedback provided to the user.

Once successfully logged in, any interations including adding new books to the list, paging and loading specific book details are stored in the browser's local storage. This means that the login state and and any user interactions are persisted, so refreshing the page will load in the same state it was left. To end the session and clear storage, use the logout button in the top right of the browser which will reset the localstorage state and sign the user out.

If the app is rendered in a mobile screen size the list and detail views are no longer shown side by side, instead the full list is shown by default and the details are loaded in a seperate window.

User's can add new books to the list at any time by using the add new book option. The form does not support image uploads, instead it will accept a link e.g. "http://someimage.com/imagesrc.png" OR a data URI.

If a book has been successfully added, it will be prepended to the start of the book list, the paging will reset to the start of the book list and the new book will be automatically loaded into the detail view.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

Use any local http server to run the deploy version form the build folder e.g.

python -m SimpleHTTPServer 8082

