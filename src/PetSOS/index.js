import { Routes, Route } from "react-router";
import Login from "../PetSOS/login-page/login";
import Register from "../PetSOS/register-page/register";
import PrivatePolicy from "../PetSOS/details-page/PrivatePolicy"
import ServiceTerm from "../PetSOS/details-page/TermsofService"
import NavigationBar from "./navigationBar/navigation";
import ContactInfo from "./details-page/contactInfo"
import authReducer from "./reducers/auth-reducer";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";

const store = configureStore({
    reducer: { user: authReducer }
});
function PetSOS() {
    return (
        <Provider store={store}>
            <div >
                <NavigationBar />
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/privatePolicy" element={<PrivatePolicy />} />
                        <Route path="/serviceTerm" element={<ServiceTerm />} />
                        <Route path="/contactInfo" element={<ContactInfo />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    )
}
export default PetSOS;
