import emailjs from "@emailjs/browser";

/**
 * EMAILJS SETUP INSTRUCTIONS:
 *
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add your Gmail service:
 *    - Go to Email Services
 *    - Click "Add New Service"
 *    - Choose "Gmail"
 *    - Connect your Gmail account (woldekass26@gmail.com)
 *    - Note down the Service ID (e.g., service_abc123)
 *
 * 3. Create an email template:
 *    - Go to Email Templates
 *    - Click "Create New Template"
 *    - Use this HTML template:
 *
 *    <!DOCTYPE html>
 *    <html>
 *    <head>
 *        <title>Account Credentials</title>
 *    </head>
 *    <body>
 *        <h2>Student Portal - Account Credentials</h2>
 *        <p>Dear {{to_name}},</p>
 *        <p>Your {{user_type}} account has been successfully created.</p>
 *
 *        <h3>Your Login Credentials:</h3>
 *        <p><strong>User ID:</strong> {{user_id}}</p>
 *        <p><strong>Password:</strong> {{password}}</p>
 *        <p><strong>User Type:</strong> {{user_type}}</p>
 *
 *        <p><strong>⚠️ Important:</strong> Keep these credentials secure.</p>
 *
 *        <p>Best regards,<br>Student Portal Team</p>
 *    </body>
 *    </html>
 *
 * 4. IMPORTANT: In your EmailJS template settings:
 *    - Set "To Email" field to: {{to_email}}
 *    - Set "From Name" field to: {{from_name}}
 *    - Set "Reply To" field to: {{reply_to}}
 *    - Set "Subject" field to: "Your {{user_type}} Account Credentials - Student Portal"
 *
 * 5. Note down the Template ID (e.g., template_xyz789)
 *
 * 6. Get your User ID from Account > API Keys
 *
 * 7. Update the EMAILJS_CONFIG below with your actual IDs
 */

interface EmailCredentials {
  userId: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

// EmailJS Configuration - UPDATE THESE WITH YOUR ACTUAL IDs
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_3w402ms", // Replace with your EmailJS service ID
  TEMPLATE_ID: "template_0ivyhhq", // Replace with your EmailJS template ID
  USER_ID: "TAyf4jGZlky5VlSd5", // Replace with your EmailJS user ID
};

/**
 * Initialize EmailJS
 */
export const initializeEmailJS = () => {
  try {
    emailjs.init(EMAILJS_CONFIG.USER_ID);
    console.log(
      "EmailJS initialized successfully with User ID:",
      EMAILJS_CONFIG.USER_ID
    );
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
  }
};

/**
 * Generate email template for user credentials
 */
export const generateCredentialsEmail = (
  credentials: EmailCredentials
): EmailTemplate => {
  const { userId, password, firstName, lastName, userType, email } =
    credentials;

  const subject = `Your ${userType} Account Credentials - Student Portal`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Credentials</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #4CAF50;
        }
        .logo {
          background-color: #4CAF50;
          color: white;
          padding: 15px;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }
        .title {
          color: #4CAF50;
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .subtitle {
          color: #666;
          font-size: 16px;
          margin: 5px 0 0 0;
        }
        .credentials-section {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #4CAF50;
        }
        .credential-item {
          margin: 15px 0;
          padding: 10px;
          background-color: white;
          border-radius: 5px;
          border: 1px solid #e0e0e0;
        }
        .label {
          font-weight: bold;
          color: #555;
          margin-bottom: 5px;
          display: block;
        }
        .value {
          font-family: 'Courier New', monospace;
          background-color: #f1f1f1;
          padding: 8px 12px;
          border-radius: 4px;
          color: #333;
          font-size: 14px;
          word-break: break-all;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          color: #666;
          font-size: 14px;
        }
        .login-link {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .login-link:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SP</div>
          <h1 class="title">Student Portal</h1>
          <p class="subtitle">Your Account Credentials</p>
        </div>
        
        <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
        
        <p>Your <strong>${userType}</strong> account has been successfully created in the Student Portal system. Below are your login credentials:</p>
        
        <div class="credentials-section">
          <div class="credential-item">
            <span class="label">User ID:</span>
            <div class="value">${userId}</div>
          </div>
          
          <div class="credential-item">
            <span class="label">Password:</span>
            <div class="value">${password}</div>
          </div>
          
          <div class="credential-item">
            <span class="label">User Type:</span>
            <div class="value">${userType}</div>
          </div>
        </div>
        
        <div class="warning">
          <strong>⚠️ Important:</strong> Please keep these credentials secure and do not share them with anyone. 
          We recommend changing your password after your first login.
        </div>
        
        <p>You can now access the Student Portal using the credentials above.</p>
        
        <div style="text-align: center;">
          <a href="${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/auth/login" class="login-link">
            Login to Student Portal
          </a>
        </div>
        
        <div class="footer">
          <p>If you have any questions or need assistance, please contact the system administrator.</p>
          <p>© 2024 Student Portal. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
};

/**
 * Send email using EmailJS (Frontend-only solution)
 */
export const sendCredentialsEmail = async (
  credentials: EmailCredentials
): Promise<boolean> => {
  try {
    console.log("Starting email send process...");
    console.log("EmailJS Config:", EMAILJS_CONFIG);
    console.log("Credentials:", { ...credentials, password: "***" });

    const emailTemplate = generateCredentialsEmail(credentials);
    console.log("Email template generated successfully");

    // Prepare template parameters for EmailJS
    // Note: EmailJS templates use different parameter names
    const templateParams = {
      to_email: credentials.email,
      to_name: `${credentials.firstName} ${credentials.lastName}`,
      user_id: credentials.userId,
      password: credentials.password,
      user_type: credentials.userType,
      from_name: "Student Portal",
      reply_to: "woldekass26@gmail.com",
      // Remove subject and message as they might not be needed in EmailJS template
      // subject: emailTemplate.subject,
      // message: emailTemplate.html,
    };

    console.log("Template parameters prepared:", {
      ...templateParams,
      password: "***",
    });

    console.log("Sending email via EmailJS...");
    console.log("Service ID:", EMAILJS_CONFIG.SERVICE_ID);
    console.log("Template ID:", EMAILJS_CONFIG.TEMPLATE_ID);
    console.log("User ID:", EMAILJS_CONFIG.USER_ID);

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    console.log("EmailJS result:", result);
    console.log("Email sent successfully via EmailJS:", result.status === 200);
    return result.status === 200;
  } catch (error) {
    console.error("Failed to send credentials email via EmailJS:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error: error,
    });
    return false;
  }
};

