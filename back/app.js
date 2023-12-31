const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { seed } = require('./public/scripts/db-seed');
const cors=require('cors');

const app = express();

require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth',require('./routes/auth'));
app.use('/api/agreements',require('./routes/Agreement'));
app.use('/api/submissions',require('./routes/Submissions'));
app.use('/api/balance',require('./routes/Balance'));
app.use('/api/admin',require('./routes/Admin'));

app.listen(process.env.PORT,()=>console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));

//seed();

module.exports = app;

