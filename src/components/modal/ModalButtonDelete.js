import React from "react";

const ModalButtonDelete = ({onButtonClick}) => {
    return (
        <button className="modal-button modal-button--delete" onClick={onButtonClick}>
            <i className="fas fa-times modal-button__icon"></i>
            Vymazať
        </button>
    )
}

export default ModalButtonDelete;