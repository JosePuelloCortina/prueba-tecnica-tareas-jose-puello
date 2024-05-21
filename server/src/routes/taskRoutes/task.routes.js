const { Router } = require('express');
const getAllTasks = require("../../controllers/taskController/getAllTasks");
const createTask = require("../../controllers/taskController/createTask");

const router = Router(); 

router.get('/gettasks', getAllTasks);
router.post('/createtask/user/:id', createTask); 


module.exports = router; 