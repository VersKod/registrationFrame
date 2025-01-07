const jwtConfig = require('./jwtConfig');

const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: jwtConfig.refresh.expiresIn,
};

module.exports = cookieConfig;