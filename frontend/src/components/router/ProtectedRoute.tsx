import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/Authentication.hook";
import { NavigationRoutes } from "../../router/NavigationRoutes";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = (props: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthentication();

  const checkUserToken = () => {
    if (!isLoggedIn) {
      return navigate(
        NavigationRoutes.PUBLIC + NavigationRoutes.AUTHENTICATION
      );
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
