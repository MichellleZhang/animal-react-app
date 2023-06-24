import { Link } from "react-router-dom";
import styles from "./home-page.module.scss";
import PetList from "./components/petlist/petlist";

const HomePage=()=>{

    return <div className={styles.container}>
        <div className={styles.bannerWrapper}>
            <img src="/img/pet.jpg" alt=""/>
            <div className={styles.contextWrapper}>
                <div className={styles.title}>Find Your Pet</div>
                <div className={styles.subTitle}>Let Us to Bring Your Pet Home</div>
                <Link to="/register">
                    <div className={styles.signupButton}>Sign Up</div>
                </Link>
             </div>
        </div>
        <PetList/>
    </div>;
}

export default HomePage;