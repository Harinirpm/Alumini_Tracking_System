// import session from 'express-session';

// // const sessionMiddleware = session({
// //     secret: 'secret',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //         secure: true,
// //         httpOnly: true,
// //         maxAge: 1000 * 60 * 60 * 2,
// //         sameSite: 'lax'
// //     }
// // });

// const sessionMiddleware = session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 2, // 2 hours
//         sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-site cookies in production
//     },
// });


// export default sessionMiddleware;
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import dbPool from '../models/db';

// Create a session store using `connect-pg-simple` and your pool
const sessionStore = new pgSession({
    pool: dbPool, // Use the PostgreSQL pool
    tableName: 'session', // Optional: Default is 'session'
});

// Configure the session middleware
const sessionMiddleware = session({
    store: sessionStore,
    secret: 'secure-secret', // Replace with a strong secret
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Prevent client-side JavaScript from accessing cookies
        maxAge: 1000 * 60 * 60 * 2, // Session expires in 2 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Cross-site cookie policy
    },
});
