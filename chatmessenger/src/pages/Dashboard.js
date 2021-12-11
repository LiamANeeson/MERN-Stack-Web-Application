import React, { useState } from "react";
import MySavedPosts from "./MySavedPosts";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import DrawerLeft from "../components/DrawerLeft";
import Rightbar from "../components/Rightbar";
import { Grid, makeStyles } from "@material-ui/core";
import Feed from "../components/Feed";
import { getPosts } from "../utils/utils";
import Filter from "../components/Filter";

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
            <Filter
              posts={posts}
              authorFilterValue={authorFilterValue}
              setAuthorFilterValue={setAuthorFilterValue} />
            <MySavedPosts savedPosts={savedPosts} setSavedPosts={setSavedPosts} />
          </Rightbar>
        </Grid>
      </Grid>
      
      <Add />
    </div>
  );
};

export default Dashboard;
