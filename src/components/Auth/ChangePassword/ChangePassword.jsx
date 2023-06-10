import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { BaseForm } from "../../BaseForm/BaseForm";
import CloseIcon from '@mui/icons-material/Close';
import { openNotification } from "../../Notification/Notification";



export const ChangePassword = ({ setShowModal }) => {
    const [tokenResp, setTokenResp] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    const emailRegister = register("email", {
        required: "Email обязателен",
    });
    
    const sendData = async (data) => {
      if (!tokenResp) {
          try {
              const res = await authApi.resetPassword(data)
              setTokenResp(true);
          } catch (error) {
            openNotification("error", "Ошибка", "Не удалось изменить пароль пароль")
          }
      } else {
          try {
              const res = await authApi.changePassword(data.token, { password: data.password });
              localStorage.setItem('token', res.token);
              navigate('/')
          } catch (error) {
            openNotification("error", "Ошибка", "Не удалось изменить пароль пароль")
          }
      }
    };
    const passwordRegister = register("password", {
        required: tokenResp ? "Пароль обязателен" : false,
        pattern: pattern,
    });
    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);

    const navigate = useNavigate();
    return (
        <>
            <div className="form_close_butn_wrapper">
            <button className="form_close_btn" title="Закрыть" onClick={()=>{setShowModal(false); navigate('/not_authenticated')}}><CloseIcon/></button>
            </div>
            <BaseForm submitForm={handleSubmit(sendData)} title={"Восстановление пароля"}>
                <div className="auth__controls">
                    <span className="auth__info">
                        Для получения временного пароля необходимо ввести email, указанный
                        при регистрации.
                    </span>
                    <input
                        type="text"
                        {...emailRegister}
                        placeholder="Email"
                        className="auth__input"
                    />
                    {errors?.email && (
                        <span className="auth__warning">{errors.email?.message}</span>
                    )}
                    {tokenResp && <><input
                        type={"password"}
                        {...passwordRegister}
                        placeholder="Новый пароль"
                        className="auth__input"
                        disabled={!tokenResp}
                    />
                        {errors?.password && (
                            <span className="auth__warning">{errors.password?.message}</span>
                        )}
                        <input
                            type={"text"}
                            {...register('token', { required: tokenResp ? 'Кодовая строка обязательна' : false })}
                            placeholder="Кодовая строка"
                            className="auth__input"
                            disabled={!tokenResp}
                        /></>}
                    <span className="auth__info auth__back" onClick={() => navigate(-1)}>
                        Назад
                    </span>
                    <span className="auth__info">
                        Срок действия временного пароля 24 ч.
                    </span>
                    <div className="auth__actions">
                        <BaseButton type="submit" color={"yellow"}>
                            <span>Отправить</span>
                        </BaseButton>
                    </div>
                </div>
            </BaseForm>
        </>
    );
};
