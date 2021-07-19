import db from "../../firebase";
import * as firebase from "firebase";

export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";
export const SET_POSTS = "SET_POSTS";

export const deletePost = () => {
  return { type: DELETE_POST };
};

export const sendNotification = (title, expoToken, userName) => {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoToken,
      title: `${userName} replied to your post!`,
      body: title,
    }),
  });
};

//WILL RETURN TO THIS

// export const createPost = (title, content) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     console.log(userId);
//     console.log(title);
//     console.log(content);

//     const response = await fetch(
//       `https://firestore.googleapis.com/v1beta1/{parent=projects/*/databases/*/documents/**}/{collectionId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application-json",
//         },
//         body: JSON.stringify({
//           title,
//           content,
//           timestamp,
//           creatorId: userId,
//         }),
//       }
//     );

//     const resData = await response.json();
//     console.log(resData);

//     dispatch({
//       type: CREATE_POST,
//       postData: {
//         title,
//         content,
//         timestamp,
//         creatorId: userId,
//       },
//     });
//   };
// };
