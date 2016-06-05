<?php
include_once "../includes/myconnect2.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$pass = $request->password;


        // query to display all the customers
        $query = mysqli_query($link,"SELECT * FROM customers WHERE email = '$email' ");
       $rows = mysqli_num_rows($query);

       if($rows == 1){

            $return_arr = Array();
                while($row2 = mysqli_fetch_assoc($query)){   

                     if($row2['password'] == $pass){

                     $return_arr[] = $row2;
                 }
            }

	echo json_encode($return_arr); 
	}else{
echo "error";
	}     

?>

