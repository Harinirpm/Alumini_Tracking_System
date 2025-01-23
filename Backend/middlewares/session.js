import session from 'express-session';

// const sessionMiddleware = session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: true,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 2,
//         sameSite: 'lax'
//     }
// });

const sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-site cookies in production
    },
});


export default sessionMiddleware;
