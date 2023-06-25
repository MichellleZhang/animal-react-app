import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMyPets, findIAllMyPets } from "../services/pet-service";
import "./myPets.css"

function Mypets() {
    const [myPets, setMypets] = useState([])
    const [name, setName] = useState("");
    const [type, setType] = useState("cat");
    const [image, setImage] = useState("");
    const [sex, setSex] = useState("");
    const [description, setDescription] = useState("");

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        convertImageToBase64(imageFile);
    };

    const convertImageToBase64 = (imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error("Error converting image to base64:", error);
        };
    };

    const handlerCreate = async () => {
        try {
            await createMyPets({ name, type, image, sex, description });
        } catch (e) {
            alert(e);
        }
    };

    const fetchMypets = async () => {
        const mypets = await findIAllMyPets();
        console.log("mypetsssss",mypets)
        setMypets(mypets)
    }

    useEffect(() => {
        fetchMypets();
    })

    return (
        <div>
            <div className="box row">
                <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-control " type="text" placeholder="Name" id="name" value={name}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="type">Type</label>
                    <select id="type" className="form-control  " value={type}
                        onChange={(event) => setType(event.target.value)}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="bird">Bird</option>
                        <option value="bear">Bear</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="sex">Sex</label>
                    <input className="form-control " type="text" placeholder="Sex" id="sex" value={sex}
                        onChange={(event) => setSex(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="description">Description</label>
                    <input className="form-control " type="text" placeholder="Description" id="description" value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="image">Image Upload</label>
                    <input className="form-control " type="file" id="image" onChange={handleImageUpload} />
                </div>
                <div>
                    <button type="button" className="btn btn-success mt-3" onClick={handlerCreate}>Create</button>
                </div>
            </div>
            <div className="box row">
                <h3>My pets Lists</h3>
                <pre>{JSON.stringify(myPets, null, 2)}</pre>
            </div>
        </div>
    );
}

export default Mypets;
