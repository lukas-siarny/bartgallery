import React, { useState } from "react";
import {ReactComponent as Spinner} from "../Spinner.svg";
import ModalPhoto from "../modal/ModalPhoto";
import PhotoCard from "./PhotoCard";
import { getSinglePhoto } from "../../api-client.js";
import { trackWindowScroll } from "react-lazy-load-image-component";

const SingleCategoryPhotosGrid = ({path, photos: {gallery, images}, status, onCategoryStatusChange}) => {   
    const [currentImage, setCurrentImage] = useState("");
    const [currentPosition, setCurrentPostion] = useState(null);
    const [modalPhotoVisiblity, setModalPhotoVisibility] = useState(false);
    const [modalPhotoStatus, setModalPhotoStatus] = useState("idle");
    
    // get fullsize photo
    const getFullSizeImage = fullpath => {        
        setModalPhotoStatus("pending");

        getSinglePhoto(fullpath, 0, 0)
        .then(image => {
            setCurrentImage(image);
            setModalPhotoStatus("fulfilled");
        }).catch(err => {
            setModalPhotoStatus("rejected");
            console.log(err);
        })    
    }   
    
    // handling photo modal behavior
    const handleModalPhotoOpen = (fullpath, imageIndex) => {
        setModalPhotoVisibility(true);
        setCurrentPostion(imageIndex);
        getFullSizeImage(fullpath);
    }

    const handleModalClose = () => {
        setModalPhotoVisibility(false);
    }

    const handlePreviousImage = () => {
        if(currentPosition === 0){
            setCurrentPostion(images.length -1);
            getFullSizeImage(images[images.length -1].fullpath);
        } else{
            getFullSizeImage(images[currentPosition-1].fullpath);
            setCurrentPostion(position => position-1)
        }
    }

    const handleNextImage = () => {
        if (currentPosition === images.length -1){
            setCurrentPostion(0);
            getFullSizeImage(images[0].fullpath);
        } else{
            getFullSizeImage(images[currentPosition+1].fullpath);
            setCurrentPostion(position => position+1);
        }
    }

    let renrederFullSizePhoto;

    switch(modalPhotoStatus){
        case "pending":{
            renrederFullSizePhoto = (
                <div className="modal__noimage">
                    <Spinner className="spinner" />
                </div>
                )
            break;
        }
        case "fulfilled": {
            renrederFullSizePhoto = <img src={currentImage} alt={currentImage} className="modal__image-shadow" />
            break;
        }
        case "rejected": {
            renrederFullSizePhoto = (
                <div className="modal__noimage">
                    <i class="fas fa-image"></i> Error: Niečo sa pokazilo
                </div>
            )
            break;
        } default: {
            renrederFullSizePhoto = (
                <div className="modal__noimage">
                    <i className="fas fa-image card__noimage-icon"></i>
                </div>
            )
        }
    }

    let renderedImages;

    switch(status){
        case "pending":{
            renderedImages = <Spinner className="spinner" />
            break;
        }                
        case "fulfilled": {
            renderedImages = (
                <>
                    {images.length > 0 && images.map((image, index) => (
                        <PhotoCard
                            path={image.fullpath} 
                            name={image.name}
                            key={image.fullpath}
                            onPhotoClick={() => handleModalPhotoOpen(image.fullpath, index)}
                            onCategoryStatusChange={onCategoryStatusChange}
                        />
                    ))}
                </>
            )
            break;
        }
        case "rejected": {
            renderedImages = <p>Error. Niečo sa pokazilo...</p>
            break;
        } 
        default: 
            renderedImages = <p>No images to show...</p>
    }

    return (
        <>
            {renderedImages}

            {modalPhotoVisiblity &&
                <ModalPhoto 
                    onModalClose={handleModalClose}
                    onPreviousImage={handlePreviousImage}
                    onNextImage={handleNextImage}
                >
                    {renrederFullSizePhoto}                 
                </ModalPhoto>
            } 
        </>       
    )
}

export default trackWindowScroll(SingleCategoryPhotosGrid);