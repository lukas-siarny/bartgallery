import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "../modal/Modal";
import ModalButtonAdd from "../modal/ModalButtonAdd";
import CardAdd from "../general/CardAdd";
import {ReactComponent as Spinner} from "../Spinner.svg";
import { editInput, validateInput } from "../../helpers";
import { addNewCategory } from "../../api-client.js";

const AddNewCategoryCard = () => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryPath, setNewCategoryPath] = useState("");
    const [uploadStatus, setUploadStatus] = useState("idle");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errorMassage, setErrorMassage] = useState(null);

    const handleNewCategoryName = e => setNewCategoryName(e.target.value);
   
    const handleAddNewCategory = e => {
        e.preventDefault();

        const error = validateInput(newCategoryName);

        if(error){
            setErrorMassage(error);
        } else{
            setUploadStatus("pending");

            addNewCategory(editInput(newCategoryName))
            .then(data=> {
                //set timeout to show a spinner for a while
                setTimeout(()=> {
                    setUploadStatus("fulfilled");
                    setNewCategoryPath(data.path);
                },500)
            }).catch(err=> {
                setTimeout(() => setUploadStatus("rejected"), 500);
                console.log(err);      
            })
            setErrorMassage(error);
        }
    }

    const handleModalOpen = () => {
        setModalVisibility(true);

        //reset upload status and error massages
        setUploadStatus("idle");
        setErrorMassage(null);
    }

    const onModalClose = () => {
        setModalVisibility(false); 

        if(uploadStatus === "fulfilled"){
            setRedirect(true);
        }

        //reset category name for input value
        setNewCategoryName("");     
    }

    let renderedModalContent;

    switch(uploadStatus) {
        case "pending": 
            renderedModalContent = (
                <div className="modal__center modal--pending">
                    <Spinner className="modal__upload-spinner" />
                    Vytváram novú galériu...
                </div>
            )
            break;
        case "fulfilled":    
            renderedModalContent = (
                <div className="modal__center modal--success">
                    <Link to={`/category/${newCategoryPath}`}>
                        <i class="far fa-check-circle modal__success-icon success"></i>
                        <div>
                            <span className="success"><strong>{newCategoryName}</strong> bola úspešne vytvorená</span><br />
                            <span className="modal__add-photos">Je čas nahrať do galérie nejaké fotky!</span>
                        </div>
                    </Link>   
                </div> 
            )
            break;
        case "rejected":
            renderedModalContent = <p>Chyba: niečo sa pokazilo...</p>    
            break;
        default:
            renderedModalContent = (
                <>
                    <h2 className="modal__title">Pridať kategóriu</h2>
                    <form className="modal-form" onSubmit={handleAddNewCategory}>
                        {errorMassage !== null && 
                            <p className="modal-form__error warrning warning">
                                {errorMassage}
                            </p>
                        }
                        <div className="modal-form__wrapper">
                            <input 
                                className="modal-form__text-input"
                                type="text"
                                name="addNewCategory"
                                value={newCategoryName}
                                onChange={handleNewCategoryName}
                                placeholder="Zadajte názov kategórie"
                            />
                            <ModalButtonAdd />
                        </div>
                    </form>
                </>
            )
        break;                 
    }

    return (
        <>
            {redirect && <Redirect to={`/category/${newCategoryPath}`} /> } 
            
            <CardAdd onButtonClick={handleModalOpen}>
                <i className="far fa-times-circle card__icon card__icon-add-new"></i>
                Pridať kategóriu
            </CardAdd>
            
            {modalVisibility &&
                <Modal onModalClose={onModalClose}>
                    {renderedModalContent}
                </Modal>    
            }
        </>
    )
}

export default AddNewCategoryCard;