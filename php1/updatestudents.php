<?php
// updatelianxiren.php?id=4&shuxing=phone&zhi=321
$mysqli = new mysqli('localhost','root','','test');
$sql = "UPDATE `students` SET `xuehao` = '{$_GET['xuehao']}',`name` = '{$_GET['name']}',`sex` = '{$_GET['sex']}',`age` = '{$_GET['age']}',`jiguan` = '{$_GET['jiguan']}' WHERE `id` = '{$_GET['id']}'";
$mysqli -> query($sql);
echo 'success';
?>