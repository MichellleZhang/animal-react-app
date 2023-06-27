import { Link } from "react-router-dom";
import styles from "./home-page.module.css";
import PetList from "./components/petlist/petlist";
import LostpetList from "./components/lostpet/lostpet"
import { useSelector } from "react-redux";
import axios from "axios";
import { getAnimal } from "../api/homepage";
import { getLostPetList } from "../api/lostpet";
import { useEffect } from "react";
import { useState } from "react";
// for testing purpose
const HomePage = () => {
    const [reponses, setReponses] = useState([]);

    const fetchAllData = async () => {
        const response = await axios.all([getAnimal("dog", "10001"), getLostPetList()]);
        setReponses(response);
    }

    useEffect(() => {
        fetchAllData();
    }, [])
    const { currentUser } = useSelector(state => state.user);
    return <div className={styles.container}>
        <div className={styles.bannerWrapper}>
            <img src="/img/pet.jpg" alt="" />
            <div className={styles.contextWrapper}>
                <div className={styles.title}>Find Your Pet</div>
                <div className={styles.subTitle}>Let Us to Bring Your Pet Home</div>
                {
                    currentUser ? <div className={styles.subTitle}> Welcome</div>
                        :
                        <Link to="/register">
                            <div className={styles.signupButton}>Sign Up</div>
                        </Link>
                }
            </div>
        </div>
        {
            reponses.length !== 0 && < div >
                <PetList data={reponses[0]}/>
                <LostpetList data={reponses[1]}/>
            </div>
        }
    </div >;
}

export default HomePage;