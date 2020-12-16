import React from "react";
import ModalButtonAdd from "../modal/ModalButtonAdd";

const MultiplePhotosUploader = ({onUploadSubmit, onFileLoad, handleOnDragOver, loadedFiles, removeLoadedFile, errorMassage}) => {
    return (
        <>
            <h2 className="modal__title">Pridať fotky</h2>
            <form className="mp-uploader" onSubmit={e => onUploadSubmit(e)}>
                <div className="mp-uploader__preview">                    
                    {loadedFiles.length !== 0 && loadedFiles.map((file, index) => (
                        <div className="mp-uploader__image-wrapper" key={index}>
                            <div className="mp-uploader__image">
                                <img src={file.data} />
                                <i className="far fa-trash-alt mp-uploader__delete-btn" onClick={()=> removeLoadedFile(file)}></i>
                            </div>
                        </div>    
                    ))}
                </div>   
                {errorMassage !== null && 
                    <div className="error warning">
                        {errorMassage}
                    </div>
                } 
                <div className="mp-uploader__wrapper">
                    <input 
                        type="file" 
                        name="photos" 
                        className="mp-uploader__file-input"
                        onChange={e => onFileLoad(e)}
                        onDrop={e => onFileLoad(e)}
                        onDragOver={e => handleOnDragOver(e)}
                        multiple
                    />
                    <div className="mp-uploader__dragrop">
                        <i className="fas fa-camera card__icon"></i><br />
                        <span className="uppercase"><strong>Sem presunte fotky</strong></span><br />
                        <span>alebo</span>
                    </div>    
                    <button className="mp-uploader__button">
                        Vyberte súbory
                    </button>
                </div>
                <div className="mp-uploader__submit">
                    <ModalButtonAdd />
                </div>
            </form>
        </>
    )
}

export default MultiplePhotosUploader;