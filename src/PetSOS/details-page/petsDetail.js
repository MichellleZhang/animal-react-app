import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import "./petsDetail.css";
import {useSelector, useDispatch} from "react-redux";
import LovePet from "./lovePet";
import {lovePetThunk} from "../services/lovePet-thunk";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

function PetDetails() {

    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);

    const {id} = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const {localSearchResults, remoteSearchResults} = location.state;
    console.log("remoteSearchResultssssss",typeof(remoteSearchResults.id));

    const getGoogleMapImageUrl = (address) => {
        const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
        const marker = `markers=color:red%7Clabel:C%7C${encodeURIComponent(address)}`;
        const size = "size=600x300";
        const zoom = "zoom=13";
        const apiKey = "key=AIzaSyBZCP64z0FS8szDXVFjP7i9miHY0RQal_Y";

        return `${baseUrl}?${marker}&${zoom}&${size}&${apiKey}`;
    }

    const handleContactClick = () => {
        if (!currentUser) {
            navigate('/login');
        } else {

        }
    };


    if (!location.state) {
        return <div>No data available. Please go back to the search page and click on a pet for details.</div>;
    }

    if (localSearchResults) {
        const localPetData = localSearchResults.find(p => p._id === id);
        return (
            <div>
                <div className="button-container">
                    <Link to={"/search"}>
                        <button>Back to Search</button>
                    </Link>
                </div>

                {/* <h1>{`${localPetData.status} ${localPetData.type} in ${localPetData.area}`} <LovePet/></h1> */}
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <img src={`/img/${localPetData.image}`} alt={localPetData.name} style={{margin: 20}}
                                 className="img-fluid rounded mx-auto d-block"/>
                        </div>
                        <div className="col-8" style={{padding: 20}}>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Name:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {localPetData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Gender:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {localPetData.sex}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Description:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {localPetData.description}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Last seen date:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {localPetData.date}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Last seen address:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {localPetData.address}
                                    <img
                                        src={getGoogleMapImageUrl(`${localPetData.address}, ${localPetData.area} ${localPetData.zipcode}`)}
                                        style={{margin: 5, paddingBottom: 10}} alt="Location on Map"/>
                                </div>
                            </div>
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
            </div>)

    } else if (remoteSearchResults) {
        console.log("Before find");
        console.log(remoteSearchResults);
        console.log(id);
        const remotePetData = remoteSearchResults.find(p => p.id.toString() === id);
        console.log(remotePetData);
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
                            <img src={ remotePetData.photos[0] ? remotePetData.photos[0].large : ""}
                                 alt={`${remotePetData.name} - ${remotePetData.breeds.primary}`}
                                 style={{margin: 20}}
                                 className="img-fluid rounded mx-auto d-block"/>
                        </div>
                        <div className="col-8" style={{padding: 20}}>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Name:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {remotePetData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Gender:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {remotePetData.gender}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Description:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {remotePetData.description}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Address:</strong>
                                </div>
                                <div className="col-8 pet-info">
                                    {remotePetData.contact.address.address1}, {remotePetData.contact.address.city},  {remotePetData.contact.address.state}  {remotePetData.contact.address.postcode}
                                    <img
                                        src={getGoogleMapImageUrl(`${remotePetData.contact.address.address1}, ${remotePetData.contact.address.city}, ${remotePetData.contact.address.state} ${remotePetData.contact.address.postcode}`)}
                                        style={{margin: 5, paddingBottom: 10}} alt="Location on Map"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end pet-info">
                                    <strong>Contact:</strong>
                                </div>
                                <div className="col-8 button-container">
                                    <a href={remotePetData.url} target="_blank" rel="noopener noreferrer">
                                    <button className="contact" >Contact Owner</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetDetails;
