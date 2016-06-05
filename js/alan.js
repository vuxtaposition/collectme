
var alanApp = angular.module('alanApp', ['ngRoute']);



   var locations = [
              {
                  place : 'College Green',
                  desc : 'A country of culture and tradition!',
                  lat :53.344316, 
                  long : -6.260109
              },
              {
                  place : 'Trinity College',
                  desc : 'College in Ireland',
                  lat :53.344066, 
                  long :-6.255989
              }
          ];
  
   
//alan controller
alanApp.controller('alanCtrl', function ($scope, $http){
  
      
		    $http.get('json/heading.json').success(function(data2) {
          $scope.heading = data2;
        });
	
       

//location getter
 
    if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
              $scope.position = position;
           
           
            });
          });
        }

//login section
  $scope.user = {username: '', password: ''};
//this is the main run function 
  $scope.login = function(){
  
  $('#map').hide();
//check user on database using a php page
          var request = $http({
                    method: "POST",
                    url: "includes/login.php",
                    data: {
                        email: $scope.user.email,
                        password: $scope.user.password
                        
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
              });

//response from php               
                request.success(function(data) {
                    $scope.loginData = data;
                       
                       //check if the emails match                    
                     for(var obj in data){

                        if(data[obj].email === $scope.user.email){
                          
                          console.log("Yes "+data[obj].password);
                          $('.form-auth').hide();
                         $('#map').show();
                         $('#logout').show();
                        }else{
                          
                          $scope.error_message = 'Sorry there is no email in our database like ' + $scope.user.email;                        
                        }
                     }         
                });


 //set variables               
var latt = $scope.position.coords.latitude;
var longtit = $scope.position.coords.longitude;


//Get the address as a string

 var geocoder = new google.maps.Geocoder();
   var latLng = new google.maps.LatLng(latt,longtit);

   if (geocoder) {
      geocoder.geocode({ 'latLng': latLng}, function (results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].formatted_address);
            var loc = results[0].formatted_address
            $('.lists ').append('<li><strong>Address</strong>'+results[0].formatted_address+'</li>');
         }
         else {
            console.log("Geocoding failed: " + status);
         }
      });
   }    




// upload coodinates to database
          var request = $http({
                    method: "POST",
                    url: "includes/userlocation.php",
                    data: {
                        latitude: latt,
                        longitude: longtit,
                        email:$scope.user.email
                        
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

//response from php               
                request.success(function(data) {
                    $scope.geoData = data;   
                    console.log("updated"); 
                  

                          console.log("OK "+data);

                    
                          
                });


// lodad google map if user logged in



// Add users location to array
              locations.push({
                'place' : 'Your Location',
                  'desc' : 'You are Here!',
                  'lat' :latt, 
                  'long' :longtit 
              });
//load map
              var mapOptions = {
                  zoom: 14,
                  center: new google.maps.LatLng(latt,longtit),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }
            
              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
           
// set markers array
              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
//create markers              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.place
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long +  ' N, </div>';
 // add popups boxes to map                 
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + 
                        marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
 // create array of city markers             
              for (i = 0; i < locations.length; i++){
                  createMarker(locations[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }


            };


    

   

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
                controller: 'authController',
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
            .otherwise({ redirectTo: '/404.html' });
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


/*

// map controller



          //Angular App Module and Controller
        
          alanApp.controller('MapController', function ($scope) {
              alert("alan");
              var mapOptions = {
                  zoom: 16,
                  center: new google.maps.LatLng(53.344066,-6.255989),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.place
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long +  ' N, </div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + 
                        marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (i = 0; i < locations.length; i++){
                  createMarker(locations[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

          });
*/

//Tabbs controller
	  
/*	  alantApp.controller('PanelController',function(){
		  
		
      this.tab = 1;
      
      this.selectTab = function(setTab){
         this.tab = setTab;
      }
      
      this.isSelected = function(checkTab){
         return this.tab === checkTab;
      }
      
    }) ;
	*/
	
	
// contact controller
alanApp.controller('ContactController', function ($scope, $http) {
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
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
				console.log("stage3");
                console.log(data);
				$scope.formData.inputName="";
				$scope.formData.inputEmail="";
				$scope.formData.inputSubject="";
				$scope.formData.inputMessage="";
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
					console.log("stage4");
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Thank you';
            $scope.result='bg-danger';
        }
    }
});