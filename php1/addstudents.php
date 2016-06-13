<?php
$mysqli = new mysqli('localhost','root','','test');
$sql = "INSERT INTO `students` (`xuehao`,`name`,`sex`,`age`,`jiguan`) VALUES ('{$_GET['xuehao']}','{$_GET['name']}','{$_GET['sex']}','{$_GET['age']}','{$_GET['jiguan']}')";
$mysqli -> query($sql);
echo $mysqli->insert_id;
?>
