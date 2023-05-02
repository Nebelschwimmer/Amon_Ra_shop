import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { BaseForm } from "../../BaseForm/BaseForm";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { openNotification } from "../../Notification/Notification";

export const SignUp = ({ setShowModal }) => {
    
    // useState для типа отображения пароля
    const [type, setType] = useState(false);
    // Создание формы
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    // useNavigate
    const navigate = useNavigate();
    // Фукнция для навигации по клику
    const handleClick = (e) => {
        e.preventDefault();
        navigate("/sign-in");
    };
    // Функция для отправки данных
    const sendData = async (data) => {
        try {
            await authApi.signUp({ ...data, group: 'group-10' });
            navigate("/sign-in");
        } 
        catch (error) {
            openNotification('error', 'Ошибка', 'Ошибка. Проверьте правильность e-mail и пароля. Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра.')
        }
    };
    // Register для email
    const emailRegister = register("email", {
        required: "Email обязателен",
    });
    // Register для пароля
    const passwordRegister = register("password", {
        required: "Пароль обязателен",
        pattern: pattern
    });
    // useEffect для отображения модального окна
    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);
    // Верстка
    return (
        <>
            {/* Кнопка для закрытия */}
            <div className="form_close_butn_wrapper">
            <button className="form_close_btn" title="Закрыть" onClick={()=>{setShowModal(false); navigate('/not_authenticated')}}><CloseIcon/></button>
            </div>
            {/* Форма */}
            <BaseForm submitForm={handleSubmit(sendData)} title={"Регистрация"}>
            
                <div className="auth__controls">
                    {/* Инпут для email */}
                    <input
                        type="text"
                        {...emailRegister}
                        placeholder="E-mail"
                        className="auth__input"
                    />
                    {errors?.email && (
                        <span className="auth__warning">{errors.email?.message}</span>
                    )}
                    {/* Инпут для пароля */}
                    <input
                        type={type ? "text" : "password"}
                        {...passwordRegister}
                        placeholder="Пароль"
                        className="auth__input"
                    
                    />
                    {errors?.password && (
                        <span className="auth__warning">{errors.password?.message}</span>
                    )}
                    {/* Условный рендеринг глаза для типа отображения пароля */}
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
            </BaseForm>
        </>
    );
};
