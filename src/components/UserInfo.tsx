import React from 'react';

interface UserInfoProps {
  username: string;
  
}

const UserInfo: React.FC<UserInfoProps> = ({ username }) => {
  return (
    <div className="user-info">
      <span>Welcome, {username}</span>
      {/* Add user profile picture or other user-related info */}
    </div>
  );
};

export default UserInfo;
