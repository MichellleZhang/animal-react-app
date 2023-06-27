import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {useRef} from "react";
import "./publicProfile.css"
import * as likeService from "../services/likePet-service";
import styles from "../home-page/components/petlist/petlist.module.scss";


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


function WatchedListComponent(userId) {

    const id = userId.userId;
    console.log("iddddd",id);
    console.log("userId", userId);
    const [petLiked, setPetLiked] = useState([]);
    const [displayLikeList, setDisplayLikeList] = useState([]);
    const currentLikedNdx = useRef(0);

    const fetchMyLikes = async (userId) => {
        const pets = await likeService.getLikedPets(userId);
        setPetLiked(pets);
    }

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
        fetchMyLikes(id);
    }, [id]);

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
    )
}

export default WatchedListComponent;