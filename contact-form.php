<?php
//require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputSubject']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputSubject']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    //$mail = new PHPMailer();

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
   // $mail->AddAddress('alanleonard001@gmail.com'); //recipient 
    $mail->Subject = $_POST['inputSubject'];
    $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    //if (isset($_POST['ref'])) {
       // $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    //}
 $sentmail = mail('alanleonard001@gmail.com',$_POST['inputSubject'],'Hi my name is King '. $_POST['inputName'] ."  ".$_POST['inputMessage'].' \n from: '.$_POST['inputEmail'],$headers,'-falanleonrd001@hotmail.com');
 
 
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
}