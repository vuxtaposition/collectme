<?php
include_once "../includes/myconnect3.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$lat = $request->latitude;
$long = $request->longitude;
$email = $request->email;
$parent = $request->parents;


        // query to display all the customers
       // $query = mysqli_query($link,"UPDATE customers SET latitude = $lat WHERE email = $email ");

	//MySqli Update Query
$results = $mysqli->query("INSERT INTO position (email, latitude, longitude, dateIn, parent,icon)
VALUES ('$email',$lat,$long,now(),$parent,'images/assets/minor.png')");

//MySqli Delete Query
//$results = $mysqli->query("DELETE FROM products WHERE ID=24");

if($results){
    print 'Success! record updated / deleted'; 
}else{
    print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
}     

?>

