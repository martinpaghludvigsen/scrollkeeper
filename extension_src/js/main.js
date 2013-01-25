$(function() {
	
//	localStorage.totalScrolled = 0;
	
	console.log("Script ready");


	//	Config and data variables
	var scale = localStorage.scale ? localStorage.scale : "metric";
	console.log("scale: "+scale);
	if(scale == "imperial") {
		$('#config_1_1').removeClass('config_selected');
		$('#config_1_2').removeClass('config_unselected');
		$('#config_1_1').addClass('config_unselected');
		$('#config_1_2').addClass('config_selected');
	} else {
		$('#config_1_1').removeClass('config_unselected');
		$('#config_1_2').removeClass('config_selected');
		$('#config_1_1').addClass('config_selected');
		$('#config_1_2').addClass('config_unselected');
	}
	
	var landmarks = localStorage.landmarks ? localStorage.landmarks : 1;
	console.log("landmarks: "+landmarks);
	if(landmarks == 0) {
		$('#config_2_1').removeClass('config_selected');
		$('#config_2_2').removeClass('config_unselected');
		$('#config_2_1').addClass('config_unselected');
		$('#config_2_2').addClass('config_selected');
	} else {
		$('#config_2_1').removeClass('config_unselected');
		$('#config_2_2').removeClass('config_selected');
		$('#config_2_1').addClass('config_selected');
		$('#config_2_2').addClass('config_unselected');
	}

	var awesomeness = localStorage.awesomeness ? localStorage.awesomeness : 1;
	console.log("awesomeness: "+awesomeness);
	if(awesomeness == 0) {
		$('#config_3_1').removeClass('config_selected');
		$('#config_3_2').removeClass('config_unselected');
		$('#config_3_1').addClass('config_unselected');
		$('#config_3_2').addClass('config_selected');
	} else {
		$('#config_3_1').removeClass('config_unselected');
		$('#config_3_2').removeClass('config_selected');
		$('#config_3_1').addClass('config_selected');
		$('#config_3_2').addClass('config_unselected');
	}

	var recording = localStorage.recording ? localStorage.recording : 1;
	console.log("recording:"+recording);
	
	var distanceString;
	var unitString;
	
	var metricPixelFactor = 4999;
	var imperialPixelFactor = 127;

	var today = new Date();
	var todayAtMidnight = new Date(today.getFullYear(),today.getMonth(),(today.getDate()));
	var todayKey = todayAtMidnight.getTime();
	console.log("todayKey: "+todayKey);
	
	try {
		chrome.tabs.getSelected(null, function(tab) {
	  		chrome.tabs.sendMessage(tab.id, {greeting: "hello, content script"});
		});

		chrome.extension.onMessage.addListener(

			function(request, sender, sendResponse) {
				console.log("RECEIVED:"+request.totalScrolled);
				if(recording != 0) {
					totalScrolled += parseInt(request.totalScrolled);
					todayScrolled += parseInt(request.totalScrolled);
					$('#message').html(totalScrolled.toString() + " pixels scrolled");
					drawDistance();
					console.log(request);
					localStorage.totalScrolled = parseInt(totalScrolled);
					localStorage.setItem(todayKey,parseInt(todayScrolled));
					chrome.tabs.getSelected(null, function(tab) {
						chrome.tabs.sendMessage(tab.id, {distanceReceived: request.totalScrolled});
					});
				} else {
					chrome.tabs.getSelected(null, function(tab) {
						chrome.tabs.sendMessage(tab.id, {distanceReceived: request.totalScrolled});
					});
				}
			});
	} catch(e) {
		console.log(e);
	}


	if(recording == 0) {
		$('#playpause_button').toggleClass('playpause_button_statepause');
	}
	
	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
	var todayScrolled = parseInt(localStorage.getItem(todayKey) ? localStorage.getItem(todayKey) : 0); 
//	var yesterdayAtMidnight = new Date(today.getFullYear(),today.getMonth(),(today.getDate()));
//	var yesterdayKey = yesterdayAtMidnight.getTime();
//	var yesterdayScrolled =  parseInt(localStorage.getItem(yesterdayKey) ? localStorage.getItem(yesterdayKey) : 0); 
//	totalScrolled = 127800;
//	var todayScrolled = 600;
//	$('#message').html(totalScrolled + " pixels scrolled");
	console.log("Total scrolled from local storage: "+totalScrolled.toString());
	console.log("Today scrolled from local storage: "+todayScrolled.toString());
//	console.log("Yesterday scrolled from local storage: "+yesterdayScrolled.toString());
	
	
	
//	setup the context on page 1 for displaying the distance and reflection
	var ctx = document.getElementById("distancecanvas").getContext("2d");
	ctx.font = "100px BeBas";
	ctx.fillStyle = "White";
	var ctx2 = document.getElementById("distancecanvas_reflection").getContext("2d");
	ctx2.font = "100px BeBas";
	ctx2.fillStyle = "White";
	ctx2.scale(1, -1);

	var ctx3 = document.getElementById("distancecanvas_p3").getContext("2d");
	ctx3.font = "100px BeBas";
	ctx3.fillStyle = "White";
	var ctx4 = document.getElementById("distancecanvas_reflection_p3").getContext("2d");
	ctx4.font = "100px BeBas";
	ctx4.fillStyle = "White";
	ctx4.scale(1, -1);
	
	var gradient = ctx2.createLinearGradient( 0, -45, 0, 45); 
	gradient.addColorStop( 0, 'rgba( 255, 255, 255, 0 )' ); 
	gradient.addColorStop( 1, 'rgba( 255, 255, 255, 1.0 )' );
	
	ctx2.fillStyle = gradient; 
	ctx2.rect( 0, 0, ctx2.width, 45 ); 
	ctx2.fill();	
	
	ctx4.fillStyle = gradient; 
	ctx4.rect( 0, 0, ctx2.width, 45 ); 
	ctx4.fill();
	
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
			  statusText = encodeURIComponent("I've scrolled "+distanceString+" "+unitString+". ScrollKeeper is my new best friend");
		
		left = Math.round((winWidth / 2) - (width / 2));
		top = 0;

		if (winHeight > height) {
			top = Math.round((winHeight / 2) - (height / 2));
		}

		window.open('https://twitter.com/intent/tweet/?text='+statusText, 'intent', windowOptions + ',width=' + width +
			                                           ',height=' + height + ',left=' + left + ',top=' + top);
	});
	
	$("#page1_fb").click(function() {
		window.open('http://www.detderedb.dk/scrollkeeper_fb/post.php?distance='+distanceString+unitString);
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
		if(scale == "metric") {
			$('#config_1_1').removeClass('config_selected');
			$('#config_1_2').removeClass('config_unselected');
			$('#config_1_1').addClass('config_unselected');
			$('#config_1_2').addClass('config_selected');
			scale = "imperial";
		} else {
			$('#config_1_1').removeClass('config_unselected');
			$('#config_1_2').removeClass('config_selected');
			$('#config_1_1').addClass('config_selected');
			$('#config_1_2').addClass('config_unselected');
			scale = "metric";
		}
		
		localStorage.scale = scale;
		drawDistance();
	});
	
	$('#page_5_landmarks').click(function() {
		if(landmarks == 1) {
			$('#config_2_1').removeClass('config_selected');
			$('#config_2_2').removeClass('config_unselected');
			$('#config_2_1').addClass('config_unselected');
			$('#config_2_2').addClass('config_selected');
			landmarks = 0;
		} else {
			$('#config_2_1').removeClass('config_unselected');
			$('#config_2_2').removeClass('config_selected');
			$('#config_2_1').addClass('config_selected');
			$('#config_2_2').addClass('config_unselected');
			landmarks = 1;
		}
		
		localStorage.landmarks = landmarks;
	});
	
	$('#page_5_awesome').click(function() {
		if(awesomeness == 1) {
			$('#config_3_1').removeClass('config_selected');
			$('#config_3_2').removeClass('config_unselected');
			$('#config_3_1').addClass('config_unselected');
			$('#config_3_2').addClass('config_selected');
			awesomeness = 0;
		} else {
			$('#config_3_1').removeClass('config_unselected');
			$('#config_3_2').removeClass('config_selected');
			$('#config_3_1').addClass('config_selected');
			$('#config_3_2').addClass('config_unselected');
			awesomeness = 1;
		}
		
		localStorage.awesomeness = awesomeness;
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
		ctx3.clearRect ( 0 , 0 , 400 , 200 );
		ctx4.clearRect ( 0 , 0 , 400 , -200 );

//TODO: Account for settings, for now use meters. We're pretending there is roughly 4999px to a meter, which is like saying PI equals 3 and furthermore will vary wildly between devices. So shoot me ...

		var distanceTotal,distanceToday;

		if(scale == "metric") {
			distanceToday = (Math.round((todayScrolled / metricPixelFactor) * 100) / 100); 
			distanceTotal = (Math.round((totalScrolled / metricPixelFactor) * 100) / 100); 
			
		} else {
			distanceToday = (Math.round((todayScrolled / imperialPixelFactor) * 100) / 100); 
			distanceTotal = (Math.round((totalScrolled / imperialPixelFactor) * 100) / 100); 
		}
		
		console.log("distanceToday:"+distanceToday);
		console.log("distanceTotal:"+distanceTotal);
	
//		distance = 0.00;
//		distance = 0.01;
//		distance = 0.99;
//		distance = 1;
//		distance = 1.01;
//		distanceToday = 127;
//		distanceToday = 10.1;
//		distanceToday = 10.01;
//		distanceToday = 100.01;
//		distanceToday = 105.95;
//		distanceToday = 558.95;
//		distanceToday = 999.98;
//		distanceToday = 1200.01;
//		distanceToday = 9999.01;
//		distanceToday = 5050.99;
//		distanceToday = 1800000.99;
//		distanceToday = 9999000.01;
		

		if(scale == "metric") {
			distanceObjToday = getDistanceStringMetric(distanceToday);
			distanceObjTotal = getDistanceStringMetric(distanceTotal);
		} else {
			distanceObjToday = getDistanceStringImperial(distanceToday);
			distanceObjTotal = getDistanceStringImperial(distanceTotal);
		}
		
		console.log(distanceObjToday);


		if(distanceObjToday.distanceString.split('|').length > 1) {
			$('#page_1_unit').css({'left':'160px'});
			ctx.fillText(distanceObjToday.distanceString.split('|')[0], 45, 90);
			ctx2.fillText(distanceObjToday.distanceString.split('|')[0], 45, 0);
			ctx.fillText(distanceObjToday.distanceString.split('|')[1], 175, 90);
			ctx2.fillText(distanceObjToday.distanceString.split('|')[1], 175, 0);
		} else {
			$('#page_1_unit').css({'left':'275px'});
			ctx.fillText(distanceObjToday.distanceString, 45, 90);
			ctx2.fillText(distanceObjToday.distanceString, 45, 0);
		}

		if(distanceObjTotal.distanceString.split('|').length > 1) {
			$('#page_3_unit').css({'left':'160px'});
			ctx3.fillText(distanceObjTotal.distanceString.split('|')[0], 45, 90);
			ctx4.fillText(distanceObjTotal.distanceString.split('|')[0], 45, 0);
			ctx3.fillText(distanceObjTotal.distanceString.split('|')[1], 175, 90);
			ctx4.fillText(distanceObjTotal.distanceString.split('|')[1], 175, 0);
		} else {
			$('#page_3_unit').css({'left':'275px'});
			ctx3.fillText(distanceObjTotal.distanceString, 45, 90);
			ctx4.fillText(distanceObjTotal.distanceString, 45, 0);
		}

		$('#page_3_unit').html(distanceObjTotal.unitString);
		$('#page_1_unit').html(distanceObjToday.unitString);

	}
	
	function getDistanceStringImperial(distance) {
		var distanceString;
		var unitString;
		if(distance < 12) {
			//distance is in inches until and including 12in
			distanceString = formatDistanceInches(distance);
			unitString = "in";
		} else if(distance < 63360) {
			//distance is in m until and including 5280ft
			distanceString = formatDistanceFeet(distance);
			unitString = "ft";
		} else {
			//above 999999 distance is in Mm (1000km)
			distanceString = formatDistanceMiles(distance);
			unitString = "mi";
		}
		return {distanceString:distanceString,unitString:unitString};
	}
	
	function formatDistanceInches(distance) {
		var distInches = Math.round(distance);
		console.log("distInches: "+distInches);
		if(distInches< 10) {
			return "000"+distInches;
		} else {
			return "00"+distInches;
		}
	}
	
	function formatDistanceFeet(distance) {
		console.log("formatDistanceFeet distance: "+distance);
		var distFeet = Math.floor(distance/12);
		var distanceString;
		if(distFeet < 10) {
			distanceString = "0" + distFeet.toString();
			if(distance%12 == 0) {
				distanceString += "|00";
			} else if(distance%12 < 10) {
				distanceString += "|0"+Math.floor(distance%12);
			} else {
				distanceString += "|"+Math.floor(distance%12);
			}
		} else if(distFeet < 100) {
			distanceString = distFeet.toString();
			if(distance%12 == 0) {
				distanceString += "|00";
			} else if(distance%12 < 10) {
				distanceString += "|0"+Math.floor(distance%12);
			} else {
				distanceString += "|"+Math.floor(distance%12);
			}
		} else if(distFeet < 1000) {
			distanceString = "0"+distFeet.toString();
		} else {
			distanceString = distFeet.toString();
		}
		return distanceString;
	}
	
	function formatDistanceMiles(distance) {
		var distanceString;
		var distMiles = (Math.round((distance / 63360)*1000)/1000);
		if(distMiles < 10) {
			distanceString = distMiles.toString();
			if(decimalPlaces(distMiles) == 0) {
				distanceString += ".000";
			} else if(decimalPlaces(distMiles) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distMiles) == 2) {
				distanceString += "0";
			}
		} else if(distMiles < 100) {
			distMiles = (Math.round(distMiles * 100) / 100);
			distanceString = distMiles.toString();
			if(decimalPlaces(distMiles) == 0) {
				distanceString += ".00";
			} else if(decimalPlaces(distMiles) == 1) {
				distanceString += "0";
			}		
		} else {
			distMiles = (Math.round(distMiles * 10) / 10);
			distanceString = distMiles.toString();
			if(decimalPlaces(distMiles) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;
	}
	
	function getDistanceStringMetric(distance) {
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
		return {distanceString:distanceString,unitString:unitString};
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

