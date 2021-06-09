import React, { useEffect, navRef } from "react";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  NavigationActions,
} from "@react-navigation/native";

import HomeNavigation from "./HomeNavigation";
//import { HomeNavigation, AuthNavigation } from "./HomeNavigation";
//import StartupScreen from '../screens/StartupScreen';

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationsActons.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <HomeNavigation ref={navRef} />;
};

export default AppNavigation;
