<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: index.html");
    exit;
}

// Configuration
$to = "contacto@peoplecode.es";
$subject_prefix = "[Web Contact] ";

// Sanitize inputs
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Basic Validation
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.html?status=error&msg=invalid_input");
    exit;
}

// Construct Email
$subject = $subject_prefix . ($company ? "$name ($company)" : $name);

$email_content = "Name: $name\n";
if ($company) {
    $email_content .= "Company: $company\n";
}
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send Email
if (mail($to, $subject, $email_content, $headers)) {
    header("Location: index.html?status=success");
} else {
    header("Location: index.html?status=error&msg=server_error");
}
?>
