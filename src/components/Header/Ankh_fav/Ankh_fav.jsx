import ankhSrc from './ankh.svg';
import './ankh_fav.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export const Ankh_fav = () => {
  return (
    <IconButton>
    <img src={ankhSrc} alt='Личный кабинет' className='ankh-img' />
    </IconButton>
  );
};
