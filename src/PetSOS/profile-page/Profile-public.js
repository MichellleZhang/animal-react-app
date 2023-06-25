import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { accessUser } from "../services/auth-service";

function PublicProfile() {
    const [responseData, setresponseData] = useState("");
    const { id } = useParams();
    accessUser(id)
        .then((responseData) => {
            setresponseData(responseData)
            console.log("responseData", responseData);
        })
        .catch((error) => {
            console.error('Error accessing user:', error);
        });

    return (
        <div className="box">
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
            {responseData.role === "PetOwner" ? (
                <>
                    <h3 className="compBetween">Owned Pets</h3>
                    <div>Loading...</div>
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