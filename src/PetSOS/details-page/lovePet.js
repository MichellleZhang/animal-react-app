import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lovePetThunk } from '../services/lovePet-thunk';

const LovePet = ({ petId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [isPetLoved, setIsPetLoved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setIsPetLoved(currentUser.lovedPets.includes(petId));
        }
    }, [currentUser, petId]);

    const handleClick = () => {
        if (!currentUser) {
            navigate('/login');
        } else {
            dispatch(lovePetThunk({ userId: currentUser.id, petId }))
                .then((isLoved) => setIsPetLoved(isLoved))
                .catch((error) => console.error(error));
        }
    };

    return <i onClick={handleClick} className={`fa-star ${isPetLoved ? "fas fa-star" : "far fa-star"}`}></i>;
};

export default LovePet;
