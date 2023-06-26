import {useState} from "react";
import {getAnimal} from "../../../api/homepage";
import styles from "./petlist.module.scss";
import {useEffect} from "react";
import {useRef} from "react";
import {useNavigate} from "react-router";

const PetList = ({data = null}) => {
    const [animalsList, setAnimalList] = useState([]);
    const [displayList, setDisplayList] = useState([]);//displayList=animalList[currentNdx+6]
    const currentNdx = useRef(0);


    const fetchAnimals = async () => {
        const res = await getAnimal("dog", "10001");
        const animals = res.data.animals;
        setAnimalList(animals);
    };

    useEffect(() => {
        const end = currentNdx.current + 6;
        if (end > animalsList.length) {
            setDisplayList(animalsList);
            return;
        }
        const list = animalsList.slice(currentNdx.current, end);
        setDisplayList(list);
    }, [animalsList]);

    useEffect(() => {
        if (data === null) {
            fetchAnimals();
        } else {
            const animals = data.data.animals;
            setAnimalList(animals);
        }

    }, []);

    const handleRight = () => {
        if (currentNdx.current + 6 >= animalsList.length) return;
        currentNdx.current += 1;
        const end = currentNdx.current + 6;
        const list = animalsList.slice(currentNdx.current, end);
        setDisplayList(list);
    };
    const handleLeft = async () => {
        if (currentNdx.current <= 0) return;
        currentNdx.current -= 1;
        const end = currentNdx.current + 6;
        const list = animalsList.slice(currentNdx.current, end);
        setDisplayList(list);
    };
    if (displayList.length === 0) return <></>
    return (
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
                    <PetListItem key={ndx} item={item} remoteSearchResults={animalsList}/>
                ))}
            </div>
        </div>
    );
};

const PetListItem = ({item, localSearchResults, remoteSearchResults}) => {
    const navigate = useNavigate();
    const photos = item.photos;
    let img = '';
    if (photos?.length !== 0) {
        img = photos[0].full;
    }
    const handleClickItem = () => {
        console.log(item)
        navigate("/details/" + item.id, {
            state: {
                remoteSearchResults: item
            }
        })
        // window.open(item.url)
    }

    return (
        <div className={styles.petlistItemWrapepr} onClick={handleClickItem}>
            <div className={styles.petlistItem}>
                <img src={img} alt=""/>
            </div>
            <div className={styles.label}>{item.name}</div>
            <div className={styles.description}>{item.breeds.primary}</div>
        </div>
    );
};

export default PetList;
