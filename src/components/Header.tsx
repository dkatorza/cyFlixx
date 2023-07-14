import { useState } from 'react';
import { Link } from 'react-router-dom';
import cyLogo from '../assets/media/general/cyflixLogo2.png';
import { ReactComponent as SearchIcon } from '../assets/media/nav/icons-search.svg';
import { MobileSearch } from './MobileSearch';
import Search from './Search';
import FilterMenu from './FilterMenu';

const Header = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState('title');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <header>
        <div className='header-inner'>
          <Link to={'/home'} className='cyLogo'>
            <img src={cyLogo} alt='' />
          </Link>
          <div
            className='search-icon'
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
            <SearchIcon />
          </div>
          <Search
            setIsFilterOpen={setIsFilterOpen}
            selectedCriteria={selectedCriteria}
          />
        </div>
      </header>
      {isMobileSearchOpen && (
        <MobileSearch
          setIsMobileSearchOpen={setIsMobileSearchOpen}
          setIsFilterOpen={setIsFilterOpen}
          setSelectedCriteria={setSelectedCriteria}
          selectedCriteria={selectedCriteria}
        />
      )}
      {isFilterOpen && (
        <FilterMenu
          setIsFilterOpen={setIsFilterOpen}
          setSelectedCriteria={setSelectedCriteria}
          selectedCriteria={selectedCriteria}
        />
      )}
    </>
  );
};

export default Header;
