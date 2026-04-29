<?php

$in = 'themenpool.tsv';
$out= 'database.json';

$lines = file($in);

foreach($lines as $key =>$line)
{
    if($key==0) continue; // skip first line
    $line = trim($line);
    $a = explode("\t",$line);
    $subj = $a[2];

    $hash =  strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $subj));
    $data[$hash]['name'] = $subj;
    $data['subjects'][$hash] = $subj;

    for($i=1;$i<=18;$i++)
    {
        $ri = $i+2; //real index
        if($a[$ri]=='') continue;
        $data[$hash]['topics'][$i] = $a[$ri];
    }

}

ksort($data['subjects']);

file_put_contents($out,json_encode($data));