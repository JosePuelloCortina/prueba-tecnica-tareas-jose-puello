import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/auth';
import { updateTask, deleteTask } from '../api/task';
import { Link } from 'react-router-dom';

export default function TaskPage() {
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState(user.Tasks);

  const [selectedProgress, setSelectedProgress] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    setTasks(user.Tasks);
  }, [user.Tasks]);

  const changeProgress = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    try {
      await updateTask(taskId, taskToUpdate.titulo, taskToUpdate.descripcion, taskToUpdate.fechaDeComienzo, taskToUpdate.fechaDeCaducidad, taskToUpdate.prioridad, selectedProgress);
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, progreso: selectedProgress } : task
      );
      setTasks(updatedTasks);
      setSelectedProgress('');
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  const changePriority = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    try {
      await updateTask(taskId, taskToUpdate.titulo, taskToUpdate.descripcion, taskToUpdate.fechaDeComienzo, taskToUpdate.fechaDeCaducidad, selectedPriority, taskToUpdate.progreso);
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, prioridad: selectedPriority } : task
      );
      setTasks(updatedTasks);
      setSelectedPriority('');
    } catch (error) {
      console.error("Error updating task priority:", error);
    }
  };

  const handleProgressChange = (e) => {
    setSelectedProgress(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 justify-center items-center">Tareas de {user.nombre}</h2>
        <Link to={`/newtask/${user.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
          Nueva Tarea
        </Link>
        <ul className=" ">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Titulo</th>
                <th className="border border-gray-300 px-4 py-2">Descripcion</th>
                <th className="border border-gray-300 px-4 py-2">Fecha de comienzo</th>
                <th className="border border-gray-300 px-4 py-2">Fecha de caducidad</th>
                <th className="border border-gray-300 px-4 py-2">Prioridad</th>
                <th className="border border-gray-300 px-4 py-2">Progreso</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300 px-4 py-2">{task.titulo}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.fechaDeComienzo}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.fechaDeCaducidad}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.prioridad}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.progreso}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex space-x-4">
                      <div className="relative">
                        <select
                          onChange={handleProgressChange}
                          value={selectedProgress}
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Cambiar Progreso</option>
                          <option value="pendiente">Pendiente</option>
                          <option value="enProceso">En Proceso</option>
                          <option value="terminado">Terminado</option>
                        </select>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => changeProgress(task.id)}
                        disabled={!selectedProgress}
                      >
                        Guardar
                      </button>
                    </div>
                    <div className="flex space-x-4 mt-2">
                      <div className="relative">
                        <select
                          onChange={handlePriorityChange}
                          value={selectedPriority}
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Cambiar Prioridad</option>
                          <option value="alta">Alta</option>
                          <option value="media">Media</option>
                          <option value="baja">Baja</option>
                        </select>
                      </div>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => changePriority(task.id)}
                        disabled={!selectedPriority}
                      >
                        Guardar
                      </button>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </>
  );
}