const { User } = require('../../db'); 

const getAllUsers = async(req, res) => {
    try{
        const users = await User.findAll();
        if(!users.length){return res.status(200).json({message: "Usuarios not found"})}
        res.status(200).json(users)
    }catch( error ){
        res.status(500).json({error: "Error users"})
    }
}

module.exports = getAllUsers;
