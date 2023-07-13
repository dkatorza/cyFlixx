import React from 'react';
import { ReactComponent as CloseIcon } from '../assets/media/general/icons-close.svg';

interface FilterProps {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterMenu = ({ setIsFilterOpen }: FilterProps) => {
  return (
    <div className='filter-menu-wrapper'>
      FilterMenu
      <div
        className='close-filter'
        onClick={() => {
          setIsFilterOpen(false);
        }}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default FilterMenu;
