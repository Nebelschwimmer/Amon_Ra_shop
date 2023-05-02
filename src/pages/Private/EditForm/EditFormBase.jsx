import './EditForm.css'

export const EditFormBase = ({ submitForm, children, title }) => {
  return (
    <>
      <form className="edit_form" onSubmit={submitForm}>
        <h2>{title}</h2>
        {children}
      </form>
    </>
  );
};