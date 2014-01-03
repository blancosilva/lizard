<?php
$location = $_POST['lat'].",".$_POST['long'];

$JSstr ="$(document).ready(function(){ 
if (navigator.geolocation) {
	navigator.geolocation.watchPosition(renderPosition, renderError); 
} else { 
	$('#georesults').html('<p>Your browser does not support geolocation.</p>'); 
}
}); 

function renderPosition(position) { 

	if (!window.count) window.count = 0;
	count++;
	$('#d').html( '<div id=\"results\" style=\"text-align:center;\"><h3>Directions</h3><p>'
			+ '<iframe width=\"640\" height=\"480\" frameborder=\"1\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"http://maps.google.com/maps?daddr=";
			$JSstr .= $location;
			$JSstr .= "&saddr='
			+ position.coords.latitude + ',' + position.coords.longitude
			";
			$JSstr .= "+ '&output=embed&doflg=ptm\"></iframe><br /><a href=\"http://maps.google.com/maps?daddr=".$location;
			$JSstr .= "&saddr='
			+ position.coords.latitude + ',' + position.coords.longitude
			";
			$JSstr .= "+ '&source=embed&doflg=ptm\" style=\"color:#0000FF;text-align:left\">Go to your navigation app</a></p></div>'
		    );
}

";
$JSstr .= "function renderError() { 
$('#georesults').html('<p>The page could not get your location.</p>'); 
}
";
$fh = fopen('coreReceiver.js','w');
fwrite($fh, $JSstr);
fclose($fh);

$str = "<html>
<head>
<script src=\"jquery-1.6.1.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>
<script src=\"coreReceiver.js\" type=\"text/javascript\" charset=\"utf-8\"></script>
";
$str .= "</head>
";
$str .= "<body>
<h2 style=\"text-align:center;\">The Taco Truck is now in...</h2>
<h1 style=\"text-align:center;\">";
$str .= $_POST['area']."</h1>
";
$str .= "<p style=\"text-align:center;\">
<iframe width=\"640\" height=\"480\" frameborder=\"1\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"http://maps.google.com/maps?q=";
$str .= $location;
$str .= "&amp;ie=UTF8&amp;ll=";
$str .= $location;
$str .= "&amp;spn=0.034163,0.054846&amp;z=14&amp;output=embed\"></iframe>
";
$str .= "<div id=\"georesults\">
<div id=\"d\"><br/></div>
</div>
";
$str .= "</body>
</html>";
$fh = fopen('index.html','w');
fwrite($fh,$str);
fclose($fh);
?>
