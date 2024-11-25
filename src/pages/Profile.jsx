import React, { useState, useEffect } from 'react'
import { AccountSidebar } from '../components/Common/AccountSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'
import EditProfileModal from '../components/Common/EditProfileModal'

const Profile = () => {
  const { user } = useAuth();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ editingField, setEditingField ] = useState(null);

  useEffect(() => {
  }, [user]);
  
  const handleEditClick = (field) => {
    setEditingField(field);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingField(null);
  };

  const profileFields = [
    { label: 'First Name', key: 'firstName', value: user?.firstName },
    { label: 'Last Name', key: 'lastName', value: user?.lastName },
    { label: 'Email', key: 'email', value: user?.email },
    { label: 'Phone Number', key: 'phoneNumber', value: user?.phoneNumber }
  ];

  return (
    <div className='min-h-[80vh] py-12 sm:py-24'>
      <div className="flex flex-row sm:space-x-10 mx-auto max-w-7xl px-6 lg:px-8">
        <AccountSidebar/>
        <div className="w-full flex flex-col">
          <div className="py-2">
            <p className='text-2xl font-semibold'>Profile Setting</p>
            <hr className='my-2'/>
          </div>
          <div className="space-y-6">
            {profileFields.map((field) => (
              <div key={field.key} className="py-4">
                <p className="text-lg font-medium mb-4">{field.label}</p>
                <div className="flex justify-between items-center">
                  <p>{field.value || 'Not set'}</p>
                  <button
                    onClick={() => handleEditClick(field.key)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPen} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        fieldToEdit={editingField}
        currentValue={user?.[editingField] || ''}
      />
    </div>
  )
}

export default Profile;
