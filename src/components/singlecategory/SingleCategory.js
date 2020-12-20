import React, { useState, useEffect, useContext } from "react";
import SingleCategoryHeader from "./SingleCategoryHeader";
import SingleCategoryPhotosGrid from "./SingleCategoryPhotosGrid";
import AddNewPhotos from "./AddNewPhotos";
import { HeaderContext } from "../../HeaderTheme";
import { getAllCategoryPhotos, getSinglePhoto } from "../../api-client.js";

const SingleCategory = (props) => {    
    const [photos, setPhotos] = useState({});
    const [status, setStatus] = useState("idle");
    const [categoryName, setCategoryName] = useState("");
    
    const { path } = props.match.params;

    // update header theme to first image of the gallery
    const { updateHeaderTheme } = useContext(HeaderContext);
    
    // sort photos by date => the most recent at the begging
    let sortedPhotos = {
        ...photos,
        images: 
            photos.hasOwnProperty("images")
            ? [...photos.images].sort((a,b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
            : []
    };

    // handle status change from children elements
    const onCategoryStatusChange = () => {
        setStatus("idle");
    }

    // get photos from API after first render
    // and then every time after status change
    useEffect(()=> {
        if(status === "idle"){
            setStatus("pending");

            getAllCategoryPhotos(path)
            .then(data => {
                setPhotos(data); 
                setCategoryName(data.gallery.name);
                setStatus("fulfilled");                  
            })
            .catch(err => {
                setStatus("rejected");
                console.log(err);
            })
        }

        // set a header theme when page loads to a first image from the gallery
        if(sortedPhotos.images.length !== 0){
            const fullpath = sortedPhotos.images[0].fullpath;
            
            getSinglePhoto(fullpath, 0, 300)
            .then(image => updateHeaderTheme(image))
            .catch(err => console.log(err));
        }
    }, [status, path])

    return (
        <>
            <SingleCategoryHeader path={path} caregoryName={categoryName} />
            <section className="main__gallery">
                {Object.keys(photos).length !== 0 && 
                    <SingleCategoryPhotosGrid 
                        path={path} 
                        photos={sortedPhotos} 
                        status={status} 
                        onCategoryStatusChange={onCategoryStatusChange} 
                    />
                }
                <AddNewPhotos 
                    onCategoryStatusChange={onCategoryStatusChange} 
                    path={path} 
                />
            </section> 
        </>
    )
}

export default SingleCategory;