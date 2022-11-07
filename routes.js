const router = require('express').Router();
const jwtMiddleware = require('./middlewares/jwtToken');
const RolesController = require('./controllers/Roles');
const Usercontroller = require('./controllers/Users');
const ContactsController = require('./controllers/Contacts');

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

module.exports = router;