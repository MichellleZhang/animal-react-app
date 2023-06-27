import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css"
import { profileThunk, updateUserThunk } from "../services/auth-thunk";
import states from '../register-page/states.json';

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    console.log("currentUser", currentUser)
    const [profile, setProfile] = useState(currentUser);
    console.log("profile", profile)
    const dispatch = useDispatch();

    const save = () => {
        dispatch(updateUserThunk(profile));
        alert("Save successful !")
    };

    useEffect(() => {
        const getProfile = async () => {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
        };
        getProfile();
    }, [dispatch]);

    useEffect(() => {
        setProfile(currentUser);
    }, [currentUser]);

    return (
        <div className="boxbox" style={{ margin: "30px" }}>
            <div>
                <h1>My Profile</h1>
                <div class="nav nav-tabs">
                    <Link class="nav-link active" style={{ "color": "#403F2B" }} to="/profile">My Information</Link>
                    <Link class="nav-link" style={{ "color": "#403F2B" }} to="/posts">My Posts</Link>
                </div>
            </div>
            <div>
                <h3 className="compBetween">Personal Information</h3>
                <div className="row compBetween">
                    <div className="col-2">
                        <label>First Name</label>
                    </div>
                    <div className="col-7">
                        <input className="form-control" type="text" value={profile.firstName}
                            onChange={(event) => {
                                const newProfile = { ...profile, firstName: event.target.value };
                                setProfile(newProfile);
                            }} />
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>

                <div className="row compBetween">
                    <div className="col-2">
                        <label>Last Name</label>
                    </div>
                    <div className="col-7">
                        <input type="text" value={profile.lastName} className="form-control"
                            onChange={(event) => {
                                const newProfile = { ...profile, lastName: event.target.value };
                                setProfile(newProfile);
                            }} />
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>

                <div className="row compBetween">
                    <div className="col-2">
                        <label>Current Role</label>
                    </div>
                    <div className="col-7">
                        <input className="form-control" type="text" value={profile.role} />
                    </div>
                    <div className="col justify-content-center">
                        <Link to="/contactInfo" ><label>* Please contact IT team make a change</label></Link>
                    </div>

                </div>

                <h3 className="compBetween">Contact Information</h3>
                <div className="row compBetween">
                    <div className="col-2">
                        <label>Phone Number</label>
                    </div>
                    <div className="col-7">
                        <input type="text" value={profile.phoneNumber} className="form-control"
                            onChange={(event) => {
                                const newProfile = { ...profile, phoneNumber: event.target.value };
                                setProfile(newProfile);
                            }} />
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>
                <div className="row compBetween">
                    <div className="col-2">
                        <label>Zip code</label>
                    </div>
                    <div class="col-7">
                        <input type="text" value={profile.zipCode} className="form-control"
                            onChange={(event) => {
                                const newProfile = { ...profile, zipCode: event.target.value };
                                setProfile(newProfile);
                            }} />
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>
                <div className="row compBetween">
                    <div className="col-2">
                        <label>State</label>
                    </div>
                    <div class="col-7">
                        <select className="form-control" value={profile.state} onChange={(event) => {
                            const newState = event.target.value;
                            const newProfile = { ...profile, state: newState };
                            setProfile(newProfile);
                        }}>
                            {states.map((state) => (
                                <option key={state.name} value={state.name}>{state.name}</option>))}</select>
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>

                <h3 className="compBetween">Account Information</h3>
                <div className="row compBetween">
                    <div className="col-2">
                        <label>Username</label>
                    </div>
                    <div class="col-7">
                        <input className="form-control" type="text" value={profile.username} />
                    </div>
                </div>

                <div className="row compBetween">
                    <div className="col-2">
                        <label>Email</label>
                    </div>
                    <div class="col-7">
                        <input className="form-control" type="text" value={profile.email} />
                    </div>
                </div>

                <div className="row compBetween">
                    <div className="col-2">
                        <label>Password</label>
                    </div>
                    <div class="col-7">
                        <input className="form-control" type="text" value={profile.password}
                            onChange={(event) => {
                                const newProfile = { ...profile, password: event.target.value };
                                setProfile(newProfile);
                            }} />
                    </div>
                    <div class="col-auto">
                        <button onClick={save} className="btn btn-sm" style={{ "background-color": "#C4C197" }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile