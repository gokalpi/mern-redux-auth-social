import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/styles/styles.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
