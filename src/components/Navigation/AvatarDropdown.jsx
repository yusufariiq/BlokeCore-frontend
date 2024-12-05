import React, { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faRightFromBracket,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    try {
      logout();
      toast.success('You have been logged out.');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-lg font-semibold uppercase">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </span>
        </div>
      </Menu.Button>

      <Menu.Items className="absolute z-10 right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 gap-y-3 focus:outline-none">
        <div className="p-2">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold text-black">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? 'text-primary' : ''
                } flex items-center my-2 px-4 py-2 text-sm text-gray-700 rounded-md`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-3 h-5 w-5" />
                Profile
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <Link
                to="/order"
                className={`${
                  active ? 'text-primary' : ''
                } flex items-center my-2 px-4 py-2 text-sm text-gray-700 rounded-md`}
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-3 h-5 w-5" />
                Orders
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'text-primary' : ''
                } flex w-full items-center my-2 px-4 py-2 text-sm text-gray-700 rounded-md`}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-3 h-5 w-5" />
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default AvatarDropdown;