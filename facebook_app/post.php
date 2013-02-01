<?php 

	$app_id = "472573039450804";
	$app_secret = "004e50f9d702d99ec642359c8305efcb";
	$my_url = "http://www.scrollkeeper.org/post.php?distance=".$_GET['distance']."&comment=".urlencode($_GET['comment']);

	session_start();

	$_distance = $_GET['distance'];
	$_usercomment = $_GET['comment'];
	
	$code = $_REQUEST["code"];

   if(empty($code)) {
     $_SESSION['state'] = md5(uniqid(rand(), TRUE)); // CSRF protection
	$dialog_url = "https://www.facebook.com/dialog/oauth?client_id=" 
	       . $app_id . "&redirect_uri=" . urlencode($my_url) . "&state="
	       . $_SESSION['state'] . "&scope=publish_actions";

		echo("<script> top.location.href='" . $dialog_url . "'</script>");
		exit;
   	}

 	$token_url = "https://graph.facebook.com/oauth/access_token?"
	       . "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
	       . "&client_secret=" . $app_secret . "&code=" . $code;

     $response = file_get_contents($token_url);
     $params = null;
     parse_str($response, $params);

     $_SESSION['access_token'] = $params['access_token'];

     $graph_url = "https://graph.facebook.com/me?access_token=" 
       . $params['access_token'];

     $user = json_decode(file_get_contents($graph_url));
     //echo("Hello " . $user->name);
	 //echo("<br/>Your distance has been posted to your Facebook wall. Click <a href=\"http://www.facebook.com/profile.php?id=".$user->id."\">here</a> to see it");

	$url = 'https://graph.facebook.com/me/feed';

	$fields = array(
	            'message' => $_usercomment,
	            'picture' => 'http://www.scrollkeeper.org/scrollkeeper_fb_logo.png',
				'description' => $user->name.' has scrolled '.$_distance.' today. ScrollKeeper is a free Chrome add-on that tracks how far you walk on the roads of the internet.',
				'link' => 'http://www.scrollkeeper.org/',
	            'access_token' => $params['access_token']
	        );

	//url-ify the data for the POST
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	rtrim($fields_string, '&');

	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

	//execute post
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);

	echo("<script>window.close()</script>");
 ?>