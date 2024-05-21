const { Task } = require('../../db'); 

const getAllTasks = async(req, res) => {
    try{
        const tasks = await Task.findAll();
        if(!tasks.length){return res.status(200).json({message: "Tareas no encontradas"})}
        res.status(200).json(tasks)
    }catch( error ){
        res.status(500).json({error: "Error tasks"})
    }
}

module.exports = getAllTasks;