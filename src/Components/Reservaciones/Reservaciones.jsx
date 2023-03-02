import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Reservaciones = () => {
    const [facturas, setFacturas] = useState([]);
    const [name, setName] = useState("")
    const [creditos, setCreditos] = useState("")
    const token = localStorage.getItem('token')


    const config = {
        headers: { token: `${localStorage.getItem('token')}` }
    };

    function inicio() {
        navigate("/")
    }

    useEffect(() => {
        if (token) {
            axios.get(`https://backhollycinema.onrender.com/user`, {
                headers: {
                    token: token
                }
            })
                .then(({ data }) => {
                    setName(data.nombre)
                    setCreditos(data.creditos)
                })
                .catch(error => console.error(error))
        }

    }, [token]);

    useEffect(() => {
        const fetchfacturas = async () => {
            const response = await axios.get('https://backhollycinema.onrender.com/getfacturas', config);
            setFacturas(response.data);
        };
        fetchfacturas();
    }, []);

    const navigate = useNavigate()

    return (
        <>
            <div class="bg-slate-900 font-sans pb-6">
                <header aria-label="Page Header">
                    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                        <div class="sm:flex sm:items-center sm:justify-between">
                            <div class="text-center sm:text-left">
                                <h1 class="text-3xl font-bold text-white sm:text-4xl">
                                    Hola {name}, aqui puedes encontrar tus reservas
                                </h1>

                                <p class="mt-1.5 text-xl text-sky-500">
                                    Creditos Actuales {creditos} 🎉
                                </p>
                            </div>

                            <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                <button
                                    onClick={inicio}
                                    class="inline-flex items-center justify-center rounded-lg border border-white px-5 py-3 text-white transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                                    type="button"
                                >
                                    <span class="text-sm font-medium"> Volver al Inicio </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="ml-1.5 h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>



            <section class="py-1 bg-blueGray-50">
                <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600 text-white">
                            <div class="flex flex-wrap items-center">
                                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 class="font-semibold text-base text-blueGray-700">Historial de Reservas</h3>
                                </div>
                            </div>
                        </div>

                        <div class="block w-full overflow-x-auto">
                            <table class="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID FACTURA
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            PELICULA
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            SALA
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ASIENTOS
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            HORARIO
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            TOTAL
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {facturas.map((user) => (
                                        <tr key={user.identificacion}>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user._id}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.pelicula}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.sala}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.asientos}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.horario}
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {user.total}
                                            </th>
                                            <th>
                                                <span
                                                    class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="-ml-1 mr-1.5 h-4 w-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>

                                                    <p class="whitespace-nowrap text-sm">Paid</p>
                                                </span>
                                            </th>
                                        </tr>

                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Reservaciones
