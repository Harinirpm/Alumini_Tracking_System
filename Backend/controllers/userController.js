import db from '../models/db.js';
import { generateOTP, sendOTP } from '../middlewares/auth.js';

const otpCache = {}; 

export const loginUser = (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.json({ Error: "Login error in server" });
        }
        if (result.rows.length > 0) {
            // req.session.role = result.rows[0]?.role;
            // req.session.email = email;
            // console.log(result.rows[0].id)
            // req.session.userId = result.rows[0]?.id;
            // return res.json({ Status: "Success" });
            const otp = generateOTP(); // Generate a 4-digit OTP
            otpCache[email] = otp; // Store OTP in cache

            sendOTP(email, otp); // Send OTP to the user's email
            console.log(`OTP sent to ${email}:`, otp);

            return res.json({ Status: "OTP sent", email });
        } else {
            return res.json({ Error: "No such user existed" });
        }
    });
};

export const checkSession = (req, res) => {
    if (req.session.role && req.session.email) {
        return res.json({ valid: true, role: req.session.role, email: req.session.email, id: req.session.userId });
    } else {
        return res.json({ valid: false });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

// app.post('/reqOTP', (req, res) => {
//     const { email } = req.body;
//     const otp = generateOTP();
//     otpCache[email] = otp; // Store OTP in cache
  
//     console.log(otpCache);
//     // Send OTP via email
//     sendOTP(email, otp);
//     res.cookie('otpCache', otpCache, { maxAge: 30000, httpOnly: true }); 
//     console.log("OTP sent");
//   });
  
  
  
//   app.post('/verifyOTP', (req, res) => { 
//     const { email, otp } = req.body;
  
//     // Check if email exists in the cache
//     if (!otpCache.hasOwnProperty(email)) {
//         return res.status(400).json({ message: 'Email not found' });
//     }
  
//     // Check if OTP matches the one stored in the cache
//     if (otpCache[email] === otp.trim()) {
//         // Remove OTP from cache after successful verification
//         delete otpCache[email];
//         return res.status(200).json({ message: 'OTP verified' }) && console.log("OTP verified");
//     } else {
//         return  res.status(200).json({ message: 'Invalid OTP' }) &&  console.log("Invalid OTP");
//     }
//   });

export const verifyOTP = (req, res) => {
    console.log("Request Body:", req.body);
    console.log("otpCache:", otpCache);
    
    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Normalized Email:", normalizedEmail);
    console.log("OTP in Cache:", otpCache[normalizedEmail]);


    // Check if the OTP exists for the email
    if (!otpCache[normalizedEmail]) {
        return res.status(400).json({ Error: "OTP expired or invalid" });
    }

    // Validate OTP
    if (otpCache[normalizedEmail] === otp.trim()) {
        // OTP matched, create session
        const sql = 'SELECT * FROM users WHERE email = $1';
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.json({ Error: "Error in server" });
            }

            if (result.rows.length > 0) {
                req.session.role = result.rows[0]?.role;
                req.session.email = email;
                req.session.userId = result.rows[0]?.id;

                // Clear OTP cache after successful login
                delete otpCache[email];

                return res.json({ Status: "Success", role: req.session.role });
            } else {
                return res.json({ Error: "User not found" });
            }
        });
    } else {
        return res.status(400).json({ Error: "Invalid OTP" });
    }
};
  