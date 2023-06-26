import { useState } from "react";
import { getAnimal } from "../../../api/homepage";
import styles from "./lostpet.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { getLostPetList } from "../../../api/lostpet";
const LostpetList = ({ data = null }) => {
  const [animalsList, setAnimalList] = useState([]);
  const [displayList, setDisplayList] = useState([]);//displayList=animalList[currentNdx+6]
  const currentNdx = useRef(0);


  const fetchAnimals = async () => {
    const res = await getLostPetList();
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
    if (data == null) {
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

          <PetListItem key={ndx} item={item} remoteSearchResults={animalsList} />
        ))}
      </div>
    </div>
  );
};

const PetListItem = ({ item, localSearchResults, remoteSearchResults }) => {
  const navigate = useNavigate();
  let img = "http://localhost:4000" + item.uploadedImage;

  console.log("itemmmmm", item)
  const handleClickItem = () => {
    item.uploadedImage = img
    navigate(`/details/${item._id}`, {
      state: {
        localSearchResults:item
      }
    })
    // window.open(item.url)
  }

  return (
    <div className={styles.petlistItemWrapepr} onClick={handleClickItem}>
      <div className={styles.petlistItem}>
        <img src={img} alt="" />
      </div>
      <div className={styles.label}>{item.petName}</div>
      <div className={styles.description}>{item.breed}</div>
    </div>
  );
};

export default LostpetList;
