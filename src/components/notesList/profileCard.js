import ProfileCircle from "../profileCircle";
import { useState } from "react";
import { get } from "../../service/apiClient";

function ProfileCard({ user }) {
  const [selectedUser, setSelectedUser] = useState(user);

  const fetchUser = async (userId) => {
    try {
      const updatedUser = await get(`users/${userId}`).then(res => res.data.user || res.data);
      setSelectedUser(updatedUser);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  return (
    <div className="profile-card">
      <ProfileCircle
        role={(selectedUser.role || '').toLowerCase()}
        initials={`${selectedUser?.firstName?.[0] ?? ''}${selectedUser?.lastName?.[0] ?? ''}`.toUpperCase()}
        userId={selectedUser.id}
        name={`${selectedUser?.firstName ?? ''} ${selectedUser?.lastName ?? ''}`}
        user={selectedUser}
        onUserUpdate={fetchUser}
      />
      <div className="user-info">
        <strong>
          {selectedUser?.firstName} {selectedUser?.lastName}
        </strong>
        <div className="user-specialism">
          {selectedUser?.specialism || 'No specialism'}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard
