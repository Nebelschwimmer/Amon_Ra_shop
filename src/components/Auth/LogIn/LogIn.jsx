import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";
import "../auth_style.css";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const LogIn = ({ setShowModal }) => {
  const [type, setType] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

 
  const sendData = async (data) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.log();
      alert('Неправильные логин пароль');
    }
  };

  const emailRegister = register("email", {
    required: "E-mail обязателен",
  });
  const passwordRegister = register("password", {
    
    required: "Пароль обязателен",
    pattern
  });

  
  
  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

 
 
 
  return (
    <>
      <div className="form_close_butn_wrapper">
      <button className="form_close_btn" title="Закрыть" onClick={()=>{setShowModal(false); navigate('/not_authenticated')}}><CloseIcon/></button>
      </div>
      <Form submitForm={handleSubmit(sendData)} title={"Вход"}>
        <div className="auth__controls">
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          />
          {errors?.email && (
            <span className="auth__info">{errors.email?.message}</span>
          )}
          <input
            type={type ? "text" : "password"}
            {...passwordRegister}
            placeholder="Пароль"
            className="auth__input"
          />
          {errors?.password && (
            <span className="auth__info">{errors.password?.message}</span>
          )}
          {!errors?.password &&
                     <span className="auth__eye_register" onClick={() => setType(!type)}>
                        {type ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </span>
                    
                    }

          <span className="auth__info auth__link" onClick={() => navigate('/reset-password')}>Восстановить пароль</span>
          
          
          <div className="auth__actions">
            <BaseButton type="submit" color={"yellow"}>
              <span>Войти</span>
            </BaseButton>
            <BaseButton onClick={handleClick} color={"white"}>
              <span>Регистрация</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};