/**
 * Alternative: Send email using Gmail SMTP directly (if you prefer this approach)
 * Note: This requires setting up a Gmail service in EmailJS
 */
export const sendCredentialsEmailViaGmail = async (
  credentials: EmailCredentials
): Promise<boolean> => {
  try {
    const emailTemplate = generateCredentialsEmail(credentials);

    // For Gmail service, use these template parameters
    const templateParams = {
      to_email: credentials.email,
      to_name: `${credentials.firstName} ${credentials.lastName}`,
      subject: emailTemplate.subject,
      message: emailTemplate.html,
      user_id: credentials.userId,
      password: credentials.password,
      user_type: credentials.userType,
      from_name: "Student Portal",
      reply_to: "woldekass26@gmail.com",
    };

    // Use Gmail service ID (you'll need to set this up in EmailJS)
    const result = await emailjs.send(
      "gmail_service", // Replace with your Gmail service ID
      "credentials_template", // Replace with your template ID
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    console.log("Email sent successfully via Gmail:", result);
    return result.status === 200;
  } catch (error) {
    console.error("Failed to send credentials email via Gmail:", error);
    return false;
  }
};

/**
 * Send credentials email with error handling and logging
 */
export const sendUserCredentials = async (
  userId: string,
  password: string,
  firstName: string,
  lastName: string,
  userType: string,
  email: string
): Promise<{ success: boolean; message: string }> => {
  console.log("sendUserCredentials called with:", {
    userId,
    password: "***",
    firstName,
    lastName,
    userType,
    email,
  });

  // Validate required fields
  if (!userId || !password || !firstName || !lastName || !userType || !email) {
    const missingFields = [];
    if (!userId) missingFields.push("userId");
    if (!password) missingFields.push("password");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!userType) missingFields.push("userType");
    if (!email) missingFields.push("email");

    console.error("Missing required fields:", missingFields);
    return {
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Invalid email format:", email);
    return {
      success: false,
      message: "Invalid email format",
    };
  }

  const credentials: EmailCredentials = {
    userId,
    password,
    firstName,
    lastName,
    userType,
    email,
  };

  console.log("Initializing EmailJS...");
  // Initialize EmailJS if not already initialized
  initializeEmailJS();

  console.log("Sending credentials email...");
  const success = await sendCredentialsEmail(credentials);

  if (success) {
    console.log("Email sent successfully!");
    return {
      success: true,
      message: `Credentials sent successfully to ${email}`,
    };
  } else {
    console.error("Email sending failed!");
    return {
      success: false,
      message: "Failed to send credentials email",
    };
  }
};

/**
 * Log email sending attempt for debugging
 */
export const logEmailAttempt = (
  success: boolean,
  email: string,
  userType: string,
  error?: string
): void => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    success,
    email,
    userType,
    error: error || null,
  };

  console.log("Email sending attempt:", logEntry);

  // In production, you might want to send this to a logging service
  // or store it in a database for audit purposes
};
