const { Router } = require('express');
const getAllTasks = require("../../controllers/taskController/getAllTasks");
const createTask = require("../../controllers/taskController/createTask");
const updateTask = require("../../controllers/taskController/updateTask");
const deleteTask = require('../../controllers/taskController/deleteTask');


const router = Router(); 

router.get('/gettasks', getAllTasks);
router.post('/createtask/user/:id', createTask); 
router.put('/updatetask/task/:id', updateTask);
router.delete('/deletetask/task/:id', deleteTask)


module.exports = router; 