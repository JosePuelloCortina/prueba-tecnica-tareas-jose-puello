const { Router } = require('express'); 
const userRoutes = require('./userRoutes/user.routes');

const router = Router(); 

router.use('/server', userRoutes); 

module.exports = router; 