<?php
include_once "../includes/myconnect2.php";


?>
<div class="container">
    <div id="login" ng-app='angular_post_demo' ng-controller='customers'>
     <br>
        <button class="btn btn-primary" ng-click="getdata()">click for more</button><br>
       
         <h3>Customers</h3>
         <div class="customersWrapper">

            
            <div class="customerBlock" ng-repeat=" x in allCust" >  
                <div class="custname">{{x.fname}} {{x.lname}}</div>
         
                <div class="imgdiv">
                    <img src="images/assets/profile.png" width="100" alt="profile"/>
                </div>
                <div class="address">
                    <h4>Address:</h4>
                {{x.add2}}<br> {{x.add2}}
                </div>
                <div class="status">
                    <h4>Address:</h4>
                <p ng-show="x.parent == 1">Parent</p>
                <p ng-show="x.parent == 0">Child</p>
                </div>    

         </div>
    </div>

</div>
