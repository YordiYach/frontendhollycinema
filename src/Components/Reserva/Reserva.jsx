import React from 'react'
const Reserva = (props) => {

    return (
        <>
            <div class="bg-gray-800 ">
                <div class="container mx-auto px-4 p-2">
                    <p class="text-white text-5xl text-center hover:text-sky-300 font-black">SELECCIONA TUS ASIENTOS</p>
                    <p class="text-gray-400 text-center font-black text-2xl">Haz seleccionado: {props.dato}</p>
                </div>
            </div>
        </>
    )
}

export default Reserva