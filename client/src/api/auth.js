import axios from '../libs/axios'

export const loginRequest = async (email, password) =>{
    return await axios.post('/user/login',{
        email,
        password
    })
    
}

export const userRequest = async (id) => {
    return await axios.get(`/user/getuserById/${id}`, )
}

export const registerRequest = async (nombre, email, password ) => {
    return await axios.post('/user/createUser',{
        nombre,
        email,
        password,
    })
}
