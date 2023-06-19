import expressSession from 'express-session';

const session = () =>
  expressSession({
    secret: 'not secrets to see here',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  });

export default session;
