// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
        if (navigator.network.connection.type == Connection.NONE) {
            alert("No internet connection - we won't be able to show you any maps");
        } else {
            alert("We can reach Google - get ready for some awesome maps!");
        }
    })();
    
    // a little inline controller
    when('#welcome');
    when('#settings', function() {
		// load settings from store and make sure we persist radio buttons.
		store.get('config', function(saved) {
			if (saved) {
				if (saved.map) {
					x$('input[value=' + saved.map + ']').attr('checked',true);
				}
				if (saved.zoom) {
					x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
				}
			}
		});
	});
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            }, function () {
                x$('img#static_map').attr('src', "assets/img/gpsfailed.png");
            });
        });
    });
    when('#save', function () {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
	 when('#videos', function (input) {
        display('#videos');
    });
	 when('#play_video', function (input) {
		console.log(input, 'video player');
		 x$('#video_player').attr('src', "http://www.youtube.com/embed/AxsjRmN9syc");
        display('#play_video');
    });
	 when('#gmap', function () {
		console.log('initialising Gmap2');
		  var mapDiv = document.getElementById('map_canvas');
			console.log(mapDiv, 'loading gmap into div');
		  var map = new google.maps.Map(mapDiv, {
			center: new google.maps.LatLng(37.4419, -122.1419),
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });
			console.log(mapDiv, 'loaded Gmap?');
		console.log(input, 'gmap');
        display('#gmap');
    });

});

	function initializeGmap() {
			console.log(script, 'initialising Gmap2');
		  var mapDiv = document.getElementById('map_canvas');
		  var map = new google.maps.Map(mapDiv, {
			center: new google.maps.LatLng(37.4419, -122.1419),
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });
			console.log(map, 'loaded Gmap?');
		}
