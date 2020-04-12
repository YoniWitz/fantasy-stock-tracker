import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ILoginUser, IUser } from '../../../app/models/IUsers';
import axiosagent from '../../../app/api/axiosagent';
import { history } from '../../../index';

interface IProps {
    setUser: (user: IUser) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const reviewSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
})

export const LoginForm: React.FC<IProps> = ({ setUser, loggedIn, setLoggedIn }) => {
    let [spinning, setSpinning] = useState<boolean>(false);
    let initialValues: ILoginUser = { email: '', password: '' };

    useEffect(() => {
        if (loggedIn) history.push('/');
    }, [loggedIn]);

    const handleLogin = (loginUser: ILoginUser) => {
        setSpinning(true);
        axiosagent.UsersRequests.login(loginUser)
            .then((response: IUser) => {
                setUser(response);
                localStorage.setItem('user', JSON.stringify(response));
                setLoggedIn(true);
                formik.resetForm();
            })
            .catch(err => console.log(err))
            .finally(() => setSpinning(false));
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            handleLogin(values);     
        },
        validationSchema: reviewSchema
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {(formik.touched.email && formik.errors.email) && <div className="text-danger">{formik.errors.email}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {(formik.touched.password && formik.errors.password) && <div className="text-danger">{formik.errors.password}</div>}
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
                    <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg">
                        Login
                    </Button>{' '}
                    <Button style={{ float: 'right' }} variant="secondary" size="lg" onClick={() => formik.resetForm()}>
                        Clear Form
                    </Button>
                </div>
            }
        </Form>
    )
}
