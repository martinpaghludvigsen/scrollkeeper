$(function() {
	console.log("Script ready");

//	localStorage.totalScrolled = 0;

	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
//	totalScrolled = 127800;
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
				drawDistance();
				console.log(request);
				localStorage.totalScrolled = parseInt(totalScrolled);
			});
	} catch(e) {
		console.log(e);
	}
	
	var ctx = document.getElementById("distancecanvas").getContext("2d");
	ctx.font = "100px BeBas";
	ctx.fillStyle = "White";
	var ctx2 = document.getElementById("distancecanvas_reflection").getContext("2d");
	ctx2.font = "100px BeBas";
	ctx2.fillStyle = "White";
	ctx2.scale(1, -1);
	
	var gradient = ctx2.createLinearGradient( 0, -45, 0, 45); 
	gradient.addColorStop( 0, 'rgba( 255, 255, 255, 0 )' ); 
	gradient.addColorStop( 1, 'rgba( 255, 255, 255, 1.0 )' );
	
	ctx2.fillStyle = gradient; 
	ctx2.rect( 0, 0, ctx2.width, 45 ); 
	ctx2.fill();	
	
	drawDistance();
	setTimeout(drawDistance,500);
	
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
		$('#pages > div').removeClass("selected");
		$('#pages > div').addClass("unselected");
		
		$('#'+newPageId).addClass("selected");
		$('#'+newPageId).removeClass("unselected");
		
	}
	
	function drawDistance() {
		console.log(this + "drawDistance");

		ctx.clearRect ( 0 , 0 , 400 , 200 );
		ctx2.clearRect ( 0 , 0 , 400 , -200 );

//TODO: Account for settings, for now use meters. We're pretending there is roughly 4999px to a meter, which is like saying PI equals 3 and furthermore will vary wildly between devices. So shoot me ...

		distance = (Math.round((totalScrolled / 4999) * 100) / 100); 

		var distanceString;

//		TODO: Format distance into cm, meters, kilometers and so on
		if(distance < 10) 
			distanceString = "0" + distance.toString();
		else
			distanceString = distance.toString();
			
		if(decimalPlaces(distance) == 0) {
			distanceString += ".00";
		} else if(decimalPlaces(distance) == 1) {
			distanceString += "0";
		}	

		ctx.fillText(distanceString, 45, 90);

		ctx2.fillText(distanceString, 45, 0);


	}
	
	function decimalPlaces(num) {
	  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	  if (!match) { return 0; }
	  return Math.max(
	       0,
	       // Number of digits right of decimal point.
	       (match[1] ? match[1].length : 0)
	       // Adjust for scientific notation.
	       - (match[2] ? +match[2] : 0));
	}
	
});

