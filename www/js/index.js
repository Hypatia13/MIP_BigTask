/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

    }
};

// Initilize a Google Map
function initMap() {
    mapView = { lat: 37.7726, lng: -122.409 }; 
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapView,
        zoom: 8
    });

    var geocoder = new google.maps.Geocoder();
    document.getElementById('getCoord').addEventListener('click', function() {
            geoAddress(geocoder, map);
        });

}

function addMarkerToMap(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
}

function geoAddress(geocoder, map) {
    var addrInput = document.getElementById('addr').value;
    geocoder.geocode({ 'address': addrInput }, function(results, status) {
        if (status == 'OK') {

            map.setCenter(results[0].geometry.location);

      
			addMarkerToMap(results[0].geometry.location, map); 

        

			 coordInfo.innerHTML =
                'You want to be at ' + results[0].geometry.location.lat() +  ', ' + results[0].geometry.location.lng();

        } else {
            alert('Was unable to find it now');
        }
    });
}

function displayUserLoc() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showLocation);
	} else {
		document.getElementById("userInfo").innerHTML = "Couldn't find ya this time";
	}
}

function showLocation(position) {
	var userLatitude = position.coords.latitude;
    var userLongitude = position.coords.longitude;
    var userLocation = new google.maps.LatLng(userLatitude, userLongitude)
	document.getElementById("userInfo").innerHTML = 'You are currently at ' + userLatitude +  ', ' + userLongitude;
	map.setCenter(userLocation);
	addMarkerToMap(userLocation, map);
}

app.initialize();