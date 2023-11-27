import axios from 'axios';
import Logo from '../Assets/messenger.png'
import baseUrl from '../Config/config';
import { useState } from 'react';

const Register = (props) => {
    // user_name, user_email, user_mobile, user_gender, user_password
    const { setIsLogin } = props;
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleRegister = () => {
        axios.post(`${baseUrl}/auth/register`, {
            user_name: userName,
            user_email: userEmail,
            user_mobile: userMobile,
            user_gender: userGender,
            user_password: userPassword
        }).then((response) => {
        }).catch((error) => {
            console.log(error?.response?.data)
        })
    }
    return (
        <div className="register-cont">
            <div className="logo-cont">
                <img src={Logo} alt="messenger logo" className="logo" />
            </div>
            <h1 className="auth-header">Register</h1>
            <div className="auth-sub-header">to continue to messenger</div>
            <div className="input-cont">
                <input type="text" placeholder="Name" className="auth-input"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
            </div>
            <div className="input-cont">
                <input type="email" placeholder="Email" className="auth-input"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
            </div>
            <div className="input-cont">
                <input type="number" placeholder="Mobile" className="auth-input"
                    onChange={(e) => setUserMobile(e.target.value)}
                    value={userMobile}
                />
            </div>
            <div className="input-cont">
                <select className="auth-input-select"
                    onChange={(e) => setUserGender(e.target.value)}
                    value={userGender}
                >
                    <option value="" disabled selected>
                        Select your gender
                    </option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
                </select>
            </div>
            <div className="input-cont">
                <input type="password" placeholder="Password" className="auth-input"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                />
            </div>

            <div className="input-cont">
                <button className="auth-btn"
                    onClick={handleRegister}
                >Register</button>
            </div>

            <div className="input-sub-text"
                onClick={() => setIsLogin(true)}
            >
                <p>Already have an account? <span className="input-sub-text-link">Sign in</span></p>
            </div>
        </div>
    )
}

export default Register