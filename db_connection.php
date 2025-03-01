<?php

$server_name = "localhost";
$username = "root";
$password = "";
$database = "prelim_db";

try {
    $connection = new PDO("mysql:host=$server_name;dbname=$database", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $th) {
    die(json_encode(['error' => "Database connection failed".$th->getMessage()]));
}