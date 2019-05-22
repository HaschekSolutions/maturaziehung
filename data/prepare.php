<?php 

$in = 'themenpool.csv';
$out= 'database.json';

$lines = file($in);

foreach($lines as $line)
{
    $line = trim($line);
    $a = explode(';',$line);
    if($a[0])
    {
        $subj = $a[0];
        //$hash = 't'.md5($subj);
        $hash =  strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $subj));
        $data[$hash]['name'] = $subj;
        $data['subjects'][$hash] = $subj;
    }
    $num = $a[2];
    $topic = $a[1];
    $data[$hash]['topics'][$num] = $topic;
}

ksort($data['subjects']);

file_put_contents($out,json_encode($data));