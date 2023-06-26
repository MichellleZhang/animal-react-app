import axios from "axios"

export const addLostpet=(data)=>{
    return axios.post("http://localhost:4000/api/petlost",data)
}

export const lostPetUploadImage=(file)=>{
    const form=new FormData();
    form.append('uploadedImage',file);
    return axios.post("http://localhost:4000/api/petlost/uploadImg",form);
}

export const getLostPetList=()=>{
    return axios.get("http://localhost:4000/api/petlost");
}

export const getAllByUserId=(userId)=>{
    return axios.get("http://localhost:4000/api/petlost/getAllByUserId",{
        params:{
            userId,
        }
    });
}