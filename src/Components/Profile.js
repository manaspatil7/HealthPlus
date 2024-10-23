import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';  // Ensure db is your Firestore instance
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

// Import Dribbble-inspired UI styles (You can implement these styles based on a Dribbble design)
import '../Styles/Profile.css';


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;  // Get current user
                if (user) {
                    // Get user data from Firestore
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserData(userSnap.data());  // Set user data to state
                    } else {
                        setError('No user data found!');
                    }
                } else {
                    setError('User is not logged in!');
                }
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="profile-page">
            {userData ? (
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            className="profile-picture"
                            src={userData.profilePicture || 'default-avatar-url'}
                            alt="Profile"
                        />
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
                    </div>
                    <div className="profile-body">
                        <h3>About</h3>
                        <p>{userData.bio || 'No bio available.'}</p>
                        
                        <h3>Joined:</h3>
                        <p>{new Date(userData.joinedAt?.seconds * 1000).toLocaleDateString()}</p>
                        
                        <h3>Other Details</h3>
                        <ul>
                            <li><strong>Phone:</strong> {userData.phone || 'N/A'}</li>
                            <li><strong>Role:</strong> {userData.role || 'User'}</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
