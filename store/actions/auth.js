export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc-FyoaMXEDn_FyK1Anwt39DDB4U4ToKQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          retrunSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
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
          retrunSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }

    const resData = await response.json();
    console.log("logged in");
    console.log(resData);
    dispatch({ type: LOGIN });
  };
};
