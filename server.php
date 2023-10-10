<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$currentTime = date('Y-m-d H:i:s');
$time_start = microtime(true);
$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];
$result = false;


if(($x>=0) && ($y>=0)){
    if(($x*$x + $y*$y)<= (0.5*$r*0.5*$r)) {
        $result=true;
    }
}
if($x<=0 && $y >= 0){
    if(($x<=$r) && ($y<=$r)) {
        $result=true;
    }
}
if(($x<=0) && ($y <=0)){
    if($y >= (-2*$x-$r)) {
        $result=true;
    }
}

if($result){
            $resultStr = "+15 social credits";
        }
        else{
            $resultStr="-30 social credits";
        }

$time_end = microtime(true);
$execution_time = $time_end - $time_start;
$result_total = [$x, $y,$r, $currentTime, $execution_time, $resultStr];
if(!$_SESSION['results']){
    $_SESSION['results']=array();
}
$_SESSION['results'][]=$result_total;

foreach ($_SESSION['results'] as &$result){
    echo "<tr>";
    echo "<td>" . $result[0] . "</td>";
    echo "<td>" . $result[1] . "</td>";
    echo "<td>" . $result[2] . "</td>";
    echo "<td>" . $result[3] . "</td>";
    echo "<td>" . $result[4] . "</td>";
    echo "<td>" . $result[5] . "</td>";
    echo "</tr>";

}


?>

