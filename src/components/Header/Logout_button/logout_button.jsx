import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


export default function IconLogout() {  
    return ( 
    <div title="Выйти">
      <IconButton className='icon_button' aria-label='Выйти'>
          <LogoutRoundedIcon className='login_button' fontSize='large' />
      </IconButton>
    </div>
  );
  }
