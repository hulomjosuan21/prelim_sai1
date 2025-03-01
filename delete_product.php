<?php

include('db_connection.php');

$query = "DELETE FROM students_table WHERE student_id = '".$_POST['student_id']."'";
$statement = $connection->prepare($query);
$res = $statement->execute();

if($res){
    echo json_encode(['status' => 200]);
}else{
    echo json_encode(['status' => 500]);
}