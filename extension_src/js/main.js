$(function() {

	//	console.log("Script ready");

	//	Config and data variables
	var scale = localStorage.scale ? localStorage.scale : "metric";
	//	console.log("scale: "+scale);
	if (scale == "imperial") {
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
	//	console.log("landmarks: "+landmarks);
	if (landmarks == 0) {
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
	//	console.log("awesomeness: "+awesomeness);
	if (awesomeness == 0) {
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
	//	console.log("recording:"+recording);
	var distanceString;
	var unitString;

	var metricPixelFactor = 5000;
	var imperialPixelFactor = 127;

	var today = new Date();
	var todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), (today.getDate()));
	var todayKey = todayAtMidnight.getTime();
	//	console.log("todayKey: "+todayKey);
	var landmarks = new Array();
	landmarks.push({
		distance: 143250,
		label: "Hey! Your first landmark. The length of a basketball court.",
		unlocked: false,
		distmetric: "28.65 meter",
		distimperial: "94 feet"
	});
	landmarks.push({
		distance: 232500,
		label: "You're getting good at this. You’ve scrolled the height of the Statue of Liberty.",
		unlocked: false,
		distmetric: "46.5 meter",
		distimperial: "152 feet 7 inches"
	});
	landmarks.push({
		distance: 274000,
		label: "Hurrey! You’ve scrolled the length of an average toilet paper roll.",
		unlocked: false,
		distmetric: "54.8 meter",
		distimperial: "180 feet"
	});
	landmarks.push({
		distance: 365000,
		label: "Yay! You just scrolled the length of the Great Sphinx in Giza!",
		unlocked: false,
		distmetric: "73 meter",
		distimperial: "240 feet"
	});
	landmarks.push({
		distance: 500000,
		label: "100 meters! Thats the exact length of a 100 metres sprint. Now do that bow and arrow pose!",
		unlocked: false,
		distmetric: "100 meter",
		distimperial: "328 feet"
	});
	landmarks.push({
		distance: 770000,
		label: "Presidential! You have scrolled all the way around the White House! ",
		unlocked: false,
		distmetric: "154 meter",
		distimperial: "505 feet"
	});
	landmarks.push({
		distance: 1100000,
		label: "You’ve crossed the Thames River in London. ",
		unlocked: false,
		distmetric: "220 meter",
		distimperial: "328 feet"
	});
	landmarks.push({
		distance: 1345000,
		label: "Wow, you've scrolled the length of the Titanic.",
		unlocked: false,
		distmetric: "269 meter",
		distimperial: "882 feet"
	});
	landmarks.push({
		distance: 1785000,
		label: "Hey! You’ve scrolled all the way to the highest floor of the Trump Tower",
		unlocked: false,
		distmetric: "357 meter",
		distimperial: "1171 feet"
	});
	landmarks.push({
		distance: 2620000,
		label: "You’ve scrolled all the way around the Colosseum. The whole perimeter.",
		unlocked: false,
		distmetric: "524 meter",
		distimperial: "1719 feet"
	});
	landmarks.push({
		distance: 3050000,
		label: "Now you scrolled the distance between the employment service and the liquor store in the small town of Karlstad in Sweden. A classic distance.",
		unlocked: false,
		distmetric: "610 meter",
		distimperial: "2,001 feet"
	});
	landmarks.push({
		distance: 3675000,
		label: "Doesn't scrolling make you hungry? Anyway, you've scrolled as long as the world's longest sandwich. ",
		unlocked: false,
		distmetric: "735 meter",
		distimperial: "2,411 feet 5 inches"
	});
	landmarks.push({
		distance: 6000000,
		label: "You’ve just scrolled the La Rambla in Barcelona. And you didn’t get pickpocketed.",
		unlocked: false,
		distmetric: "1,200 meter",
		distimperial: "3,937 feet"
	});
	landmarks.push({
		distance: 9125000,
		label: "Awesome! You’ve scrolled the Brooklyn Bridge! ",
		unlocked: false,
		distmetric: "1,825 meter",
		distimperial: "5,987 feet"
	});
	landmarks.push({
		distance: 13685000,
		label: "Your scrolling is GOLD! Now you’ve scrolled the length of the Golden Gate Bridge.",
		unlocked: false,
		distmetric: "2,737 meter",
		distimperial: "8,980 feet"
	});
	landmarks.push({
		distance: 24050000,
		label: "You’ve scrolled to the highest point of Europe, the top of Mont Blanc.",
		unlocked: false,
		distmetric: "4,810 meter",
		distimperial: "15,781 feet"
	});
	landmarks.push({
		distance: 44240000,
		label: "You've scrolled 8848 meters, that's the height of Mount Everest.",
		unlocked: false,
		distmetric: "8,848 meter",
		distimperial: "29,000 feet"
	});
	landmarks.push({
		distance: 108000000,
		label: "Awesome! You have scrolled all the way across Manhattan.",
		unlocked: false,
		distmetric: "21.6 km",
		distimperial: "13.4 miles"
	});
	landmarks.push({
		distance: 175000000,
		label: "You’ve scrolled the length of Sunset Boulevard. Now take off that Ed Hardy hat.",
		unlocked: false,
		distmetric: "35 km",
		distimperial: "22 miles"
	});
	landmarks.push({
		distance: 210975000,
		label: "Congrats! You've scrolled a full marathon. ",
		unlocked: false,
		distmetric: "42.195 km",
		distimperial: "26.22 miles"
	});
	landmarks.push({
		distance: 560000000,
		label: "Hey, you've scrolled a long long distance. To be exact, it equals the longest solo ocean swim ever.",
		unlocked: false,
		distmetric: "112 km",
		distimperial: "69.59 miles"
	});
	landmarks.push({
		distance: 775000000,
		label: "Du bist ein Berliner, you’ve just scrolled the length of the Berlin Wall.",
		unlocked: false,
		distmetric: "155 km",
		distimperial: "96 miles"
	});
	landmarks.push({
		distance: 1112250000,
		label: "The combined length of the swim, the bicycle ride and the marathon in an Ironman. Your parents should be proud.",
		unlocked: false,
		distmetric: "222.45 km",
		distimperial: "140.6 miles"
	});
	landmarks.push({
		distance: 2137000000,
		label: "Vegas baby, Vegas! You've scrolled the distance between Los Angeles and Las Vegas.",
		unlocked: false,
		distmetric: "427.4 km",
		distimperial: "265.6 miles"
	});
	landmarks.push({
		distance: 5525000000,
		label: "Hey, you've scrolled that's the distance between Paris and Rome.",
		unlocked: false,
		distmetric: "1105 km",
		distimperial: "686.6 miles"
	});
	landmarks.push({
		distance: 44260000000,
		label: "How long is the Great Wall of China? The same distance you just scrolled. Virtual high five!",
		unlocked: false,
		distmetric: "8852 km",
		distimperial: "5501 miles"
	});
	landmarks.push({
		distance: 200375000000,
		label: "OMG, you've scrolled the length of the equator.",
		unlocked: false,
		distmetric: "40075 km",
		distimperial: "24901 miles"
	});
	landmarks.push({
		distance: 1922015000000,
		label: "Hey, this is crazy but you've scrolled 384403 kilometres, that's the distance between earth and the moon. So call it, maybe.",
		unlocked: false,
		distmetric: "384403 km",
		distimperial: "238857 miles"
	});
	landmarks.push({
		distance: 5000000000000,
		label: "WE SALUTE YOU, LORD OF THE INTERNETZ.",
		unlocked: false,
		distmetric: "1000000 km",
		distimperial: "621371 miles"
	});



	try {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {
				greeting: "hello, content script"
			});
		});

		chrome.extension.onMessage.addListener(

		function(request, sender, sendResponse) {
			console.log("RECEIVED:" + request.totalScrolled);
			if (recording != 0) {
				totalScrolled += parseInt(request.totalScrolled);
				todayScrolled += parseInt(request.totalScrolled);
				$('#message').html(totalScrolled.toString() + " pixels scrolled");
				drawDistance();
				checkLandmarks(totalScrolled);
				console.log(request);
				localStorage.totalScrolled = parseInt(totalScrolled);
				localStorage.setItem(todayKey, parseInt(todayScrolled));
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendMessage(tab.id, {
						distanceReceived: request.totalScrolled
					});
				});
			} else {
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendMessage(tab.id, {
						distanceReceived: request.totalScrolled
					});
				});
			}
		});
	} catch (e) {
		console.log(e);
	}


	if (recording == 0) {
		$('#playpause_button').toggleClass('playpause_button_statepause');
	}

	var totalScrolled = parseInt(localStorage.totalScrolled ? localStorage.totalScrolled : 0);
	var todayScrolled = parseInt(localStorage.getItem(todayKey) ? localStorage.getItem(todayKey) : 0);
	//	var yesterdayAtMidnight = new Date(today.getFullYear(),today.getMonth(),(today.getDate()));
	//	var yesterdayKey = yesterdayAtMidnight.getTime();
	//	var yesterdayScrolled =  parseInt(localStorage.getItem(yesterdayKey) ? localStorage.getItem(yesterdayKey) : 0); 
	//	totalScrolled = 6250000;
	//	var todayScrolled = 600;
	//	console.log("Total scrolled from local storage: "+totalScrolled.toString());
	//	console.log("Today scrolled from local storage: "+todayScrolled.toString());
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

	var gradient = ctx2.createLinearGradient(0, -45, 0, 45);
	gradient.addColorStop(0, 'rgba( 255, 255, 255, 0 )');
	gradient.addColorStop(1, 'rgba( 255, 255, 255, 1.0 )');

	ctx2.fillStyle = gradient;
	ctx2.rect(0, 0, ctx2.width, 45);
	ctx2.fill();

	ctx4.fillStyle = gradient;
	ctx4.rect(0, 0, ctx2.width, 45);
	ctx4.fill();

	drawDistance();
	initLandmarks(totalScrolled);
	drawLandmarks();
	setTimeout(drawDistance, 500);


	//button handlers
	$('#navigation li a').click(function() {
		selectPage(this.id)
	});

	$("#page1_twitter").click(function() {

		var distanceShareOutput;

		if (distanceString.split('|').length > 1) {
			distanceShareOutput = distanceString.split('|')[0] + unitString + distanceString.split('|')[1];
		} else {
			distanceShareOutput = distanceString + " " + unitString;
		}

		distanceShareOutput = distanceShareOutput.replace(/^0+/, '');

		var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
			windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
			width = 550,
			height = 420,
			winHeight = screen.height,
			winWidth = screen.width,
			statusText = encodeURIComponent("I've scrolled " + distanceShareOutput + " today. ScrollKeeper is a free Chrome add-on that tracks how far you walk on the roads of the internet.");

		left = Math.round((winWidth / 2) - (width / 2));
		top = 50;

		if (winHeight > height) {
			top = Math.round((winHeight / 2) - (height / 2));
		}

		window.open('https://twitter.com/intent/tweet/?text=' + statusText, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
	});

	$("#page1_fb").click(function() {
		if (distanceString.split('|').length > 1) {
			distanceShareOutput = distanceString.split('|')[0] + unitString + distanceString.split('|')[1];
		} else {
			distanceShareOutput = distanceString + "" + unitString;
		}

		distanceShareOutput = distanceShareOutput.replace(/^0+/, '');


		var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
			width = 958,
			height = 650,
			winHeight = screen.height,
			winWidth = screen.width;

		var left = Math.round((winWidth / 2) - (width / 2));
		var top = 50;

		window.open('http://www.scrollkeeper.org/post_form.php?distance=' + distanceShareOutput, 'fb_share', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
	});

	$('#playpause_button').click(function() {
		$('#playpause_button').toggleClass('playpause_button_statepause');
		//Apparently booleans get converted to strings when stored in LocalStorage. Stupid JavaScript
		if (recording == 0) recording = 1;
		else recording = 0;
		localStorage.recording = recording;
	});

	$('#page_5_scale').click(function() {
		if (scale == "metric") {
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
		drawLandmarks();
	});

	$('#page_5_landmarks').click(function() {
		if (landmarks == 1) {
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
		if (awesomeness == 1) {
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
		$('#' + navId).removeClass('unselected');
		$('#' + navId).addClass('selected');

		//Get new page ID
		var newPageId = navId.replace("nav_", "page_");
		$('#pages > div').removeClass("selected");
		$('#pages > div').addClass("unselected");

		$('#' + newPageId).addClass("selected");
		$('#' + newPageId).removeClass("unselected");

	}

	function drawDistance() {
		//		console.log(this + "drawDistance, ppi is "+getPPI());
		ctx.clearRect(0, 0, 400, 200);
		ctx2.clearRect(0, 0, 400, -200);
		ctx3.clearRect(0, 0, 400, 200);
		ctx4.clearRect(0, 0, 400, -200);

		var distanceTotal, distanceToday;

		if (scale == "metric") {
			distanceToday = (Math.round((todayScrolled / metricPixelFactor) * 100) / 100);
			distanceTotal = (Math.round((totalScrolled / metricPixelFactor) * 100) / 100);

		} else {
			distanceToday = (Math.round((todayScrolled / imperialPixelFactor) * 100) / 100);
			distanceTotal = (Math.round((totalScrolled / imperialPixelFactor) * 100) / 100);
		}

		//		console.log("distanceToday:"+distanceToday);
		//		console.log("distanceTotal:"+distanceTotal);
		if (scale == "metric") {
			distanceObjToday = getDistanceStringMetric(distanceToday);
			distanceObjTotal = getDistanceStringMetric(distanceTotal);
		} else {
			distanceObjToday = getDistanceStringImperial(distanceToday);
			distanceObjTotal = getDistanceStringImperial(distanceTotal);
		}

		if (distanceObjToday.distanceString.split('|').length > 1) {
			$('#page_1_unit').css({
				'left': '160px'
			});
			ctx.fillText(distanceObjToday.distanceString.split('|')[0], 45, 90);
			ctx2.fillText(distanceObjToday.distanceString.split('|')[0], 45, 0);
			ctx.fillText(distanceObjToday.distanceString.split('|')[1], 175, 90);
			ctx2.fillText(distanceObjToday.distanceString.split('|')[1], 175, 0);
		} else {
			$('#page_1_unit').css({
				'left': '275px'
			});
			ctx.fillText(distanceObjToday.distanceString, 45, 90);
			ctx2.fillText(distanceObjToday.distanceString, 45, 0);
		}

		if (distanceObjTotal.distanceString.split('|').length > 1) {
			$('#page_3_unit').css({
				'left': '160px'
			});
			ctx3.fillText(distanceObjTotal.distanceString.split('|')[0], 45, 90);
			ctx4.fillText(distanceObjTotal.distanceString.split('|')[0], 45, 0);
			ctx3.fillText(distanceObjTotal.distanceString.split('|')[1], 175, 90);
			ctx4.fillText(distanceObjTotal.distanceString.split('|')[1], 175, 0);
		} else {
			$('#page_3_unit').css({
				'left': '275px'
			});
			ctx3.fillText(distanceObjTotal.distanceString, 45, 90);
			ctx4.fillText(distanceObjTotal.distanceString, 45, 0);
		}

		$('#page_3_unit').html(distanceObjTotal.unitString);
		$('#page_1_unit').html(distanceObjToday.unitString);

		distanceString = distanceObjToday.distanceString;
		unitString = distanceObjToday.unitString;
	}

	function getDistanceStringImperial(distance) {
		var distanceString;
		var unitString;
		if (distance < 12) {
			//distance is in inches until and including 12in
			distanceString = formatDistanceInches(distance);
			unitString = "in";
		} else if (distance < 63360) {
			//distance is in m until and including 5280ft
			distanceString = formatDistanceFeet(distance);
			unitString = "ft";
		} else {
			//above 999999 distance is in Mm (1000km)
			distanceString = formatDistanceMiles(distance);
			unitString = "mi";
		}
		return {
			distanceString: distanceString,
			unitString: unitString
		};
	}

	function formatDistanceInches(distance) {
		var distInches = Math.round(distance);
		//		console.log("distInches: "+distInches);
		if (distInches < 10) {
			return "000" + distInches;
		} else {
			return "00" + distInches;
		}
	}

	function formatDistanceFeet(distance) {
		//		console.log("formatDistanceFeet distance: "+distance);
		var distFeet = Math.floor(distance / 12);
		var distanceString;
		if (distFeet < 10) {
			distanceString = "0" + distFeet.toString();
			if (distance % 12 == 0) {
				distanceString += "|00";
			} else if (distance % 12 < 10) {
				distanceString += "|0" + Math.floor(distance % 12);
			} else {
				distanceString += "|" + Math.floor(distance % 12);
			}
		} else if (distFeet < 100) {
			distanceString = distFeet.toString();
			if (distance % 12 == 0) {
				distanceString += "|00";
			} else if (distance % 12 < 10) {
				distanceString += "|0" + Math.floor(distance % 12);
			} else {
				distanceString += "|" + Math.floor(distance % 12);
			}
		} else if (distFeet < 1000) {
			distanceString = "0" + distFeet.toString();
		} else {
			distanceString = distFeet.toString();
		}
		return distanceString;
	}

	function formatDistanceMiles(distance) {
		var distanceString;
		var distMiles = (Math.round((distance / 63360) * 1000) / 1000);
		if (distMiles < 10) {
			distanceString = distMiles.toString();
			if (decimalPlaces(distMiles) == 0) {
				distanceString += ".000";
			} else if (decimalPlaces(distMiles) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distMiles) == 2) {
				distanceString += "0";
			}
		} else if (distMiles < 100) {
			distMiles = (Math.round(distMiles * 100) / 100);
			distanceString = distMiles.toString();
			if (decimalPlaces(distMiles) == 0) {
				distanceString += ".00";
			} else if (decimalPlaces(distMiles) == 1) {
				distanceString += "0";
			}
		} else {
			distMiles = (Math.round(distMiles * 10) / 10);
			distanceString = distMiles.toString();
			if (decimalPlaces(distMiles) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;
	}

	function getDistanceStringMetric(distance) {
		var distanceString;
		var unitString;
		if (distance < 1) {
			//distance is in cm until and including 0.99m
			distanceString = formatDistanceCentimeters(distance);
			unitString = "cm";
		} else if (distance < 1000) {
			//distance is in m until and including 999m
			distanceString = formatDistanceMeters(distance);
			unitString = "m";
		} else if (distance < 1000000) {
			//distance is in km until and including 999999m
			distanceString = formatDistanceKilometers(distance);
			unitString = "km";
		} else {
			//above 999999 distance is in Mm (1000km)
			distanceString = formatDistanceMegameters(distance);
			unitString = "Mm";
		}
		return {
			distanceString: distanceString,
			unitString: unitString
		};
	}

	function formatDistanceCentimeters(distance) {
		distCm = Math.round(100 * distance);
		//		console.log("distCm: "+distCm);
		if (distCm < 10) {
			return "000" + distCm;
		} else {
			return "00" + distCm;
		}
	}

	function formatDistanceMeters(distance) {
		//		console.log("distance: "+distance);
		if (distance < 10) {
			distanceString = "0" + distance.toString();
			if (decimalPlaces(distance) == 0) {
				distanceString += ".00";
			} else if (decimalPlaces(distance) == 1) {
				distanceString += "0";
			}
		} else if (distance < 100) {
			distanceString = distance.toString();
			if (decimalPlaces(distance) == 0) {
				distanceString += ".00";
			} else if (decimalPlaces(distance) == 1) {
				distanceString += "0";
			}
		} else {
			distance = (Math.round(distance * 10) / 10);
			distanceString = distance.toString();
			if (decimalPlaces(distance) == 0 && distance < 1000) {
				distanceString += ".0";
			}
		}
		return distanceString;
	}

	function formatDistanceKilometers(distance) {
		distKm = Math.round((Math.round(distance) / 1000) * 1000) / 1000;
		//		console.log("distKm: "+distKm);
		var distanceString;
		if (distKm < 10) {
			distanceString = distKm.toString();
			if (decimalPlaces(distKm) == 0) {
				distanceString += ".000";
			} else if (decimalPlaces(distKm) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distKm) == 2) {
				distanceString += "0";
			}
		} else if (distKm < 100) {
			distKm = (Math.round(distKm * 100) / 100);
			distanceString = distKm.toString();
			if (decimalPlaces(distKm) == 0) {
				distanceString += ".00";
			} else if (decimalPlaces(distKm) == 1) {
				distanceString += "0";
			}
		} else {
			distKm = (Math.round(distKm * 10) / 10);
			distanceString = distKm.toString();
			if (decimalPlaces(distKm) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;

	}

	function formatDistanceMegameters(distance) {
		distMm = Math.round((Math.round(distance) / 1000000) * 1000) / 1000;
		//		console.log("distMm: "+distMm);
		var distanceString;
		if (distMm < 10) {
			distanceString = distMm.toString();
			if (decimalPlaces(distMm) == 0) {
				distanceString += ".000";
			} else if (decimalPlaces(distMm) == 1) {
				distanceString += "00";
			} else if (decimalPlaces(distMm) == 2) {
				distanceString += "0";
			}
		} else if (distMm < 100) {
			distMm = (Math.round(distMm * 100) / 100);
			distanceString = distMm.toString();
			if (decimalPlaces(distMm) == 0) {
				distanceString += ".00";
			} else if (decimalPlaces(distMm) == 1) {
				distanceString += "0";
			}
		} else {
			distMm = (Math.round(distMm * 10) / 10);
			distanceString = distMm.toString();
			if (decimalPlaces(distMm) == 0) {
				distanceString += ".0";
			}
		}
		return distanceString;

	}



	function decimalPlaces(num) {
		var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) {
			return 0;
		}
		return Math.max(
		0,
		// Number of digits right of decimal point.
		(match[1] ? match[1].length : 0)
		// Adjust for scientific notation.
		- (match[2] ? +match[2] : 0));
	}

	function getPPI() {
		// create an empty element
		var div = document.createElement("div");
		// give it an absolute size of one inch
		div.style.width = "1in";
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

	function initLandmarks(initialDistance) {
		//		console.log("initLandmarks at "+initialDistance + " pixels");
		var thisLandmark;
		for (var i = 0; i < landmarks.length; i++) {
			thisLandmark = landmarks[i];
			if (thisLandmark.distance < initialDistance) {
				thisLandmark.unlocked = true;
			}
		}
	}

	function checkLandmarks(distanceInPixels) {
		//		console.log("Checking landmarks at "+distanceInPixels + " pixels");
		var thisLandmark;
		var somethingChanged = false;
		for (var i = 0; i < landmarks.length; i++) {
			thisLandmark = landmarks[i];
			if (thisLandmark.distance < distanceInPixels && !thisLandmark.unlocked) {
				thisLandmark.unlocked = true;
				somethingChanged = true;
			}
		}

		if (somethingChanged) {
			drawLandmarks();
			//Bells and whistles, perhaps?
		}
	}

	function drawLandmarks() {
		var thisLandmark;
		var output = "";
		for (var i = landmarks.length - 1; i >= 0; i--) {
			thisLandmark = landmarks[i];
			if (thisLandmark.unlocked) {
				if (scale == "imperial") output += "<p>" + thisLandmark.label + " (" + thisLandmark.distimperial + ")</p>\n<p class=\"landmark_line\"></p>";
				else output += "<p>" + thisLandmark.label + " (" + thisLandmark.distmetric + ")</p>\n<p class=\"landmark_line\"></p>";

			}
		}
		//		console.log("OUTPUT IS:"+output);
		$('#landmark_container').html(output);
	}

});
