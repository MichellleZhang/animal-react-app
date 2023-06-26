import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {accessUser} from "../services/auth-service";
import {visitMypets} from "../services/pet-service";
import {useSelector} from "react-redux";
import {useRef} from "react";
import "./publicProfile.css"
import * as likeService from "../services/likePet-service";
import styles from "../home-page/components/petlist/petlist.module.scss";

function PublicProfile() {
    const [myPets, setMypets] = useState([])
    const [petLiked, setPetLiked] = useState([]);
    const [responseData, setresponseData] = useState("");
    const {currentUser} = useSelector((state) => state.user);

    const {id} = useParams();
    const [displayList, setDisplayList] = useState([]);
    const [displayLikeList, setDisplayLikeList] = useState([]);
    const currentNdx = useRef(0);
    const currentLikedNdx = useRef(0);

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

    const fetchMyLikes = async (id) => {
        const pets = await likeService.getLikedPets(id);
        setPetLiked(pets);
    }

    useEffect(() => {
        const end = currentNdx.current + 6;
        if (end > myPets.length) {
            setDisplayList(myPets);
            return;
        }
        const list = myPets.slice(currentNdx.current, end);
        setDisplayList(list);
    }, [myPets]);

    useEffect(() => {
        const end = currentLikedNdx.current + 6;
        if (end > petLiked.length) {
            setDisplayLikeList(petLiked);
            return;
        }
        const list = petLiked.slice(currentLikedNdx.current, end);
        setDisplayLikeList(list);
    }, [petLiked]);

    useEffect(() => {
        fetchVisitedMypets(id);
        fetchMyLikes(id);
    }, [id]);

    const handleRight = () => {
        if (currentNdx.current + 6 >= myPets.length) return;
        currentNdx.current += 1;
        const end = currentNdx.current + 6;
        const list = myPets.slice(currentNdx.current, end);
        setDisplayList(list);
    };
    const handleLeft = async () => {
        if (currentNdx.current <= 0) return;
        currentNdx.current -= 1;
        const end = currentNdx.current + 6;
        const list = myPets.slice(currentNdx.current, end);
        setDisplayList(list);
    };
    if (displayList.length === 0) return <></>

    const handleRightLiked = () => {
        if (currentLikedNdx.current + 6 >= petLiked.length) return;
        currentLikedNdx.current += 1;
        const end = currentLikedNdx.current + 6;
        const list = petLiked.slice(currentLikedNdx.current, end);
        setDisplayLikeList(list);
    };

    const handleLeftLiked = async () => {
        if (currentLikedNdx.current <= 0) return;
        currentLikedNdx.current -= 1;
        const end = currentLikedNdx.current + 6;
        const list = petLiked.slice(currentLikedNdx.current, end);
        setDisplayLikeList(list);
    }

    if (displayLikeList.length === 0) return (<div> No Liked Pets</div>)


    return (
        <div className="boxPublic">
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
                    <div className={styles.container}>
                        <div className={styles.controllerWrapper}>
                            <div className={styles.leftButton} onClick={handleLeft}>
                                《
                            </div>
                            <div className={styles.rightButton} onClick={handleRight}>
                                》
                            </div>
                        </div>
                        <div className={styles.petlistWrapper}>
                            {displayList.map((item, ndx) => (
                                <PetListItem1 key={ndx} item={item}/>
                            ))}
                        </div>
                    </div>
                </>
            ) : null}

            <h3 className="compBetween">Posts</h3>
            <div> loading</div>
            <h3 className="compBetween">Watchlisted Pets</h3>
            <div className={styles.container}>
                <div className={styles.controllerWrapper}>
                    <div className={styles.leftButton} onClick={handleLeftLiked}>
                        《
                    </div>
                    <div className={styles.rightButton} onClick={handleRightLiked}>
                        》
                    </div>
                </div>
                <div className={styles.petlistWrapper}>
                    {displayLikeList.map((item, ndx) => (
                        <PetListItem2 key={ndx} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

const PetListItem1 = ({item}) => {
    return (
        <div className={styles.petlistItemWrapepr}>
            <div className={styles.petlistItem}>
                <img src={item.image} alt="No Upload"/>
            </div>
            <div className={styles.label}>{item.name}</div>
            <div className={styles.label}>{item.type}</div>
            <div className={styles.description}>{item.description}</div>
        </div>
    );
};

const PetListItem2 = ({item}) => {

    const navigate = useNavigate();

    const handleClickItem=()=>{
        navigate(`/details/${item.petId._id}`, { state: {localSearchResults: item.petId}})
    }

    return (
        <div className={styles.petlistItemWrapepr} onClick={handleClickItem}>
            <div className={styles.petlistItem}>
                <img src={`/img/${item.petId.image}`} alt={`${item.petId.name} - ${item.petId.status}`}/>
            </div>
            <div className={styles.label}>{item.petId.name}</div>
            <div className={styles.label}>{item.petId.type}</div>
            <div className={styles.description}>{item.petId.status}</div>
        </div>
    );
};

export default PublicProfile;