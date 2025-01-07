const jwtConfig = {
  access: {
    expiresIn: `${1000 * 5}`,
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 24 * 30}`,
  },
};

module.exports = jwtConfig;