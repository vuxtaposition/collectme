<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// creating a connect page to make it easier to change host
$user = 'collectme_alan';
$password = 'Dundalk20';
$db = 'collectme_alan';
$host = 'localhost';
$port = 3306;

$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);

//echo "happy coding alan..";

?>