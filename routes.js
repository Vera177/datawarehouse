const router = require('express').Router();
const jwtMiddleware = require('./middlewares/jwtToken');
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

/* users */
router.post('/user', Usercontroller.create);
router.get('/user', jwtMiddleware, Usercontroller.getAll);
router.post('/login', Usercontroller.login);

/* contacts */
router.post('/contact', ContactsController.create);
router.get('/contact', ContactsController.getAll);

/* company */
router.post('/company', CompanyController.create);
router.get('/company', CompanyController.getAll);

/* occupation */
router.post('/occupation', Occupationcontroller.create);
router.get('/occupation', Occupationcontroller.getAll);

/* contact information */
router.post('/contactinformation', Contactinformationcontroller.create);
router.get('/contactinformation', Contactinformationcontroller.getAll);

/* interest percentage*/
router.post('/interest', Interestcontroller.create);
router.get('/interest', Interestcontroller.getAll);

/* city */
router.post('/city', Citycontroller.create);
router.get('/city', Citycontroller.getAll);

/* country */
router.post('/country', Countrycontroller.create);
router.get('/country', Countrycontroller.getAll);

/* region */
router.post('/region', Regioncontroller.create);
router.get('/region', Regioncontroller.getAll);

module.exports = router;