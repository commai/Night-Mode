// TODO: Decoupling Chrome instance by https://github.com/mozilla/webextension-polyfill

// sync
function syncGet(keys: string | Object | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.sync.get(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function syncSet(items: Object): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.sync.set(items, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function syncGetBytesInUse(keys: string | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.sync.getBytesInUse(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function syncRemove(keys: string | string[]) {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.sync.remove(keys, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function syncClear() {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.sync.clear(() => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}

// local
function localGet(keys: string | Object | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function localSet(items: Object): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.local.set(items, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function localGetBytesInUse(keys: string | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.local.getBytesInUse(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function localRemove(keys: string | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.local.remove(keys, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function localClear(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.local.clear(() => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}

// managed
function managedGet(keys: string | Object | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.managed.get(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function managedSet(items: Object): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.managed.set(items, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function managedGetBytesInUse(keys: string | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.managed.getBytesInUse(keys, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
    return promise;
}
function managedRemove(keys: string | string[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.managed.remove(keys, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}
function managedClear(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.managed.clear(() => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return promise;
}

// onChanged
function onChangedAddListener(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        chrome.storage.onChanged.addListener((changes, areaName) => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve({ changes, areaName });
            }
        });
    });
    return promise;
}

const storage = {
    sync: {
        get: syncGet,
        set: syncSet,
        getBytesInUse: syncGetBytesInUse,
        remove: syncRemove,
        clear: syncClear,
    },
    local: {
        get: localGet,
        set: localSet,
        getBytesInUse: localGetBytesInUse,
        remove: localRemove,
        clear: localClear,
    },
    managed: {
        get: managedGet,
        set: managedSet,
        getBytesInUse: managedGetBytesInUse,
        remove: managedRemove,
        clear: managedClear,
    },
    onChanged: {
        addListener: onChangedAddListener,
    },
};

export { storage };
