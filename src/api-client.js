const url = "http://api.programator.sk";

// GET REQUESTS
export const getAllGalleries = async () => {
    const response = await fetch(`${url}/gallery`);
    if(response.status === 200){
        const data = await response.json();  
        return data;     
    } else{
        throw Error(response.statusText);
    } 
}

export const getAllCategoryPhotos = async path => {
    const response = await fetch(`${url}/gallery/${path}`);
    if(response.status === 200){
        const data = await response.json();
        return data;           
    } else{
        throw Error(response.statusText);
    }      
}

export const getSinglePhoto = async (fullpath, w, h) => {
    const response = await fetch(`${url}/images/${w}x${h}/${fullpath}`);
    if(response.status === 200){
        const blob = await response.blob();
        const image = URL.createObjectURL(blob);
        return image;             
    } else {
        throw Error(response.statusText);
    }
}

// POST REQUEST
export const addNewCategory = async name => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    }

    const response = await fetch(`${url}/gallery`, settings);
    if(response.status === 201){
        const data = await response.json();
            return data;
    } else {
        throw Error(response.statusText);
    }
}

export const addNewPhotos = async (path, file) => {
    
    const formData = new FormData();
    formData.append("image", file);

    const settings = {
        method: "POST",
        body: formData
    }
    
    const response = await fetch(`${url}/gallery/${path}`, settings);
    if(response.status === 200){
        const data = await response.json();
        return data;
    } else {
        throw Error(response.statusText);
    }
}

// DELETE REQUESTS
export const deleteGalleryOrPhoto = async path => {
    const settings = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }

    const response = await fetch(`${url}/gallery/${path}`, settings);
    if(response.status === 200){
        const data = await response.json();
        return data;
    } else {
        throw Error(response.statusText);
    }

}







