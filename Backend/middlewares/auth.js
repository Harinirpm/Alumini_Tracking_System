import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

//UserAuth

export function generateOTP() {
  return randomstring.generate({ length: 4, charset: 'numeric' });
}

export function sendOTP(email, otp) {
  const mailOptions = {
      from: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is:${otp}`
  };

  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
          pass: 'mjro egil myai rorl' // Your Password
      },
      tls: {
              rejectUnauthorized: false // Disable certificate validation (if necessary)
          }
  });

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log('Error occurred:', error);
      } else {
          console.log('OTP Email sent successfully:', info.response);
      }
  });
}

export function sendApprovalEmail(email) {
    const mailOptions = {
      from: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
      to: email,
      subject: 'Your Profile Has Been Approved',
      text: `Dear Alumni,
  
      Congratulations! Your profile has been approved, and you can now continue using the application. 
  
      If you have any questions, feel free to contact support.
  
      Best Regards,
      Alumni Management Team`
    };
  
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
        pass: 'mjro egil myai rorl' // Your Password
      },
      tls: {
        rejectUnauthorized: false // Disable certificate validation (if necessary)
      }
    });
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Profile approval email sent successfully:', info.response);
      }
    });
  }
  export function sendRejectionEmail(email, reason) {
    const mailOptions = {
      from: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
      to: email,
      subject: 'Your Profile Has Been Rejected',
      text: `Dear Alumni,
  
      We regret to inform you that your profile has been rejected. The reason for rejection is as follows:
  
      ${reason}
  
      Please review the details you have provided and make the necessary updates. After updating your profile, you can submit it again for revaluation.
  
      If you need assistance or have any questions, feel free to contact support.
  
      Best Regards,
      Alumni Management Team`
    };
  
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'dharshini.ad22@bitsathy.ac.in', // Your Email Id
        pass: 'mjro egil myai rorl' // Your Password
      },
      tls: {
        rejectUnauthorized: false // Disable certificate validation (if necessary)
      }
    });
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Profile rejection email sent successfully:', info.response);
      }
    });
  }