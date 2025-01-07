const express = require('express');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');


const tokensRouter = express.Router();

tokensRouter.get('/refresh', verifyRefreshToken, (req, res) => {
   try {
    const {user} = res.locals;
    const {accessToken, refreshToken} = generateTokens({user});
    res.cookie('refreshToken', refreshToken, cookieConfig).json({accessToken, user});
   } catch (error) {
    console.log(error);
    res.status(500).json({text: 'Internal server error'});
   }
});

module.exports = tokensRouter;