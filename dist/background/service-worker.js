"use strict";
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.runtime.setUninstallURL("https://forms.gle/w4wf7qwWE3ZkavhD7");
        chrome.tabs.create({ url: "../welcome/welcome.html#installed" });
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //
    if (request.message == "TAKE_SCREENSHOT")
        /* https://developer.chrome.com/docs/extensions/reference/tabs/#method-captureVisibleTab */
        chrome.tabs.captureVisibleTab(-2, { quality: 100 }, sendResponse);
    //
    else if (request.message == "TOGGLE_JAVASCRIPT") {
        /* https://developer.chrome.com/docs/extensions/reference/contentSettings/#property-javascript */
        if (request.details.enable) {
            chrome.contentSettings.javascript.clear({ scope: "regular" }, sendResponse);
        }
        else {
            chrome.contentSettings.javascript.set({
                primaryPattern: request.details.primaryPattern,
                setting: "block",
            }, sendResponse);
        }
    }
    return true;
});
