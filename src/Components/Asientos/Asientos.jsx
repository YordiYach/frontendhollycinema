import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";

function Asientos({ precio, pel }) {
    const token = localStorage.getItem('token')

    const precioFinal = parseInt(precio);

    const config = {
        headers: { token: `${localStorage.getItem('token')}` }
    };

    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    //METE AL ARRAY LA SALA SELECCIONADA
    const [salaSeleccionada, setSalaSeleccionada] = useState("");
    const handleSelectChangeSala = (e) => {
        setSalaSeleccionada(e.target.value);
        setDatos({ ...datos, sala: e.target.value })
    }

    //METE AL ARRAY LA HORA SELECCIONADA
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const handleSelectChangeHora = (e) => {
        setHoraSeleccionada(e.target.value);
        setDatos({ ...datos, horario: e.target.value })
    }

    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [asientosParaBloquear, setAsientosParaBloquear] = useState([]);
    const [asientosBloqueados, setAsientosBloqueados] = useState(() => {
        // Obtiene los asientos bloqueados del Local Storage, si existen
        const asientosBloqueadosGuardados =
            JSON.parse(localStorage.getItem("asientosBloqueados")) || [1, 2, 6, 7, 14, 15, 19, 20, 21, 22, 26, 27, 34, 35, 39, 40, 41, 42, 46, 47];
        return asientosBloqueadosGuardados;
    });

    const navigate = useNavigate();
    //CODIGO NUEVO
    const [asientos, setAsientos] = useState(
        Array(50)
            .fill()
            .map((_, i) => i + 1)
    );

    function seleccionarAsiento(asiento) {
        if (
            asientosBloqueados.includes(asiento) ||
            asientosParaBloquear.includes(asiento)
        ) {
            return;
        }
        if (asientosSeleccionados.includes(asiento)) {
            setAsientosSeleccionados((asientosSeleccionados) =>
                asientosSeleccionados.filter((a) => a !== asiento)
            );
        } else {
            setAsientosSeleccionados((asientosSeleccionados) => [
                ...asientosSeleccionados,
                asiento,
            ]);
        }
    }

    function bloquearAsientosSeleccionados() {
        setAsientosParaBloquear(asientosSeleccionados);
        setAsientosSeleccionados([]);
    }

    useEffect(() => {
        if (asientosParaBloquear.length > 0) {
            setAsientosBloqueados((asientosBloqueados) => [
                ...asientosBloqueados,
                ...asientosParaBloquear,
            ]);
            setAsientosParaBloquear([]);
        }
    }, [asientosParaBloquear]);

    useEffect(() => {
        localStorage.setItem(
            "asientosBloqueados",
            JSON.stringify(asientosBloqueados)
        );
    }, [asientosBloqueados]);
    const numeroAsientos = asientosSeleccionados.length
    const totalFactura = numeroAsientos * precioFinal

    useEffect(() => {
        setDatos({
            ...datos,
            asientos: asientosSeleccionados.join(","),
            total: totalFactura
        });
    }, [asientosSeleccionados, totalFactura]);
    const [datos, setDatos] = useState({
        pelicula: pel,
        sala: "",
        asientos,
        horario: "",
        total: 0
    })
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (token) {
                const response = await axios
                    .post("https://backendcinema.onrender.com/factura", datos, config)
                    .then(({ data }) => {
                        setMensaje(data.mensaje);
                        bloquearAsientosSeleccionados();
                        setTimeout(() => {
                            setMensaje("")
                            setLoading(false)
                            swal("Éxito", `Se ha realizado la transacción con éxito`, "success");
                            navigate("/reservaciones")
                        }, 1200);
                        return data;
                    })
            } else {
                toast.error('Debes de iniciar sesion', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(`/login`);
            }
        } catch (error) {
            console.error(error.response.data.error);
            setMensaje(error.response.data.error)
        }

    };

    return (
        <div>
            <div class="bg-gray-800 h-screen text-white text-center ">

                <div>Precio del Boleto ${precio}</div>
                {mensaje && <div>{mensaje}</div>}
                
                <div class="relative inline-flex text-center">
                    <svg class="w- h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                    <select value={salaSeleccionada} onChange={handleSelectChangeSala} class="border border-gray-800 rounded-md text-gray-600 h-10 pl-5 m-1 pr-10 bg-sky-200 hover:border-gray-400 focus:outline-none appearance-none">
                        <option value="">Sala</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                    </select>
                </div>

                <div class="relative inline-flex text-center">
                    <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                    <select value={horaSeleccionada} onChange={handleSelectChangeHora} class="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 m-1 pr-10 bg-teal-200 hover:border-gray-400 focus:outline-none appearance-none">
                        <option value="">Horario</option>
                        <option value="14:00">14:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                    </select>
                </div>

                <p class='text-amber-200 text-xm text-center pt-1'>* Lo sentimos, por regulaciones de COVID no se cuenta con todos los asientos disponibles 😷*</p>

                <h1 class="text-lg font-bold mb-2">Selecciona tus asientos</h1>

                <div class="justify-items-center flex justify-center space-x-2">
                    <div class="grid grid-cols-10 gap-3">
                        {asientos.map((asiento) => (
                            <div
                                key={asiento}
                                class={`cursor-pointer rounded-t-lg px-5 py-3 border-b-4 font-extrabold border-slate-600 ${asientosBloqueados.includes(asiento)
                                    ? "bg-red-500 text-white"
                                    : asientosSeleccionados.includes(asiento)
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-500 text-white"
                                    }`}
                                onClick={() => seleccionarAsiento(asiento)}
                            >
                                {asiento}
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/">
                    <button class="mt-4 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 mr-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelar
                    </button>
                </Link>
                <button
                    class=" mt-4 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 mr-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md"
                    onClick={handleFormSubmit} disabled={asientosSeleccionados.length === 0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Reservar ({asientosSeleccionados.length})
                </button>

            </div>
        </div >
    );
}

export default Asientos;