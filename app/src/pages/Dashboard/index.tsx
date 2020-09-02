import React, { useContext } from 'react'
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/Auth/AuthState';

const Dashboard: React.FC = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            Dashboard - Bem vindo {user.name}!
            <Link to="library">Library</Link>
            <Outlet />
        </div>
    )
}

export default Dashboard;