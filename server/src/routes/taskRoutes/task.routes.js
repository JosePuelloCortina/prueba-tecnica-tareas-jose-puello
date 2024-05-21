const { Router } = require('express');
const getAllTasks = require("../../controllers/taskController/getAllTasks");
const createTask = require("../../controllers/taskController/createTask");
const updateTask = require("../../controllers/taskController/updateTask");
const deleteTask = require('../../controllers/taskController/deleteTask');
const requireAuth = require('../../middlewares/requireAuth');


const router = Router(); 

router.get('/gettasks', requireAuth, getAllTasks);
router.post('/createtask/user/:id', requireAuth, createTask); 
router.put('/updatetask/task/:id', requireAuth, updateTask);
router.delete('/deletetask/task/:id', requireAuth, deleteTask)


module.exports = router; 