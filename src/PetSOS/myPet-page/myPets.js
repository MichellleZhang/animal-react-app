import React, { useEffect, useState } from "react";
import { createMyPets, findIAllMyPets, deleteMypets } from "../services/pet-service";
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
        if (mypets !== null) {
            const mypetsArray = Object.values(mypets);
            setMypets(mypetsArray);
    }
    };

    const handleDeleteMypets = async (id) => {
        try {
            await deleteMypets(id);
            setMypets(myPets.filter((mypet) => mypet._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    console.log("myPetsssss", myPets===[])
    useEffect(() => {
        fetchMypets();
    }, [])
    return (
        <div>
            <div className="box">
                <h1>My Pets</h1>
                <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-control" type="text" placeholder="Name" id="name" value={name}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="type">Type</label>
                    <select id="type" className="form-control" value={type}
                        onChange={(event) => setType(event.target.value)}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="bird">Bird</option>
                        <option value="bear">Bear</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="sex">Gender</label>
                    <select id="sex" className="form-control" value={sex} onChange={(event) => setSex(event.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="description">Description</label>
                    <input className="form-control" type="text" placeholder="Description" id="description" value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="image">Image Upload</label>
                    <input className="form-control" type="file" id="image" onChange={handleImageUpload} />
                </div>
                <div>
                    <button type="button" className="btn btn-success mt-3" onClick={handlerCreate}>Create</button>
                </div>
            </div>
            <div className="box">
                <h3>My Pets List</h3>
                <div className="card-container">
                    {myPets === "[]"?
                        <div className="card-container">
                            <p>Adding your pets</p>
                        </div> :
                        <div className="card-container">
                            {myPets.map((pet, index) => (
                                <div key={index} className="row-item" style={{ marginTop: "10px" }}>
                                    <div className="col-4 col-sm-5 col-xs-8">
                                        <h4 className="card-title">No. {index + 1}: {pet.name}</h4>
                                        <p className="card-text">Type: {pet.type}</p>
                                        <p className="card-text">Gender: {pet.sex}</p>
                                        <p className="card-text">Description: {pet.description}</p>
                                    </div>
                                    <div className="card-img-container col">
                                        {pet.image && (
                                            <img className="card-img" style={{ marginBottom: "1px", width: "100%", height: "100%", objectFit: "cover" }} src={pet.image} alt="Pets Headshot" />
                                        )}
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-danger custom-buttom float-end" onClick={() => handleDeleteMypets(pet._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Mypets;
