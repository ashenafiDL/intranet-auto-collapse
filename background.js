chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const intranet = "https://alx-intranet.hbtn.io"

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(intranet)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === "ON") {
            await chrome.scripting.insertCSS({
                files: ["intranet-auto-collapse.css"],
                target: { tabId: tab.id },
            });
        } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["intranet-auto-collapse.css"],
                target: { tabId: tab.id },
            });
        }
    }
});