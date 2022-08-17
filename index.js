require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
const userPasswordDatabase = (config.database.user || config.database.password) && `${config.database.user}:${config.database.password}@`
mongoose.connect(
    `mongodb://${userPasswordDatabase}${config.database.host}:${config.database.port}/${config.database.name}`)
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server started on http://localhost:${config.port} (${config.env})`);
        });
    })
    .catch(err => {
        console.log(`DB connection Error: ${err.message}`);
    });