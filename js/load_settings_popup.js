var xhr= new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('settings.html'), true);
xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    console.log(this);
    document.getElementsByClassName("content_container")[0].insertAdjacentHTML("afterbegin", this.responseText);

    runSettings();
};
xhr.send();