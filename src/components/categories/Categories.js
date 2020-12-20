import React, { useState, useEffect } from "react";
import Navbar from "../general/Navbar";
import {ReactComponent as Spinner} from "../Spinner.svg";
import CategoryCard from "./CategoryCard";
import AddNewCategoryCard from "./AddNewCategory";
import { getAllGalleries } from "../../api-client.js";
import { trackWindowScroll } from "react-lazy-load-image-component";

const Categories = () => {
    const [status, setStatus] = useState("idle");
    const [galleries, setGalleries] = useState([]);

    // inital load of all galleries
    // get new data from a server every time when status change
    useEffect(() => {
        if(status === "idle"){
            setStatus("pending");
            
            getAllGalleries()
            .then(data=> {
                setGalleries(data.galleries);
                setStatus("fulfilled"); 
            })
            .catch(err=> {
                setStatus("rejected");
                console.log(err);
            })
        }
    },[status])

    let renderedGalleries;

    switch(status){
        case "pending":{
            renderedGalleries = <Spinner className="spinner" />
            break;
        }
        case "fulfilled": {
            renderedGalleries = (
                <>
                    {galleries.length > 0 && galleries.map(gallery => (
                        <CategoryCard gallery={gallery} key={gallery.name} />
                    ))}
                    <AddNewCategoryCard />
                </>)
            break;
        }
        case "rejected": {
            renderedGalleries = <p>Error. Something went wrong!</p>
            break;
        } default: 
            renderedGalleries = <p>No galleries to show...</p>
    }

    return (
        <>
            <Navbar>
                <h2 className="navbar__title">Kategórie</h2>
            </Navbar>
            <section className="main__gallery">
                {renderedGalleries}
            </section>
        </>
    )
}

export default trackWindowScroll(Categories);