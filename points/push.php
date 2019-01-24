<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
//require_once("/config.php");
require_once 'config.php';

// Escape user inputs for security
$house = mysqli_real_escape_string($link, $_REQUEST['house']);
$points = mysqli_real_escape_string($link, $_REQUEST['points']);
$add = mysqli_real_escape_string($link, $_REQUEST['add/sub']);
$inputter = mysqli_real_escape_string($link, $_REQUEST['inputter']);
$date = date("Y-m-d H:i:s");
echo $date;
if ($inputter == "Kerney") {
	$inputter = "Not Kerney";
}
if ($inputter == $secret) {
	$inputter = "Kerney";
}
// attempt insert query execution
$sql = "INSERT INTO points (points, addorsub, inputer, house, enterDate) VALUES ('$points', '$add', '$inputter', '$house', '$date')";
if(mysqli_query($link, $sql)){
	echo "Records added successfully.";
	header('Location: ./');
} else{
	echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
// close connection
//} else { echo "Push Failed! Please contact system admin";}
mysqli_close($link);
?>
