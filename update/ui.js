document.getElementById("changeTheme").addEventListener("click", sendClickEvent);
document.getElementById("revertTheme").addEventListener("click", sendClickEvent2);
function sendClickEvent(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, { action: 'executeCode' });
 		 console.log('messageSent');
	});
}

function sendClickEvent2(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, { action: 'de-executeCode' });
 		 console.log('messageSent');
	});
}