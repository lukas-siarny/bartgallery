import React, { useContext } from "react";
import { HeaderContext } from "../HeaderTheme";

const Header = () => {
    const { currentTheme } = useContext(HeaderContext);
    
    const backgrundStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",  
        backgroundColor: "#f9f9f9",
        backgroundImage: `url(${currentTheme})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        WebkitFilter: "blur(5px)",
        MozFilter: "blur(5px)",
        OFilter: "blur(5px)",
        MsFilter: "blur(5px)",
        transformOrigin: "center",
        transform: "scale(1.1)",
        filter: "blur(9px)",
        opacity: "0.75",
        zIndex: "-1",        
    }

    return (
        <div className="header">
            <div style={backgrundStyle}></div>
            <div className="container">
                <h1 className="header__title">Fotogaléria</h1>
            </div>
        </div>
    )
}

export default Header;