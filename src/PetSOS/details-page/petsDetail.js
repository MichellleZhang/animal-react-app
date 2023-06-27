import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "./petsDetail.css";
import {useSelector} from "react-redux";
import * as likeService from "../services/likePet-service";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {FaRegStar, FaStar} from "react-icons/fa";

function PetDetails() {

    const {currentUser} = useSelector((state) => state.user);
    const {id} = useParams();
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const {localSearchResults, remoteSearchResults} = location.state;

    const petData = findPet(id, localSearchResults, remoteSearchResults);

    console.log(petData);

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
            await likeService.likePets(currentUser._id, petData, currentUser.role);
            setIsLiked(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnlike = async () => {
        try {
            await likeService.unlikePets(currentUser._id, id, currentUser.role);
            setIsLiked(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchIsliked = async () => {
            if (!currentUser) {
                return;
            }
            const data = await likeService.checkIfUserLikedPet(currentUser._id, currentUser.role, id);
            setIsLiked(data);
        };
        fetchIsliked();
    }, [currentUser, id]);

    const handleImageError = (e) => {
        e.target.onerror = null; // prevent infinite loop if the second image also fails to load
        e.target.src = petData.uploadedImage;
    }


    if (!location.state) {
        return <div>No data available. Please go back to the search page and click on a pet for details.</div>;
    }

    if (localSearchResults) {
        console.log("localSearchResults", localSearchResults);
        const localPetData =  findLocalPet(id, localSearchResults);
        console.log("localPetData", localPetData);
        let address = localPetData.address || localPetData.addressLastSeen;
        let area = localPetData.area || localPetData.addressLastSeen;
        return (
            <div style={{ margin: "30px" }}>
                {Array.isArray(localSearchResults) && (
                    <div className="detailPage-button-container">
                        <Link to={"/search"}>
                            <button>Back to Search</button>
                        </Link>
                    </div>)}
                {!Array.isArray(localSearchResults) && (
                    <div className="detailPage-button-container">
                        <Link to={"/home"}>
                            <button>Back to Home</button>
                        </Link>
                    </div>)}

                <h1>{localPetData.status || "Lost"} {localPetData.type || localPetData.breed} in {localPetData.area || localPetData.zipcode}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div style={{position: "relative", margin: 20}}>
                                <img src={`/img/${localPetData.image}`} alt={localPetData.name}
                                     className="img-fluid rounded mx-auto d-block" onError={handleImageError}/>
                                {currentUser && (
                                    isLiked ? (
                                        <button style={{
                                            background: "rgba(255, 255, 255, 0.7)",
                                            border: "none",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: "5px",
                                            borderRadius: "50%"
                                        }} onClick={handleUnlike}>
                                            <FaStar style={{color: "#975A5E", fontSize: '2em'}}/>
                                        </button>
                                    ) : (
                                        <button style={{
                                            background: "rgba(255, 255, 255, 0.7)",
                                            border: "none",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: "5px",
                                            borderRadius: "50%"
                                        }} onClick={handleLike}>
                                            <FaRegStar style={{color: "#c4c197", fontSize: '2em'}}/>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="col-8" style={{padding: 20}}>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Name:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {localPetData.name || localPetData.petName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Gender:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {localPetData.sex || localPetData.gender}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Description:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {localPetData.description}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Last seen date:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {localPetData.date}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Last seen address:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {localPetData.address || localPetData.addressLastSeen}
                                    <img
                                        src={getGoogleMapImageUrl(`${address}, ${area} ${localPetData.zipcode}`)}
                                        style={{margin: 5, paddingBottom: 10}} alt="Location on Map"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Contact:</strong>
                                </div>
                                <div className="col-8 detailPage-button-container">
                                    <button className="contact" onClick={handleContactClick}>Contact Owner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)

    } else if (remoteSearchResults) {
        const remotePetData = findRemotePet(id, remoteSearchResults);

        return (
            <div style={{ margin: "30px" }}>
                {Array.isArray(remoteSearchResults) && (
                    <div className="detailPage-button-container">
                        <Link to={"/search"}>
                            <button>Back to Search</button>
                        </Link>
                    </div>)}
                {!Array.isArray(remoteSearchResults) && (
                    <div className="detailPage-button-container">
                        <Link to={"/home"}>
                            <button>Back to Home</button>
                        </Link>
                    </div>)}
                <h1>{`${remotePetData.status} ${remotePetData.species} in ${remotePetData.contact.address.city}, ${remotePetData.contact.address.state} ${remotePetData.contact.address.postcode}`}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div style={{position: "relative", margin: 20}}>
                                <img src={remotePetData.photos[0] ? remotePetData.photos[0].large : ""}
                                     alt={`${remotePetData.name} - ${remotePetData.breeds.primary}`}
                                     style={{margin: 20}}
                                     className="img-fluid rounded mx-auto d-block"/>
                                {currentUser && (
                                    isLiked ? (
                                        <button style={{
                                            background: "rgba(255, 255, 255, 0.7)",
                                            border: "none",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: "5px",
                                            borderRadius: "50%"
                                        }} onClick={handleUnlike}>
                                            <FaStar style={{color: "#975A5E", fontSize: '2em'}}/>
                                        </button>
                                    ) : (
                                        <button style={{
                                            background: "rgba(255, 255, 255, 0.7)",
                                            border: "none",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: "5px",
                                            borderRadius: "50%"
                                        }} onClick={handleLike}>
                                            <FaRegStar style={{color: "#c4c197", fontSize: '2em'}}/>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="col-8" style={{padding: 20}}>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Name:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {remotePetData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Gender:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {remotePetData.gender}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Description:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {remotePetData.description}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Address:</strong>
                                </div>
                                <div className="col-8 detailPage-pet-info">
                                    {remotePetData.contact.address.address1}, {remotePetData.contact.address.city}, {remotePetData.contact.address.state} {remotePetData.contact.address.postcode}
                                    <img
                                        src={getGoogleMapImageUrl(`${remotePetData.contact.address.address1}, ${remotePetData.contact.address.city}, ${remotePetData.contact.address.state} ${remotePetData.contact.address.postcode}`)}
                                        style={{margin: 5, paddingBottom: 10}} alt="Location on Map"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-end detailPage-pet-info">
                                    <strong>Contact:</strong>
                                </div>
                                <div className="col-8 detailPage-button-container">
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
    if (Array.isArray(localResults)) {
        return localResults.find(p => p._id === id);
    }
    else if (localResults._id === id) {
        return localResults;
    }
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
