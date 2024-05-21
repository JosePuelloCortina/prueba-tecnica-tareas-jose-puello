const { Router } = require('express'); 
const userRoutes = require('./userRoutes/user.routes');
const taskRoutes = require('./taskRoutes/task.routes');

const router = Router(); 

router.use('/user', userRoutes);
router.use('/task', taskRoutes) 

module.exports = router; 