import React from 'react'
import { Container } from './styles';
import { useParams, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    return (
        <Container>
            <h1>Profile: {userId}</h1>
        </Container>
    )
}

export default Profile;