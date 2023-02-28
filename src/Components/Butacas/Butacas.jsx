import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

function AsientosCine({ precio, pel }) {
    const token = localStorage.getItem('token')

    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [asientosParaBloquear, setAsientosParaBloquear] = useState([]);
    const [asientosBloqueados, setAsientosBloqueados] = useState(['0-1', '0-2', '0-6', '0-7', '1-4', '1-5', '1-9', '1-10', '2-1', '2-2', '2-6', '2-7', '3-4', '3-5', '3-9', '3-10', '4-1', '4-2', '4-6', '4-7',]);

    const [salaSeleccionada, setSalaSeleccionada] = useState("");
    const handleSelectChangeSala = (e) => {
        setSalaSeleccionada(e.target.value);
        setDatos({ ...datos, sala: e.target.value })
    }

    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const handleSelectChangeHora = (e) => {
        setHoraSeleccionada(e.target.value);
        setDatos({ ...datos, horario: e.target.value })
    }

    const filas = 5;
    const columnas = 10;

    const numerosDeAsiento = [...Array(columnas).keys()].map((i) => i + 1);

    const manejarClicAsiento = (fila, asiento) => {
        const idAsiento = `${fila}-${asiento}`;

        if (asientosBloqueados.includes(idAsiento) || asientosParaBloquear.includes(idAsiento)) {
            // Si el asiento está bloqueado o en la lista de asientos para bloquear, no hacemos nada
            return;
        }

        if (asientosParaBloquear.includes(idAsiento)) {
            setAsientosParaBloquear(asientosParaBloquear.filter((asiento) => asiento !== idAsiento));
        } else {
            setAsientosParaBloquear([...asientosParaBloquear, idAsiento]);
        }
    };

    const bloquearAsientosSeleccionados = () => {
        const asientosString = asientosParaBloquear.join(', ');
        setAsientosBloqueados([...asientosBloqueados, ...asientosParaBloquear]);
        setDatos({ ...datos, asientos: asientosString });
    };

    const [datos, setDatos] = useState({
        usuario: "",
        pelicula: pel,
        sala: "",
        asientos: "1-5, 0-2",
        horario: "",
        total: precio
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (token) {
                axios
                    .post("http://localhost:4000/factura", datos)
                    .then(({ data }) => {
                        setMensaje(data.mensaje);
                        setTimeout(() => {
                            setMensaje("")
                            setLoading(false)
                            alert("Transaccion Realizada con Éxito")
                            navigate("/reservaciones")
                        }, 1600);
                    })
                bloquearAsientosSeleccionados();
                console.log(datos)
                setAsientosParaBloquear([]);
            } else {
                alert("inicia sesion antes")
                navigate(`/login`);
            }
        } catch (error) {
            console.error(error);
            setMensaje("Error al crear la factura");
        }

    };

    const navigate = useNavigate();
    return (
        <div className="bg-gray-800 h-screen text-white text-center ">

            <div>Precio del Boleto ${precio}</div>
            <p> {mensaje} </p>
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

            <p className='text-amber-200 text-xm text-center pt-1'>* Lo sentimos, por regulaciones de COVID no se cuenta con todos los asientos disponibles 😷*</p>

            <h1 className="text-lg font-bold mb-2">Selecciona tus asientos</h1>

            <div className="justify-items-center flex justify-center space-x-2">
                <div className="col-span-1">
                    {[...Array(filas).keys()].map((fila) => (
                        <div key={fila} className="text-center">
                            Fila {fila + 1}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-10 gap-3">
                    {Array.from({ length: filas }, (_, fila) =>
                        numerosDeAsiento.map((asiento) => {
                            const idAsiento = `${fila}-${asiento}`;
                            const estaSeleccionado = asientosSeleccionados.includes(idAsiento);
                            const estaBloqueado = asientosBloqueados.includes(idAsiento);
                            const estaParaBloquear = asientosParaBloquear.includes(idAsiento);
                            return (
                                <div
                                    key={asiento}
                                    className={`cursor-pointer rounded-t-lg px-5 py-3 border-b-4 font-extrabold border-slate-600 ${estaSeleccionado ? 'bg-green-500 text-white' : estaBloqueado ? 'bg-red-400 cursor-not-allowed' : estaParaBloquear ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-500 hover:bg-gray-400'
                                        }`}
                                    onClick={() => manejarClicAsiento(fila, asiento)}
                                >
                                    {asiento}
                                </div>
                            );
                        })
                    )}

                </div>
            </div>
            <div class="bg-gray-800 p-5 text-center">

                <Link to="/">
                    <button class="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 mr-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelar
                    </button>
                </Link>


                <button onClick={handleFormSubmit} disabled={asientosParaBloquear.length === 0} class="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 ml-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Reservar Asientos ({asientosParaBloquear.length})
                </button>

            </div>
            {
                asientosSeleccionados.length > 0 && (
                    <div class="text-xs decoration-transparent">
                        <p>Asientos seleccionados:</p>
                        {asientosSeleccionados.map((asiento) => (
                            <li key={asiento}>Asiento (fila, numero) {asiento} {setDatos({ ...datos, asientos: asiento })}</li>
                        ))}
                    </div>
                )
            }
        </div >
    );
}

export default AsientosCine;
