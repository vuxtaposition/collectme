<?php
include_once "../includes/myconnect3.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$fname = $request->fname;
$lname = $request->lname;
$email = $request->email;
$password = $request->password;
$age = $request->age;
$parent = $request->parents;
$mobileNumber = $request->mobileNumber;
$alt_email = $request->alt_email;
$add1 = $request->add1;
$add2 = $request->add2;


        // query to display all the customers
       // $query = mysqli_query($link,"UPDATE customers SET latitude = $lat WHERE email = $email ");

	//MySqli Update Query
$results = $mysqli->query("INSERT INTO customers (fname, lname, age, parent, password,email,mobileNumber,add1,add2,signup,alt_email)
VALUES ('$fname','$lname',$age,$parent,'$password,'$mobileNumber','$add1','add2',now(),'$alt_email')");



if($results){
    print 'Success! record updated / deleted'; 
}else{
    print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
}     

?>

