import React, { useEffect, useRef } from "react";

const Modal = ({children, onModalClose}) => {
    const windowOffset = window.scrollY;
    const modalRef = useRef(null);

    useEffect(()=>{
        document.body.setAttribute("style", `position: fixed; left: 0; right: 0; top: -${windowOffset}px`);
        modalRef.current.classList.add("modal--is-visible");
        return () => {
            document.body.setAttribute("style", "");
            window.scrollTo(0, windowOffset);
        }
    })
    
    return (
        <div className="modal__background">
            <div className="modal__wrapper" ref={modalRef}>
                <div className="modal">
                    <div className="modal__close" onClick={onModalClose}>
                        <div className="modal__close-btn"></div>
                        <span className="modal__close-text">Zavrieť</span>
                    </div>    
                    {children}
                </div>   
            </div>     
        </div>
    )
}

export default Modal;