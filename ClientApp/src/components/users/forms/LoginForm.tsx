import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { ILoginUser } from '../../../app/models/IUsers';
import axiosagent from '../../../app/api/axiosagent'

export const LoginForm = () => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({ email: '', password: '' });
    let [spinning, setSpinning] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    useEffect(() => {
        let isEmailInvalid = loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true;
        setSubmitDisabled(loginUser.password.length < 6 || isEmailInvalid);
    }, [loginUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSpinning(true);
        axiosagent.UsersRequests.login(loginUser)
            .then(response => console.log(response))
            .catch(err => console.log(err))
            .finally(() => setSpinning(false));
    }
    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Enter Email" name="email" onChange={handleChange} value={loginUser.email} />
                <div className="text-danger">{loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null: "Must enter valid email"}</div>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={loginUser.password} />
                <div className="text-danger">{loginUser.password.length < 6 ? "Password must contain 6 characters at least" : null} </div>
            </Form.Group>
            {spinning ?
                <div className="d-flex justify-content-center">
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </div>
                :
                <div className="mb-2">
                    <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg" onClick={handleLogin} disabled={submitDisabled}>
                        Login
                </Button>{' '}
                    <Button style={{ float: 'right' }} variant="secondary" size="lg">
                        Cancel
        </Button>
                </div>
            }
        </Form>
    )
}