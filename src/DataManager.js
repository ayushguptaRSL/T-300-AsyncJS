export async function fetchGithubRepo(username) {
  try {
    let response = await fetch(`https://api.github.com/users/${username}/repos`);
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Network or API failure");
  }
}

export async function fetchGithubUser(username) {
  try {
    let response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Network or API failure");
  }
}