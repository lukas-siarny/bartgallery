import React from "react";

const CardAdd = ({children, onButtonClick}) => {
    return (
        <div className="card card--add-new" onClick={onButtonClick}>
            <div className="card__wrapper">
                {children}
            </div>
        </div>
    )
}

export default CardAdd;