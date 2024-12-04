import db from '../models/db.js';

export const loginUser = (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.json({ Error: "Login error in server" });
        }
        if (result.rows.length > 0) {
            req.session.role = result.rows[0]?.role;
            req.session.email = email;
            return res.json({ Status: "Success" });
        } else {
            return res.json({ Error: "No such user existed" });
        }
    });
};

export const checkSession = (req, res) => {
    if (req.session.role && req.session.email) {
        return res.json({ valid: true, role: req.session.role, email: req.session.email });
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
