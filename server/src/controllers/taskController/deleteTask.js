const { Task } = require('../../db'); 

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.destroy();
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting task" });
    }
};

module.exports = deleteTask;