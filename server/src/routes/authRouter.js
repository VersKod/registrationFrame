const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({ text: 'All fields are required' });
    }
    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass: await bcrypt.hash(password, 10) },
    });
    if (!created) {
      return res.status(401).json({ text: 'User already exists' });
    }
    const user = foundUser.get();
    delete user.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user });

    return res
      .cookie('refreshToken', refreshToken, cookieConfig)
      .status(201)
      .json({ accessToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ text: 'All fields are required' });
    }
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(401).json({ text: 'User does not exist' });
    }
    const valid = await bcrypt.compare(password, foundUser.hashpass);
    if (!valid) {
      return res.status(401).json({ text: 'Incorrect password' });
    }

    const user = foundUser.get();
    const { accessToken, refreshToken } = generateTokens({ user });

    return res
      .cookie('refreshToken', refreshToken, cookieConfig)
      .status(200)
      .json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Internal server error' });
  }
});

authRouter.get('/logout', async (req, res) => {
  try {
    return res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Internal server error' });
  }
})

module.exports = authRouter;
