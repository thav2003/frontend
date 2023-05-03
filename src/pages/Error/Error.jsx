import React from 'react';
import './Error.scss';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="error-page">
      <h1>ERROR</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;