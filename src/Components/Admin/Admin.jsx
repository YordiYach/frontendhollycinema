import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddMovieForm from './AddMovie';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    //retornar peliculas
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://backhollycinema.onrender.com/getmovies')
            .then(response => {
                setMovies(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    //fin retornar peliculas

    const [addmovie, setAddmovie] = useState(false)

    const exit = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };


    const liberarAsientos = () => {
        localStorage.removeItem('asientosBloqueados')
        toast.warn('Asientos Liberados', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


    const showMovieComponent = () => {
        setAddmovie(true);
    };

    const showUsersComponent = () => {
        navigate("/admin/users");
    };

    const handleDelete = (id) => {
        axios.delete(`https://backendcinema.onrender.com/deletemovies/${id}`)
            .then(response => {
                setMovies(movies.filter(movie => movie._id !== id)); // Actualiza el estado de las películas eliminando la película con el ID correspondiente
                toast.error('Pelicula Eliminada', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const navigate = useNavigate();

    return (
        <>
            {/* <!-- component --> */}
            <div class="bg-gray-900 min-h-screen flex items-center justify-center">
                <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                    {/* <!-- Navigation --> */}
                    <div class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                        <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                            <button onClick={showUsersComponent} class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </button>

                            <p class="bg-gray-800 text-white p-4 inline-flex justify-center rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </p>
                        </nav>
                        <div class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                            <button onClick={exit} class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="flex-1 px-2 sm:px-0">
                        <div class="flex justify-between items-center">
                            <h3 class="text-3xl font-extralight text-white/50">AGREGAR PELICULAS</h3>
                            <button class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" onClick={liberarAsientos}>
                                Liberar Asientos
                            </button>
                        </div>
                        <div class="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <button onClick={showMovieComponent}>
                                <div class="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                                    <p class="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </p>
                                    <button class="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">Añadir Pelicula</button>
                                </div>
                            </button>
                            {addmovie && <AddMovieForm />}

                            {movies.map(movie => (
                                <p key={movie._id}>
                                    <div class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                                        <img class="w-20 h-20 object-cover object-center rounded-full" src={movie.url} alt={movie.nombre} />
                                        <h4 class="text-white text-2xl font-bold capitalize text-center">{movie.nombre}</h4>
                                        <p class="text-white/50">Cost de Pelicula</p>
                                        <p className='text-amber-200 text-xm text-center pt-1'>${movie.costo}</p>

                                        <button class="border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200" onClick={() => handleDelete(movie._id)}>Eliminar</button>
                                        <p class="absolute top-2 text-white/20 inline-flex items-center text-xs">Online<span class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                                    </div>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
