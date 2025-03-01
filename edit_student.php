<?php

include('db_connection.php');

$student_id = $_POST['student_id'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$bday = $_POST['bday'];
$address = $_POST['address'];
$profile = $_POST['profile'];

$query = "UPDATE students_table 
          SET first_name = ?, last_name = ?, email = ?, gender = ?, course = ?, birthdate = ?, user_address = ?, profile = ? 
          WHERE id = ?";

$statement = $connection->prepare($query);
$res = $statement->execute([$first_name, $last_name, $email, $gender, $course, $bday, $address, $profile, $student_id]);

if ($res) {
    echo json_encode(['status' => 200, 'message' => 'Student updated successfully']);
} else {
    echo json_encode(['status' => 500, 'message' => 'Error updating student']);
}