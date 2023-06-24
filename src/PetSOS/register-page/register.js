import React, { useState } from "react";
import states from './states.json';
import './register.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunk";

function Register() {
    const [username, setUsername] = useState("");
    const [lastName, setLastname] = useState("");
    const [firstName, setFirstname] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleregister = async () => {
        try {
            await dispatch(registerThunk({ username, lastName, firstName, state, zipCode, phoneNumber, email, password, role }));
            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="content">
            <div className="register-content">
                <div className="register-wrapper">
                    <h1>Register</h1>
                    <h3>Welcome to PetSOS!</h3>
                    <div className="inputbox">
                        <div className="row">
                            <div>
                                <label className="label" htmlFor="username">Username</label>
                                <input className="custom-input" type="text" placeholder="Username" id="username" value={username}
                                    onChange={(event) => setUsername(event.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label className="label" htmlFor="firstname">First Name</label>
                                <input className="custom-input" type="text" placeholder="First name" id="firstname" value={firstName}
                                    onChange={(event) => setFirstname(event.target.value)}
                                />
                            </div>
                            <div className="col-6">
                                <label className="label" htmlFor="lastname">Last Name</label>
                                <input className="custom-input" type="text" placeholder="Last name" id="lastname" value={lastName}
                                    onChange={(event) => setLastname(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label className="label" htmlFor="State">State</label>
                                <select className="custom-input" id="State" name="state" value={state} onChange={(event) => setState(event.target.value)}>
                                    {states.map((state) => (
                                        <option key={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="label" htmlFor="zipcode" value={zipCode}>Zip Code</label>
                                <input className="custom-input" type="text" id="zipcode" placeholder="ZIP Code"
                                    onChange={(event) => setZipCode(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label className="label" htmlFor="phoneNumber" value={phoneNumber}>Phone Number</label>
                                <input className="custom-input" type="input" placeholder="Phone Number" id="phoneNumber"
                                    onChange={(event) => setNumber(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label className="label" htmlFor="email" value={email}>Email</label>
                                <input className="custom-input" type="email" placeholder="Email" id="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label className="label" htmlFor="password" value={email}>Password</label>
                                <input className="custom-input" type="Password" placeholder="Password" id="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-check-inline role row">
                            <label>Role: </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="Volunteer" name="radio-role" id="role-volunteer"
                                onChange={() => setRole("Volunteer")} />
                            <label className="form-check-label" htmlFor="role-volunteer"> Volunteer </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value="PetOwner" name="radio-role" id="role-owner"
                                onChange={() => setRole("PetOwner")} />
                            <label className="form-check-label" htmlFor="role-owner"> Pet Owner </label>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleregister}>SIGN UP</button>
                    </div>
                    <div className="link-login">
                        <span>Already have an account? </span>
                        <span><Link to="/login" className="link-style "><b>Login</b></Link></span>
                    </div>
                    <div>
                        <p>By clicking Sign Up, you agree to our
                            <Link to="/serviceTerm" className="highlight"><b> Terms of Service </b></Link>
                            and
                            <Link to="/privatePolicy" className="highlight "><b> Privacy Policy </b></Link>
                            <br />
                            We never share your contact info with any third parties.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;
