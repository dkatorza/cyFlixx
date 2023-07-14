import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../assets/media/nav/icons-search.svg';
import { useSnapshot } from 'valtio';
import queryState from '../stores/queryState';

interface SearchProps {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCriteria: string;
}

const Search = ({ setIsFilterOpen, selectedCriteria }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState<string>('Search cyFlix');
  const location = useLocation();
  const navigate = useNavigate();

  const { criteria, query } = useSnapshot(queryState);
  queryState.criteria = selectedCriteria;

  useEffect(() => {
    switch (selectedCriteria) {
      case 'title':
        setPlaceholder(`Search by movie title,eg: Batman return`);
        break;
      case 'year':
        setPlaceholder(`Search by year, eg: 1986`);
        break;
      case 'length':
        setPlaceholder(`Search by movie length, eg: 176`);
        break;
      case 'genres':
        setPlaceholder(`Search by genre, eg: Drama,Horror...`);
        break;
      case 'rating':
        setPlaceholder(`Search by rating, eg: 8.3`);
        break;
      case 'actors':
        setPlaceholder(`Search by actors, eg: Robert Pattinson `);
        break;

      default:
        'title';
        break;
    }
  }, [selectedCriteria]);

  const handleSearch = () => {
    if (location.pathname.includes('/movie') && inputRef.current?.value) {
      navigate('/home');
    }
  };

  return (
    <div className='search-wrapper'>
      <div className='filter-wrapper'>
        <div
          className='filter-btn'
          onClick={() => {
            setIsFilterOpen(true);
          }}>
          {selectedCriteria}
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => (queryState.query = e.target.value)}
          type='text'
          placeholder={placeholder}
        />
      </div>

      <div className='search-icon-wrapper' onClick={handleSearch}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
