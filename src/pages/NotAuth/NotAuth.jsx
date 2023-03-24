import {useNavigate } from "react-router-dom"

export const NotAuth = () => {
const navigate = useNavigate()



return (
<div  className="not__auth">Пожалуйста, авторизуйтесь
<button className='not_auth_btn' onClick={()=>{navigate('/login')}}> Вход / Регистрация</button>
</div>

)

}