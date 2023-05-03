import React from 'react';
import './css/Layout.scss'
const Layout = ({ children }) => {
  return (
    <div className="layoutUser">
      {children}
    </div>
  );
};

const Header = ({ children }) => {
  return (
    <header className="headerUser">
      {children}
    </header>
  );
};

const Content = ({ children }) => {
  return (
    <main className="contentUser">
      {children}
    </main>
  );
};

export { Layout, Header, Content };