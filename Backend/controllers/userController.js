import db from '../models/db.js';

export const loginUser = (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ Error: "Login error in server" });
        }
        if (data.length > 0) {
            req.session.role = data[0]?.role;
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
