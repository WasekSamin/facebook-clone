import React from "react";
import CreatePost from "../../components/post/CreatePost";

import "../../css/home/HomeMiddle.css";
import HomePosts from "./HomePosts";

const HomeMiddle = () => {
  return (
    <div className="home__middleMainDiv">
      <CreatePost />
      <HomePosts />
    </div>
  );
};

export default HomeMiddle;
