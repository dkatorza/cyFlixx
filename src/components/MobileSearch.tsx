import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../assets/media/general/icons-close.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import queryState from '../stores/queryState';
import FilterMenu from './FilterMenu';
import { ReactComponent as SearchIcon } from '../assets/media/nav/icons-search.svg';

interface MobileSearchProps {
  setIsMobileSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCriteria: React.Dispatch<React.SetStateAction<string>>;
  selectedCriteria: string;
}

export const MobileSearch = ({
  setIsMobileSearchOpen,
  setIsFilterOpen,
  setSelectedCriteria,
  selectedCriteria,
}: MobileSearchProps) => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { criteria, query } = useSnapshot(queryState);
  queryState.criteria = selectedCriteria;

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (location.pathname.includes('/movie') && searchRef.current?.value) {
      navigate('/home');
    }
  };

  return (
    <div className='mobile-search-bar'>
      <div className='inputs-wrapper'>
        <div className='inner-bar'>
          <div className='search-icon-wrapper' onClick={handleSearch}>
            <SearchIcon />
          </div>
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => (queryState.query = e.target.value)}
            type='text'
            placeholder='Search cyFlix'
          />
        </div>

        <div
          className='close-search'
          onClick={() => {
            setIsMobileSearchOpen(false);
          }}>
          <CloseIcon />
        </div>
      </div>
      <FilterMenu
        setIsFilterOpen={setIsFilterOpen}
        setSelectedCriteria={setSelectedCriteria}
        selectedCriteria={selectedCriteria}
      />
    </div>
  );
};
