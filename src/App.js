import "./styles/css/style.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/categories/Categories";
import SingleCategory from "./components/singlecategory/SingleCategory";

function App() {
    return (
        <Router>
            <Header />
            <main className="main">
                <div className="container">
                    <Switch>   
                        <Route exact path="/" component={Categories} /> 
                        <Route exact path="/category/:path" component={SingleCategory} />        
                    </Switch>
                </div>    
            </main>  
            <Footer />  
        </Router>
    );
}

export default App;
