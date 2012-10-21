$(function() {
	console.log("Script ready");

//	localStorage.totalScrolled = 0;

	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
	$('#message').html(totalScrolled + " pixels scrolled");
	console.log("Total scrolled from local storage: "+totalScrolled.toString());
	

	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {greeting: "hello, content script"});
	});

	chrome.extension.onMessage.addListener(

		function(request, sender, sendResponse) {
			totalScrolled += parseInt(request.totalScrolled);
			$('#message').html(totalScrolled.toString() + " pixels scrolled");
			console.log(request);
			localStorage.totalScrolled = parseInt(totalScrolled);
	});
		
	
});
