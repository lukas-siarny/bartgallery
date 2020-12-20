import React, { useState } from "react";
import Modal from "../modal/Modal";
import CardAdd from "../general/CardAdd";
import {ReactComponent as Spinner} from "../Spinner.svg";
import MultiplePhotosUploader from "./MultiplePhotosUploader";
import { addNewPhotos } from "../../api-client.js";
import { validateSubmitFiles, validateOnLoadFiles } from "../../helpers";

const AddNewPhotos = ({onCategoryStatusChange, path}) => {
    const [uploadStatus, setUploadStatus] = useState("idle");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [errorMassage, setErrorMassage] = useState(null);

    // Adding photos to gallery
    const onUploadSubmit = e => {

        e.preventDefault();
        
        setErrorMassage(null);
        
        const error = validateSubmitFiles(loadedFiles)

        if(error){
            setErrorMassage(error);
            document.querySelector(".mp-uploader").scrollTop = 0;
            return;
        }

        loadedFiles.forEach(file => {
            setUploadStatus("pending");

            addNewPhotos(path, file.originalFile)
            .then(data => {
                // set timeout to show a spinner for a while
                // reset photos to empty array after successful upload
                setTimeout(() => {
                    setUploadStatus("fulfilled");
                    setLoadedFiles([]);
                }, 500);
            })
            .catch(err => {
                setUploadStatus("rejected");
                console.log(err);
            })
        })

    }

    // get photos from input button
    const onFileLoad = e => {
        const files = e.target.files;
        
        setErrorMassage(null);

        if(files){
            const error = validateOnLoadFiles(files);

            if(error){
                setErrorMassage(error);
                return;
            }

            for(let file of files){
                let fileReader = new FileReader();

                fileReader.readAsDataURL(file)

                fileReader.onload = () => {
                    const loeadedfile = {
                        originalFile: file,
                        data: fileReader.result
                    }
        
                    addLoadeddedFiles(loeadedfile);
                }
        
                fileReader.onabort = () => {
                    console.log("Reading aborted")
                }
        
                fileReader.onerror = () => {
                    console.log("Reading error!")
                }
            }
        }

    }

    const addLoadeddedFiles = file => {
        setLoadedFiles(state => ([...state, file]))
    }

    const removeLoadedFile = file => {
        setLoadedFiles(state => (state.filter(ldFile => ldFile !== file)));
    }

    /*
    const removeAllLoeadedFiles = () => {
        setLoadedFiles([]);
    }*/


    const handleOnDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    let renderedModalContent;

    switch(uploadStatus) {
        case "pending": 
            renderedModalContent = (
                <div className="modal__center modal--pending">
                    <Spinner className="modal__upload-spinner" />
                    Nahrávam fotky do galérie...
                </div>
            )
            break;
        case "fulfilled":    
            renderedModalContent = (
                <div className="modal__center modal--success">
                    <i className="far fa-check-circle modal__success-icon success"></i>
                    <div>
                        <span className="success">Fotky boli úspeśne nahraté</span><br />
                    </div>
                </div>
            )
            break;
        case "rejected":
            renderedModalContent = <p>Chyba: niečo sa pokazilo...</p>    
            break;
        default:
            renderedModalContent = (
                <MultiplePhotosUploader 
                    onUploadSubmit={onUploadSubmit} 
                    onFileLoad={onFileLoad}
                    handleOnDragOver={handleOnDragOver}
                    loadedFiles={loadedFiles}
                    removeLoadedFile={removeLoadedFile}
                    errorMassage={errorMassage}
                />
            )
        break;                 
    }


    // handling modal behavior
    const handleModalOpen = () => {
        setModalVisibility(true);
        setUploadStatus("idle");
        setLoadedFiles([]);
    }

    const onModalClose = () => {
        setModalVisibility(false); 

        // refetch category photos after closing modal after succesfull images upload
        // so it rerenders the page and shows new images
        if(uploadStatus === "fulfilled"){
            onCategoryStatusChange();   
        }
    }

    return (
        <>
            <CardAdd onButtonClick={handleModalOpen}>
                <i className="fas fa-camera card__icon"></i>
                Pridať fotky
            </CardAdd>
            
            {modalVisibility &&
                <Modal onModalClose={onModalClose}>
                    {renderedModalContent}
                </Modal>    
            }
        </>
    )
}

export default AddNewPhotos;