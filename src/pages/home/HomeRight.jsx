import React from 'react';
import "../../css/home/HomeRight.css";
import HomeRightFriendRequests from './HomeRightFriendRequests';
import HomeRightMessages from './HomeRightMessages';

const HomeRight = () => {
  return (
    <div className="home__rightMainDiv">
      <HomeRightMessages />
      <HomeRightFriendRequests />
    </div>
  )
}

export default HomeRight