const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../../db');

const loginHandler = async (req, res) => 
{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Se requieren el email y la contraseña" });
        }

        const user = await User.findOne({
            where: {email: email}
        })
        if(!user) {return res.status(400).json({ message: "Usuario no encontrado"});}

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {return res.status(400).json({ message: "Contraseña no válida"});}

        const token = jwt.sign({user}, 'secret',{expiresIn: '24h' })
        return res.status(200).json({
            token,
            error: null,
            data: 'exito bienvenido',
            user
        })
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({message: "Error interno del servidor"})
      }  
    }
    
}

 const profileHandler = (req, res) =>
{
    return res.json({
        profile:{
            user: req.user
        },
        message: "data"
    });

}

module.exports = {loginHandler, profileHandler}; 