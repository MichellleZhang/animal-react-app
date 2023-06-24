import { useState } from "react";
import styles from "./index.module.scss";
import { useFormik } from "formik";


const LostPet = () => {
    const [status, setStatus] = useState('lost');

    const formik = useFormik({
        initialValues: {
            color: '',
            gender: '',
            breed: '',
            petName: '',
            addressLastSeen: '',
            uploadedImage: void 0,
        },
        onSubmit: (values) => {
            console.log(values);
        },

    });

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setStatus(status);
    }

    const handleSubmit = () => {
        console.log(formik.values);
    }
    return <div className={styles.container}>
        <div className={styles.contextWrapper}>
            <div className={styles.title}>Start Your Free Alert</div>
            <div className={styles.description}>Enter your pet's information to instantly start spreading local awareness</div>
            <div className={styles.petStatusWrapper}>
                <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
                    Pet Status
                </div>
                <div className={styles.statusItemWrapper}>
                    <div className={styles.statusItem}>
                        <label htmlFor="lost">
                            <input onChange={handleStatusChange} type="radio" id="lost" name="lost" value="lost" />
                            Lost</label>
                    </div>
                    <div className={styles.statusItem}>
                        <label htmlFor="found">
                            <input onChange={handleStatusChange} type="radio" name="lost" id="found" value="found" />
                            Found/Stray</label>
                    </div>
                </div>
            </div>
            <form className={`${styles.inputWrapper}`} onSubmit={formik.handleSubmit}>
                {
                    (status === 'found') && <div className={styles.inputItem}>
                        <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>Upload Image</div>
                        <input className={styles.input} type="file" id="uploadedImage" name="uploadedImage" value={formik.values.uploadedImage} onChange={formik.handleChange} />
                    </div>
                }
                <div className={styles.inputItem}>
                    <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>Pet Name</div>
                    <input className={styles.input} id="petName" name="petName" value={formik.values.petName} onChange={formik.handleChange} />
                </div>
                <div className={styles.inputItem}>
                    <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>Nearest Address Last Seen</div>
                    <input className={styles.input} id="addressLastSeen" name="addressLastSeen" value={formik.values.addressLastSeen} onChange={formik.handleChange} />
                </div>
                <div className={styles.inputItem}>
                    <div className={styles.inputLabel}>Color</div>
                    <input className={styles.input} id="color" name="color" value={formik.values.color} onChange={formik.handleChange} />
                </div>
                <div className={styles.inputItem}>
                    <div className={styles.inputLabel}>Gender</div>
                    <input className={styles.input} id="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange} />
                </div>
                <div className={styles.inputItem}>
                    <div className={styles.inputLabel}>Breed</div>
                    <input className={styles.input} id="breed" name="breed" value={formik.values.breed} onChange={formik.handleChange} />
                </div>
            </form>
            <div className={styles.submitButtonWrapper}>
                <div onClick={handleSubmit} className={styles.submitButton}>Get Your Pet Back Home</div>
            </div>
        </div>
    </div>
}

export default LostPet;