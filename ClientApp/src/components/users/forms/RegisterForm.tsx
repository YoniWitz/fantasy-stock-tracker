import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { IRegisterUser, IUser } from '../../../app/models/IUsers';
import axiosagent from '../../../app/api/axiosagent'
import { history } from '../../../index';

interface IProps {
    setUser: (user: IUser) => void;
}
export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [registerUser, setRegisterUser] = useState<IRegisterUser>({displayName:"", email:"", userName:"", password:""});
    let [spinning, setSpinning] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    let [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (loggedIn) history.push('/holdings');

        let isEmailInvalid = registerUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true;
        setSubmitDisabled(registerUser.password.length < 6 || isEmailInvalid);
    }, [registerUser, loggedIn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value });
    }

    const handleRegistration = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSpinning(true);
        axiosagent.UsersRequests.register(registerUser)
            .then((response: IUser) => {
                setUser(response);
                localStorage.setItem('user', JSON.stringify(response));
                setLoggedIn(true);
            })
            .catch(err => console.log(err))
            .finally(() => setSpinning(false));
    }

    const clearForm = () => {
        setRegisterUser({
            email: '',
            password: '',
            displayName:'',
            userName:''
        })
    }
    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Enter Email" name="email" onChange={handleChange} value={registerUser.email} />
                <div className="text-danger">{registerUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : "Must enter valid email"}</div>
            </Form.Group>

            <Form.Group> 
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={registerUser.password} />
                <div className="text-danger">{registerUser.password.length < 6 ? "Password must contain 6 characters at least" : null} </div>
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
                    <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg" onClick={handleRegistration} disabled={submitDisabled}>
                        Register
                    </Button>{' '}
                    <Button style={{ float: 'right' }} variant="secondary" size="lg" onClick={clearForm}>
                        Clear Form
                    </Button>
                </div>
            }
        </Form>
    )
}
