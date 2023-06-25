import { useParams } from 'react-router-dom';
import { accessUser } from "../services/auth-service";

function UserProfile() {
    const { id } = useParams();
    const user = accessUser(id);
    console.log("uuuuuur",user)
    return (
        <div className="box">
            <form>
                testtest
            </form>
        </div>
    )
}

export default UserProfile;