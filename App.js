import React, { useState } from "react";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AppNavigation from "./navigation/AppNavigation";
import posts from "./store/reducers/posts";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  posts: posts,
});

const fetchFonts = () => {
  return Font.loadAsync({
    Cocogoose: require("./assets/fonts/Cocogoose-Regular.ttf"),
  });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // Make sure custom font is finished loading
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
    </Provider>
  );
}
