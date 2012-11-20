$(function() {
	console.log("Script ready");

//	localStorage.totalScrolled = 0;

	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
	$('#message').html(totalScrolled + " pixels scrolled");
	console.log("Total scrolled from local storage: "+totalScrolled.toString());
	

	try {
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
	} catch(e) {
		console.log(e);
	}
	
	$('#navigation li a').click(function() {
		selectPage(this.id)
	});	
	
	function selectPage(navId) {
		//Reset all navigation elements
		$('#navigation li a').removeClass('selected');
		$('#navigation li a').addClass('unselected');
		//Select current navigation element
		$('#'+navId).removeClass('unselected');
		$('#'+navId).addClass('selected');
		
		//Get new page ID
		var newPageId = navId.replace("nav_","page_");
		$('#pages div').removeClass("selected");
		$('#pages div').addClass("unselected");
		$('#'+newPageId).addClass("selected");
	}
	
});
