import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import MySavedPosts from "./MySavedPosts";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import DrawerLeft from "../components/DrawerLeft";
import Rightbar from "../components/Rightbar";
import { Grid, Snackbar } from "@material-ui/core";
import Feed from "../components/Feed";
import { getPosts } from "../utils/utils";
import Filter from "../components/Filter";
import Alert from "@material-ui/lab/Alert";


const Dashboard = () => {  
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [authorFilterValue, setAuthorFilterValue] = useState("")
  const [category, setCategory] = useState("")
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState('search' in location && ["?award-status=success", "?award-status=fail"].includes(location.search));

    // consts for profile pic
  const [tempProfilePicSelected, setTempProfilePicSelected] = useState('');
  const [ProfilePicSelected, setProfilePicSelected] = useState('');

  const uploadImage = () => {
    if(tempProfilePicSelected){
      const formData = new FormData()
      formData.append ("file", tempProfilePicSelected)
      formData.append ("upload_preset", "yghhzflo")

      fetch(
        "https://api.cloudinary.com/v1_1/dxghxvvfj/image/upload",
        {
          method:"post", body:formData
        }
      ).then(
        res=> res.json()
      ).then(formData=> {
          fetch('http://localhost:1337/api/updatePic',{
              method:"POST",
              headers: {
                      'Content-Type': 'application/json',                
                      'x-access-token': localStorage.getItem('token'),
                  },
                  body: JSON.stringify({
                      ProfilePicSelected: formData.url,
                  })
          }, console.log({ProfilePicSelected}))
          .then(res=>res.json())
          .then(console.log(formData.url))
          .then(setProfilePicSelected(formData.url))
          .catch(error => console.log(error))
      })  
    }   
  }
  
  return (
    <div>
      <Navbar getPosts={getPosts} setPosts={setPosts} />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <DrawerLeft setCategory={setCategory} setPosts={setPosts} />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed
            authorFilterValue={authorFilterValue}
            posts={posts}
            setPosts={setPosts}
            likedPostIDs={likedPosts.map(post => post._id)}
            savedPostIDs={savedPosts.map(post => post._id)}
            setLikedPosts={setLikedPosts}
            setSavedPosts={setSavedPosts}
            category={category} />
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

      <img alt="profile" data-testid="profilePic" src={ProfilePicSelected} style={{width: 200}} />
      <input 
          type="file"
          onChange={(event) => {
              setTempProfilePicSelected(event.target.files[0]);
          }}
      />
      <button onClick={uploadImage}>Upload Image</button>

      {
        localStorage.getItem("token")
        ? <Add setPosts={setPosts} />
        : null
      }
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={() => {}} severity={location.search === "?award-status=success" ? "success": "error"}>
          {location.search === "?award-status=success" ? "Payment successful!": "Payment failed. Please try again."}
        </Alert>
      </Snackbar>
     
    </div>
  );
};

export default Dashboard;
