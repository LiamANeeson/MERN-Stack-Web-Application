import React, { useEffect, useState } from "react";
import MySavedPosts from "./MySavedPosts";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import DrawerLeft from "../components/DrawerLeft";
import Rightbar from "../components/Rightbar";
import { Grid, makeStyles } from "@material-ui/core";
import Feed from "../components/Feed";
import { getPosts } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([])

  const [authorFilterValue, setAuthorFilterValue] = useState("");

  const getUniquePostFields = (fieldName) => {
    const foundItems = [];

    for (let post of posts) {
      if (!foundItems.includes(post[fieldName])) {
        foundItems.push(post[fieldName]);
      }
    }

    return foundItems.map((foundItem) => (
      <option key={foundItem} value={foundItem}>
        {foundItem}
      </option>
    ));
  };

  return (
    <div>
      <Navbar getPosts={getPosts} setPosts={setPosts} />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <DrawerLeft />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed
            authorFilterValue={authorFilterValue}
            posts={posts}
            setPosts={setPosts}
            savedPostIDs={savedPosts.map(post => post._id)} />
        </Grid>
        <Grid item sm={3}>
          <Rightbar>
            <MySavedPosts savedPosts={savedPosts} setSavedPosts={setSavedPosts} />
          </Rightbar>
        </Grid>
      </Grid>
      {/* -----------------------Filter---------------------------- */}
      <label htmlFor="authorFilter">Author:</label>
      <select
        name="authorFilter"
        placeholder="Filter"
        value={authorFilterValue}
        onChange={(e) => setAuthorFilterValue(e.target.value)}
      >
        <option key={0} value={""}>
          All
        </option>
        {getUniquePostFields("author")}
      </select>
      <Add />
    </div>
  );
};

export default Dashboard;
