import WatchedListComponent from "../profile-page/watchedList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostedList from "../home-page/components/lostpet/lostpet";
import React from "react";

function MyPostsPage() {
    const { currentUser } = useSelector((state) => state.user);
    console.log("currentUser", currentUser);

    return (
        <div className="boxbox" style={{ margin: "30px" }}>
            <div>
                <h1>My Profile</h1>
                <div class="nav nav-tabs">
                    <Link class="nav-link" style={{ "color": "#403F2B" }} to="/profile">My Information</Link>
                    <Link class="nav-link active" style={{ "color": "#403F2B" }} to="/posts">My Posts</Link>
                </div>
            </div>
            <div>
                <h3 className="compBetween">Posts</h3>
                <div><PostedList /></div>
                <h3 className="compBetween">Watchlisted Pets</h3>
                <div><WatchedListComponent userId={currentUser._id} /></div>
            </div>
        </div>
    )
}

export default MyPostsPage;