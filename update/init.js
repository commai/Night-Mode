function darkmode(){
    
}



chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'executeCode') {
    	console.log("pressed")
    	darkmode()
    }
    if(request.action === 'de-executeCode'){

    	location.reload(false);
    }
});

