import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { accessUser } from "../services/auth-service";
import { visitMypets } from "../services/pet-service";
import { useSelector } from "react-redux";

function PublicProfile() {
    const [myPets, setMypets] = useState([])
    const [responseData, setresponseData] = useState("");
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();

    // const handleAccess = async(id) =>{
    //     const responseData = await accessUser(id);
    //     setresponseData(responseData);
    // }
    accessUser(id)
        .then((responseData) => {
            setresponseData(responseData)
            console.log("responseData", responseData);
        })
        .catch((error) => {
            console.error('Error accessing user:', error);
        });

    const fetchVisitedMypets = async (id) => {
        const visitedmypets = await visitMypets(id);
        if (visitedmypets !== null) {
            const mypetsArray = Object.values(visitedmypets);
            setMypets(mypetsArray);
        }
    };

    useEffect(() => {
        fetchVisitedMypets(id);
    }, []);

    return (
        <div className="box-public">
            <h1>Welcome to {responseData.username}'s profile</h1>
            <h3 className="compBetween">Information</h3>
            <div className="row compBetween">
                <div className="col-2">
                    <label>Username</label>
                </div>
                <div className="col-7">
                    <label className="form-control" type="text">{responseData.username}</label>
                </div>
            </div>
            <div className="row compBetween">
                <div className="col-2">
                    <label>Role</label>
                </div>
                <div className="col-7">
                    <label className="form-control" type="text">{responseData.role}</label>
                </div>
            </div>
            <div className="row compBetween">
                <div className="col-2">
                    <label>state</label>
                </div>
                <div className="col-7">
                    <label className="form-control" type="text">{responseData.state}</label>
                </div>
            </div>
            {currentUser &&
                <div className="row compBetween">
                    <div className="col-2">
                        <label>Email</label>
                    </div>
                    <div className="col-7">
                        <label className="form-control" type="text">{responseData.email}</label>
                    </div>
                </div>
            }
            {responseData.role === "PetOwner" ? (
                <>
                    <h3 className="compBetween">Owned Pets</h3>
                    {/* <div className="card-container">
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
                            </div>
                        ))}
                    </div> */}
                </>
            ) : null}

            <h3 className="compBetween">Posts</h3>
            <div> loading</div>
            <h3 className="compBetween">Collection</h3>
            <div> loading</div>
        </div>
    )
}
export default PublicProfile;