const { Task } = require('../../db'); 

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        await task.destroy();
        return res.status(200).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error delete Tarea" });
    }
};

module.exports = deleteTask;