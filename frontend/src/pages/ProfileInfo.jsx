import React from 'react';
import { getAuthUser } from '@/utils/auth';

const ProfileInfo = () => {
  const user = getAuthUser();

  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Customer ID:</strong> {user.customerId}</p>
    </div>
  );
};

export default ProfileInfo;