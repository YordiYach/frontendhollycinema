import React from 'react';

const Seat = ({ number, isAvailable, isSelected, onSelect }) => {
  const baseClasses = 'rounded-full px-2 py-1';
  const selectedClasses = isSelected ? 'bg-green-500' : 'bg-gray-400 hover:bg-gray-500 cursor-pointer';
  const classes = isAvailable ? `${baseClasses} ${selectedClasses}` : `${baseClasses} bg-gray-300 cursor-not-allowed`;

  return (
    <div className={classes} onClick={onSelect} disabled={!isAvailable}>
      {number}
    </div>
  );
};

export default Seat;
