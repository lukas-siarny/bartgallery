import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import ModalButtonDelete from "../modal/ModalButtonDelete";
import { ReactComponent as Spinner } from "../Spinner.svg";
import CardEmpty from "../general/CardEmpty";
import { deleteGalleryOrPhoto, getSinglePhoto } from "../../api-client.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PhotoCard = ({path, name, onPhotoClick, onCategoryStatusChange, scrollPosition}) => {
    const [photo, setPhoto] = useState("");
    const [status, setStatus] = useState("idle");
    const [deleteStatus, setDeleteStatus] = useState("idle");
    const [deleteModalVisibility, setDeletedeleteModalVisibility] = useState(false);

    // get preview photo
    useEffect(() => {
        if(status === "idle"){
            setStatus("pending");

            getSinglePhoto(path, 0, 300)
            .then(image => {
                setPhoto(image);
                setStatus("fulfilled");
            }).catch(err => {
                setStatus("rejected");
                console.log(err);
            })
        }
    }, [status])

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
                    src={photo}
                    scrollPosition={scrollPosition}
                />
            )
            break;
        }
        case "rejected": {
            renderedImg = <CardEmpty>Error! Niečo sa pokazilo</CardEmpty>
            break;
        } default: {
            renderedImg = <CardEmpty></CardEmpty>
            break;
        }
    }

    // delete photo from gallery
    const handlePhotoDelete = () => {
        setDeleteStatus("pending");
        
        deleteGalleryOrPhoto(path)
        .then(data => {
            setTimeout(()=> setDeleteStatus("fulfilled"),500);            
        }).catch(err => {
            setTimeout(() => setDeleteStatus("rejected"), 500);
            console.log(err);
        })
    }

    let renderedModalContent;

    switch(deleteStatus) {
        case "pending": 
            renderedModalContent = (
                <div className="modal__center modal--pending">
                    <Spinner className="modal__upload-spinner" />
                    Vymazávam fotku...
                </div>
            )
            break;
        case "fulfilled":    
            renderedModalContent = (
                <div className="modal__center">
                    <i class="far fa-check-circle modal__success-icon warning"></i>
                    <div>
                        <span className="warning">Fotka bola úspešne vymazaná</span>
                    </div>
                </div>
            )
            break;
        case "rejected":
            renderedModalContent = <p>Chyba: niečo sa pokazilo...</p>    
            break;
        default:
            renderedModalContent = (
                <div className="modal__between">
                    Ste si istý že chcete vymazať túto fotku?
                    <ModalButtonDelete onButtonClick={handlePhotoDelete} />
                </div>
            )
        break;                 
    }

    //handling delete modal behavior
    const handleDeleteModalOpen = () => {
        setDeletedeleteModalVisibility(true);
        setDeleteStatus("idle");
    }

    const onDeleteModalClose = () => {
        setDeletedeleteModalVisibility(false);
        if(deleteStatus === "fulfilled"){
            onCategoryStatusChange();
        }
    }

    return (
        <>  
            <figure className="card card--existing">
                <div className="card__wrapper">
                    <div className="card__delete-image">
                        <i className="far fa-trash-alt" onClick={handleDeleteModalOpen}></i>
                    </div> 
                    <div className="card__image-wrapper" onClick={onPhotoClick}>   
                        {renderedImg}
                    </div>   
                </div>     
            </figure>  
            
            {deleteModalVisibility &&
                <Modal onModalClose={onDeleteModalClose}>
                    {renderedModalContent}
                </Modal>
            }
        </>
    )
}

export default PhotoCard;