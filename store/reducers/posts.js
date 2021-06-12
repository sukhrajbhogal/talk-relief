import { SET_POSTS, CREATE_POST } from "../actions/posts";
import Post from "../../models/post";
//import database from "../firebase";

//const cardsRef = database.collection("cards");

const initialState = {
  posts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.posts,
      };
    case CREATE_POST:
      const newPost = new Post(
        action.postData.title,
        action.postData.content,
        action.postData.timestamp,
        action.postData.creatorId
      );
      return {
        ...state,
        posts: state.posts.concat(newPost),
      };
  }
  return state;
};
