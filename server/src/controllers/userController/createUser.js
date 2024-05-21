const { User } = require('../../db'); 
const bcrypt = require('bcryptjs');

const createUser = async(req, res) => {
    try{
        const {nombre, email, password} = req.body; 
        if(!nombre || !email || !password){return res.status(200).json({message: "Bad request, missing data"})}

        const existingUser = await User.findOne({
            where: {email: req.body.email}
        })
        const hashPassword = await bcrypt.hash(password, 10);
    
        if(!existingUser){
            const newUser ={
                nombre,
                email, 
                password: hashPassword
            } 
            const createdUser = await User.create(newUser)
            return res.status(200).json(createdUser) 
        }
        return res.status(409).json({message: "Ya existe un usuario con este correo"})
    }catch( error ){
        res.status(500).json({error: "Error users"})
    }
}

module.exports = createUser;