# GitHub Repository Tracker

## Problem Statement
Build a GitHub repository tracker application that fetches repositories from the GitHub API using fetch. Use Promises and async/await to handle asynchronous operations. Implement a feature to refresh the data periodically using setInterval. Additionally, asynchronously fetch data for the owner of each repository.

---

## Requirements and Implementation

### Part 1 – Fetch Public Repositories
- Accepts a GitHub username through an input field on the web page.
- Fetches all public repositories for the specified user using the GitHub REST API (`https://api.github.com/users/{username}/repos`).
- Displays the repository information in the right-hand column of the web page.

### Part 2 – Fetch Owner Details
- Fetches the owner's profile information using the GitHub Users API (`https://api.github.com/users/{username}`).
- Displays the owner's details side-by-side with the repository information in a separate column.

### Part 3 – Refresh Data Automatically
- Refreshes the repository data every 60 seconds using `setInterval()`.
- Includes a live countdown indicator showing remaining seconds until the next refresh.
- Ensures the latest repository information is displayed after each refresh.
- Clears the interval properly when a new username is submitted.

### Part 4 – Error Handling
The application handles the following scenarios gracefully via `src/errorHandler.js`:
- **Invalid GitHub username**: Detects HTTP 404 and displays "Invalid GitHub username".
- **Network or API failures**: Catches network interruptions or rate-limiting errors and displays "Network or API failure".
- **User with no public repositories**: Detects empty repository lists and displays "User with no public repositories".

### Part 5 – Async/Await
- Built entirely using `async/await` syntax for all asynchronous operations.
- Uses `try...catch` blocks to capture and display errors for both the user profile and repository fetch operations.

---

## Project Structure

- `index.html` - HTML user interface with a two-column layout for owner details and repositories.
- `index.js` - Handles DOM events, coordinates `async/await` calls, and manages the 60-second countdown interval.
- `src/DataManager.js` - Service functions that call the GitHub API using `fetch`.
- `src/errorHandler.js` - Validates API responses and throws descriptive errors for invalid users, network issues, and empty repositories.

---

## How to Run

1. Open the project in VS Code.
2. Serve the directory using Live Server (Right-click `index.html` -> "Open with Live Server") or run:
   ```bash
   npx serve .
   ```
3. Enter a GitHub username and click "Fetch Details".
