import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import HomeNavigation from "./HomeNavigation";
//import { HomeNavigation, AuthNavigation } from "./HomeNavigation";
//import StartupScreen from '../screens/StartupScreen';

const AppNavigation = (props) => {
  //const isAuth = useSelector((state) => !!state.auth.token);
  //const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      <HomeNavigation />
      {/* {isAuth && <HomeNavigation />} */}
      {/* {!isAuth && didTryAutoLogin && <AuthNavigation />} */}
      {/* {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
    </NavigationContainer>
  );
};

export default AppNavigation;
