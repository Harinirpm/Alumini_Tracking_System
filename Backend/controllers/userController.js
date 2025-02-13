import db from '../models/db.js';
import { generateOTP, sendOTP } from '../middlewares/auth.js';

const otpCache = {};

export const loginUser = (req, res) => {
    console.log("loginuser")
    let sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const { email, password } = req.body;
    console.log(email, password)


    if(email && password){

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
}
else{
    sql = 'SELECT * FROM users WHERE email = $1';
    console.log(email)
    db.query(sql, [email], (err, result) => {
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
}
};

export const checkSession = (req, res) => {
    const { email } = req.body;
    if (email === '') {
        return res.json({ valid: false, message: 'User not found' });
    }

    const query = 'SELECT id, role, email FROM users WHERE email = $1';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ valid: false, message: 'Internal server error' });
        }

        if (result.rows.length > 0) {
            console.log(result.rows[0])
            return res.json({
                valid: true,
                role: result.rows[0].role,
                email: result.rows[0].email,
                id: result.rows[0].id
            });
        } else {
            return res.json({ valid: false, message: 'User not found' });
        }
    });
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
    const { email, otp } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    if (!otpCache[normalizedEmail]) {
        return res.status(400).json({ Error: "OTP expired or invalid" });
    }

    const { otp: cachedOtp, expiresAt } = otpCache[normalizedEmail];
    if (Date.now() > expiresAt) {
        delete otpCache[normalizedEmail];
        return res.json({ message: "OTP expired. Please try again." });
    }

    if (cachedOtp === otp.trim()) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        db.query(sql, [email], (err, result) => {
            if (err) {
                return res.json({ Error: "Error in server" });
            }

            if (result.rows.length > 0) {
                delete otpCache[normalizedEmail];
                return res.json({ Status: "Success", role: result.rows[0]?.role });
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