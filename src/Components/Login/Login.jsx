import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [inputs, setInputs] = useState({ correo: "", contraseña: "" })

    function limpiarForm() {
        document.getElementById("correo").value = ("")
        document.getElementById("contraseña").value = ("")
    }

    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    const { correo, contraseña } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (correo === "" && contraseña === "") {
            toast.error('Llena todos los campos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (correo === "admin" && contraseña === "admin") {
            swal("ADMIN", `Estas logueado como un administrador`, "warning");
            navigate('/admin/movies');
        } else {
            if (correo !== "" && contraseña !== "") {
                const Usuario = {
                    correo,
                    contraseña
                }
                setLoading(true);
                await axios
                    .post("https://backendcinema.onrender.com/login", Usuario)
                    .then(({ data }) => {
                        setMensaje(data.mensaje);
                        setInputs({ correo: "", contraseña: "" })
                        setTimeout(() => {
                            setMensaje("")
                            localStorage.setItem('token', data?.usuario.token)
                            navigate(`/`);
                            setLoading(false)
                            toast.success('¡Sesion Iniciada Correctamente!', {
                                position: "top-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        }, 1500);
                        limpiarForm()
                    })
                    .catch((error) => {
                        console.log(error)
                        setMensaje("Hubo un error")
                    })
                setLoading(false);
            }
        }
    }
    const navigate = useNavigate();


    return (
        <>
            <div class="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-slate-900 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <Link to="/">
                            <button
                                class="group inline-flex items-center absolute overflow-hidden top-0 right-0 m-5 rounded bg-gray-800 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                            >
                                <span
                                    class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>

                                <span class="text-sm font-medium transition-all group-hover:mr-4">
                                    Regresar
                                </span>
                            </button>
                        </Link>
                        <div class="max-w-md mx-auto">
                            <div>
                                <h1 class="text-2xl font-semibold">Iniciar Sesion</h1>
                            </div>

                            <div class="text-sky-600">
                                {mensaje}
                            </div>
                            <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="correo" name="correo" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="correo" />
                                        <label for="correo" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Correo</label>
                                    </div>
                                    <div class="relative">
                                        <input onChange={(e) => onChange(e)} autocomplete="off" id="contraseña" name="contraseña" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label for="contraseña" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña</label>
                                    </div>

                                    <div class="relative text-center">
                                        <button
                                            onClick={onSubmit}
                                            class="group relative inline-flex items-center overflow-hidden rounded bg-gray-800 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500"
                                        >
                                            <span
                                                class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4"
                                            >
                                                <svg
                                                    class="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </span>

                                            <span class="text-sm font-medium transition-all group-hover:ml-4">
                                                {loading ? "cargando" : "Iniciar Sesion"}

                                            </span>
                                        </button>
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

export default Login