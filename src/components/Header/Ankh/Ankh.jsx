import ankhSrc from './ankh.svg';
import './ankh_fav.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export const Ankh = () => {
 const navigate = useNavigate()
  return (
    <IconButton onClick={() => {navigate('/private')}}>
    <img src={ankhSrc} alt='Личный кабинет' className='ankh-img' title="Личный кабинет" />
    </IconButton>
  );
};
