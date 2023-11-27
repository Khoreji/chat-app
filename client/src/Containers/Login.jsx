import { useState } from 'react';
import Logo from '../Assets/messenger.png'
import axios from 'axios';
import baseUrl from '../Config/config';

const Login = (props) => {
    const { setIsLogin, setIsAuthenticated } = props
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = () => {
        axios.post(`${baseUrl}/auth/login`, {
            user_email: userEmail,
            user_password: userPassword
        }).then((response) => {
            setError('')
            localStorage.setItem('user', JSON.stringify(response?.data?.userId))
            let token = response?.data?.token || undefined
            if (token) {
                localStorage.setItem('token', token)
                setIsAuthenticated(true)
            }
        }).catch((error) => {
            console.log(error?.response?.data)
            setError(error?.response?.data?.error)
        })
    }

    return (
        <div className="login-cont">
            <div className="logo-cont">
                <img src={Logo} alt="messenger logo" className="logo" />
            </div>
            <h1 className="auth-header">Login</h1>
            <div className="auth-sub-header">to continue to messenger</div>
            <div className="input-cont">
                <input type="email" placeholder="Email" className="auth-input"
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </div>
            <div className="input-cont">
                <input type="password" placeholder="Password" className="auth-input"
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </div>
            <div className='error-cont'>
                {
                    error
                }
            </div>

            <div className="input-cont">
                <button className="auth-btn"
                    onClick={handleLogin}
                >Login</button>
            </div>

            <div className="input-sub-text"
                onClick={() => setIsLogin(false)}
            >
                <p>Don't have an account? <span className="input-sub-text-link">Sign up</span></p>
            </div>
        </div>
    )
}


export default Login