import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import './login_button.css'

export default function IconLogin() {  
  return ( 
  <div>
    <IconButton className='icon_button' aria-label='cart'>
        <LoginRoundedIcon className='login_button' fontSize='large' />
    </IconButton>
  </div>
);
}