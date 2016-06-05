<?php 
// creating a connect page to make it easier to change host
$db_host = "mysql11.000webhost.com";

$db_username = "a3035841_alan"; 

$db_pass = "Noticeu2";

$db_name = "a3035841_test";

mysql_connect("$db_host","$db_username","$db_pass") or die('you have a problem connection '.mysql_error());

//slecting which database to use
mysql_select_db("$db_name") or die("no database by that name".msql_error());

echo 'happy coding';
?>



<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// creating a connect page to make it easier to change host
$user = 'root';
$password = 'root';
$db = 'collectme';
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