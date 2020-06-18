import React from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

/* Standard modal across entire app */
const Modal = props => {
  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  let modalClassNames = ["modal"];
  if(props.error){
    modalClassNames.push("modal--error");
  }
  if(!props.show){
    modalClassNames.push("modal--closed");
  }
  return (
    <Backdrop show={props.show} clicked={props.modalClosed}>
      <div className={modalClassNames.join(" ")}>
        <MdClose className="modal__close" onClick={props.modalClosed} />
        {props.children}
      </div>
    </Backdrop>
  );
};

export default Modal;