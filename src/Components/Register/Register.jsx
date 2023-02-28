import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';


const Register = () => {
    const [inputs, setInputs] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        identificacion: "",
        correo: "",
        contraseña: ""
    })


    function limpiarForm() {
        document.getElementById("nombre").value = ("")
        document.getElementById("apellido").value = ("")
        document.getElementById("telefono").value = ("")
        document.getElementById("identificacion").value = ("")
        document.getElementById("correo").value = ("")
        document.getElementById("contraseña").value = ("")
    }

    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    const { nombre, apellido, telefono, identificacion, correo, contraseña } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nombre === "" && apellido === "" && telefono === "" && identificacion === "" && correo === "" && contraseña === "") {
            alert("Llene los campos")
        }

        if (nombre !== "" && apellido !== "" && telefono !== "" && identificacion !== "" && correo !== "" && contraseña !== "") {
            const Usuario = {
                nombre,
                apellido,
                telefono,
                identificacion,
                correo,
                contraseña
            }
            setLoading(true);
            await axios
                .post("http://localhost:4000/register", Usuario)
                .then(({ data }) => {
                    setMensaje(data.mensaje);
                    setInputs({
                        nombre: "",
                        apellido: "",
                        telefono: "",
                        identificacion: "",
                        correo: "",
                        contraseña: ""
                    })
                    limpiarForm()
                })
                .catch((error) => {
                    console.log(error)
                    setMensaje("Hubo un error")
                })
            setLoading(false);
        }
    }


    return (
        <>
            <div class="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-slate-900 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <Link to="/">
                            <button class="bg-gray-800 text-white rounded-l-lg absolute top-0 right-0 m-8 px-2 py-1">Regresar</button>
                        </Link>
                        <div class="max-w-md mx-auto">
                            <div>
                                <h1 class="text-2xl font-semibold">Registrarse</h1>
                            </div>

                            <div class="text-sky-600">
                                {mensaje}
                            </div>


                            <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="nombre" type="text" name='nombre' class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Nombre" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Nombre</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="apellido" type="text" name='apellido' class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Apellido" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Apellido</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="telefono" type="number" name="telefono" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Telefono" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Telefono</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="identificacion" type="number" name='identificacion' class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Identificación" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Identificacion</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="correo" type="text" name="correo" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Identificación" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Correo</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="contraseña" type="password" name='contraseña' class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña</label>
                                    </div>
                                    <div class="relative">
                                        <button onClick={onSubmit} class="bg-gray-800 text-white rounded-md px-2 py-1">{loading ? "cargando" : "Registrarme"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register