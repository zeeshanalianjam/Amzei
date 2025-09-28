const welcomeEmailTemplate = ({ name, url, id, otp, otpExpiryTime }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Amzei - UAE Tours</title>
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
        
        .welcome-box {
          background-color: #fff7ed;
          border: 2px dashed #fb923c;
          border-radius: 8px;
          padding: 25px;
          text-align: center;
          margin: 30px 0;
        }
        
        .welcome-title {
          font-size: 18px;
          font-weight: 600;
          color: #ea580c;
          margin-bottom: 15px;
        }
        
        .welcome-message {
          font-size: 16px;
          color: #9a3412;
        }
        
        .verification-container {
          background-color: #f0fdf4;
          border-left: 4px solid #22c55e;
          padding: 20px;
          margin: 30px 0;
          border-radius: 4px;
        }
        
        .verification-title {
          font-weight: 600;
          color: #166534;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .verification-code {
          font-size: 32px;
          font-weight: bold;
          color: #166534;
          letter-spacing: 5px;
          text-align: center;
          margin: 15px 0;
          background-color: white;
          padding: 10px;
          border-radius: 4px;
          border: 1px dashed #22c55e;
        }
        
        .verification-note {
          font-size: 14px;
          color: #166534;
          text-align: center;
        }
        
        .features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 30px 0;
        }
        
        .feature {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .feature-title {
          font-weight: 600;
          color: #334155;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        
        .feature-title::before {
          content: "✓";
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #22c55e;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          margin-right: 10px;
          font-size: 14px;
        }
        
        .feature-description {
          font-size: 14px;
          color: #64748b;
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
          padding: 14px 32px;
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
        
        .signature {
          font-size: 14px;
          color: #64748b;
          font-style: italic;
          margin-top: 20px;
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
          
          .features {
            grid-template-columns: 1fr;
          }
          
          .verification-code {
            font-size: 24px;
            letter-spacing: 3px;
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
          <h1 class="greeting">Welcome to the Amzei Family, ${name}!</h1>
          <p class="message">We're absolutely delighted to have you join our community of travelers and explorers. Your journey with Amzei - UAE Tours is about to begin!</p>
          
          <div class="welcome-box">
            <div class="welcome-title">Your Adventure Awaits!</div>
            <p class="welcome-message">Thank you for registering with Amzei - UAE Tours. Get ready to explore the breathtaking landscapes, vibrant culture, and unforgettable experiences that the United Arab Emirates has to offer.</p>
          </div>
          
          <div class="verification-container">
            <div class="verification-title">Email Verification</div>
            <div class="verification-code">${otp}</div>
            <p class="verification-note">Please use this verification code to complete your registration. This code is valid until ${otpExpiryTime}</p>
          </div>
          
          <div class="features">
            <div class="feature">
              <div class="feature-title">Exclusive Access</div>
              <p class="feature-description">Unlock special deals and offers available only to our registered members.</p>
            </div>
            <div class="feature">
              <div class="feature-title">Personalized Experiences</div>
              <p class="feature-description">Enjoy tailor-made tours that match your interests and preferences.</p>
            </div>
            <div class="feature">
              <div class="feature-title">Expert Guidance</div>
              <p class="feature-description">Benefit from our knowledgeable tour guides who bring UAE's rich heritage to life.</p>
            </div>
            <div class="feature">
              <div class="feature-title">24/7 Support</div>
              <p class="feature-description">Our dedicated team is always ready to assist you throughout your journey.</p>
            </div>
          </div>
          
          <div class="cta">
            <a href="${url}" class="button">Verify Your Account</a>
          </div>
          
          <p class="message">If you didn't create an account with Amzei - UAE Tours, please disregard this email or contact our support team immediately.</p>
          
          <div class="signature">
            Warm regards,<br>
            The Amzei Team
          </div>
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
          
          <p class="footer-text">© 2025 Amzei - UAE Tours. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export { welcomeEmailTemplate };