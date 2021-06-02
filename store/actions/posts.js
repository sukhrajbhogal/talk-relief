export const DELETE_POST = "DELETE_POST";
export const CREATE_POST = "CREATE_POST";

export const deletePost = () => {
  return { type: DELETE_POST };
};

export const createPost = (title, content) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://talkrelief-c20b8-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({
          title,
          content,
          timestamp,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_POST,
      postData: {
        title,
        content,
        timestamp,
      },
    });
  };
};
