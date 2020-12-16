import "./styles/css/style.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import uuid from "react-uuid";
import Header from "./components/Header";
import Categories from "./components/Categories";
import SingleCategory from "./components/SingleCategory";

const initialState = {
    status: "idle",
    galleries: [],
    error: null
}

function App() {
    const [state, setState] = useState(initialState);

    const getGalleires = async () => {
        setState(state => ({
            ...state,
            status: "pending"
        }))
        try{
            const response = await fetch("http://api.programator.sk/gallery");
            const data = await response.json();
            setState(state => ({
                ...state,
                galleries: data.galleries.map(gallery => (
                    {...gallery, id: uuid()}
                )),
                status: "fulfilled"
            }))

        } catch(err) {
            setState(state=> ({
                ...state,
                status: "rejected",
                error: err
            }))
        }       
    }

    useEffect(() => {
        if(state.status = "idle"){
            getGalleires();
        }
    }, [])

    return (
        <Router>
            <Header />
            <main className="main">
                <div className="container">
                    <Switch>
                        <Route exact path="/" render={props => <Categories {...props} state={state} />} />
                        <Route exact path="/category/:id" render={() => {
                            <SingleCategory />
                        }} />              
                    </Switch>
                </div>    
            </main>    
        </Router>
    );
}

export default App;
