import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { IRegisterUser, IUser } from '../../../app/models/IUsers';
import axiosagent from '../../../app/api/axiosagent';
import { history } from '../../../index';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface IProps {
    setUser: (user: IUser) => void;
}

const reviewSchema = yup.object({
    displayName: yup.string().required().min(1),
    // userName: yup.string().required().min(1),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
})

export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [spinning, setSpinning] = useState<boolean>(false);
    let [loggedIn, setLoggedIn] = useState<boolean>(false);

    let initialValues: IRegisterUser = { displayName: "", email: "", userName: "", password: "" };

    useEffect(() => {
        if (loggedIn) history.push('/');
    }, [loggedIn]);

    const handleRegistration = (registerUser: IRegisterUser) => {
        setSpinning(true);
        axiosagent.UsersRequests.register(registerUser)
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
            values.userName = values.displayName.replace(/\s/g, '');
            handleRegistration(values);
        },
        validationSchema: reviewSchema
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {/* <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    required
                    placeholder="Enter User Name"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                />
                {(formik.touched.userName && formik.errors.userName) && <div className="text-danger">Full Name is Required </div>}
            </Form.Group> */}
            <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                    placeholder="Enter Display Name"
                    name="displayName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.displayName}
                />
                {(formik.touched.displayName && formik.errors.displayName) && <div className="text-danger">Full Name is Required </div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email} />
                {(formik.touched.email && formik.errors.email) && <div className="text-danger">{formik.errors.email} </div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} />
                {(formik.touched.password && formik.errors.password) && <div className="text-danger">{formik.errors.password} </div>}
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
                    <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg"  >
                        Register
                    </Button>{' '}
                    <Button style={{ float: 'right' }} variant="secondary" size="lg" onClick={() => formik.resetForm()}>
                        Clear Form
                    </Button>
                </div>
            }
        </Form>
    )
}
