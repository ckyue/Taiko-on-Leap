<?php
header('Access-Control-Allow-Origin: *');

$name = $_FILES['file']['tmp_name'];

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        $s = "python ./beat_tracker.py " . $name . " " . "./result.csv";
        $command = escpaeshellcmd($s);
        shell_exec($command);
        echo 'arrived';
    }

//unlink($name);
?>
