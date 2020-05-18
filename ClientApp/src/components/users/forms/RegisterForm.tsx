import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { IRegisterUser, IUser } from '../../../app/models/IUsers';
import axiosagent from '../../../app/api/axiosagent';
import { history } from '../../../index';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';


interface IProps {
    setUser: (user: IUser) => void;
}

const reviewSchema = yup.object({
    email: yup.string().required('Email address is required').email(),
    password: yup.string().required('Password is required').min(8),
    userName: yup.string().required('User Name is required')
        .test('noSpaces', 'No spaces allowed for User name', (val: string) => {
            if (val)
                return !val.includes(' ')
            return false
        }),

})

export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [spinning, setSpinning] = useState<boolean>(false);
    let [loggedIn, setLoggedIn] = useState<boolean>(false);

    let initialValues: IRegisterUser = { displayName: "", email: "", userName: "", password: "" };

    useEffect(() => {
        if (loggedIn) history.push('/');
    }, [loggedIn]);

    const handleRegistration = (registerUser: IRegisterUser) => {
        toast.dismiss();
        setSpinning(true);
        axiosagent.UsersRequests.register(registerUser)
            .then((response: IUser) => {
                setUser(response);
                localStorage.setItem('user', JSON.stringify(response));
                setSpinning(false);
                formik.resetForm();
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
                setSpinning(false);
            })
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            values.displayName = values.userName;
            handleRegistration(values);
        },
        validationSchema: reviewSchema
    });

    return (
        <Fragment>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        placeholder="Enter User Name"
                        name="userName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                    />
                    <Form.Text className="text-danger">{formik.touched.userName && formik.errors.userName}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Enter Email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    <Form.Text className="text-danger">{formik.touched.email && formik.errors.email} </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="Enter Password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password} />
                    <Form.Text className="text-danger">{formik.touched.password && formik.errors.password} </Form.Text>
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
                        <Button
                            style={{ float: 'right' }}
                            type='submit'
                            variant="primary"
                            size="lg"
                        >
                            Register
                        </Button>{' '}
                        <Button
                            style={{ float: 'right' }}
                            variant="secondary"
                            size="lg"
                            onClick={() => { formik.resetForm(); toast.dismiss(); }}>
                            Clear Form
                        </Button>
                    </div>
                }
            </Form>
        </Fragment>
    )
}
