import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';


export default function BackButton() {  
  const navigate = useNavigate();
  return ( 
  <div>
    <IconButton className='icon_button' aria-label='back' onClick={() => navigate('/catalog')} >
        <ArrowBackIcon className='login_button' fontSize='medium' />
    </IconButton>
  </div>
);
}