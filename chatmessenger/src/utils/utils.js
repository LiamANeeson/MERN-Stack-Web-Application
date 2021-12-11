import axios from "axios";


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
