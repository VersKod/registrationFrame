const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api/authRouter', authRouter);
app.use('/api/tokens', tokensRouter)

module.exports = app;