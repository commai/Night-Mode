let MODE_KEY = "mode" // deprecated
let SETTINGS_KEY = "settings"

let DEFAULT_MODE = "default"
let DEEPBLUE_MODE = "deepblue"

// onboarding / education
let NEW_THEMES_ONBOARDING_KEY = "NEW_THEMES_ONBOARDING_KEY"

function getStoredSettings(callback) {
    chrome.storage.sync.get([SETTINGS_KEY, MODE_KEY], function(result) {
        let storedSettings = result[SETTINGS_KEY];
        let storedMode = result[MODE_KEY];

        // convert old deprecated stored mode into settings
        var settings;
        if (storedSettings != null) {
            settings = storedSettings;
        } else {
            settings = _convertLegacyModeToSettings(DEEPBLUE_MODE);
        }

        callback(settings);
    });
}

function updateStoredSettings(settings, callback) {
    chrome.storage.sync.set({ [SETTINGS_KEY]: settings }, callback);
}

function listenForSettingsUpdates(handler) {
    chrome.storage.onChanged.addListener(function(changes) {
        let settingsChanges = changes[SETTINGS_KEY];
        if (settingsChanges && settingsChanges.newValue) {
            handler(settingsChanges.newValue);
        }
    });
}

function checkIfOnboardingNeeded(key, handler) {
    chrome.storage.sync.get(key, function(result) {
        let hasSeenOnboarding = result[key];
        handler(hasSeenOnboarding == null || !hasSeenOnboarding);
    });
}

function updateOnboardingSeen(key) {
    chrome.storage.sync.set({ [key]: true });
}

function themeClassName(mode) {
        return "deepblue_theme";
}

function settingsIconURL(settings) {
    if (!settings.isEnabled) {
        return chrome.extension.getURL("assets/deepblue-messenger.svg");
    } else {
        return themeIconURL(settings.preferredTheme);
    }
}

function themeIconURL(theme) {
        return chrome.extension.getURL("assets/deepblue-messenger.svg");
}

function _convertLegacyModeToSettings(mode) {
    var settings = {};
    settings.preferredTheme = DEEPBLUE_MODE;
    settings.isEnabled = mode != DEFAULT_MODE;
    return settings;
}
