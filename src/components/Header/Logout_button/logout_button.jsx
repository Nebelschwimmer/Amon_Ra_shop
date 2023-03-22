import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { UserContext } from '../../context/user_context';


export default function IconLogout() {  
  
  const navigate = useNavigate()
  const {handleLogout} = React.useContext(UserContext)
 

 
  
  
  return ( 
    <div title="Выйти">
      <IconButton  className='icon_button' aria-label='Выйти' onClick={handleLogout}>
          <LogoutRoundedIcon  className='login_button' fontSize='large'>  </LogoutRoundedIcon>
      </IconButton>
    </div>
  );
  }
