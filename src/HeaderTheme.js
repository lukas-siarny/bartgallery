import React, {useState} from "react";
import defaultTheme from "./images/default.jpg";

export const HeaderContext = React.createContext();

export const HeaderTheme = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState(defaultTheme);

    const updateHeaderTheme = payload => {
        if(!payload){
            setCurrentTheme(defaultTheme);
            return;
        }

        setCurrentTheme(payload);
    }

    return (
        <HeaderContext.Provider value={{currentTheme, updateHeaderTheme}}>
            {children}
        </HeaderContext.Provider>
    )
}

