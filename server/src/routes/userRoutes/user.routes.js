const { Router } = require('express');
const getAllUsers = require("../../controllers/userController/getAllUsers");
const createUser = require("../../controllers/userController/createUser");
const { loginHandler, profileHandler }= require("../../controllers/authController/auth.controller");

const router = Router(); 

router.post('/login', loginHandler)
router.get('/getuser', getAllUsers);
router.post('/createUser', createUser)

module.exports = router; 