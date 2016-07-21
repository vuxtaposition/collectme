// some code snippets taken and modified from http://www.w3schools.com/googleapi/
var alanApp = angular.module('alanApp', ['ngRoute']);

var currentUser;




//alan controller
alanApp.controller('alanCtrl', function($scope, $http, $timeout,$location) {

    // object for locations
    var locations = [];
    var place;

// show hide butons and links
$('.hideLins').show();
$('.collectMeBtn').hide();
$('.collectMeBtn2').hide();

$scope.hidePopup = function(){
    $('.popup').hide();
  
 
}
$('#canclePickup').hide();
    //get json data to display on homepage
    $http.get('json/heading.json').success(function(data2) {
        $scope.heading = data2;
    });



    //location getter




    // hide map to start
    $('#mapWrappers').hide();
    $('#detailsPaneRight').hide();
    $('#mapWrappers2').hide();
    $('.popup').hide();


    // set variable for timeout  changable by user
    $scope.settime = 600000;

    $scope.nearbyPlaces = "aquarium";
    //login section
    $scope.user = {
        username: '',
        password: '',
        parents: ''
    };

   $scope.collectMeFunction = function(){
    $scope.login(1);
    //$location.path("/sentcollectme");
     $('#canclePickup').show();
     $('#collectMeBtn').hide();
      $('#mapWrappers3').hide();
     
    alert("You have asked to be collected");

   }
var counts = 0;
    //this is the main run function 
    place;
    $scope.login = function(x) {
   
   // hide directions map
$('#mapWrappers3').hide();


   
// check if directions button was pressed
   if(x == 5){
    $('#mapWrappers3').hide();
   }
    counts ++
   // alert(counts);
    
    if(counts== 1){
        $('#subButton').val(" Submit Coorinates");
    }
        if(counts== 2){
        $('#subButton').val(" Next");
    }
//remove duplicates from the list items
    $(".lists li").each(function() {
  if($('.lists li').length > 0){
    $(this).remove();
    }
});
// google get location function
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;

            });
        });
    }



     var    fromClick = x;

