import React, { useEffect } from 'react';

function UserProfile() {
    useEffect(() => {
        console.log('call use effect');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <h1>Welcome to your profile page</h1>
        </div>
    );
}

export default UserProfile;
