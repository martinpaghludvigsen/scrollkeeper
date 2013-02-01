<?php

	$_distance = $_GET['distance'];


?>

<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="author" content="__MyCompanyName__">
		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" href="css/postform.css">
		
		<title>Share your ScrollKeeper distance on Facebook</title>
		
		<base href="./">
		
	</head>
	
	<body>
		<div id="mainbox">
			<form action="post.php" method="GET">
			<textarea id="comment" name="comment" maxlength="420" placeholder="Write your own comment here"></textarea>
			<div id="innerbox">
				<img src="scrollkeeper_fb_logo.png" alt="ScrollKeeper" height="114" width="114">
				<h1>ScrollKeeper</h1>
				<h2>scrollkeeper.org</h2>
				<p>{Your Name} has scrolled <?php echo $_distance?> today. ScrollKeeper is a free Chrome add-on that tracks how far you walk on the roads of the internet.</p>
			</div>
			<input type="hidden" name="distance" value="<?php echo $_distance?>">
			<input type="submit" value="Post to Facebook">	
			</form>
		</div>
	</body>

</html>