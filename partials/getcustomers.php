<?php
include_once "../includes/myconnect2.php";


        // query to display all the customers
        $query = mysqli_query($link,"SELECT * FROM customers");
       // echo "".mysqli_num_rows($query);



            $return_arr = Array();
                while($row2 = mysqli_fetch_assoc($query)){
                   
                     
                     $return_arr[] = $row2;
            }

echo json_encode($return_arr);

      

?>