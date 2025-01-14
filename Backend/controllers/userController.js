import db from '../models/db.js';
import { generateOTP, sendOTP } from '../middlewares/auth.js';

const otpCache = {};

export const loginUser = (req, res) => {
    console.log("loginuser")
    const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.json({ Error: "Login error in server" });
        }
        if (result.rows.length > 0) {
            const otp = generateOTP(); // Generate a 4-digit OTP
            otpCache[email.trim().toLowerCase()] = { otp, expiresAt: Date.now() + 30000 };

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
    const { otp: cachedOtp, expiresAt } = otpCache[normalizedEmail];
    if (Date.now() > expiresAt) {
        // Remove expired OTP from the cache
        delete otpCache[normalizedEmail];
        return res.json({ message: "OTP expired. Please try again." });
    }
    if (cachedOtp === otp.trim()) {
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
                return res.json({ message: "User not found" });
            }
        });
    } else {
        return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }
};


export const getOtp = (req, res) => {
    console.log("getotp");
    const { email } = req.body;

    if (email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.json({ Error: "Error in server" });
            }

            if (result.rows.length > 0) {
                // Stop further execution after sending the response
                return res.json({ message: "User Exists Already" });
            }

            // If the user does not exist, generate and send OTP
            const otp = generateOTP(); // Generate a 4-digit OTP
            otpCache[email.trim().toLowerCase()] = { otp, expiresAt: Date.now() + 30000 };

            sendOTP(email, otp); // Send OTP to the user's email
            console.log(`OTP sent to ${email}:`, otp);

            // Send response confirming OTP sent
            return res.json({ Status: "OTP sent", email });
        });
    } else {
        return res.json({ Error: "No such user existed" });
    }
};


export const verifyAluminiOTP = (req, res) => {
    console.log("Request Body:", req.body);
    console.log("otpCache:", otpCache);

    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Normalized Email:", normalizedEmail);
    console.log("OTP in Cache:", otpCache[normalizedEmail]);
    console.log()

    // Check if the OTP exists for the email
    if (!otpCache[normalizedEmail]) {
        return res.status(400).json({ Error: "OTP expired or invalid" });
    }
    const { otp: cachedOtp, expiresAt } = otpCache[normalizedEmail];
    // Validate OTP
    console.log(cachedOtp, otp)
    if (Date.now() > expiresAt) {
        // Remove expired OTP from the cache
        delete otpCache[normalizedEmail];
        return res.json({ message: "OTP expired. Please try again." });
    }
    if (cachedOtp === otp.trim()) {
        // OTP is valid; remove it from the cache to prevent reuse
        delete otpCache[normalizedEmail];
        return res.json({ Status: "Success" });
    } else {
        return res.json({ message: "Invalid OTP. Please try again." });
    }
};