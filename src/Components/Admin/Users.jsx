import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('https://backendcinema.onrender.com/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, [users]);

    const showAdminComponent = () => {
        navigate("/admin/movies");
    };

    const exit = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const navigate = useNavigate();

    const aumentarCreditos = async (idUsuario, valor, nombre) => {
        try {
            const response = await axios.post('https://backendcinema.onrender.com/addcredits', {
                id: idUsuario,
                creditos: valor
            });
            toast.success(`Se ha agregado ${valor} creditos a ${nombre}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(response.data);

            // Actualizar el estado de los créditos del usuario en la tabla
            const updatedUsers = users.map((user) => {
                if (user.id === idUsuario) {
                    return {
                        ...user,
                        credits: user.credits + valor
                    };
                } else {
                    return user;
                }
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <!-- component --> */}
            <div class="bg-gray-900 min-h-screen flex items-center justify-center">
                <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                    {/* <!-- Navigation --> */}
                    <div class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                        <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                            <p class="bg-gray-800 text-white p-4 inline-flex justify-center rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </p>

                            <button onClick={showAdminComponent} class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </button>
                        </nav>
                        <div class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                            <button onClick={exit} class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="flex-1 px-2 sm:px-0 text-white">
                        <div class="flex justify-between items-center">
                            <h3 class="text-3xl font-extralight text-white/50">ADMINISTRAR USUARIOS</h3>
                        </div>

                        <div class="block w-full overflow-x-auto">
                            <table class="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Nombre
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Apellido
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Identificacion
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Correo
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Telefono
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Credits
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Add Credits
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {users.map((user) => (
                                        <tr key={user.identificacion}>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.nombre}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.apellido}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.identificacion}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.correo}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.telefono}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.creditos}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                <div>
                                                    <button onClick={() => aumentarCreditos(user._id, 50, user.nombre)} class="border-2 border-green-600 rounded-lg px-3 py-1 text-white cursor-pointer hover:bg-gray-500 hover:text-white">50</button>
                                                    <button onClick={() => aumentarCreditos(user._id, 100)} class="border-2 border-green-600 rounded-lg px-3 py-1 text-white cursor-pointer hover:bg-gray-500 hover:text-white">100</button>
                                                    <button onClick={() => aumentarCreditos(user._id, 200)} class="border-2 border-green-600 rounded-lg px-3 py-1 text-white cursor-pointer hover:bg-gray-500 hover:text-white">200</button>
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users