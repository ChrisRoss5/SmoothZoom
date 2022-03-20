"use strict";
(() => {
    let storage = {
        activationKey: "rightClick",
        websiteInteractivity: true,
        holdToZoom: true,
        useScreenshot: false,
        strength: 1,
        transition: 200,
    };
    document.querySelector("#title").onclick = () => chrome.tabs.create({ url: "../welcome/welcome.html" });
    document.querySelector("#review").href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;
    const interactivityLabel = document.querySelector("input[key='websiteInteractivity']").parentElement;
    const strengthValueEl = document.querySelector("#strength-value");
    const transitionValueEl = document.querySelector("#transition-value");
    chrome.storage.sync.get(null, (response) => {
        storage = Object.assign(Object.assign({}, storage), response);
        setInputValues();
    });
    chrome.storage.onChanged.addListener((changes) => {
        for (const key of Object.keys(changes))
            updateStorage(key, changes[key].newValue);
        setInputValues();
    });
    function setInputValues() {
        for (const input of document.querySelectorAll("input")) {
            const key = input.getAttribute("key");
            const { activationKey, strength, transition, useScreenshot } = storage;
            if (key == activationKey ||
                storage[key] === true) {
                input.checked = true;
            }
            else if (key == "strength") {
                if (strength != undefined)
                    input.value = strength.toFixed(2);
                strengthValueEl.textContent = getStrength(strength).toFixed(2);
            }
            else if (key == "transition") {
                if (transition != undefined)
                    input.value = transition.toString();
                transitionValueEl.textContent = transition + "ms";
            }
            if (useScreenshot)
                interactivityLabel.className = "disabled";
            input.addEventListener("click", inputClicked);
        }
    }
    function inputClicked() {
        const key = this.getAttribute("key");
        if (this.type == "radio") {
            chrome.storage.sync.set({ activationKey: key });
        }
        else if (key == "strength") {
            const strength = parseFloat(this.value);
            chrome.storage.sync.set({ strength });
            strengthValueEl.textContent = getStrength(strength).toFixed(2);
        }
        else if (key == "transition") {
            const transition = Math.round(parseFloat(this.value));
            chrome.storage.sync.set({ transition });
            transitionValueEl.textContent = transition + "ms";
        }
        else {
            chrome.storage.sync.set({ [key]: this.checked });
            if (key == "useScreenshot")
                interactivityLabel.className = this.checked ? "disabled" : "";
        }
    }
    /* Shared functions from content-script */
    function getStrength(percentage) {
        if (percentage < 0.5)
            return 0.25 + 1.5 * percentage;
        return 1 + 6 * (percentage - 0.5);
    }
    function updateStorage(key, value) {
        storage[key] = value;
    }
})();
