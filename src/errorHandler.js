// Check for user errors and throw
export function checkUserError(user) {
  if (!user) {
    throw new Error("Network or API failure");
  }
  if (user.message === "Not Found") {
    throw new Error("Invalid GitHub username");
  }
  if (user.message) {
    throw new Error("Network or API failure");
  }
}

// Check for repo errors and throw
export function checkRepoError(repos) {
  if (!repos) {
    throw new Error("Network or API failure");
  }
  if (repos.message === "Not Found") {
    throw new Error("Invalid GitHub username");
  }
  if (repos.message) {
    throw new Error("Network or API failure");
  }
  if (Array.isArray(repos) && repos.length === 0) {
    throw new Error("User with no public repositories");
  }
}
