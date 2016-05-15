// display directions on map
function displayRoute(src, dest, mode) {
  directionsService.route({
    origin: src,
    destination: dest,
    travelMode: mode
  }, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK) {
      var directionRenderer = new google.maps.DirectionsRenderer({
        map: map,
        preserveViewport: true,
        suppressMarkers: true,
        suppressBicyclingLayer: true,
        directions: response
      });
    }
  });
}

function geocode(address, callback) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      callback(results[0].geometry.location);
    }
  });
}

function addMarker(address, condition, callback) {
  geocode(address, function(location) {
    if(condition(location)) {
      var marker = new google.maps.Marker({
        position: location,
        title: address
      });
    
      marker.setMap(map);
      markers.push(marker);
      if (callback) callback();
    }
  });
}

function fitBounds() {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i <  markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }
  map.fitBounds(bounds);
}