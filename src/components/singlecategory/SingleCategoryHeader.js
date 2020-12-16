import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Navbar from "../general/Navbar";
import Modal from "../modal/Modal";
import ModalButtonDelete from "../modal/ModalButtonDelete";
import {ReactComponent as Spinner} from "../Spinner.svg";
import { deleteGalleryOrPhoto } from "../../api-client.js";

const SingleCategoryHeader = ({path, caregoryName}) => {
    const [modalVisibility, setmodalVisibility] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState("idle");
    const [redirect, setRedirect] = useState(false);

    const history = useHistory();

    const handleGalleryDelete = () => {
        setDeleteStatus("pending");

        deleteGalleryOrPhoto(path)
        .then(data => {
            //set timeout to show a spinner for a while
            setTimeout(()=> {
                setDeleteStatus("fulfilled");
                //set timeout to show a succes massage for a while before redirecting to gallery index
                setTimeout(() => setRedirect(true),500);
            },500)
        })
        .catch(err => {
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
                    Vymazávam galériu...
                </div>
            )
            break;
        case "fulfilled":    
            renderedModalContent = (
                <div className="modal__center">
                    <i class="far fa-check-circle modal__success-icon warning"></i>
                    <div>
                        <span className="warning"><strong>Galéria</strong> bola úspešne vymazaná</span>
                        {redirect && <Redirect to="/" />}
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
                    Ste si istý že chcete vymazať tuto galériu?
                    <ModalButtonDelete onButtonClick={handleGalleryDelete} />
                </div>
            )
        break;                 
    }

    const handleModalOpen = () => {
        setmodalVisibility(true);
        setDeleteStatus("idle");
    }

    return (
        <Navbar>
            <div className="navbar__category">
                <span onClick={()=> history.push("/")} className="navbar__title-wrapper">
                    <h2 className="navbar__title">
                        <i className="fas fa-long-arrow-alt-left"></i> 
                        {caregoryName || "Názov galérie"}
                    </h2>
                </span>
                <i 
                    className="far fa-trash-alt navbar__category-delete"
                    onClick={handleModalOpen}
                ></i>
            </div>
            {modalVisibility && 
                <Modal onModalClose={() => setmodalVisibility(false)}>
                    {renderedModalContent}
                </Modal>
            }    
        </Navbar>
    )
}

export default SingleCategoryHeader;