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
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  const [authorFilterValue, setAuthorFilterValue] = useState("");

  // Create a Post
  async function createPost(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      alert("Post Success");
    }
  }

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
          <Feed authorFilterValue={authorFilterValue} posts={posts} setPosts={setPosts} />
        </Grid>
        <Grid item sm={3}>
          <Rightbar />
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
      <br />
      {/* -------------------Create Post-------------------- */}
      <form onSubmit={createPost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="title"
          placeholder="Post Title"
        />
        <br />
        <br />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Insert Post Here"
        />
        <br />
        <input type="submit" value="Create Post" />
      </form>
      <Add />
    </div>
  );
};

export default Dashboard;
