import {default as manifest} from "./manifest.json";

const updateDescription = ``;
const currentVersion = manifest.version;
const openAiChatUrl = "https://chat.openai.com/*";

function getOpenAiTabs(): Promise<chrome.tabs.Tab[]> {
  return chrome.tabs.query({url: openAiChatUrl});
}

// Check if the extension has been updated
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    // This block will be executed only when the extension is installed
    const openAiTabs = await getOpenAiTabs();

    if (openAiTabs.length > 0) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icon/icon128.png",
        title: "Reload ChatGPT Tabs?",
        message:
          "Would you like to reload your ChatGPT tabs to activate the extension?",
        buttons: [{title: "Reload"}],
        priority: 2,
      });
    }
  } else if (details.reason === "update") {
    // This block will be executed only when the extension is updated
    const openAiTabs = await getOpenAiTabs();
    if (openAiTabs.length > 0) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icon/icon128.png",
        title: `${manifest.short_name} was updated!`,
        message:
          `Your extension has been updated to the version ${currentVersion}. ${updateDescription}`,
        buttons: [{title: "Great! Reload CHAT_GPT Tabs!"}],
        priority: 2,
      });
    }
  }
});

chrome.notifications.onButtonClicked.addListener(async () => {
  const tabs = await getOpenAiTabs();

  tabs.forEach((tab) => {
    if (tab.id) {
      chrome.tabs.reload(tab.id);
    }
  });
});
