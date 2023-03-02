import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header2 = () => {
    const [name, setName] = useState("")

    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    };


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

    const navigate = useNavigate()
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
                                <h1 class="text-white text-sm font-semibold hover:text-sky-300 mr-4">{`¡Hola ${name}!`}</h1>
                            </Link>

                            <button class="border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200" onClick={logout}>
                                Cerrar Sesion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header2
