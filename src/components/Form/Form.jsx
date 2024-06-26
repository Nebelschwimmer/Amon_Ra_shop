
import "./Form.css";
import CloseIcon from '@mui/icons-material/Close';
export const Form = ({ submitForm, children, title }) => {
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <h1 className="form__title">{title}</h1>
        {children}
      </form>
    </>
  );
};
