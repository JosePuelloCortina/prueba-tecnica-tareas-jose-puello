const { Task, User } = require('../../db'); 

const updateTask = async(req, res) => {
    try{
        const { id } = req.params; 
        const {titulo, descripcion, fechaDeComienzo, fechaDeCaducidad, prioridad, progreso} = req.body; 
        
        const existingTask = await Task.findOne({
            where: {id}
        })
        
        if(existingTask){
            existingTask.titulo = titulo;
            existingTask.descripcion = descripcion;
            existingTask.fechaDeComienzo = fechaDeComienzo;
            existingTask.fechaDeCaducidad = fechaDeCaducidad;
            existingTask.prioridad = prioridad;
            existingTask.progreso = progreso;
             
            await existingTask.save();
            return res.status(200).json(existingTask); 
        }
        return res.status(404).json({message: "Task no existe"})
    }catch( error ){
        console.error(error);
        res.status(500).json({error: "Error Task"})
    }
}

module.exports = updateTask;