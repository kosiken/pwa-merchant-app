import React from 'react'
import {Input, Button} from '../components'
const Login = () => {
    return (
        <div>

            <form>
                <Input type="email" name="Email Address" />
                <Input type="password" name="Password" />
                <Button>Login</Button>

            </form>
            
        </div>
    )
}

export default Login
