import React, { useState } from "react";
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../services/auth-thunk";

function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            await dispatch(loginThunk({ account, password }));
            navigate("/home");
        } catch (error) {
           alert(error);
        }
    };
    return (
        <div className="content container">
            <div className="login-content">
                <div className="slogan-box"></div>
                <div className="loginbox">
                    <h1>Login</h1>
                    <div>
                        <input className="form-control" type="text" placeholder="Username or Email" value={account}
                            onChange={(event) => setAccount(event.target.value)} />
                    </div>
                    <div className="foget">
                        <Link to="/contactInfo" className="forget-style">Forget Username or Email ?</Link>
                    </div>
                    <div>
                        <input type="Password" placeholder="Password"value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className="foget">
                        <Link to="/contactInfo" className="forget-style">Forget Password ?</Link>
                    </div>
                    <div>
                        <button onClick={handleLogin}>LOGIN</button>
                    </div>
                    <div className="mb-3">
                        <span>New here? </span>
                        <span><Link to="/register" className="link-style "><b>Create an Account</b></Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;