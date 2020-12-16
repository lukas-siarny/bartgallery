export const validateInput = input => {
    let errorMassage;

    if(input.trim() === ""){
        errorMassage = "Prosím, vyplňte názov kategórie...";
    } else if(/\//.test(input) || input.length > 50 ) {
        errorMassage = `Názov kategórie nesmie obsahovať "/" a nesmie byť dlhší ako 50 znakov...`;
    }

    return errorMassage;
}

export const validateSubmitFiles = files => {
    let errorMassage;
    if(files.length === 0) {
        errorMassage = "Prosím, vyberte súbory pre upload..."
        return errorMassage;
    } 

    const isSizeTypeInvalid = files.some(cv => cv.originalFile.size >= 10000000 ||  cv.originalFile.type !== "image/jpeg");
    
    if(isSizeTypeInvalid){
        errorMassage = "Povolené sú len .jpeg súbory do veľkosti 10 MB..."
    } else if(files.length >= 20){
        errorMassage = "Maximálny počet súborov na jeden upload je 20..."
    }    
    
    return errorMassage;
}

export const validateOnLoadFiles = files => {
    let errorMassage;

    for (let file of files){
        if(file.size >= 10000000 || file.type !== "image/jpeg"){
            errorMassage  = "Povolené sú len .jpeg súbory do veľkosti 10 MB...";
            return errorMassage;
        }
    }  
}

export const editInput = input => {
    let editedInput = input.trim();
    editedInput = editedInput.replace(/\s\s+/g, " ");
    return editedInput;
}

export const cutCategoryName = name => {
    if (name.length < 30) {
        return name;
    }
    
    let cutedName = name.substr(0,30);
    cutedName = cutedName + "...";
    return cutedName;
}
