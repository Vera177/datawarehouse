const router = require('express').Router();
const jwtMiddleware = require('./middlewares/jwtToken');
const adminCheckMiddleware = require('./middlewares/adminCheck');
const RolesController = require('./controllers/Roles');
const Usercontroller = require('./controllers/Users');
const ContactsController = require('./controllers/Contacts');
const CompanyController = require('./controllers/Company');
const Occupationcontroller = require('./controllers/Occupation');
const Contactinformationcontroller = require('./controllers/Contactinformation');
const Interestcontroller = require('./controllers/interestedPercentage');
const Citycontroller = require('./controllers/City');
const Countrycontroller = require('./controllers/Country');
const Regioncontroller = require('./controllers/Region');

/* user's roles*/
router.post('/role', RolesController.create);
router.get('/role', RolesController.getAll);
router.get('/role/:id', RolesController.getById);

/* users */
router.post('/user', jwtMiddleware, adminCheckMiddleware, Usercontroller.create);
router.get('/user', jwtMiddleware, adminCheckMiddleware, Usercontroller.getAll);
router.get('/user/:id', jwtMiddleware, adminCheckMiddleware, Usercontroller.getById);
router.post('/login', Usercontroller.login);

/* contacts */
router.post('/contact',  jwtMiddleware, ContactsController.create);
router.get('/contact',  jwtMiddleware, ContactsController.getAll);
router.get('/contact/:id',  jwtMiddleware, ContactsController.getById);

/* company */
router.post('/company',  jwtMiddleware, CompanyController.create);
router.get('/company',  jwtMiddleware, CompanyController.getAll);

/* occupation */
router.post('/occupation',  jwtMiddleware, Occupationcontroller.create);
router.get('/occupation',  jwtMiddleware, Occupationcontroller.getAll);

/* contact information */
router.post('/contactinformation',  jwtMiddleware, Contactinformationcontroller.create);
router.get('/contactinformation',  jwtMiddleware, Contactinformationcontroller.getAll);

/* interest percentage*/
router.post('/interest',  jwtMiddleware, Interestcontroller.create);
router.get('/interest',  jwtMiddleware, Interestcontroller.getAll);

/* city */
router.post('/city',  jwtMiddleware, Citycontroller.create);
router.get('/city',  jwtMiddleware, Citycontroller.getAll);

/* country */
router.post('/country',  jwtMiddleware, Countrycontroller.create);
router.get('/country',  jwtMiddleware, Countrycontroller.getAll);

/* region */
router.post('/region',  jwtMiddleware, Regioncontroller.create);
router.get('/region',  jwtMiddleware, Regioncontroller.getAll);
router.get('/region/:id', jwtMiddleware, Regioncontroller.getById);

module.exports = router;