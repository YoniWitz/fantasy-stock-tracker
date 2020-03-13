import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ILoginUser } from '../../../app/models/IUsers';

export const LoginForm = () => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({email:'', password:''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let {name, value} = e.target;
        setLoginUser({...loginUser, [name]: value});
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(loginUser);
    }
    return (
        <Form className="border border-primary">
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" onChange={handleChange} value={loginUser.email} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={loginUser.password} />
            </Form.Group>
            <div className="mb-2">
                <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg" onClick={handleLogin}>
                    Login
                </Button>{' '}
                <Button style={{ float: 'right' }} variant="secondary" size="lg">
                    Cancel
        </Button>
            </div>
        </Form>
    )
}
