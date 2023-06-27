import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {accessUser} from "../services/auth-service";
import {visitMypets} from "../services/pet-service";
import {useSelector} from "react-redux";
import {useRef} from "react";
import "./publicProfile.css"
import styles from "../home-page/components/petlist/petlist.module.scss";
import PostedList from "../home-page/components/lostpet/lostpet"
import WatchedListComponent from "./watchedList";

function PublicProfile() {
    const [myPets, setMypets] = useState([])

    const [responseData, setresponseData] = useState("");
    const {currentUser} = useSelector((state) => state.user);

    const {id} = useParams();
    const [displayList, setDisplayList] = useState([]);

    const currentNdx = useRef(0);

    console.log("iddddddddd", id);

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
        const end = currentNdx.current + 6;
        if (end > myPets.length) {
            setDisplayList(myPets);
            return;
        }
        const list = myPets.slice(currentNdx.current, end);
        setDisplayList(list);
    }, [myPets]);


    useEffect(() => {
        fetchVisitedMypets(id);
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
            <div> <PostedList/></div>
            <h3 className="compBetween">Watchlisted Pets</h3>
            <div><WatchedListComponent userId={id}/></div>
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

export default PublicProfile;