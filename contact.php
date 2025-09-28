<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

// Database connection
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "kavvalieri_gamers";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form values (sanitize)
$name    = htmlspecialchars($_POST['name']);
$email   = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Save to database
$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {

  // ✅ Send Email using PHPMailer
  $mail = new PHPMailer(true);

  try {
      // Server settings
      $mail->isSMTP();
      $mail->Host       = 'smtp.gmail.com';   // Gmail SMTP server
      $mail->SMTPAuth   = true;
      $mail->Username   = 'kuromipd480@gmail.com'; // your Gmail
      $mail->Password   = 'manga7358';   // Gmail App Password
      $mail->SMTPSecure = 'tls';
      $mail->Port       = 587;

      // Recipients
      $mail->setFrom('kuromipd480@gmail.com', 'Kavvalieri Gamers');
      $mail->addAddress('kuromipd480@gmail.com'); // send to yourself
      $mail->addReplyTo($email, $name);

      // Content
      $mail->isHTML(false);
      $mail->Subject = 'New Contact Form Submission';
      $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

      $mail->send();
      echo "Thank you, your message has been saved and emailed!";
  } catch (Exception $e) {
      echo "Message saved, but email could not be sent. Error: {$mail->ErrorInfo}";
  }

} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
