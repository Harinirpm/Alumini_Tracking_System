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