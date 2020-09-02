import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Profile: {userId}</h1>
        </div>
    )
}

export default Profile;