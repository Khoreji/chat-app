import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import "./containers.css"

const Auth = (props) => {
    const { setIsAuthenticated } = props
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="auth-cont">
            {
                isLogin ? <Login setIsLogin={setIsLogin} setIsAuthenticated={setIsAuthenticated} /> : <Register setIsLogin={setIsLogin} setIsAuthenticated={setIsAuthenticated}/>
            }
        </div>
    )
}

export default Auth