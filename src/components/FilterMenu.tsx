import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../assets/media/general/icons-close.svg';

interface FilterProps {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCriteria: React.Dispatch<React.SetStateAction<string>>;
  selectedCriteria: string;
}

const FilterMenu = ({
  setIsFilterOpen,
  setSelectedCriteria,
  selectedCriteria,
}: FilterProps) => {
  const filterCriteria = [
    'title',
    'year',
    'length',
    'genres',
    'rating',
    'actors',
  ];

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCriteria) {
      setActive(
        (active) => (active = filterCriteria.indexOf(selectedCriteria))
      );
    }
  }, []);

  const handleSelectCriteria = (idx: number, criteria: string) => {
    setActive(idx);
    setSelectedCriteria(criteria);
  };

  return (
    <div className='filter-menu-wrapper'>
      {filterCriteria.map((criteria, idx) => {
        return (
          <span
            className={active === idx ? 'active' : ''}
            key={idx}
            onClick={() => {
              handleSelectCriteria(idx, criteria);
            }}>
            {criteria}
          </span>
        );
      })}
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
