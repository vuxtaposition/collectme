
      var alanApp = angular.module('alanApp', ['ngRoute']);
	  
   alanApp.controller('alanCtrl', function ($scope, $http){
        $http.get('json/display.json').success(function(data) {
          $scope.display = data;
		   $http.get('json/heading.json').success(function(data2) {
          $scope.heading = data2;
        });
	
      });
      });

	  		 
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
             .when('/collect', {
                controller: 'alanCtrl',
                templateUrl: 'partials/collect.php'
            })
			 .when('/contact', {
                controller: 'ContactController',
                templateUrl: 'partials/contact.html'
            })
            .otherwise({ redirectTo: '/404.html' });
    });



alanApp.controller('sign_up', function ($scope, $http) {

  $scope.getdata = function(){
    alert("working alan");

    document.getElementById("newData").textContent = "";

var request = $http({
    method: "POST",
    url: "partials/getcustomers.php",
    data: {
        email: $scope.email,
        pass: $scope.password
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
console.log("partials/getcustomers.php?");
/* Check whether the HTTP Request is successful or not. */
request.success(function (data) {
  var results = document.getElementById("newData")
    document.getElementById("newData").textContent = "You have login successfully my man with email "+data;
$scope.allCust = data;

/*$scope.name=allCust;    //keep this 
    results.innerHTML = "";
      for(var obj in data){
        results.innerHTML += data[obj].id+" is "+data[obj].fname+" and lives in "+data[obj].lname+"<hr />";
      }
      */
});

  }
/*
* This method will be called on click event of button.


  $scope.check_credentials = function () {

  document.getElementById("message").textContent = "";

    var request = $http({
        method: "POST",
        url: "http://collectme.comuf.com/php/login.php?",
        data: {
            email: $scope.email,
            pass: $scope.password
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  console.log("http://travelshareconnect.comli.com/login.php?");

  request.success(function (data) {
      document.getElementById("message").textContent = "You have login successfully my man with email "+data;
  });
  }    */
});

    	
	  
	  
	  
   

      
    
   
	  
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
	
	
	
	/*   alantApp.controller('CutCtrl2', function ($scope, $http, $routeParams){
        
		 $scope.review = {};
		 $scope.employeeName = $routeParams.employeeName;
		 $scope.staritems = [1,2,3,4,5];
		 $scope.selectedValue = "";
		 $scope.sortField = 'star';
		 $scope.reverse = true;
		 $scope.date = new Date();
		

		 $http.get('../json/employees.json').success(function(data) {
        
		 
		  $scope.emp = data.filter(function(entry){
			return entry.name == $scope.employeeName; 
		 })[0];
		  console.log(emp);
		 
        });
		$scope.submitForm = function(a,b,c) {
	 		 //alert("form submitted hello "+JSON.stringify($scope.emp.review));
			 // alert("New "+JSON.stringify(reviewForm));
			// alert("form data = "+a +b+c);
			  $scope.emp.review.push({"star":a,"body":b,"author":c,"date":$scope.date});
			//alert("done");
			$scope.review.author = "";
			$scope.review.piece = "";
			selectedValue = "";
			document.getElementById('select').value = "";
			
		}
	
	
      });*/

		
			

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


/*  form html

     <input type="text" size="40" ng-model="email"><br>
                <input type="password" size="40" ng-model="password"><br>
                <button ng-click="check_credentials()">Login</button><br>
                <span id="message"></span><br>
                <button class="btn btn-primary" ng-click="getdata()">click for more</button><br>
                 <span id="newData"></span><br><br>


                 php


                 
/*


        // query to display all the customers
        $query = mysqli_query($link,"SELECT * FROM customers");
        echo "hello mum ".mysqli_num_rows($query);


    

        while($row = mysqli_fetch_assoc($query)){
                $myid= $row['id'];
                echo "<div id='row'>";
                echo "<a href='driver_profile.php?id=$myid' ><img src='images/drivers/".$row['id'].".jpg' width='35' id='customerImage' height='48' alt='address_image'/></a> 
                ".$row['fname']." ".$row['lname']."<br><br><span class='cblack'> Number </span>"." ".$row['mobileNumber'].
                "<br><br><span class='cblack'>Email </span>"." ".$row['email']."<br><br><span class='cblack'>Address2 </span>"
                .$row['add2']."<br><br><span class='cblack'>Email </span>".$row['email']."<br><br><span class='cblack'>Mobile </span>".$row['mobileNumber']."<br><br><span class='cblack'>Id </span>".$row['id']."<br><br><span class='cblack'>Date joined   </span>".$row['signup'].
                "<br><br><span class='cblack'>Address </span>".$row['add1'].
                "<br><br><span class='cblack'>Amount </span>".$row['amount']."<br> ";
                echo "</div>";
        }

  */
*/








//header
  
     <header class="intro-header">
        <div class="row" style="text-align:center;">
            <img src="images/header.png" width="100%" />
        </div>
    </header> 
   
<br><br>

      <div class="container">
            <div class="col-md-4" ng-repeat="heads in heading"  >
                <div class="panel panel-default">
                    <div class="panel-heading" >
                        <h4><i class="{{heads.class}}"></i> {{heads.name}}</h4>
                    </div>
                    <div class="panel-body" style="text-align:center;">
                      
                       <a href="{{heads.href}}" > <img ng-src="{{heads.imagepic}}" alt="main image" width="70%"/></a>
                      
                    </div>
                </div>
            </div>
           
            
        
        <!-- /.row -->

       

        <!-- Features Section -->
        <div class="row">
         
            <div class="col-lg-12">
                <h2 class="page-header">Family Matters</h2>
            </div>
            <div class="col-md-6">
              bla
            </div>
            <div class="col-md-6">
           bla
            </div>
        </div>

        <!-- /.row -->
</div>
        <hr>

           
        <!-- /.row -->
         

        <hr>

        <!-- Footer -->
        <footer>
               <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Collect Me!</p>
                </div>
            </div>
        </div>
        </footer>

    </div>
    <!-- /.container -->
     <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Script to Activate the Carousel -->
