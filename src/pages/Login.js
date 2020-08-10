import React from 'react'
import { Input, Button, Typography } from '../components'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from '../api'
import logo from "../assets/logo-variant.png";
const Login = () => {
      const { register, handleSubmit, errors } = useForm();

      const submit = (formData) => {
          api.login(formData)
          .then(console.log)
          .catch(console.log)

      }
    return (
        <div className="flex central">

            <form className="f-form" onSubmit={handleSubmit(submit)}>

                <div className="container">
                    <div className="brand-div" style={{ textAlign: 'center' }}>     <img
                        alt=""
                        src={logo}
                        width="60"
                        height="60"

                    /></div>
                    <Input type="text" name="username" label="Email or Phone" style={{ margin: '0 auto' }}         ref={register({
          required: {
            value: true,
            message: "You need to enter this value",
          },
         
        })
        }
        error={errors.username} />
                    <Input type="password" name="password" label="Password" style={{ margin: '0 auto' }} 
        ref={register({
          required: {
            value: true,
            message: "Password is required",
          },
          
        })
        } />

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
