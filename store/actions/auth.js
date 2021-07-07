import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";

export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export const authenticate = (userId, token, displayName) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      displayName: displayName,
    });
  };
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signup = (username, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc-FyoaMXEDn_FyK1Anwt39DDB4U4ToKQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: username,
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      console.log(errorId);
      let message = errorId;
      if (errorId === "INVALID_EMAIL") {
        message = "Please enter a valid email. Like yourname@example.com";
      }
      if (errorId === "EMAIL_EXISTS") {
        message = "This email already exists. Please use a different email.";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.displayName,
      expirationDate
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc-FyoaMXEDn_FyK1Anwt39DDB4U4ToKQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = "Something went wrong.";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found.";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Please enter a valid password.";
      } else if (errorId === "INVALID_EMAIL") {
        message =
          "Please enter a valid email address. Like yourname@example.com";
      } else if (errorId === "MISSING_PASSWORD") {
        message = "Please enter a password.";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    // console.log(resData);
    console.log("Username: " + resData.displayName);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.displayName,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.displayName,
      expirationDate
    );
    AsyncStorage.getAllKeys().then((res) => console.log(res));
  };
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log(error);
    });
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId, displayName, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      displayName: displayName,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
