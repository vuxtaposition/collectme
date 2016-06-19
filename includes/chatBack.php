<?php
include_once "../includes/myconnect2.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$altemail = $request->altemail;


        // query to display all the customers
        $query = mysqli_query($link,"SELECT * FROM message WHERE email = '$altemail' ORDER BY dateIn DESC limit 10");
       $rows = mysqli_num_rows($query);

       if($rows > 1){

            $return_arr = Array();
                while($row2 = mysqli_fetch_assoc($query)){   

                  

                     $return_arr[] = $row2;
               
            }

	echo json_encode($return_arr); 
	}else{
echo "error, I got no data";
	}     

?>