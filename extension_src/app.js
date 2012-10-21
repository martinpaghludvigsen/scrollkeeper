//alert("Start scrolling!");

var totalScrolled = 0;
var lastIncrement = 1000;

window.onscroll = scroll;
 
function scroll () {
	//alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
	totalScrolled = window.pageYOffset;
	
//	alert("total scrolled: "+totalScrolled)
	
	if(totalScrolled > lastIncrement) {
//		alert("Congrats, you've scrolled "+totalScrolled + " pixels pages");
		lastIncrement += 1000;
	}
	
}