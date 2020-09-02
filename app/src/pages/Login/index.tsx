import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../store/Auth/AuthState';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
    // useEffect(() => {
    //     login({ email: "alisson@gmail.com", password: "alisson123" })
    // }, [])
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login;