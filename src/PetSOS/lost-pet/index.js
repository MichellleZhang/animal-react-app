import { useState } from "react";
import styles from "./index.module.css";
import { useFormik } from "formik";
import { addLostpet, lostPetUploadImage } from "../api/lostpet";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LostPet = () => {
  const [status, setStatus] = useState("lost");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser == null) navigate("/login");
  }, []);
  const formik = useFormik({
    initialValues: {
      color: "",
      zipcode: "",
      gender: "",
      breed: "",
      petName: "",
      addressLastSeen: "",
      uploadedImage: "",
      type: "",
      userId: "",
      postType: "lost",
    },
    onSubmit: (values) => {
      if (!values.addressLastSeen) {
        alert(" Nearest Address Last Seen，Zipcode，Breed is required");
      }
      console.log("aa", values);
    },
  });

  const handleStatusChange = (e) => {
    const status = e.target.value;
    formik.values.postType = status;
    console.log(status)
    setStatus(status);
  };
  const handleUpdateImage = async (event) => {
    const file = event.target.files[0];
    const res = await lostPetUploadImage(file);
    if (res.data.success) {
      console.log("success", res.data.success);
      formik.values.uploadedImage = res.data.url;
      toast.success("success");
    } else {
      toast.warning(res.data.success);
    }
  };
  const handleSubmit = async () => {
    formik.values.userId = currentUser._id;
    const values = formik.values;
    if (currentUser == null) return toast.warning("Please Login");
    if (!values.addressLastSeen) {
      return toast.warning(" Nearest Address Last Seen is required");
    }
    // if (!values.uploadedImage) {
    //     return toast.warning("image is required")
    // }
    if (!values.breed) {
      return toast.warning("Breed is required");
    }
    if (!values.zipcode) {
      return toast.warning("Zipcode， is required ");
    }
    const res = await addLostpet(values);

    if (res.data.success) {
      toast.success("上传成功");
      console.log("上传成功", res.data);
    } else {
      toast.warning(res.data.success);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contextWrapper}>
        <div className={styles.title}>Start Your Free Alert</div>
        <div className={styles.description}>
          Enter your pet's information to instantly start spreading local
          awareness
        </div>
        <div className={styles.petStatusWrapper}>
          <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
            Pet Status
          </div>
          <div className={styles.statusItemWrapper}>
            <div className={styles.statusItem}>
              <label htmlFor="lost">
                <input
                  onChange={handleStatusChange}
                  type="radio"
                  id="lost"
                  name="lost"
                  value="lost"
                  checked={formik.values.postType==='lost'}
                />
                Lost
              </label>
            </div>
            <div className={styles.statusItem}>
              <label htmlFor="found">
                <input
                  onChange={handleStatusChange}
                  type="radio"
                  name="lost"
                  id="found"
                  value="found"
                  checked={formik.values.postType==='found'}
                />
                Found/Stray
              </label>
            </div>
          </div>
        </div>

        <form
          className={`${styles.inputWrapper}`}
          onSubmit={formik.handleSubmit}
        >
          {
            <div className={styles.inputItem}>
              <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
                Upload Image
              </div>
              <input
                onChange={handleUpdateImage}
                className={styles.input}
                type="file"
                id="uploadedImage"
                name="uploadedImage"
              />
            </div>
          }
          <div className={styles.inputItem}>
            <div className={styles.inputLabel}>type</div>
            <select
              className={styles.input}
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option>Cat</option>
              <option>Dog</option>
              <option>Bird</option>
            </select>
          </div>
          <div className={styles.inputItem}>
            <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
              Pet Name
            </div>
            <input
              className={styles.input}
              id="petName"
              name="petName"
              value={formik.values.petName}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inputItem}>
            <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
              Nearest Address Last Seen
            </div>
            <input
              className={styles.input}
              id="addressLastSeen"
              name="addressLastSeen"
              value={formik.values.addressLastSeen}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inputItem}>
            <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
              Breed
            </div>
            <input
              className={styles.input}
              id="breed"
              name="breed"
              value={formik.values.breed}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inputItem}>
            <div className={styles.inputLabel}>Gender</div>
            <input
              className={styles.input}
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inputItem}>
            <div className={styles.inputLabel}>Color</div>
            <input
              className={styles.input}
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inputItem}>
            <div className={`${styles.inputLabel}  ${styles.requiredLabel}`}>
              Zipcode
            </div>
            <input
              className={styles.input}
              id="zipcode"
              name="zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
            />
          </div>
        </form>
        <div className={styles.submitButtonWrapper}>
          <div onClick={handleSubmit} className={styles.submitButton}>
            Get Your Pet Back Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPet;