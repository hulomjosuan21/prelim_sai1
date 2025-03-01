<?php

include('db_connection.php');

try {
    $query = "SELECT * FROM students_table";
    $statement = $connection->prepare($query);
    $statement->execute();
    $products = $statement->fetchAll();

    if (empty($products)) {
        echo json_encode(['status' => 404, 'data' => null, 'errorMsg' => 'No students found']);
    } else {
        echo json_encode(['status' => 200, 'data' => $products, 'errorMsg' => null]);
    }
} catch (PDOException $th) {
    echo json_encode(['status' => 500, 'data' => null, 'errorMsg' => $th->getMessage()]);
}