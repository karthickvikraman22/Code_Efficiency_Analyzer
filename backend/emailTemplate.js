const verificationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: black;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            height: 30px;
            background-color: #22c55e;
            color: black;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 18px;
        }
        .email-body {
            padding: 20px;
            color: white;
        }
        .email-body p {
            font-size: 14px;
            line-height: 1.5;
        }
        .verification-code {
            width: 120px;
            height: 50px; 
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            margin: 20px auto; 
            padding: 10px;
            background-color: #f4f4f4;
            border-radius: 8px;
            color: #22c55e;
        }
        .email-footer {
            height: 50px; 
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            color: black;
            font-size: 12px;
        }
        .verify-instructions {
            text-align: center;
            margin-top: 20px;
        }
        a {
            color: #22c55e;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .small-text {
            font-size: 13px; 
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Verify Your Email Address</h1>
        </div>

        <div class="email-body">
            <p>Hello,</p>
            <p>Thank you for signing up! To complete your registration, please use the following 4-digit verification code:</p>

            <div class="verification-code">
                verificationCode
            </div>

            <p class="verify-instructions">Enter this code on the verification page to confirm your email address.</p>

            <p class="small-text">If you did not create an account, you can safely ignore this email.</p>
        </div>

        <div class="email-footer">
            <p>If you have any questions, feel free to <a href="mailto:vikramkarthick5@gmail.com">contact our support team</a>.</p>
            <p style={margin-bottom:5px;}>&copy; 2025 CEA. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = verificationEmail;