import axios from '../libs/axios'

export const updateTask = async (id, titulo, descripcion, fechaDeComienzo, fechaDeCaducidad, prioridad, progreso) =>{
    return await axios.put(`/task/updatetask/task/${id}`,{
        titulo,
        descripcion,
        fechaDeComienzo,
        fechaDeCaducidad,
        prioridad,
        progreso
    })
}

export const createTask = async (id, titulo, descripcion, fechaDeComienzo, fechaDeCaducidad, prioridad, progreso) => {
    return await axios.post(`/task/createtask/user/${id}`, {
        titulo,
        descripcion,
        fechaDeComienzo,
        fechaDeCaducidad,
        prioridad,
        progreso
    });
};

export const deleteTask = async (id) => {
    return await axios.delete(`/task/deletetask/task/${id}`);
};