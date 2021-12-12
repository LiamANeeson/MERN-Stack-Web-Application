import { useEffect, useRef } from 'react';
import axios from "axios";
import {
  MovieOutlined,
  MusicNoteOutlined,
  MenuBookOutlined,
  PodcastsOutlined,
  SportsTennisOutlined
} from "@mui/icons-material";

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

//Get Posts
export const getPosts = (callbackFunction) => {
  axios
    .get("http://localhost:1337/api/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      callbackFunction(response.data.posts)
      console.log("Data has been received!")
    })
    .catch((err) => {
      console.log(err)
      alert("Error retrieving data!!!")
    });
};

export async function getLikedPosts(callbackFunction) {
  await fetch('http://localhost:1337/api/liked-posts', {
    method:'GET',
    headers: {
        'Content-Type': 'application/json', 
        'x-access-token': localStorage.getItem('token'),
    },
  }).then(res => res.json())
  .then(data => {
    if ("likedPosts" in data) callbackFunction(data.likedPosts)
  }).catch(err => {
    console.log(err)
    callbackFunction([])
  })
}

export async function getSavedPosts(callbackFunction) {
  await fetch('http://localhost:1337/api/saved-posts', {
    method:'GET',
    headers: {
        'Content-Type': 'application/json', 
        'x-access-token': localStorage.getItem('token'),
    },
  }).then(res => res.json())
  .then(data => {
    if ("savedPosts" in data) callbackFunction(data.savedPosts)
  }).catch(err => {
    console.log(err)
    callbackFunction([])
  })
}

export async function getPostsByCategory(category, callbackFunction) {
  const response = await fetch(`http://localhost:1337/api/posts-by-category?category=${category}`, {
      method:'GET',
      headers: {
          'Content-Type': 'application/json', 
          'x-access-token': localStorage.getItem('token'),
      },
  })
  const data = await response.json()
  callbackFunction(data.posts)
}

export const allowedCategories = {
  'Films': {icon: MovieOutlined},
  'Music': {icon: MusicNoteOutlined},
  'Books': {icon: MenuBookOutlined},
  'Podcasts': {icon: PodcastsOutlined},
  'Sports': {icon: SportsTennisOutlined}
}

export const usePrevious = (value) => {
  /**
   * Access previous state...
   * From https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
   */
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const logout = () => {
  localStorage.setItem('username', '')
  localStorage.setItem('token', '')
  window.location.href = '/login'
}
