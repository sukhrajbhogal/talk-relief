import db from "../../firebase";
import * as firebase from "firebase";

export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";
export const SET_POSTS = "SET_POSTS";

export const deletePost = () => {
  return { type: DELETE_POST };
};

export const createPost = (postTitle, postContent) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log(userId);
    console.log(postTitle);
    console.log(postContent);

    // const body = JSON.stringify({
    //   title: title,
    //   content: content,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   creatorId: userId,
    // });

    const response = await db
      .collection("cards")
      .add({
        title: postTitle,
        content: postContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: userId,
      })
      .then(() => {
        console.log(title, content);
      });

    // const response = await fetch(
    //   `https://talkrelief-c20b8-default-rtdb.firebaseio.com/posts.json?auth=${token}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application-json",
    //     },
    //     body: JSON.stringify({
    //       title,
    //       content,
    //       timestamp,
    //       creatorId: userId,
    //     }),
    //   }
    // );

    // const resData = await response.json();
    // console.log(resData);

    dispatch({
      type: CREATE_POST,
      postData: {
        title,
        content,
        timestamp,
        creatorId: userId,
      },
    });
  };
};
