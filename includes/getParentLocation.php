<?php
include_once "../includes/myconnect2.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;


        // query to display all the customers
        $query = mysqli_query($link,"SELECT * FROM position WHERE email = '$email' ORDER BY dateIn DESC limit 1 ");
       $rows = mysqli_num_rows($query);

       if($rows){

            $return_arr = Array();
                while($row2 = mysqli_fetch_assoc($query)){   

                  

                     $return_arr[] = $row2;
               
            }

	echo json_encode($return_arr); 
	}else{
echo "error, I got no data";
	}     

?>

