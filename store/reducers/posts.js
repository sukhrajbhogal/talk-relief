import { DELETE_POST, CREATE_POST } from "../actions/posts";
import Post from "../../models/post";
//import database from "../firebase";

//const cardsRef = database.collection("cards");

const initialState = {
  posts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      const newPost = new Post(
        //action.postData.postid,
        action.postData.uid,
        action.postData.title,
        action.postData.content,
        action.postData.timestamp
      );
      return {
        ...state,
        posts: state.posts.concat(newPost),
      };
  }
  return state;
};
