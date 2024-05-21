import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import { createTask } from '../api/task';

export default function NewTaskPage() {
  const { id } = useParams(); // Obtiene el id de la URL
  const [newTask, setNewTask] = useState({
    titulo: '',
    descripcion: '',
    fechaDeComienzo: '',
    fechaDeCaducidad: '',
    prioridad: '',
    progreso: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleCreateTask = async () => {
    try {
      await createTask(
        id,
        newTask.titulo, 
        newTask.descripcion, 
        newTask.fechaDeComienzo, 
        newTask.fechaDeCaducidad, 
        newTask.prioridad, 
        newTask.progreso
      );
      window.location.href = "/task";
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Nueva Tarea</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="titulo"
          value={newTask.titulo}
          onChange={handleInputChange}
          placeholder="Título"
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="descripcion"
          value={newTask.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="border px-2 py-1"
        />
        <input
          type="date"
          name="fechaDeComienzo"
          value={newTask.fechaDeComienzo}
          onChange={handleInputChange}
          placeholder="Fecha de Comienzo"
          className="border px-2 py-1"
        />
        <input
          type="date"
          name="fechaDeCaducidad"
          value={newTask.fechaDeCaducidad}
          onChange={handleInputChange}
          placeholder="Fecha de Caducidad"
          className="border px-2 py-1"
        />
        <select
          name="prioridad"
          value={newTask.prioridad}
          onChange={handleInputChange}
          className="border px-2 py-1"
        >
          <option value="">Selecciona Prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <select
          name="progreso"
          value={newTask.progreso}
          onChange={handleInputChange}
          className="border px-2 py-1"
        >
          <option value="">Selecciona Progreso</option>
          <option value="pendiente">Pendiente</option>
          <option value="enProceso">En Proceso</option>
          <option value="terminado">Terminado</option>
        </select>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateTask}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}