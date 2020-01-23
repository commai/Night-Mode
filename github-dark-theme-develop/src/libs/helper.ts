function fetchDomainString(url: string): string {
    if (!url) return '';

    let result = url.match(/([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?/g);

    return result === null ? '' : result[0];
}

function isUrlInList(url: string, list: string[], endWithWildcard: boolean = false) {
    var result = false;
    list.forEach((str: string) => {
        let regex = new RegExp(`^${str}${endWithWildcard ? '\\w*' : ''}`, 'g');
        result = result || url.match(regex) ? true : false;
    });
    return result;
}

function fetchUrlString(url: string): string {
    if (!url) return '';

    let result = url.match(/([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\/.*)?$/g);

    return result === null ? '' : result[0];
}

function isEmpty(data: Object) {
    return Object.getOwnPropertyNames(data).length === 0;
}

function queryTabInfo() {
    if (!chrome.tabs) return;

    let tabInfo = {};
    const queryInfo = {
        active: true,
        currentWindow: true,
    };
    chrome.tabs.query(queryInfo, tabs => {
        tabInfo = {
            id: tabs[0].id,
            title: tabs[0].title,
            url: tabs[0].url,
        };
    });

    return tabInfo;
}

function queryManifest() {
    if (!chrome.runtime) return;

    return chrome.runtime.getManifest().content_scripts;
}

function inSystemDarkMode(): boolean{
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export { fetchDomainString, fetchUrlString, isUrlInList, isEmpty };
export { queryTabInfo, queryManifest };
export { inSystemDarkMode };
