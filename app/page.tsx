'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';

import { useUsuarios } from './API/traer.jsx'; // Asegúrate de ajustar la ruta al archivo de tu Hook
import { useCrearUsuario } from './API/crear.jsx'; // Asegúrate de ajustar la ruta al archivo de tu Hook // Asegúrate de ajustar la ruta al archivo de tu Hook
import { useEditarUsuario } from './API/editar.jsx'; // Asegúrate de ajustar la ruta al archivo de tu Hook // Asegúrate de ajustar la ruta al archivo de tu Hook
import { useEliminarUsuario } from './API/eliminar.jsx';























// Define una interfaz para tus usuarios
interface Usuario {
  id:number;
  cedula: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccion: string;
}


export default function Home() {


      // Estado para almacenar el id del usuario seleccionado
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);

    // Controlador de eventos para actualizar el usuario seleccionado
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsuarioSeleccionado(Number(event.target.value));
    };

  // GET Especifica el tipo de tu variable usuarios
  const usuarios: Usuario[] = useUsuarios();
  //--------------------



  //POST Crea un nuevo usuario
  const { crearUsuario } = useCrearUsuario();

  // Maneja el evento onSubmit del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Evita que la página se recargue
    event.preventDefault();

    // Crea un objeto FormData a partir del formulario
    const formData = new FormData(event.target as HTMLFormElement);

    // Crea un objeto con los datos del formulario
    const nuevoUsuario = {
      cedula: formData.get('cedula'),
      nombre: formData.get('nombre'),
      apellidos: formData.get('apellidos'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      direccion: formData.get('dir'),
    };
    try {
      await crearUsuario(nuevoUsuario);
      alert('Usuario creado exitosamente');
    } catch (error) {
      alert('Hubo un error al crear el usuario');
    }
  };

  //--------------------





// PUT Edita un usuario existente
const { editarUsuario } = useEditarUsuario();

// Maneja el evento onSubmit del formulario
const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
  // Evita que la página se recargue
  event.preventDefault();

  // Crea un objeto FormData a partir del formulario
  const formData = new FormData(event.target as HTMLFormElement);

  // Crea un objeto con los datos del formulario
  const usuarioEditado = {
    cedula: formData.get('cedula'),
    nombre: formData.get('nombre'),
    apellidos: formData.get('apellidos'),
    correo: formData.get('correo'),
    telefono: formData.get('telefono'),
    direccion: formData.get('dir'),
  };

  // Aquí necesitas el id del usuario que deseas editar
  // Aquí necesitas el id del usuario que deseas editar
const id = usuarioSeleccionado;

try {
  await editarUsuario(id, usuarioEditado);
  
  // Crea una copia del objeto usuarioEditado e incluye el ID
  const usuarioConId = { ...usuarioEditado, id };

  alert(`Usuario editado exitosamente. Datos enviados: ${JSON.stringify(usuarioConId)}`);
  console.log(usuarioConId);
} catch (error) {
  alert('Hubo un error al editar el usuario');
  console.log('Error:', error);
  console.log('Datos enviados:', usuarioEditado);
}
};


  //--------------------





// DELETE  un usuario existente
const { eliminarUsuario } = useEliminarUsuario();

// Maneja el evento onClick del botón de eliminar
const handleDelete = async () => {
  // Aquí necesitas el id del usuario que deseas eliminar
  const id = usuarioSeleccionado;

  try {
    await eliminarUsuario(id);
    alert(`Usuario eliminado exitosamente. ID del usuario: ${id}`);
  } catch (error) {
    alert('Hubo un error al eliminar el usuario');
    console.error('Error:', error);
  }
};
  //--------------------
















  //modales controlo el estado de los modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //modal para agregar usuario
  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal al cambiar el estado a false
  };
  const openModal = () => {
    setIsModalOpen(true); // Abre el modal al cambiar el estado a true
  };

  //modal para editar usuario
  const openEditModal = () => {
    setIsEditModalOpen(true);  // Abre el modal al cambiar el estado a true
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Cierra el modal al cambiar el estado a false
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      {isEditModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className=" bg-purple-200  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center sm:justify-center">

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Editar Usuario
                    </h3>
                    <div className="mt-2 center">
                      <form onSubmit={handleEdit} className=" w-full mx-auto my-4 p-4 rounded-md shadow-lg">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Cedula
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cedula"
                              name="cedula"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Nombre
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="nombre"
                              name="nombre"
                         

                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Apellidos
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="apellidos"
                              name="apellidos"
                        

                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Correo
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              id="name"
                              name="correo"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-32">
                            Telefono
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="telefono"
                              name="telefono"

                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Correo electrónico"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 w-32">
                            Dirección
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="dir"
                              name="dir"

                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Escribe tu direccion"
                            />
                          </div>
                        </div>
                        <div className="bg-purple-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={openEditModal}>
                            Guardar
                          </button>
                          <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeEditModal}>
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}


      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className=" bg-purple-200  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center sm:justify-center">

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Agregar Usuario
                    </h3>
                    <div className="mt-2 center">
                      <form onSubmit={handleSubmit} className=" w-full mx-auto my-4 p-4 rounded-md shadow-lg">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Cedula
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="name"
                              name="cedula"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Nombre
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="name"
                              name="nombre"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Apellidos
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="name"
                              name="apellidos"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">
                            Correo
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="name"
                              name="correo"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Nombre"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-32">
                            Telefono
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="email"
                              name="telefono"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Correo electrónico"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 w-32">
                            Dirección
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="role"
                              name="dir"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Direccion"
                            />
                          </div>
                        </div>
                        <div className="bg-purple-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={openModal}>
                            Guardar
                          </button>
                          <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeModal}>
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}



      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 cuadro">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="fondo flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="margint w-full md:w-1/2">
                <h2 className="text-2xl font-bold">SOFTWARE SADA  <br /> Usuarios</h2>
              </div>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  type="button"
                  className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={openModal} // Abre el modal al hacer clic
                >
                  Agregar
                </button>
                {/* ... */}

                <button
                  type="button"
                  className="flex items-center justify-center text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={openEditModal}
                >
                  Editar
                </button>
                <button
                onClick={handleDelete}
                  type="button"
                  className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Eliminar
                </button>

              </div>
            </div>
            <div className="fondo overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="fondo text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Cedula</th>
                    <th scope="col" className="px-4 py-3">Nombre</th>
                    <th scope="col" className="px-4 py-3">Apellidos</th>
                    <th scope="col" className="px-4 py-3">Correo</th>
                    <th scope="col" className="px-4 py-3">Telefono</th>
                    <th scope="col" className="px-4 py-3">Telefono</th>
                    <th scope="col" className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr className="border-b dark:border-gray-700" key={usuario.cedula}>
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{usuario.cedula}</th>
                      <td className="px-4 py-3">{usuario.nombre}</td>
                      <td className="px-4 py-3">{usuario.apellidos}</td>
                      <td className="px-4 py-3">{usuario.correo}</td>
                      <td className="px-4 py-3">{usuario.telefono}</td>
                      <td className="px-4 py-3">{usuario.direccion}</td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <input
                          type="radio"
                          name="usuarioSeleccionado"
                          value={usuario.id}
                          onChange={handleRadioChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}