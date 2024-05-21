const { User, Task } = require('../../db'); 

const getUserById = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findOne({
            where: {id},
            include: {
                model: Task
            }
        })
        if(!user){return res.status(404).json({message: "Usuario not found"})}
        res.status(200).json(user)
    }catch( error ){
        res.status(500).json({error: "Error users"})
    }
}

module.exports = getUserById;