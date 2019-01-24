<?php
$link = mysqli_connect("localhost", "newPoint", "newPoints", "points2019");

// Check connection
if($link === false){
	die("ERROR: Could not connect. " . mysqli_connect_error());
}
$secret = "King Kerney";
?>
