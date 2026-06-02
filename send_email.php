<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Get JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

// Extract and sanitize fields
$name = isset($data["Name"]) ? strip_tags(trim($data["Name"])) : "";
$email = isset($data["Email"]) ? filter_var(trim($data["Email"]), FILTER_SANITIZE_EMAIL) : "";
$phone = isset($data["Phone"]) ? strip_tags(trim($data["Phone"])) : "";
$preference = isset($data["Preference"]) ? strip_tags(trim($data["Preference"])) : "";
$support_area = isset($data["Support_Area"]) ? strip_tags(trim($data["Support_Area"])) : "";
$message = isset($data["Message"]) ? strip_tags(trim($data["Message"])) : "";

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please fill in all required fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address."]);
    exit;
}

// Recipient email
$to = "Jamysondylanvining@gmail.com, nissagan.s@gmail.com";

// Subject line
$subject = "New Website Inquiry from $name";

// Email message body
$email_body = "You have received a new contact inquiry from your website.\n\n";
$email_body .= "-----------------------------------------\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Preferred Contact Method: $preference\n";
$email_body .= "Area of Interest: $support_area\n";
$email_body .= "-----------------------------------------\n\n";
$email_body .= "Message:\n$message\n\n";
$email_body .= "-----------------------------------------\n";
$email_body .= "To reply to this person, simply click Reply in your email client.\n";

// Email headers
// To ensure the email isn't flagged as spam, we send it from the domain, but set Reply-To to the client's email
$from_email = "inquiry@jamesviningpsychotherapy.com";
$headers = "From: James Vining Psychotherapy <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(["success" => true, "message" => "Inquiry sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email. Please try again or call directly."]);
}
?>
