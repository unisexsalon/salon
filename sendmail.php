<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $phone   = $_POST['phone'];
    $package = $_POST['package'];

    // Admin email address
    $to = "youradminemail@gmail.com";   // <-- यहां अपनी email डालना

    $subject = "New Package Booking";
    $message = "You have received a new package booking:\n\n".
               "Name: $name\n".
               "Email: $email\n".
               "Phone: $phone\n".
               "Package: $package\n";

    $headers = "From: noreply@yourdomain.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Booking successful! Admin has been notified.";
    } else {
        echo "Error: Mail not sent. Please check your server settings.";
    }
}
?>
