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
import Profile from "./profile-page/profile";
import ManagementDashboard from "./management-page.js/dashboard"
import ProtectedRoute from "./protected-route"
import AuthContext from "./auth-context"
import UserProfile from "./profile-page/userProfile"

const store = configureStore({
    reducer: { user: authReducer }
});
function PetSOS() {
    return (
        <Provider store={store}>
            <AuthContext>
            <div >
                <NavigationBar />
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/privatePolicy" element={<PrivatePolicy />} />
                        <Route path="/serviceTerm" element={<ServiceTerm />} />
                        <Route path="/contactInfo" element={<ContactInfo />} />
                        <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
                        <Route path="/profile/:id" element={<UserProfile/>} />
                        <Route path="/management-dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
            </AuthContext>
        </Provider>
    )
}
export default PetSOS;
