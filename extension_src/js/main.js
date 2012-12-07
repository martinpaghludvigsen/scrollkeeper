$(function() {
	console.log("Script ready");

	
	
//	Setup connection to the injected tab
	try {
		chrome.tabs.getSelected(null, function(tab) {
	  		chrome.tabs.sendMessage(tab.id, {greeting: "hello, content script"});
		});

		chrome.extension.onMessage.addListener(

			function(request, sender, sendResponse) {
				if(recording) {
					totalScrolled += parseInt(request.totalScrolled);
					$('#message').html(totalScrolled.toString() + " pixels scrolled");
					drawDistance();
					console.log(request);
					localStorage.totalScrolled = parseInt(totalScrolled);
				}
			});
	} catch(e) {
		console.log(e);
	}

//	Config and data variables
	var scale = localStorage.scale ? localStorage.scale : "metric";


	var recording = localStorage.recording ? localStorage.recording : 1;
	console.log("Am I REALLY recording: "+recording);
	console.log("recording false:"+recording);
	console.log("recording false:"+(recording == "false"));
	

	if(recording == 0) {
		console.log("GIGA TISSER");
		$('#playpause_button').toggleClass('playpause_button_statepause');
	}
	
	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
	//	totalScrolled = 127800;
	$('#message').html(totalScrolled + " pixels scrolled");
	console.log("Total scrolled from local storage: "+totalScrolled.toString());
	
	
//	setup the context on page 1 for displaying the distance and reflection
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


//button handlers
	
	$('#navigation li a').click(function() {
		selectPage(this.id)
	});	
	
	$("#page1_twitter").click(function() {
		var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
		      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		      width = 550,
		      height = 420,
		      winHeight = screen.height,
		      winWidth = screen.width,
			  distance = (Math.round((totalScrolled / 4999) * 100) / 100), 
			  statusText = encodeURIComponent("I've scrolled "+distance+" meters. ScrollKeeper is my new best friend");
		
		left = Math.round((winWidth / 2) - (width / 2));
		top = 0;

		if (winHeight > height) {
			top = Math.round((winHeight / 2) - (height / 2));
		}

		window.open('https://twitter.com/intent/tweet/?text='+statusText, 'intent', windowOptions + ',width=' + width +
			                                           ',height=' + height + ',left=' + left + ',top=' + top);
	});
	
	$("#page1_fb").click(function() {
		var distance = (Math.round((totalScrolled / 4999) * 100) / 100), 
			statusText = encodeURIComponent("I've scrolled "+distance+" meters. ScrollKeeper is my new best friend");

		window.open('http://www.detderedb.dk/scrollkeeper_fb/post.php?distance='+distance);
	});
	
	$('#playpause_button').click(function() {
		$('#playpause_button').toggleClass('playpause_button_statepause');
		//Apparently booleans get converted to strings when stored in LocalStorage. Stupid JavaScript
		if(recording == 0)
			recording = 1;
		else
			recording = 0;
		localStorage.recording = recording;
	});
	
	$('#page_5_scale').click(function() {
		$('#page_5_scale').toggleClass('imperial');
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
		console.log(this + "drawDistance, ppi is "+getPPI());

		ctx.clearRect ( 0 , 0 , 400 , 200 );
		ctx2.clearRect ( 0 , 0 , 400 , -200 );

//TODO: Account for settings, for now use meters. We're pretending there is roughly 4999px to a meter, which is like saying PI equals 3 and furthermore will vary wildly between devices. So shoot me ...

		distance = (Math.round((totalScrolled / 4999) * 100) / 100); 
		
//		distance = 0.00;
//		distance = 0.01;
//		distance = 0.99;
//		distance = 1;
//		distance = 1.01;
//		distance = 10;
//		distance = 10.1;
//		distance = 10.01;
//		distance = 100.01;
//		distance = 105.95;
//		distance = 558.95;
//		distance = 999.98;
//		distance = 1000.01;
//		distance = 9999.01;
//		distance = 5050.99;
//		distance = 14051.99;
//		distance = 9999000.01;
		

//		distance is in meters

		var distanceString;
		var unitString;

		if(distance < 1) {
			//distance is in cm until and including 0.99m
			distanceString = formatDistanceCentimeters(distance);
			unitString = "cm";
		} else if(distance < 1000) {
			//distance is in m until and including 999m
			distanceString = formatDistanceMeters(distance);
			unitString = "m";
		} else if(distance < 1000000) {
			//distance is in km until and including 999999m
			distanceString = formatDistanceKilometers(distance);
			unitString = "km";
		} else {
			//above 999999 distance is in Mm (1000km)
			distanceString = formatDistanceMegameters(distance);
			unitString = "Mm";
		}

//		TODO: Format distance into cm, meters, kilometers and so on

		ctx.fillText(distanceString, 45, 90);

		ctx2.fillText(distanceString, 45, 0);
		
		$('#page_1_unit').html(unitString);

	}
	
	function formatDistanceCentimeters(distance) {
		distCm = Math.round(100 * distance);
		console.log("distCm: "+distCm);
		if(distCm< 10) {
			return "000"+distCm;
		} else {
			return "00"+distCm;
		}
	}
	
	function formatDistanceMeters(distance) {
		var distanceString;
		console.log("distance: "+distance);
		if(distance < 10) {
			distanceString = "0" + distance.toString();
			if(decimalPlaces(distance) == 0) {
				distanceString += ".00";
			} else if(decimalPlaces(distance) == 1) {
				distanceString += "0";
			}
		} else if(distance < 100) {
			distanceString = distance.toString();
			if(decimalPlaces(distance) == 0) {
				distanceString += ".00";
			} else if(decimalPlaces(distance) == 1) {
				distanceString += "0";
			}		
		} else {
			distance = (Math.round(distance * 10) / 10);
			distanceString = distance.toString();
			if(decimalPlaces(distance) == 0 && distance < 1000) {
				distanceString += ".0";
			}
		}
		return distanceString;
	}
	
	function formatDistanceKilometers(distance) {
		distKm = Math.round((Math.round(distance) / 1000) * 1000) / 1000;
		console.log("distKm: "+distKm);
		var distanceString;
		if(distKm < 10) {
			distanceString = distKm.toString();
			if(decimalPlaces(distKm) == 0) {
				distanceString += ".000";
			} else if(decimalPlaces(distKm) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distKm) == 2) {
				distanceString += "0";
			}
		} else if(distKm < 100) {
			distKm = (Math.round(distKm * 100) / 100);
			distanceString = distKm.toString();
			if(decimalPlaces(distKm) == 0) {
				distanceString += ".00";
			} else if(decimalPlaces(distKm) == 1) {
				distanceString += "0";
			}		
		} else {
			distKm = (Math.round(distKm * 10) / 10);
			distanceString = distKm.toString();
			if(decimalPlaces(distKm) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;
		
	}
	
	function formatDistanceMegameters(distance) {
		distMm = Math.round((Math.round(distance) / 1000000) * 1000) / 1000;
		console.log("distMm: "+distMm);
		var distanceString;
		if(distMm < 10) {
			distanceString = distMm.toString();
			if(decimalPlaces(distMm) == 0) {
				distanceString += ".000";
			} else if(decimalPlaces(distMm) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distMm) == 2) {
				distanceString += "0";
			}
		} else if(distMm < 100) {
			distMm = (Math.round(distMm * 100) / 100);
			distanceString = distMm.toString();
			if(decimalPlaces(distMm) == 0) {
				distanceString += ".00";
			} else if(decimalPlaces(distMm) == 1) {
				distanceString += "0";
			}		
		} else {
			distMm = (Math.round(distMm * 10) / 10);
			distanceString = distMm.toString();
			if(decimalPlaces(distMm) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;
		
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
	
	function getPPI(){
	 // create an empty element
	 var div = document.createElement("div");
	 // give it an absolute size of one inch
	 div.style.width="1in";
	 // append it to the body
	 var body = document.getElementsByTagName("body")[0];
	 body.appendChild(div);
	 // read the computed width
	 var ppi = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
	 // remove it again
	 body.removeChild(div);
	 // and return the value
	 return parseFloat(ppi);
	}
	
});

