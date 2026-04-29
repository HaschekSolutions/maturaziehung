<?php

$in = 'themenpools.tsv';
$out= 'database.json';

$lines = file($in);

foreach($lines as $key=>$line)
{
    $line = trim($line);
    $a = explode("\t",$line);

    if($key == 0) continue; // skip header (first line)

    array_shift($a); // remove first column (timeslot)
    array_shift($a); // remove second column (email addres)
    $subj = array_shift($a); // remove third column (subject/teacher)
    $hash =  strtolower(preg_replace("/[^A-Za-z0-9]/", '', $subj));
    $data[$hash]['name'] = $subj;
    $data['subjects'][$hash] = $subj;

    foreach($a as $key=>$topic)
    {
        if(startsWith($topic, ($key+1).'. ')) $topic = substr($topic, 3); // remove number prefix (e.g. "1. "
        $data[$hash]['topics'][($key+1)] = trim($topic);
    }
    
    
    // if($a[0])
    // {
    //     $subj = $a[0];
    //     //$hash = 't'.md5($subj);
    //     $hash =  strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $subj));
    //     $data[$hash]['name'] = $subj;
    //     $data['subjects'][$hash] = $subj;
    // }
    // $num = $a[2];
    // $topic = $a[1];
    // $data[$hash]['topics'][$num] = $topic;
}

ksort($data['subjects']);

file_put_contents($out,json_encode($data, JSON_PRETTY_PRINT));


function startsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}
function endsWith( $haystack, $needle ) {
   $length = strlen( $needle );
   if( !$length ) {
       return true;
   }
   return substr( $haystack, -$length ) === $needle;
}