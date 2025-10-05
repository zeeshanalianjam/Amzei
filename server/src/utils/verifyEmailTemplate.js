const verifyEmailTemplate = ({ name, url, id, otp, otpExpiryTime }) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password -  Amzei</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #fb923c, #f97316);
            padding: 30px;
            text-align: center;
            color: white;
          }
          
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          
          .tagline {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
          }
          
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
          }
          
          .otp-container {
            background-color: #fff7ed;
            border: 2px dashed #fb923c;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 30px 0;
          }
          
          .otp-label {
            font-size: 14px;
            color: #9a3412;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
          }
          
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #ea580c;
            letter-spacing: 8px;
            margin: 15px 0;
          }
          
          .validity {
            font-size: 14px;
            color: #666;
          }
          
          .instructions {
            background-color: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 15px 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          
          .instructions-title {
            font-weight: 600;
            color: #166534;
            margin-bottom: 8px;
          }
          
          .instructions-list {
            color: #166534;
            padding-left: 20px;
          }
          
          .instructions-list li {
            margin-bottom: 5px;
          }
          
          .cta {
            text-align: center;
            margin: 30px 0;
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #fb923c, #f97316);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(251, 146, 60, 0.3);
          }
          
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eee;
          }
          
          .footer-text {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
          }
          
          .contact {
            font-size: 14px;
            color: #666;
          }
          
          .developer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            font-style: italic;
          }
          
          .social-links {
            margin: 20px 0;
          }
          
          .social-links a {
            display: inline-block;
            width: 32px;
            height: 32px;
            background-color: #f0f0f0;
            border-radius: 50%;
            text-align: center;
            line-height: 32px;
            margin: 0 5px;
            color: #666;
            text-decoration: none;
          }
          
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
              border-radius: 0;
            }
            
            .header {
              padding: 20px;
            }
            
            .content {
              padding: 20px;
            }
            
            .otp-code {
              font-size: 28px;
              letter-spacing: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">AMZEI - UAE TOURS</div>
            <div class="tagline">Discover the Magic of Dubai & Emirates</div>
          </div>
          
          <div class="content">
            <h1 class="greeting">Dear ${name},</h1>
            <p class="message">We received a request to reset your password for your Amzei account. Use the OTP below to set a new password:</p>
            
            <div class="otp-container">
              <div class="otp-label">One-Time Password</div>
              <div class="otp-code">${otp}</div>
              <div class="validity">This OTP is valid for 1 hour until ${otpExpiryTime}</div>
            </div>
            
            <div class="instructions">
              <div class="instructions-title">How to reset your password:</div>
              <ol class="instructions-list">
                <li>Enter the OTP in the password reset page</li>
                <li>Create a new password with at least 8 characters</li>
                <li>Include both letters and numbers for security</li>
                <li>Click "Reset Password" to complete the process</li>
              </ol>
            </div>
            
            <div class="cta">
              <a href="[RESET_PASSWORD_LINK]" class="button">Reset Password</a>
            </div>
            
            <p class="message">If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>
          </div>
          
          <div class="footer">
            <p class="footer-text">Thank you for choosing Amzei - UAE Tours for your travel experiences!</p>
            <p class="contact">Contact us: +971 4 123 4567 | info@amzei.com</p>
            
            <div class="social-links">
              <a href="#">f</a>
              <a href="#">t</a>
              <a href="#">in</a>
              <a href="#">ig</a>
            </div>
            
            <p class="developer">Developed by Amzei</p>
          </div>
        </div>
      </body>
      </html>
    `
}

export { verifyEmailTemplate };