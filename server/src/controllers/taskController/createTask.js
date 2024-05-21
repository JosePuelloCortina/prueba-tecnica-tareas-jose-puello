const { Task, User } = require('../../db'); 

const createTask = async(req, res) => {
    try{
        const { id } = req.params; 
        const {titulo, descripcion, fechaDeComienzo, fechaDeCaducidad, prioridad, progreso} = req.body; 
        if(!titulo || !descripcion || !fechaDeComienzo || !fechaDeCaducidad || !prioridad || !progreso){return res.status(400).json({message: "Bad request, missing data"})}

        const existingUser = await User.findOne({
            where: {id}
        })
        
        if(existingUser){
            const newTask ={
                titulo,
                descripcion, 
                fechaDeComienzo,
                fechaDeCaducidad,
                prioridad,
                progreso,
                UserId: id
            } 
            const createdTask = await Task.create(newTask)
            return res.status(201).json(createdTask) 
        }
        return res.status(404).json({message: "Usuario no existe"})
    }catch( error ){
        console.error(error);
        res.status(500).json({error: "Error Task"})
    }
}

module.exports = createTask;