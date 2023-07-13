import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/media/nav/icons-search.svg';

const Search = () => {
  return (
    <div className='search-wrapper'>
      <div className='filter-wrapper'>
        <div className='filter-btn'>All</div>
        <input type='text' placeholder='Search cyFlix' />
      </div>

      <div className='search-icon-wrapper'>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
