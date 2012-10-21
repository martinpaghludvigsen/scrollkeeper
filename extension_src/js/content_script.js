//alert("Start scrolling!");
console.log("Content Script ready");
var totalScrolled = 0;
var lastScrolled = 0;
var scrollThreshold = 1000;
var scrollIncrement = 1000;
console.log("Total scrolled on this page: "+totalScrolled);

//TODO: Store all scroll progress on this page until it can be sent to the popup?

chrome.extension.onMessage.addListener(

	function(request, sender, sendResponse) {
		//TODO: If this is a message saying the window has just been opened, send the value of totalScrolled to update the value in the popup. Then reset the value for next broadcast
//		console.log(sender);
		console.log(request);
//		console.log(sendResponse);
		
});

window.onscroll = scroll;
 
function scroll () {
	//alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
	totalScrolled = window.pageYOffset;
	
//	alert("total scrolled: "+totalScrolled)
	
	if(totalScrolled > scrollThreshold) {
//		alert("Congrats, you've scrolled "+totalScrolled + " pixels pages");
		console.log(totalScrolled+" pixels scrolled");
		//TODO: If you don't receive a response, assume the message hasn't been received by the popup. If that is the case, don't reset the value for next broadcast
		//TODO: only send the message and reset the value if a connection has been established. Otherwise simply store the value.
		chrome.extension.sendMessage({totalScrolled: totalScrolled - lastScrolled});
		scrollThreshold = totalScrolled + scrollIncrement;
		lastScrolled = totalScrolled;
	}
	
	localStorage.totalScroll = totalScrolled;
	
}