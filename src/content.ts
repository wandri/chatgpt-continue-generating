import {DEFAULT_INTERVAL, STORAGE_KEY_INTERVAL, STORAGE_KEY_IS_DISABLED} from "./constant";

chrome.storage.sync.get(
  [STORAGE_KEY_INTERVAL, STORAGE_KEY_IS_DISABLED],
  (result) => {
    const interval = result[STORAGE_KEY_INTERVAL] || DEFAULT_INTERVAL;
    if (!result[STORAGE_KEY_IS_DISABLED]) {
      setInterval(() => clickOnContinueButton(), interval);
    }
  }
);

function clickOnContinueButton(): void {
  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons.item(i);
    if (
      button.innerText.includes("Continue generating")
    ) {
      const randomTimeoutToAvoidDetection = Math.random() * 1_000;
      setTimeout(() => {
        button.click();
      }, randomTimeoutToAvoidDetection)
      console.log("Continue generating");
      break;
    }
  }
}
