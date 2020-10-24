<!DOCTYPE html>
<html>
<head>
<style type='text/css'>
body {
	font-family: 'Berlin Sans FB', Helvetica, Arial, sans-serif;
	background-color: #c0c0ff;
	color: black;
}

a {
	text-decoration: none;
}

#logodiv {
	text-align: center;
}

#main {
	font-size: 120%;
}
</style>
</head>

<body>
<div id='logodiv'>
<img src='httracks.png' alt='httracks.logo' />
</div>

<div id='main'>

<?php

if(!isset($_GET["artist"])) {
	echo "<p>You haven't told us what artist you want! Even us at HT-Tracks are not psychic! ;-)</p>";
} else {
$conn=new PDO("mysql: host=localhost; dbname=dftitutorials;",
		"dftitutorials", "dftitutorials");
$a = htmlentities($_GET["artist"]);
echo "<h1>Songs by $a available on HT-Tracks!</h1>";
echo "<p><strong>Your top music download service!</strong></p>";
$stmt = $conn->prepare("SELECT * FROM httracks WHERE artist LIKE ?");
$aa = "%$a%";
$stmt->bindParam (1, $aa);
$stmt->execute();
$found=false;
while($row = $stmt->fetch()) {
	$found=true;
	echo "<p>Title: $row[title]<br />Artist: $row[artist]<br />Released on: $row[day] $row[month] $row[year]<br />Chart: $row[chart]<br />";
}
if(!$found) {
	echo "<p>Sorry, even us at HT-Tracks don't know about $a!</p>";
}
}
?>

</div>
</body>
</html>
