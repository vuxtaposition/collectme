<?php
//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','collectme_alan','Dundalk20','collectme_alan');

//Output any connection error
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}

?>
