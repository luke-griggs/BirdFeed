import React from 'react';
import { useSession } from 'next-auth/react';

function UserProfile() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>; // Display loading state
    }

    if (!session) {
        return <p>Access denied. You are not signed in.</p>; // Handle unsigned users
    }

    const { user } = session;

    return (
        <div>
            <h1>User Profile</h1>
            {/* Safely access user properties */}
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </div>
    );
}

export default UserProfile;