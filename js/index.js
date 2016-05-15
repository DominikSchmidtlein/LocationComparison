var map;
var geocoder;
var distanceMatrix;
var directionsService;
var markers;

function initMap() {
  geocoder = new google.maps.Geocoder();
  distanceMatrix = new google.maps.DistanceMatrixService();
  directionsService = new google.maps.DirectionsService;
}

function setupMap() {
  var rows = document.getElementById('table-body').children;
  markers = [];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 8
  });

  for(var i = 0; i < rows.length; i++) {
    // get entries from table
    var source = rows[i].cells[0].children[0].value;
    var destination = rows[i].cells[1].children[0].value;
    var travelMode = rows[i].cells[2].children[0].value;
    var route = rows[i].cells[5].children[0].checked;

    configureRoute(i, source, destination, travelMode, route, fitBounds);
  }
}

function configureRoute(index, src, dest, mode, route, callback) {
  distanceMatrix.getDistanceMatrix({
    origins: [src],
    destinations: [dest],
    travelMode: mode
  }, function(response, status) {
    if (status == google.maps.DistanceMatrixStatus.OK) {

      var source = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      var distance = response.rows[0].elements[0].distance.text;
      var duration = response.rows[0].elements[0].duration.text;

      // update table
      populateRow(index, source, destination, mode, distance, duration);

      // add marker 
      addMarker(source, locationFree, callback);
      addMarker(destination, locationFree, callback);

      // add route if selected in table
      if(route) displayRoute(source, destination, mode);
    }
  });
}

function locationFree(location) {
  for (var i = 0; i < markers.length; i ++) {
    if(markers[i].getPosition() == location) {
      return false;
    }
  }
  return true;
}

// render map at the highest zoom where all markers are visible
function addRow() {
  var rowTemplate = document.getElementById("row-template");
  var tableBody = document.getElementById("table-body");
  var clone = document.importNode(rowTemplate.cloneNode(true).content, true);
  tableBody.appendChild(clone);
}

function populateRow(index, src, dest, trans, distance, duration) {
  var tableRow = document.getElementById("table-body").children[index];
  if(src) tableRow.children[0].children[0].value = src;
  if(dest) tableRow.children[1].children[0].value = dest;
  if(trans) tableRow.children[2].children[0].value = trans;
  if(distance) tableRow.children[3].innerHTML = distance;
  if(duration) tableRow.children[4].innerHTML = duration;
}