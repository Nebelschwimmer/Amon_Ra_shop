import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';


import { useState } from 'react';


export default function IconLogin() {  
  
  const [activeModal, setShowModal] = useState(false);
 
  
  return ( 
  <div title="Войти">
  
    
    <IconButton className='icon_button' aria-label='Войти' onClick={() => setShowModal(true)}>
        <LoginRoundedIcon className='login_button' fontSize='large' />
    </IconButton>
  </div>
);
}

