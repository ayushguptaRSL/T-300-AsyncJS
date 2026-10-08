import { fetchGithubRepo, fetchGithubUser } from "./src/DataManager.js";
import { checkUserError, checkRepoError } from "./src/errorHandler.js";

const fetchBtn = document.getElementById("fetchBtn");
const usernameInput = document.getElementById("username");
const userOutput = document.getElementById("userOutput");
const repoOutput = document.getElementById("repoOutput");
const countDownOutput = document.getElementById("repoCountdown");

const REFETCH_INTERVAL = 60;
let countDownTimer = null;

function startRepoCountdown(username) {
  let countDown = REFETCH_INTERVAL;
  countDownOutput.textContent = `(Refetching in ${countDown})`;

  countDownTimer = setInterval(async () => {
    countDown -= 1;

    if (countDown <= 0) {
      countDownOutput.textContent = "(Refetching now...)";

      try {
        const updatedRepos = await fetchGithubRepo(username);
        checkRepoError(updatedRepos);
        repoOutput.textContent = JSON.stringify(updatedRepos, null, 2);
      } catch (error) {
        repoOutput.textContent = error.message;
      }

      countDown = REFETCH_INTERVAL;
    }

    countDownOutput.textContent = `(Refetching in ${countDown})`;
  }, 1000);
}

fetchBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    userOutput.textContent = "Please enter a username!";
    repoOutput.textContent = "Please enter a username!";
    if (countDownTimer) {
      clearInterval(countDownTimer);
      countDownOutput.textContent = "";
    }
    return;
  }

  if (countDownTimer) {
    clearInterval(countDownTimer);
    countDownOutput.textContent = "";
  }

  userOutput.textContent = "Fetching user profile...";
  repoOutput.textContent = "Fetching repositories...";

  let hasError = false;

  try {
    const userDetail = await fetchGithubUser(username);
    checkUserError(userDetail);
    userOutput.textContent = JSON.stringify(userDetail, null, 2);
  } catch (error) {
    userOutput.textContent = error.message;
    hasError = true;
  }

  try {
    const initialRepos = await fetchGithubRepo(username);
    checkRepoError(initialRepos);
    repoOutput.textContent = JSON.stringify(initialRepos, null, 2);
  } catch (error) {
    repoOutput.textContent = error.message;
    hasError = true;
  }

  if (!hasError) {
    startRepoCountdown(username);
  }
});