import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HeaderTheme } from "./HeaderTheme";

ReactDOM.render(
        <React.StrictMode>   
            <HeaderTheme>     
                <App />
            </HeaderTheme>    
        </React.StrictMode>,
    document.getElementById('root')
);