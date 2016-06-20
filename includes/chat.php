<?php
include_once "../includes/myconnect3.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$msg = $request->msg;
$altemail = $request->altemail;

  if($msg ==""){

    }else{
      //MySqli Update Query
    $results = $mysqli->query("INSERT INTO message (email, msg, alt_email, dateIn)
    VALUES ('$email','$msg','$altemail',now())");



      if($results){
          print 'Success! record updated / deleted'; 
      }else{
          print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
      }
       
  }
?>

