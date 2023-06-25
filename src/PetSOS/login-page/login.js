import React, { useState } from "react";
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch} from "react-redux";
import { loginThunk } from "../services/auth-thunk";
import axios from "axios";
const SERVER_API_URL = "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ baseURL: USERS_URL, withCredentials: true });

function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    // const {error, currentUser} = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const HandleLogin = async () => {
        if (!account || !password) {
            setLoginError(true);
            return;
        } else {
            const var1 = {};
            try {
                // await dispatch(loginThunk({ account, password }));
                console.log("1"); 
                const response = await api.post(`${USERS_URL}/login`, { account, password });
                if(response.data.code==='400'){
                    alert(response.data.message)
                    return
                }
                await dispatch(loginThunk({ account, password }));
                console.log("2"); 
                navigate("/profile");
            } catch (error) {
                alert("Something failed!");
                console.log("var",var1); 
            }
        }
    }
    return (
        <div className="content">
            <div className="login-content">
                <div className="slogan-box"></div>
                <div className="loginbox">
                    <h1>Login</h1>
                    <div>
                        <input className="form-control" type="text" placeholder="Username or Email" value={account}
                            onChange={(event) => setAccount(event.target.value)}/>
                    </div>
                    <div className="foget">
                        <Link to="/contactInfo" className="forget-style">Forget Username or Email ?</Link>
                    </div>
                    <div>
                        <input type="Password" placeholder="Password" value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="foget">
                        <Link to="/contactInfo" className="forget-style">Forget Password ?</Link>
                    </div>
                    <div className="message">
                     {loginError ? "*Incorrect username or password" : ""}
                    {/* { error ? <>{JSON.stringify(error, null, 2)}</> : ""} */} 
                    </div>
                    <div>
                        <button onClick={HandleLogin}>LOGIN</button>
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