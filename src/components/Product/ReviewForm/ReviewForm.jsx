
import "./reviewForm.css";

export const ReviewForm = ({ submitForm, children, title }) => {
  return (
    <>
      <form className="review_form" onSubmit={submitForm}>
        <h1>{title}</h1>
        {children}
      </form>
    </>
  );
};