import React from 'react'
import { Input, Button, Typography } from '../components'
import { Link } from "react-router-dom";
import logo from "../assets/logo-variant.png";
const Login = () => {
    return (
        <div className="flex central">

            <form className="f-form">

                <div className="container">
                    <div className="brand-div" style={{ textAlign: 'center' }}>     <img
                        alt=""
                        src={logo}
                        width="60"
                        height="60"

                    /></div>
                    <Input type="email" name="email" label="Email Address" style={{ margin: '0 auto' }} />
                    <Input type="password" name="password" label="Password" style={{ margin: '0 auto' }} />

                    <Link to="/recovery"><Typography variant="primary" > Forgot Password? </Typography></Link>
                    <Button full>Login</Button>
                </div>
            </form>
            <div>
                <Typography style={{ textAlign: 'center' }}>
                    Made with <span role="img" aria-label="love" >❤️ </span><span style={{
                        color: '#f0324b'
                    }}>500Chow</span>
                </Typography>
            </div> </div>
    )
}

export default Login
