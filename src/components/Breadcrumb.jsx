import React from 'react';
import { Link } from 'react-router-dom';
import './css/Breadcrumb.scss';
const Breadcrumb = ({ children }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {children}
      </ol>
    </nav>
  );
};

const BreadcrumbItem = ({ children, active,link }) => {
  return (
    <li className={`breadcrumb-item ${active ? 'active' : ''}`}>
      {active ? (
        <span>{children}</span>
      ) : (
        <Link to={link}>
            {children}
        </Link>
      )}
    </li>
  );
};

export { Breadcrumb, BreadcrumbItem };