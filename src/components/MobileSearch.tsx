import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../assets/media/general/icons-close.svg';

interface MobileSearchProps {
  setIsMobileSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileSearch = ({ setIsMobileSearchOpen }: MobileSearchProps) => {
  const searchRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);
  return (
    <div className='mobile-search-bar'>
      <div className='inputs-wrapper'>
        <div className='inner-bar'>
          <input ref={searchRef} type='text' placeholder='Search cyFlix' />
        </div>
        <div
          className='close-search'
          onClick={() => {
            setIsMobileSearchOpen(false);
          }}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
