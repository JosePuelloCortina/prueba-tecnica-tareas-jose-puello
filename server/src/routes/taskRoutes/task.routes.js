const { Router } = require('express');
const getAllTasks = require("../../controllers/taskController/getAllTasks");

const router = Router(); 

router.get('/gettasks', getAllTasks);


module.exports = router; 