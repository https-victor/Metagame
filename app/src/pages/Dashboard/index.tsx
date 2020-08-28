import React from 'react'
import { Container } from './styles';
import { Outlet } from 'react-router';

const Dashboard: React.FC = () => {
    return (
        <Container>
            Dashboard
            <Outlet />
        </Container>
    )
}

export default Dashboard;