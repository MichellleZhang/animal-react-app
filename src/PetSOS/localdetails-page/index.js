import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Navigate, useParams} from 'react-router-dom';
import "./petsDetail.css";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

function PetDetails() {

    const location = useLocation();
    const pet=location.state.item;
    pet.uploadedImage=decodeURIComponent(pet.uploadedImage)
    const navigate=useNavigate();
    const handleContactClick = () => {
        const {userId}=pet;
        navigate("/profile/"+userId);
    };

    const getGoogleMapImageUrl = (address) => {
        const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
        const marker = `markers=color:red%7Clabel:C%7C${encodeURIComponent(address)}`;
        const size = "size=600x300";
        const zoom = "zoom=13";
        const apiKey = "key=AIzaSyBZCP64z0FS8szDXVFjP7i9miHY0RQal_Y";

        return `${baseUrl}?${marker}&${zoom}&${size}&${apiKey}`;
    }

    return (
        <div>
            <div className="button-container">
                <Link to={"/search"}>
                    <button>Back to Search</button>
                </Link>
            </div>
            {/* <h1>{`${remotePetData.status} ${remotePetData.species} in ${remotePetData.contact.address.city}, ${remotePetData.contact.address.state} ${remotePetData.contact.address.postcode}`}
                <LovePet/></h1> */}
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img src={pet.uploadedImage}
                             alt={pet.uploadedImage}
                             style={{margin: 20}}
                             className="img-fluid rounded mx-auto d-block"/>
                    </div>
                    <div className="col-8" style={{padding: 20}}>
                        <div className="row">
                            <div className="col-3 text-end pet-info">
                                <strong>Name:</strong>
                            </div>
                            <div className="col-8 pet-info">
                                {pet.petName}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-end pet-info">
                                <strong>Gender:</strong>
                            </div>
                            <div className="col-8 pet-info">
                                {pet.gender}
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-3 text-end pet-info">
                                <strong>Breed:</strong>
                            </div>
                            <div className="col-8 pet-info">
                                {pet.breed}
                            </div>
                        </div>
                        <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Last seen address:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {pet.addressLastSeen}
                                    <img
                                        src={getGoogleMapImageUrl(`${pet.addressLastSeen}, ${pet.addressLastSeen} ${pet.zipcode}`)}
                                        style={{margin: 5, paddingBottom: 10}} alt="Location on Map"/>
                                </div>
                            </div>
                        <div className="row">
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Contact:</strong>
                                </div>
                                <div className="col-8 button-container">
                                    <button className="contact" onClick={handleContactClick}>Contact Owner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default PetDetails;
