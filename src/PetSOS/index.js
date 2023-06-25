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
import ManagementDashboard from "./management-page.js/dashboard"
import LostPet from "./lost-pet";
import HomePage from "./home-page/home-page";
import Profile from "./profile-page/profile";
import ProtectedRoute from "./protected-route"
import AuthContext from "./auth-context"
import PublicProfile from "./profile-page/Profile-public"
import Search from "./search/search";
import Mypets from "./myPet-page/myPets"
import PetDetails from "./details-page/petsDetail";
import Myposts from "./profile-page/my-posts"

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
                            <Route path="/profile/:id" element={<PublicProfile />} />
                            <Route path="/management-dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
                            <Route path="/myPets" element={<Mypets />} />
                            <Route path="/details/:id" element={<PetDetails />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/reportLost" element={<LostPet />} />
                            <Route path="/myposts" element={<Myposts />} />

                        </Routes>
                    </div>
                </div>
            </AuthContext>
        </Provider>
    )
}
export default PetSOS;