// redirect if collect me button is clicked!
     if(fromClick == 1){
        // alert("formclick = "+fromClick);
     }

      
        $scope.logHide = false;
        
        // test collect me button has been clicked
        console.log("from the click "+fromClick);

        // run the login settimeout funciton if logged in

        if ($scope.user.email) {

            $timeout($scope.login, $scope.settime);

        }
        //set variables of current login              
        var latt = $scope.position.coords.latitude;
        var longtit = $scope.position.coords.longitude;



        //check if parent

        $('#map').hide();
        $('#hideMePic').hide();
        $('.hideLins').hide();

        //check user on database using a php page
        var request = $http({
            method: "POST",
            url: "includes/login.php",
            data: {
                email: $scope.user.email,
                password: $scope.user.password,
                parents: $scope.user.parents

            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        //response from php               
        request.success(function(data) {
            $scope.loginData = data;
            console.log("parents form = " + $scope.user.parents);

            //check if the emails and passwords match                    
            for (var obj in data) {
                //check parent
                if (data[obj].email == $scope.user.email && data[obj].password == $scope.user.password && data[obj].parent == 1) {

                    console.log("parents database = " + data[obj].parent);
                    // show or hide map and forms
                    $('.form-auth').hide();
                    $('#mapWrappers').show();
                    $('#map').show();
                    $('#logout').show();
                    $('#detailsPaneRight').show();


                    // post message   

                    // do not submit chat if it is empty
                    if ($scope.user.msg != "") {



                        // showing the current users chat in the chat box
                        $('#msgBody p:first').prepend("<p style='color:#474747;'><span class='altEmailName'>Me: </span>" + $scope.user.msg + "</p>");
                    }
                    var chat = $http({
                        method: "POST",
                        url: "includes/chat.php",
                        data: {
                            email: data[obj].email,
                            altemail: data[obj].alt_email,
                            msg: $scope.user.msg

                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    chat.success(function(data) {
                        console.log("Chat has benn entered.." + data);
                    });


                    // chat back from child
                    var chatBack = $http({
                        method: "POST",
                        url: "includes/chatBack.php",
                        data: {
                            altemail: data[obj].alt_email,
                            email: data[obj].email
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    chatBack.success(function(data) {
                        // setting chat name                  


                        $scope.gotMessage = data;
                        $scope.user.msg = "";
                        //testing
                        console.log("This is all the data " + data[obj].msg);


                    });


                    // get childs positions from database

                    var request2 = $http({
                        method: "POST",
                        url: "includes/getChildsLocation.php",
                        data: {
                            email: data[obj].alt_email

                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    request2.success(function(data) {
                        $scope.childsCurrentLocation = data;
                        console.log("Got the childs location");
                        console.log(data);
                        var ind = 0
                        for (var c in $scope.childsCurrentLocation) {

                            //testing for results;
                            console.log("you got " + data[c].email);

                            //  http://www.gps-coordinates.net/

                            var latt = data[c].latitude;
                            var longtit = data[c].longitude;
                            var cm = data[c].colectme;
                            var geocoder = new google.maps.Geocoder();
                            var latLng = new google.maps.LatLng(latt, longtit);
                            var loc = [];

                            if (geocoder) {
                                geocoder.geocode({
                                    'latLng': latLng
                                }, function(results, status) {

                                    if (status == google.maps.GeocoderStatus.OK) {

                                        console.log(results[0].formatted_address);
                                        loc = results[0].formatted_address;

                                        //add a list item to display address as a string  of current login   

                                        //define current locations as text for GUI
                                        if (ind == 0) {
                                            ind = "Current location";
                                        } else if (ind == 1) {
                                            ind = "2nd last location";
                                        } else if (ind == 2) {
                                            ind = "3rd last location";
                                        } else {
                                            ind = ind;
                                        }

                                       $('.lists').append('<li>'+data[c].email + '<br><strong>Address </strong><span class="cross">' + ind + '</span>' + results[0].formatted_address +"<br>Collect: "+data[c].collectme +  '</li>');
                                        ind++;

                                        // hide span if it contains NaN as the text
                                        $('.cross').each(function() {
                                            if ($(this).text() == 'NaN') {
                                                $(this).hide();
                                            }
                                        });


                                    } else {
                                        console.log("Geocoding failed: " + status);
                                    }

                                });
                            }

                            var str = data[c].email;
                            str = str.substring(0, str.length - 9);
                            console.log("Can you collect me !"+data[c].collectme);
                            
//  the collect me pop up
                            if(data[c].collectme == 1){
                                alert("collect me is checked");

                                $('.popup').show();
                            }else{
                                //$('.popup').hide();
                            }
//send email to collect me!!!!!!
  
$http({
                method: 'POST',
                url: 'partials/collect-email.php',
                data: {
                            inputEmail: 'alanleonard001@gmail.com'
                          

                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                
            }).success(function(data) {
                console.log("CONTACT EMAIL ------"+data);

                });






                            locations.push({
                                place: str,
                                desc: data[c].email,
                                lat: data[c].latitude,
                                long: data[c].longitude,
                                icon: data[c].icon
                            });

                        }
                        // checking to see if I have results from positions table
                        for (var i = 0; i < locations.length; i++) {


                            console.log("Number " + i + " " + locations[i].lat);
                           
                        }


                        // draw map for parent  ************ *****************

                        //set variables of current login              
                        var latt = $scope.position.coords.latitude;
                        var longtit = $scope.position.coords.longitude;

                        // setting the currentuser
                        $('#mapWrappers').is(":visible"); {
                            $scope.currentUser = 1;

                            // Add users location to array


                            locations.push({
                                'place': 'Your Location',
                                'desc': 'You are Here!',
                                'lat': latt,
                                'long': longtit,
                                'icon': 'images/assets/me.png'
                            });

                                 
//w3schools
                            $scope.alanMap =new google.maps.LatLng(locations[0].lat, locations[0].long);
                            //load map
                            var mapOptions = {
                                zoom: 14,
                                center: $scope.alanMap,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }

                            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                     

    $scope.request = {
    location: $scope.alanMap,
    radius: '3000',
    types:  [$scope.nearbyPlaces]
  };

  service = new google.maps.places.PlacesService($scope.map);
  service.nearbySearch($scope.request, callback);


function callback(resulted, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < resulted.length; i++) {
          var place = resulted[i];
          console.log("Local place "+place.name);
                    
         console.log("local place "+place.geometry.location.lat());

    locations.push({
                    'place': place.name,
                    'desc': 'Location',
                    'lat': place.geometry.location.lat(),
                    'long': place.geometry.location.lng(),
                    'icon': 'images/nob.png'
                });

    console.log("new locations "+locations[i].place);

    createMarker(locations[i]);

        }
      }
    }



$scope.directions = function() {
                //DIRECTIONS MAP
               // alert("working");
                 $('#end').show();
                 $('#mapWrappers').fadeOut();
                $('#mapWrappers3').fadeIn();

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
       
       $scope.map3  = new google.maps.Map(document.getElementById('map3'), {
          zoom: 12,
          center: new google.maps.LatLng(latt, longtit)
        });
        directionsDisplay.setMap( $scope.map3 );

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        
        //alert("Before "+$scope.selectedPlace);
        
        // string replace to take off the lat and lang keys
        var moka = $scope.selectedPlace;
        var res = moka.replace('{"lat":'," ");
        var bes = res.replace("}"," ");
        var newDestination = bes.replace('"lng":'," ");
       
       // alert("After "+newDestination);

        
// main directions function form google directions
        directionsService.route({
          origin: new google.maps.LatLng(latt, longtit),
          destination: newDestination,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

   }

   





  
    






                            // helps the window to reload and display correctly
                            google.maps.event.trigger($scope.map, 'resize');
                            // set markers array
                            $scope.markers = [];


// draw line between points on map
                                
var first=new google.maps.LatLng(locations[0].lat, locations[0].long);
var second=new google.maps.LatLng(locations[1].lat, locations[1].long);
var third=new google.maps.LatLng(locations[2].lat, locations[2].long);         

                                    var myTrip=[first,second,third];
                                    var flightPath=new google.maps.Polyline({
                                      path:myTrip,
                                      strokeColor:"#0000FF",
                                      strokeOpacity:0.8,
                                      strokeWeight:2
                                      });

                                    flightPath.setMap( $scope.map);

                            var infoWindow = new google.maps.InfoWindow();
                            //create markers  

                            

                            var createMarker = function(info) {

                                var marker = new google.maps.Marker({
                                    map: $scope.map,
                                    position: new google.maps.LatLng(info.lat, info.long),
                                    title: info.place,
                                    icon: info.icon

                                });

                                marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long + ' N, </div>';
                                // add popups boxes to map                 
                                google.maps.event.addListener(marker, 'click', function() {
                                    infoWindow.setContent('<h2>' + marker.title + '</h2>' +
                                        marker.content);
                                    infoWindow.open($scope.map, marker);
                                });


                                $scope.markers.push(marker);

 
                            }

                            // only allow 4 objects in the array at any time
                            locations.slice(Math.max(locations.length - 5, 1));
                            // create array of city markers             
                            for (i = 0; i < locations.length; i++) {
                                //checking markers
                                console.log("locations " + locations[i].long);

                                createMarker(locations[i]);
                            }

                            locations = [];
                            




                            // click to open a window . Code taken from http://www.w3schools.com/googleapi/
                            $scope.openInfoWindow = function(e, selectedMarker) {
                                    e.preventDefault();
                                    google.maps.event.trigger(selectedMarker, 'click');
                                }
                                // trigger resize  google maps   (This is a fix for a bug)
                            google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                                google.maps.event.trigger(map, 'resize');
                            });

                        };


                        // end draw map for paret    ************ *****************

                    });



                    for (var i = 0; i < locations.length; i++) {
                        console.log(locations[i]);
                    }




                    // else if for login .... this is login for child
                } else if (data[obj].email == $scope.user.email && data[obj].password == $scope.user.password && data[obj].parent == 0) {
                 


                    //create child map
                    console.log("parents database = " + data[obj].parent);
                    $('#mapWrappers2').show();
                    $('#map2').show();
                    $('.form-auth').hide();
                    $('#detailsPaneRight').show();
                    $scope.runChildMap();


                    //insert childs location to the database
                    // do not submit chat if it is empty
                    if ($scope.user.msg != "") {

                        // showing the current users chat in the chat box
                        $('#msgBody p:first').prepend("<p style='color:#474747;'><span class='altEmailName'>Me: </span>" + $scope.user.msg + "</p>");
                    }
                    var chat = $http({
                        method: "POST",
                        url: "includes/chat.php",
                        data: {
                            email: data[obj].email,
                            altemail: data[obj].alt_email,
                            msg: $scope.user.msg

                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    chat.success(function(data) {
                        console.log("Chat has benn entered.." + data);
                    });


                    // chat back from child
                    var chatBack = $http({
                        method: "POST",
                        url: "includes/chatBack.php",
                        data: {
                            altemail: data[obj].alt_email,
                            email: data[obj].email
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    chatBack.success(function(data) {
                        // setting chat name                  


                        $scope.gotMessage = data;
                        $scope.user.msg = "";
                        //testing
                        console.log("This is all the data " + data[obj].msg);


                    });

                    // upload coodinates to database
                    var request = $http({
                        method: "POST",
                        url: "includes/childlocation.php",
                        data: {
                            latitude: latt,
                            longitude: longtit,
                            email: $scope.user.email,
                            parents: $scope.user.parents,
                            collectme:fromClick

                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    //response from php               
                    request.success(function(data) {
                        $scope.geoData = data;
                        console.log("childs position inserted");
                        console.log("OK " + data);



                    });

                } else {
                    $('.markers').hide();

                    $scope.error_message = 'Sorry please check your login details';
                }
            }
        });



        // second map for child view
        $scope.parents_lat = "";
        $scope.parents_long = "";
        $scope.locations = [];


        $scope.runChildMap = function() {


$('.collectMeBtn').show();

                var request = $http({
                    method: "POST",
                    url: "includes/userlocation.php",
                    data: {
                        latitude: latt,
                        longitude: longtit,
                        email: $scope.user.email

                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                //response from php               
                request.success(function(data) {
                    $scope.geoData = data;

                    //testing
                    console.log("updated");
                    console.log("OK " + data);



                });




                var request3 = $http({
                    method: "POST",
                    url: "includes/getParentLocation.php",
                    data: {
                        email: 'alanleonard001@gmail.com'

                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                request3.success(function(data, locations) {

                    console.log(" return   " + data, $scope.locations);

                    this.locations = $scope.locations;
                    for (var c in data) {

                        $scope.parents_lat = data[c].latitude;
                        $scope.parents_long = data[c].longitude;



                        console.log("Returning " + $scope.parents_lat + " " + $scope.parents_long);
                    }

                    $scope.locations.push({
                        'place': 'Your Parents',
                        'desc': 'Your parents locations!',
                        'lat': $scope.parents_lat,
                        'long': $scope.parents_long,
                        'icon': 'images/assets/me.png'
                    });



                });

                console.log("Can you see this value" + $scope.parents_lat);


                locations.push({
                    'place': 'Your Location',
                    'desc': 'You are Here!',
                    'lat': latt,
                    'long': longtit
                });




                for (var i = 0; i < locations.length; i++) {
                    console.log("Number " + i + " " + locations[i].lat);
                }
                //load map
                var mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(latt, longtit),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                $scope.map2 = new google.maps.Map(document.getElementById('map2'), mapOptions);
                $scope.alanMap =new google.maps.LatLng(locations[0].lat, locations[0].long);
                $scope.request = {
                    location: $scope.alanMap,
                    radius: '3000',
                    types:  [$scope.nearbyPlaces]
                  };

                  service = new google.maps.places.PlacesService($scope.map2);
                  service.nearbySearch($scope.request, callback);


                function callback(resulter, status) {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < resulter.length; i++) {
                      var place = resulter[i];
                      console.log("Local place "+place.name);
                     
                     console.log("local place "+place.geometry.location.lat());

                locations.push({
                                'place': place.name,
                                'desc': 'Location',
                                'lat': place.geometry.location.lat(),
                                'long': place.geometry.location.lng(),
                                'icon': 'images/nob.png'
                            });

                console.log("new locations "+locations[i].place);
                 

                createMarker(locations[i]);

                    }
                  }
                }

                
 $scope.directions = function() {
                //DIRECTIONS MAP
               // alert("working");
                 $('#end').show();
                 $('#mapWrappers2').fadeOut();
                $('#mapWrappers3').fadeIn();

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
       
       $scope.map3  = new google.maps.Map(document.getElementById('map3'), {
          zoom: 12,
          center: new google.maps.LatLng(latt, longtit)
        });
        directionsDisplay.setMap( $scope.map3 );

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        
        //alert("Before "+$scope.selectedPlace);
        
        // string replace to take off the lat and lang keys
        var moka = $scope.selectedPlace;
        var res = moka.replace('{"lat":'," ");
        var bes = res.replace("}"," ");
        var newDestination = bes.replace('"lng":'," ");
       
       // alert("After "+newDestination);

        
// main directions function form google directions
        directionsService.route({
          origin: new google.maps.LatLng(latt, longtit),
          destination: newDestination,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

   }
                google.maps.event.trigger($scope.map2, 'resize');
                // set markers array
                $scope.markers = [];

                var infoWindow = new google.maps.InfoWindow();
                //create markers              
                var createMarker = function(info) {

                        var marker = new google.maps.Marker({
                            map: $scope.map2,
                            position: new google.maps.LatLng(info.lat, info.long),
                            title: info.place

                        });
                        console.log("NO MARKER !!!!!");
                        marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long + ' N, </div>';
                        // add popups boxes to map                 
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.setContent('<h2>' + marker.title + '</h2>' +
                                marker.content);
                            infoWindow.open($scope.map2, marker);
                        });


                        $scope.markers.push(marker);


                    }
                    // create array of city markers             
                  // only allow 4 objects in the array at any time
                            locations.slice(Math.max(locations.length - 2, 1));
                            // create array of city markers             
                            for (i = 0; i < locations.length; i++) {
                                //checking markers
                                console.log("locations " + locations[i].long);

                                createMarker(locations[i]);
                            }

                            locations = [];

                $scope.openInfoWindow = function(e, selectedMarker) {
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    }
                    // trigger resize  google maps   (This is a fix for a bug)
                google.maps.event.addListenerOnce($scope.map2, 'idle', function() {
                    google.maps.event.trigger(map, 'resize');
                });


            } // end child map



        //set variables of current login              
        var latt = $scope.position.coords.latitude;
        var longtit = $scope.position.coords.longitude;



        //Get the address as a string of current login

        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(latt, longtit);
        var loc = [];
        if (geocoder) {
            geocoder.geocode({
                'latLng': latLng
            }, function(results, status) {

            /*    if (status == google.maps.GeocoderStatus.OK) {

                    console.log(results[0].formatted_address);
                    loc = results[0].formatted_address;

                    //add a list item to display address as a string  of current login   

                    $('.lists ').prepend('<li><span style="color:#474747;font-weight:bold;"> Your Location</span><br><strong>Address </strong>' + results[0].formatted_address + '</li>');

                } else {
                    console.log("Geocoding failed: " + status);
                }
*/
            });
        };



        // upload coodinates to database


    }


}); // end alan controller

// routers for page locations and destinations     
alanApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'alanCtrl',
            templateUrl: 'partials/mainpage.html'

        })
        .when('/about', {
            controller: 'alanCtrl',
            templateUrl: 'partials/about.html'
        })
        .when('/mainmap', {
            controller: 'MapController',
            templateUrl: 'partials/mainmap.php'
        })
        .when('/login', {
            controller: 'alanCtrl',
            templateUrl: 'partials/login.html'
        })
        .when('/register', {
            controller: 'registerCtrl',
            templateUrl: 'partials/register.html'
        })
        .when('/collect', {
            controller: 'customers',
            templateUrl: 'partials/collect.php'
        })
        .when('/contact', {
            controller: 'ContactController',
            templateUrl: 'partials/contact.html'
        })
        .when('/welcome', {
            controller: 'ContactController',
            templateUrl: 'partials/welcome.html'
        })
         .when('/sentcollectme', {
            controller: 'ContactController',
            templateUrl: 'partials/sentcollectme.html'
        })
          .when('/directionsmap', {
            controller: 'alanCtrl',
            templateUrl: 'partials/directionsmap.html'
        })
        .otherwise({
            redirectTo: '#/404.html'
        });
        
});




// get customers controller

alanApp.controller('customers', function($scope, $http) {
    //$scope.getdata = function(){
    var request = $http({
        method: "POST",
        url: "partials/getcustomers.php",
        data: {
            email: $scope.email,
            pass: $scope.password
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    console.log("partials/getcustomers.php?");
    request.success(function(data) {
        $scope.allCust = data;
    });
    //}
});


// register controller 

// end register controller

//Tabbs controller

/*    alantApp.controller('PanelController',function(){
      
    
      this.tab = 1;
      
      this.selectTab = function(setTab){
         this.tab = setTab;
      }
      
      this.isSelected = function(checkTab){
         return this.tab === checkTab;
      }
      
    }) ;
  */

// FOUND SOMP CODE HELPFUL - http://www.chaosm.net/blog/2014/05/21/angularjs-contact-form-with-bootstrap-and-phpmailer/
// contact controller
alanApp.controller('ContactController', function($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        console.log("stage1");
        if (contactform.$valid) {
            console.log("stage2");
            $http({
                method: 'POST',
                url: 'contact-form.php',
                data: $.param($scope.formData), //param method from jQuery
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } //set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {

                //testing
                console.log("stage3");
                console.log(data);
                // clear form
                $scope.formData.inputName = "";
                $scope.formData.inputEmail = "";
                $scope.formData.inputSubject = "";
                $scope.formData.inputMessage = "";
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result = 'bg-success';
                    console.log("stage4");
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result = 'bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Thank you';
            $scope.result = 'bg-danger';
        }
    }

});

alanApp.controller('registerCtrl', function($scope, $http, $location) {

    $scope.register = function() {

        var regis = $http({
            method: "POST",
            url: "includes/registration.php",

            // data from registration form
            data: {
                email: $scope.user.email,
                password: $scope.user.password,
                parent: $scope.user.pasparent,
                fname: $scope.user.fname,
                lname: $scope.user.lname,
                age: $scope.user.age,
                add1: $scope.user.add1,
                add2: $scope.user.add2,
                mobilenumber: $scope.user.mobilenumber,
                altemail: $scope.user.altemail
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


        regis.success(function(data) {
            //declare data
            $scope.registered = data;

            // testing      
            console.log("YOU HAVE REGISTERED......" + data);

            //redirect after register       
            $location.path("/welcome");

            //hide register button
            $('#regHide').hide();
        });


    }


});


