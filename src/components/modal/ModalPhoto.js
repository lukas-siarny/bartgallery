import React, { useEffect, useRef } from "react";

const ModalPhoto = ({children, onModalClose, onPreviousImage, onNextImage}) => {    
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
            <div className="modal__photo" ref={modalRef}>
                <div className="modal__close" onClick={onModalClose}>
                    <div className="modal__close-btn"></div>
                    <span className="modal__close-text">Zavrieť</span>
                </div>  
                <div className="modal__arrows"> 
                    <i className="fas fa-chevron-left modal__arrow modal__arrow-left" onClick={onPreviousImage}></i>
                    {children}  
                    <i className="fas fa-chevron-right modal__arrow modal__arrow-right" onClick={onNextImage}></i>
                </div>
            </div>    
        </div>
    )
}

export default ModalPhoto;