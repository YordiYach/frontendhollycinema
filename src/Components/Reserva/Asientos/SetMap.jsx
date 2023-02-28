import React, { useState } from 'react';
import SeatRow from './FilaAsientos';
import { Link } from 'react-router-dom';

const SeatMap = (props) => {
    const [seats, setSeats] = useState([
        { number: 1, isAvailable: true, isSelected: false },
        { number: 2, isAvailable: true, isSelected: false },
        { number: 3, isAvailable: true, isSelected: false },
        { number: 4, isAvailable: false, isSelected: false },
        { number: 5, isAvailable: false, isSelected: false },
        { number: 6, isAvailable: true, isSelected: false },
        { number: 7, isAvailable: true, isSelected: false },
        { number: 8, isAvailable: true, isSelected: false },
        { number: 9, isAvailable: false, isSelected: false },
        { number: 10, isAvailable: false, isSelected: false },
        { number: 11, isAvailable: true, isSelected: false },
        { number: 12, isAvailable: true, isSelected: false },
        { number: 13, isAvailable: true, isSelected: false },
        { number: 14, isAvailable: false, isSelected: false },
        { number: 15, isAvailable: false, isSelected: false },
        { number: 16, isAvailable: true, isSelected: false },
        { number: 17, isAvailable: true, isSelected: false },
        { number: 18, isAvailable: true, isSelected: false },
        { number: 19, isAvailable: false, isSelected: false },
        { number: 20, isAvailable: false, isSelected: false },
        { number: 21, isAvailable: false, isSelected: false },
        { number: 22, isAvailable: false, isSelected: false },
        { number: 23, isAvailable: true, isSelected: false },
        { number: 24, isAvailable: true, isSelected: false },
        { number: 25, isAvailable: true, isSelected: false },
        { number: 26, isAvailable: false, isSelected: false },
        { number: 27, isAvailable: false, isSelected: false },
        { number: 28, isAvailable: true, isSelected: false },
        { number: 29, isAvailable: true, isSelected: false },
        { number: 30, isAvailable: true, isSelected: false },
        { number: 31, isAvailable: true, isSelected: false },
        { number: 32, isAvailable: true, isSelected: false },
        { number: 33, isAvailable: true, isSelected: false },
        { number: 34, isAvailable: false, isSelected: false },
        { number: 35, isAvailable: false, isSelected: false },
        { number: 36, isAvailable: true, isSelected: false },
        { number: 37, isAvailable: true, isSelected: false },
        { number: 38, isAvailable: true, isSelected: false },
        { number: 39, isAvailable: false, isSelected: false },
        { number: 40, isAvailable: false, isSelected: false },
        { number: 41, isAvailable: false, isSelected: false },
        { number: 42, isAvailable: false, isSelected: false },
        { number: 43, isAvailable: true, isSelected: false },
        { number: 44, isAvailable: true, isSelected: false },
        { number: 45, isAvailable: true, isSelected: false },
        { number: 46, isAvailable: false, isSelected: false },
        { number: 47, isAvailable: false, isSelected: false },
        { number: 48, isAvailable: true, isSelected: false },
        { number: 49, isAvailable: true, isSelected: false },
        { number: 50, isAvailable: true, isSelected: false }
    ]);

    const handleSeatSelect = (selectedSeat) => {
        const updatedSeats = seats.map((seat) => {
            if (seat.number === selectedSeat.number) {
                return { ...seat, isSelected: !seat.isSelected };
            }
            return seat;
        });
        setSeats(updatedSeats);
    };

    return (
        <div className='bg-gray-800 h-screen text-white text-center'>

            <div class="relative inline-flex text-center">
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                <select class="border border-gray-800 rounded-md text-gray-600 h-10 pl-5 m-1 pr-10 bg-sky-200 hover:border-gray-400 focus:outline-none appearance-none">
                    <option>Sala</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                </select>
            </div>

            <div class="relative inline-flex text-center">
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                <select class="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 m-1 pr-10 bg-teal-200 hover:border-gray-400 focus:outline-none appearance-none">
                    <option>Horario</option>
                    <option>14:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                </select>
            </div>

            <p className='text-amber-200 text-xm text-center pt-1'>* Lo sentimos, por regulaciones de COVID no se cuenta con todos los asientos disponibles 😷*</p>
            <div className="p-2" >
                <SeatRow rowNumber={1} seats={seats.slice(0, 3)} onSeatSelect={handleSeatSelect} />
                <SeatRow rowNumber={2} seats={seats.slice(3, 10)} onSeatSelect={handleSeatSelect} />
                <SeatRow rowNumber={3} seats={seats.slice(10, 20)} onSeatSelect={handleSeatSelect} />
                <SeatRow rowNumber={4} seats={seats.slice(20, 30)} onSeatSelect={handleSeatSelect} />
                <SeatRow rowNumber={5} seats={seats.slice(30, 40)} onSeatSelect={handleSeatSelect} />
                <SeatRow rowNumber={6} seats={seats.slice(40, 50)} onSeatSelect={handleSeatSelect} />
            </div>
            <div class="bg-gray-800 p-1 text-center">

                <Link to="/">
                    <button class="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 mr-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelar
                    </button>
                </Link>

                <Link to="/reservaciones">
                    <button class="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-flex items-center px-10 py-4 ml-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Reservar
                    </button>
                </Link>
            </div>

        <p>{props.dato}</p>

        </div>
    );
};

export default SeatMap;