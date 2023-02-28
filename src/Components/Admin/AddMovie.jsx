import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = () => {
    const [inputs, setInputs] = useState({ nombre: "", url: "", costo: " " })


    function limpiarForm() {
        document.getElementById("nombre").value = ("")
        document.getElementById("url").value = ("")
        document.getElementById("costo").value = ("")
    }

    const [mensaje, setMensaje] = useState()
    const [loading, setLoading] = useState(false)

    const { nombre, url, costo } = inputs;


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nombre === "" && url === "" && costo === "") {
            alert("Llene los campos")
        }

        if (nombre !== "" && url !== "" && costo !== "") {
            const Movie = {
                nombre,
                url,
                costo
            }
            setLoading(true);
            await axios
                .post("http://localhost:4000/addmovie", Movie)
                .then(({ data }) => {
                    setMensaje(data.mensaje);
                    setInputs({ nombre: "", url: "", costo: "" })
                    setTimeout(() => {
                        setMensaje("")
                        navigate("/admin/movies")
                        setLoading(false)
                    }, 1600);
                    limpiarForm()
                })
                .catch((error) => {
                    console.log(error)
                    setMensaje("Hubo un error")
                })
            setLoading(false);
        }
    }

    const navigate = useNavigate();

    return (
        <>
            <div class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                <div className="mb-2">
                    <label htmlFor="movieName" className="block text-white font-bold mb-1">
                        Movie Name
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        onChange={(e) => onChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter movie name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="movieImage" className="block text-white font-bold mb-2">
                        Movie Image URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        onChange={(e) => onChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter movie image URL"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="movieCost" className="block text-white font-bold mb-2">
                        Costo de pelicula
                    </label>
                    <input
                        type="text"
                        id="costo"
                        name='costo'
                        onChange={(e) => onChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter movie cost"
                    />
                </div>
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Movie
                </button>
            </div>

        </>
    );
};

export default AddMovieForm;
