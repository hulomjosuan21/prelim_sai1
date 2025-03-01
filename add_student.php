<?php

include('db_connection.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$bday = $_POST['bday'];
$address = $_POST['address'];
$profile = $_POST['profile'];

$query = "INSERT INTO students_table (first_name, last_name, email, gender, course, birthdate, user_address, profile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$statement = $connection->prepare($query);
$res = $statement->execute([$first_name, $last_name, $email, $gender, $course, $bday, $address, $profile]);

if($res){
    echo json_encode(['status' => 200]);
}else{
    echo json_encode(['status' => 500]);
}