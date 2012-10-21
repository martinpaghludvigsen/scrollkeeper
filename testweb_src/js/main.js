$(function(){

	var ctx = document.getElementById("clockcanvas").getContext("2d");
	ctx.font = "60px Bebas";
	ctx.fillStyle = "White";
	var ctx2 = document.getElementById("clockcanvas_reflection").getContext("2d");
	ctx2.font = "60px Bebas";
	ctx2.fillStyle = "White";
	ctx2.scale(1, -1);
	
	var gradient = ctx2.createLinearGradient( 0, -30, 0, 30); 
	gradient.addColorStop( 0, 'rgba( 255, 255, 255, 0 )' ); 
	gradient.addColorStop( 1, 'rgba( 255, 255, 255, 1.0 )' );
	
	ctx2.fillStyle = gradient; 
	ctx2.rect( 0, 0, ctx2.width, 30 ); 
	ctx2.fill();
	


/*	try {
	   Typekit.load({
	     active: function() {
	       // Javascript to execute when fonts become active
	       startTimer();
	     }
	   })
	} catch(e) {
		console.log("Couldn't load text");
	}*/
	
	startTimer();


	function startTimer() {
		
		setInterval(drawTime, 1000);
	}
	
	function drawTime() {
//		console.log(this + "drawing sample text");
		
		ctx.clearRect ( 0 , 0 , 400 , 200 );
		ctx2.clearRect ( 0 , 0 , 400 , -200 );
		
		
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();

		if (hours < 10){
			hours = "0" + hours;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		
		var timeString = hours +":"+minutes + "."+seconds;
		
		ctx.fillText(timeString, 45, 150);
		
		ctx2.fillText(timeString, 45, 0);
		
		
	}


});