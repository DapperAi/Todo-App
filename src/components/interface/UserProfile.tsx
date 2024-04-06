import React from 'react';
import { Avatar } from '@nextui-org/react';

// UserProfile displays the current user's profile with an avatar
const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center">
      <Avatar text="JD" color="primary" />
      <div className="ml-2">John Doe</div>
    </div>
  );
};

export default UserProfile;