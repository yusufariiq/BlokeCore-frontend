import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../config/apiConfig';

const EditProfileModal = ({ isOpen, onClose, fieldToEdit, currentValue }) => {
  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuth();

  useEffect(() => {
    setValue(currentValue || '');
  }, [currentValue]);

  useEffect(() => {
    const modalCheckbox = document.getElementById('edit-profile-modal');
    if (modalCheckbox) {
      modalCheckbox.checked = isOpen;
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [fieldToEdit]: value
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.errors?.[fieldToEdit] || data.error || 'Failed to update profile');
      }
  
      updateUser({ [fieldToEdit]: value });
      onClose();
      toast.success(`Successfully updated`)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldLabel = () => {
    if (!fieldToEdit) return '';
    return fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1).replace(/([A-Z])/g, ' $1');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Edit {getFieldLabel()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type={fieldToEdit === 'email' ? 'email' : 'text'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter your ${getFieldLabel().toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;