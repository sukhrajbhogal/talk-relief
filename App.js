import React, { useState, useEffect } from "react";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { database } from "./firebase";
import * as Notifications from "expo-notifications";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AppNavigation from "./navigation/AppNavigation";
import posts from "./store/reducers/posts";
import auth from "./store/reducers/auth";
import { Provider, useSelector } from "react-redux";

import Toast from "react-native-toast-message";
import { toastConfig } from "./components/toastConfig";
//import messaging from "@react-native-firebase/messaging";

const rootReducer = combineReducers({
  posts: posts,
  auth: auth,
});

const fetchFonts = () => {
  return Font.loadAsync({
    Cocogoose: require("./assets/fonts/Cocogoose-Regular.ttf"),
  });
};
//const userID = useSelector((state) => state.auth.userId);

// const saveTokenToDatabase = async (token) => {
//   database
//     .collection("users")
//     .doc(userID)
//     .set({
//       token: firestore.FieldValue.arrayUnion(token),
//     });
// };
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // Makes sure custom font is finished loading
  const [fontLoaded, setFontLoaded] = useState(false);

  
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />

      {/* Allows you to create a toast notification (success | error | info) */}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}
