import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-6 text-center py-5 d-flex flex-column justify-content-center auth-bg-section text-white"></div>
        <div className="col-md-6 text-center d-flex flex-column py-5 justify-content-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
