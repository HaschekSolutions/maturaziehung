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
        $hash = 't'.md5($subj);
        $data[$hash]['name'] = $subj;
        $data['subjects'][$hash] = $subj;
    }
    $num = $a[2];
    $topic = $a[1];
    $data[$hash]['topics'][$num] = $topic;
}

file_put_contents($out,json_encode($data));