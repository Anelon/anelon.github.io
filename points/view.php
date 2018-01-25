<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "point", "points", "points");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$num = 0; 
// Attempt select query execution
$sql = "SELECT * FROM points";
if($result = mysqli_query($link, $sql)){
  echo "<link rel='stylesheet' href='css/table.css'>";
	echo '<a href="../points" style="float:left;"><img src="home-512.png" style="height:70;">	</a>';
    if(mysqli_num_rows($result) > 0){
        echo "<table>";
            echo "<tr>";
                echo "<th>id</th>";
                echo "<th>points</th>";
                echo "<th>add or sub</th>";
                echo "<th>inputer</th>";
                echo "<th>house</th>";
                echo "<th>date</th>";
            echo "</tr>";
        while($row = mysqli_fetch_array($result)){
            echo "<tr id='" . $num . "'>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td id='point'>" . $row['points'] . "   </td>";
                echo "<td id='add'>" . $row['addorsub'] . "</td>";
                echo "<td>" . $row['inputer'] . "</td>";
                echo "<td id='house'>" . $row['house'] . "</td>";
                echo "<td>" . $row['enterDate'] . "</td>";
            echo "</tr>";
          $num++;
        }
        echo "</table>";
        // Free result set
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 
// Close connection
mysqli_close($link);
?>