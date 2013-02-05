//localStorage.totalScrolled = 0;
var totalScrolled = localStorage.totalScrolled ? parseInt(localStorage.totalScrolled)  : 0;
var lastScrolled = 0;
var scrollThreshold = 250;
var sending = false;
var windowOpen = false;
var theTimeout;
//console.log("Content Script ready. Total scrolled on page that hasn't been sent: "+totalScrolled);


chrome.extension.onMessage.addListener(

	function(request, sender, sendResponse) {
		//TODO: If this is a message saying the window has just been opened, send the value of totalScrolled to update the value in the popup. Then reset the value for next broadcast
//		console.log(sender);
		console.log(request);
//		console.log(sendResponse);
		window.clearTimeout(theTimeout);
		windowOpen = true;
		if(request.distanceReceived) {
			sending = false;
//			console.log("GOT IT");
			totalScrolled -= request.distanceReceived;
			localStorage.totalScrolled = totalScrolled;
		//	console.log("new scroll value: "+ totalScrolled);
		} else if(request.greeting) {
			if(totalScrolled > scrollThreshold) {
				theTimeout = setTimeout(noWindowConnection,250);
				chrome.extension.sendMessage({totalScrolled: totalScrolled});
			}
		} else {
		//	console.log("I DIDN'T GET IT");
		}
		
});

window.onscroll = doScroll;
 
function doScroll (oEvent) {
	
//	console.log(oEvent);
	
	//alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
	var thisScroll = window.pageYOffset;
	var diff =  Math.abs(thisScroll - lastScrolled);
//	console.log("thisScroll: "+thisScroll);
//	console.log("diff: "+diff);
	totalScrolled += diff;

//	console.log("totalScrolled: "+totalScrolled);
	
	if(totalScrolled > scrollThreshold && !sending && windowOpen) {
		sending = true;
//		alert("Congrats, you've scrolled "+totalScrolled + " pixels pages");
//		console.log(totalScrolled+" pixels scrolled");
		theTimeout = setTimeout(noWindowConnection,250);
		chrome.extension.sendMessage({totalScrolled: totalScrolled});
	}
	
	lastScrolled = thisScroll;
	localStorage.totalScrolled = totalScrolled;
	
}

function noWindowConnection()
{
//	console.log("Extension window isn't open. Storing information for later dispatch.")
	windowOpen = false;
	sending = false;
}