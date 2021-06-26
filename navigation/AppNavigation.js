import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { HomeNavigation, AuthNavigation } from "./HomeNavigation";
import StartUpScreen from "../screens/auth/StartUpScreen";

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <HomeNavigation />}
      {!isAuth && didTryAutoLogin && <AuthNavigation />}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigation;
