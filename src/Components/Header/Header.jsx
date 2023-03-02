import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const Header = () => {
    const [name, setName] = useState("")

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            axios.get(`https://backhollycinema.onrender.com/user`, {
                headers: {
                    token: token
                }
            })
                .then(({ data }) => setName(data.nombre))
                .catch(error => console.error(error))
        }

    }, [token]);

    return (
        <>

            <div class="bg-slate-900">
                <div class="container mx-auto px-4">
                    <div class="flex items-center justify-between py-4">

                        <div class="hidden sm:flex sm:items-center">
                            <Link to="/reservaciones">
                                <p class="text-white text-sm font-semibold hover:text-sky-300 mr-4">{name ? `Mis Reservaciones` : ``}</p>
                            </Link>
                        </div>

                        <p class="text-white text-5xl text-center hover:text-sky-300 font-black p-2">HOLLYCINEMA</p>

                        <div class="hidden sm:flex sm:items-center ">
                            <Link to="/register">
                                <h1 class="text-white text-sm font-semibold hover:text-sky-300 mr-4">{name ? `¡Hola ${name}!` : `Registrarse`}</h1>
                            </Link>

                            <Link to="/login">
                                <h1 class="text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-sky-300 hover:border-sky-600">{name ? `Cambiar de cuenta` : `Iniciar Sesion`}</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
