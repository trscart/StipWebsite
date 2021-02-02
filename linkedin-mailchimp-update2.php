<?php

  function syncMailchimp() {
    $apiKey = '82ae7270cb9d3d28b7a37eb861deea2a-us7';
    $listId = 'be1d82b34f';

    $memberId = md5($_GET['email']);
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;

    $json = json_encode([
        'merge_fields'  => [
            'MMERGE4'     => $_GET['MMERGE4'],
            'MMERGE5'     => $_GET['MMERGE5'],
            'MMERGE6'     => $_GET['MMERGE6'],
            'MMERGE2'     => $_GET['MMERGE2'],
            'MMERGE3'     => $_GET['MMERGE3']
        ]
    ]);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $httpCode;
  }

  syncMailchimp()

?>