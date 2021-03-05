<?php
$conn=new PDO("mysql:host=localhost;dbname=dftitutorials;",
			"dftitutorials", "dftitutorials");
header("Content-type: application/json");

list($d,$m,$y) = explode("/",$_GET['date']);

$result=$conn->query("SELECT * FROM flights2 WHERE ".
			"destination='$_GET[destination]' AND the_date='$y-$m-$d'".
			" ORDER BY the_date,depart");

echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));

?>
