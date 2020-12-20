import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Spinner } from "../Spinner.svg";
import { HeaderContext } from "../../HeaderTheme";
import { Link } from "react-router-dom";
import { cutCategoryName } from "../../helpers";
import { getSinglePhoto, getAllCategoryPhotos } from "../../api-client.js";
import CardEmpty from "../general/CardEmpty";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryCard = ({gallery, scrollPosition}) => {    
    const [status, setStatus] = useState("idle");
    const [previewImage, setPreviewImage] = useState("");
    const [numberOfPhotos, setNumberOfPhotos] = useState(0); 

    const { name, path} = gallery;
    const { image } = gallery || {}; 
    const fullpath = image ? image.fullpath : "";

    //use contex to be able to change header theme
    const { updateHeaderTheme } = useContext(HeaderContext);

    //change header theme after hover on category card
    // a little delay so the header theme doesn't change after every mouse enter
    // only when user stays on a card a bit longer
    let delay;

    const handleMouseEnter = () => {
        if(fullpath){
            delay = setTimeout(() => {
                getSinglePhoto(fullpath, 0, 300)
                .then(image => updateHeaderTheme(image))
                .catch(err => console.log(err));
            }, 1000);
        }    
    };

    const handleMouseLeave = () => {
        clearTimeout(delay);
    }

    const handleDelayReset = () => {
        clearTimeout(delay);
    }

    // get category preview image and number of photos in gallery after first render of the page
    useEffect(() => {
        if(status === "idle" && fullpath){
            setStatus("pending");

            getSinglePhoto(fullpath, 0, 300)
            .then(image => {
                setPreviewImage(image);
                setStatus("fulfilled");      
            }).catch(err => {
                setStatus("rejected");
                console.log(err);
            })
        }

        getAllCategoryPhotos(path)
        .then(data => setNumberOfPhotos(data.images.length))
        .catch(err => console.log(err));
    });

    let renderedImg;

    switch(status){
        case "pending":{
            renderedImg = <Spinner className="spinner" />
            break;
        }
        case "fulfilled": {
            renderedImg = (
                <LazyLoadImage 
                    wrapperClassName="card__image" 
                    effect="blur"
                    src={previewImage}
                    alt={name}
                    scrollPosition={scrollPosition}
                />
            )
            break;
        }
        case "rejected": {
            renderedImg = <CardEmpty>Error: Niečo sa pokazilo</CardEmpty>;
            break;
        } default: {
            renderedImg = (
                <CardEmpty>
                    Galéria je prázdna<br />
                    Pridaj nejaké fotky!
                </CardEmpty>
            )
            break;
        }
    }

    let countText = {"1" : "fotka", "2" : "fotky", "3" : "fotky", "4" : "fotky"}

    return (
        <figure 
            className="card card--existing" 
            title={name} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >   
            <div className="card__wrapper" onClick={handleDelayReset}>
                <Link to={`/category/${path}`}>
                    <div className="card__image-wrapper">
                        {renderedImg}
                    </div>    
                    <figcaption className="card__caption">
                        <h3 className="card__name">{cutCategoryName(name)}</h3>
                        <span className="card__photos-count">{numberOfPhotos.toString()} {countText[numberOfPhotos] || "fotiek"}</span>
                    </figcaption>
                </Link>    
            </div>    
        </figure>
    )
}

export default CategoryCard;