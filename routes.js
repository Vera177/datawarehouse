const router = require('express').Router();

const RolesController = require('./controllers/Roles');
const Usercontroller = require('./controllers/Users');

/* user's roles*/
router.post('/role', RolesController.create);
router.get('/role', RolesController.getAll);

/* users */
router.post('/user', Usercontroller.create);
router.get('/user', Usercontroller.getAll);
router.post('/login', Usercontroller.login);

module.exports = router;