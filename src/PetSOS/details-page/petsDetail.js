import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "./petsDetail.css";
import {useSelector, useDispatch} from "react-redux";
import {getLikedPetsByUser, likePet, unlikePet} from "../services/likePet-thunk";
import * as likeService from "../services/likePet-service";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {FaRegStar, FaStar} from "react-icons/fa";

function PetDetails() {

    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    const {id} = useParams();
    const {loading} = useSelector((state) => state.like);

    const likeState = useSelector((state) => state.like);
    console.log("likeState", likeState);

    const isLiked = useSelector((state) => {
        console.log('Complete liked pets array:', state.like.petLiked);
        const like = state.like.petLiked.find((like) => like.petId._id.toString() === id);
        console.log('Comparing IDs for likeness:', like ? like.petId._id.toString() : 'No like found', id);
        return like;
    });

    console.log("isLiked", isLiked);

    const navigate = useNavigate();

    const location = useLocation();
    const {localSearchResults, remoteSearchResults} = location.state;

    const petData = findPet(id, localSearchResults, remoteSearchResults);

    console.log("Rendering component, isLiked:", isLiked);


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


    const handleLike = async () => {
        try {
            const {data} = await likeService.likePets(currentUser._id, petData, currentUser.role);
            dispatch({type: 'LIKE_PET', payload: data});
            dispatch(getLikedPetsByUser(currentUser._id));  // Ensure this is called
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnlike = async () => {
        try {
            await dispatch(unlikePet(currentUser._id, id, currentUser.role));
            // The unlikePet action should be responsible for sending a request to the server
            // and updating the Redux state
        } catch (error) {
            console.error(error);
        }
    }


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

                <h1>{`${localPetData.status} ${localPetData.type} in ${localPetData.area}`}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <img src={`/img/${localPetData.image}`} alt={localPetData.name} style={{margin: 20}}
                                 className="img-fluid rounded mx-auto d-block"/>
                            {currentUser && (
                                isLiked ? (
                                <button onClick={handleUnlike}><FaStar/></button> // Button appears filled
                                ) : (
                                <button onClick={handleLike}><FaRegStar/></button> // Button appears unfilled
                                )
                            )}
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
        const remotePetData = findRemotePet(id, remoteSearchResults);
        console.log(remotePetData);
        return (
            <div>
                <div className="button-container">
                    <Link to={"/search"}>
                        <button>Back to Search</button>
                    </Link>
                </div>
                <h1>{`${remotePetData.status} ${remotePetData.species} in ${remotePetData.contact.address.city}, ${remotePetData.contact.address.state} ${remotePetData.contact.address.postcode}`}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <img src={remotePetData.photos[0] ? remotePetData.photos[0].large : ""}
                                 alt={`${remotePetData.name} - ${remotePetData.breeds.primary}`}
                                 style={{margin: 20}}
                                 className="img-fluid rounded mx-auto d-block"/>
                            <button onClick={handleLike}>{isLiked ? <FaStar/> : <FaRegStar/>}</button>
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
                                    {remotePetData.contact.address.address1}, {remotePetData.contact.address.city}, {remotePetData.contact.address.state} {remotePetData.contact.address.postcode}
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
                                        <button className="contact">Contact Owner</button>
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

function findLocalPet(id, localResults) {
    return localResults.find(p => p._id === id);
}

function findRemotePet(id, remoteResults) {
    // If remoteResults is an array, use .find
    if (Array.isArray(remoteResults)) {
        return remoteResults.find(p => p.id.toString() === id);
    }
    // If remoteResults is a single object, check its id directly
    else if (remoteResults.id.toString() === id) {
        return remoteResults;
    }
}

function findPet(id, localResults, remoteResults) {
    if (localResults) return findLocalPet(id, localResults);
    if (remoteResults) return findRemotePet(id, remoteResults);
    return null;
}

export default PetDetails;
