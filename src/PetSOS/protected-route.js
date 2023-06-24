import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function ProtectedRoute({ children }) {
    const { currentUser } = useSelector((state) => state.user);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;