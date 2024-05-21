const { Router } = require('express');
const getAllUsers = require("../../controllers/userController/getAllUsers");
const createUser = require("../../controllers/userController/createUser");
const { loginHandler, profileHandler }= require("../../controllers/authController/auth.controller");
const getUserById = require('../../controllers/userController/getUserById');

const router = Router(); 

router.post('/login', loginHandler)
router.get('/getuser', getAllUsers);
router.post('/createUser', createUser)
router.get('/getuserById/:id', getUserById)

module.exports = router; 