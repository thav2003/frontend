import React from 'react';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../pages/Error/Error';
import { ROLE_VALUES } from './Constant';

const PrivateRoute = redirectUrl => (Component, allowedRoles) => props => {
  const isAuthenticated = localStorage.getItem('TOKEN') !== null;
  const userRole = localStorage.getItem('ROLE');

  if(userRole == ROLE_VALUES.SHIPPER){
    return <ErrorPage errorMessage="Bạn không có quyền truy cập trang này" />;
  }


  if ((isAuthenticated && allowedRoles.includes(userRole)) || allowedRoles.includes(ROLE_VALUES.GUEST)) {

    return <Component {...props} />;
  } else if (isAuthenticated && !allowedRoles.includes(userRole)) {
    return <ErrorPage errorMessage="Bạn không có quyền truy cập trang này" />;
  } else {
    return <Navigate to={redirectUrl ? redirectUrl : '/login'} state={{ from: props.location }} />;
  }
};

export default PrivateRoute;