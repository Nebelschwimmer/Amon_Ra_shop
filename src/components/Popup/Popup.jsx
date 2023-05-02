import cn from "classnames";
import "./popup.css";

export const Popup = ({ activeModal, setShowModal, children}) => {
  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })} onClick={()=>{setShowModal(false)}}
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
