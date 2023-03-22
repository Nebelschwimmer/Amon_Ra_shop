import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Register = ({ setShowModal }) => {
    
    const [type, setType] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e);
        navigate("/login");
    };

    const sendData = async (data) => {
        try {
            await authApi.registerUser({ ...data, group: 'group-10' });
            navigate("/login");
        } catch (error) {
            alert("Ошибка. Проверьте правильность e-mail и пароля. Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра.");
        }
    };

    const emailRegister = register("email", {
        required: "Email обязателен",
    });
    const passwordRegister = register("password", {
        required: "Пароль обязателен",
        pattern: pattern,
    });

   
    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);

   console.log(errors.password)
   
    return (
        <>
            <div className="form_close_butn_wrapper">
            <button className="form_close_btn" title="Закрыть" onClick={()=>{setShowModal(false); navigate('/not_authenticated')}}><CloseIcon/></button>
            </div>
            <Form submitForm={handleSubmit(sendData)} title={"Регистрация"}>
            
                <div className="auth__controls">
                    <input
                        type="text"
                        {...emailRegister}
                        placeholder="E-mail"
                        className="auth__input"
                    />
                    {errors?.email && (
                        <span className="auth__warning">{errors.email?.message}</span>
                    )}
                    
                    <input
                        type={type ? "text" : "password"}
                        {...passwordRegister}
                        placeholder="Пароль"
                        className="auth__input"
                    
                    />
                    {errors?.password && (
                        <span className="auth__warning">{errors.password?.message}</span>
                    )}
                    {!errors?.password ?
                     <span className="auth__eye_register" onClick={() => setType(!type)}>
                        {type ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </span>
                    : ''
                    }
                   
                    
                    
                    
                    
                    <div className="auth__actions">
                        <BaseButton type="submit" color={"yellow"}>
                            <span>Зарегистрироваться</span>
                        </BaseButton>
                        <BaseButton onClick={handleClick} color={"white"}>
                            <span>Войти</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    );
};
