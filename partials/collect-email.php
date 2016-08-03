<?php
include_once "../includes/myconnect3.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->inputEmail;
$locations = $request->locations;

echo $email;

$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=iso-8859-1";
$headers[] = "From: Collect Me! <alan@collectme.tigrimigri.com>";
$headers[] = "Bcc: JJ Chong <alan.collectme.tigrimigri.com";
$headers[] = "Reply-To: Recipient Name <alan@collectme.tigrimigri.com";
$headers[] = "Subject: collect me";
$headers[] = "X-Mailer: PHP/".phpversion();

$emails = mail($email, 'Can you collect me please at '.$locations , 'Collect me app by Alan Leonard', implode("\r\n", $headers));

if($emails){
    //echo "mail send";
}
 
/* 

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
   // $mail->AddAddress('alanleonard001@gmail.com'); //recipient 
    $mail->Subject = 'Will you collect me';
    $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . "Can you please collect me at";

  
 $sentmail = mail($_POST['alt_email'],'Collect me','Hi my name is  '. $_POST['inputName'] ."  ".$_POST['inputEmail']' \n from: ',$headers,'-falanleonrd001@hotmail.com');
 
 
    if(!$sentmail) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
} */

//echo "working";