import React, { ReactNode } from "react";
import { Header } from "../../components/Header";
// eslint-disable-next-line no-unused-vars
React;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export { Layout };
