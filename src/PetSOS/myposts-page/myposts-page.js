import WatchedListComponent from "../profile-page/watchedList";
import {useSelector} from "react-redux";
import PostedList from "../home-page/components/lostpet/lostpet";
import React from "react";

function MyPostsPage() {
    const {currentUser} = useSelector((state) => state.user);
    console.log("currentUser", currentUser);

    return (
        <div style={{ margin: "30px" }}>
            <h3 className="compBetween">Posts</h3>
            <div><PostedList/></div>
            <h3 className="compBetween">Watchlisted Pets</h3>
            <div><WatchedListComponent userId={currentUser._id}/></div>
        </div>
    )
}

export default MyPostsPage;