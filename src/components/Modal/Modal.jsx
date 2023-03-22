import cn from "classnames";
import "./modal.css";

export const Modal = ({ activeModal, children}) => {
  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })}
      >
        <div
          className={cn("modal_content", { ["active"]: activeModal })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
