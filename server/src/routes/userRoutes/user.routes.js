const { Router } = require('express');
const getAllUsers = require("../../controllers/userController/getAllUsers");

const router = Router(); 

router.get('/user', getAllUsers);

module.exports = router; 