require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();
const apiPath = '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('dist'));

app.use(apiPath, require('./routes'));

if(config.env === 'development'){
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    
    app.use(require('morgan')('dev'));
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

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