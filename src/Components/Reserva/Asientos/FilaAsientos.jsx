import React from 'react';
import Seat from './Asiento';

const SeatRow = ({ rowNumber, seats, onSeatSelect}) => {
  return (
    <div className="flex justify-center space-x-2">
      {seats.map((seat) => (
        <Seat
          key={seat.number}
          number={`${rowNumber}-${seat.number}`}
          isAvailable={seat.isAvailable}
          isSelected={seat.isSelected}
          onSelect={() => onSeatSelect(seat)}
        />
      ))}
    </div>
  );
};

export default SeatRow;