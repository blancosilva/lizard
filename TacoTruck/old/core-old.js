$(document).ready(function(){

		// Check for geoLocation Support
	if (navigator.geolocation) {
		// YES                                                      
		// snapshot of position: 
		//navigator.geolocation.getCurrentPosition(renderPosition, renderError);
		// updating position:
		//navigator.geolocation.watchPosition(offerData, renderError);
		navigator.geolocation.watchPosition(renderPosition, renderError);
		} else {
		// NO
		$('#geoResults').html('<p>Your browser does not support geolocation!</p>');
		}
		});

//jQuery to render the output
function renderPosition(position) {
	if (!window.count) window.count = 0;
	var urlJSON ='';
	count ++;
	var urlJSON = 'geonames.php?type=JSON&lat='+position.coords.latitude+'&lon='+position.coords.longitude;
	//var urlXML  = 'geonames.php?type=XML&lat=' +position.coords.latitude+'&lon='+position.coords.longitude;
	$('#d').html( '<div id="results" style="padding: 2px; width: 40%; text-align: left; border: 1px solid black; margin-left:auto; margin-right:auto;"><p>'
			+ 'Latitude: ' + position.coords.latitude + '<br />'
			+ 'Longitude: ' + position.coords.longitude + '<br />'
			+ 'Accuracy: ' + position.coords.accuracy + '<br />'
			+ 'Update number: ' + count + '<br />'
			+ 'Altitude: ' + position.coords.altitude + '<br />'
			+ 'Altitude accuracy: ' + position.coords.altitudeAccuracy + '<br />'
			+ 'Heading: ' + position.coords.heading + '<br />'
			+ 'Speed: ' + position.coords.speed + '</p></div>');
	$('#geomap').html( 
			'<iframe width="640" height="480" frameborder="2" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?q='
			+ position.coords.latitude + ',' + position.coords.longitude
			+ '&ie=UTF8&ll='
			+ position.coords.latitude + ',' + position.coords.longitude
			+ '&spn=0.034163,0.054846&z=14&output=embed"></iframe>'
			);
	// now get the XML reverse geo data
	$.getJSON(urlJSON, function(json) {
			/* Parse JSON objects */
			$.each(json.geonames,function(i,item) {
				// get the name - which is the suburb - and update the page
				// alert('name: ' + item.name);
				$.post("myScript.php", 
					"lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&area=" + item.name,
					function(data) {
					alert( "Data loaded: " + data);
					});
				$('#jsonResults').html('<p>Your current area is: ' + item.name + '</p>');
				});
			});
}


function renderError() {
	$('#georesults').html('<p>The page could not get your location.  Please, reload.</p>');
}
