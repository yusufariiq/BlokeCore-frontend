import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const formatPathSegment = (segment) => {
    return segment
      .replace(/-|_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pathSegments = location.pathname.split('/').filter(segment => segment);

  return (
    <div className="breadcrumbs text-sm">
      <ul className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-primary">Home</Link>
        </li>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <li className="before:content-['/'] before:mx-2 before:text-gray-900">
              <Link 
                to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                className="hover:text-primary"
              >
                {formatPathSegment(segment)}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;