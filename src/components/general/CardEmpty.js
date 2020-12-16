import React from "react";

const CardEmpty = ({children}) => {
    return (
        <div className="card__empty">
            <i className="fas fa-image card__noimage-icon"></i> 
            {children}
        </div>
    )
}

export default CardEmpty;