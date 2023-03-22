import './private.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/context/user_context';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { api } from '../../utils/api';



export const Private = () => {
    const {currentUser} = useContext(UserContext);
    
 
      

return (
<div>
   <div className='private_container'>
        <div className='private_title'>
            <h1>Личный кабинет</h1>
        </div>
        
            <div className='private_image_info'>
                <div className='private_image_wrapper'>
                    <img className='private_image' src={currentUser.avatar}/>    
                </div>      
                
                <div className='private_user_info'>
                    <div className='private_user_data_wrapper'>
                        <span className='private_user_data'>Данные пользователя</span>
                    </div>
                    <div className='info_grid'>
                    <div className='private_user_info_titles_container'>
                        <span className='private_user_info_title' >Ваше имя: </span>
                        <span className='private_user_info_title' >Электронная почта: </span>
                        <span className='private_user_info_title' >Дополнительная информация: </span>  
                    </div>
                    <div className='private_user_info_inputs_container'>
                        <span className='private_input_icon'>
                        <span className='private_input_icon' ><input className='private_user_info_input' value={currentUser.name}></input><ModeEditOutlineOutlinedIcon className='private_edit_icon' fontSize='small'/></span>
                           
                        </span>
                    <span className='private_input_icon' ><input className='private_user_info_input' value={currentUser.email}></input></span>
                    <span className='private_input_icon' ><input className='private_user_info_input' value={currentUser.about}></input><ModeEditOutlineOutlinedIcon className='private_edit_icon' fontSize='small'/></span>
                    </div>
                    </div>

                </div>
    
        </div>
    </div>
    </div>



    
)
}