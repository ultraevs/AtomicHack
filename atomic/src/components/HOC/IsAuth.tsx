"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuth = (Component: React.ComponentType) => {
  return function IsAuth(props: React.ComponentProps<typeof Component>) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
      const isUserAuthenticated = window
        ? JSON.parse(window.localStorage.getItem("isAuth") || "false")
        : false;
      setAuth(isUserAuthenticated);

      if (!isUserAuthenticated) {
        navigate("/auth");
      }
    }, []);

    return <Component {...props} />;
  };
};

export { IsAuth };
