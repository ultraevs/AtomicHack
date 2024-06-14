import React, { ReactNode } from "react";
import { AuthHeader } from "../../components/AuthHeader";
// eslint-disable-next-line no-unused-vars
React;

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  );
};

export { AuthLayout };
