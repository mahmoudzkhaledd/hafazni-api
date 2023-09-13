exports.htmlEmailPage = function (user, digits) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account - Action Required</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                color: #007BFF;
                text-align: center;
            }
            .verification-code {
                background-color: #007BFF;
                color: #fff;
                font-size: 24px;
                text-align: center;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 20px auto;
                max-width: 200px;
            }
            .instructions {
                text-align: center;
                margin-bottom: 30px;
            }
            .support {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
            }
            .support a {
                color: #007BFF;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <h1>Verify Your Account - Action Required</h1>
        <p>Dear ${user},</p>
        <p>Thank you for choosing our app! To ensure the security of your account, we require a quick verification process. Please follow the instructions below to complete the verification:</p>
        <div class="verification-code">${digits}</div>
        <p class="instructions">Please enter the above 6-digit code in the app when prompted.</p>
        <p>Please note that this code will expire after 15 minutes. If you do not attempt verification within this time frame, you may need to request a new code.</p>
        <p>If you didn't initiate this verification process, please disregard this email. Your account may have been registered with an incorrect email address.</p>
    </body>
    </html>
    `;
}