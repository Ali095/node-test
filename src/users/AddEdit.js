import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import { API_HOST } from '../config';
import { Redirect } from 'react-router';

function AddEdit({ history, match }) {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const initialValues = {
        name: '',
        email: '',
        calendar_URL: ''
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        calendar_URL: Yup.string().url("Enter a valid URL to primary public calendar of user")
            .required('Link to public calendar is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        axios.post(`${API_HOST}/api/v1/user/create`, { name: fields.name, email: fields.email, calendar_URL: fields.calendar_URL })
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            }).catch((error) => {
                setSubmitting(false);
                alertService.error(error.message);
            });
    }

    return (!isSignedIn ? <Redirect exact to='/' /> :
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <h1>Add User</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Name: </label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-10">
                                <label>Calendar URL: </label>
                                <Field name="calendar_URL" type="text" className={'form-control' + (errors.calendar_URL && touched.calendar_URL ? ' is-invalid' : '')} />
                                <ErrorMessage name="calendar_URL" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to='.' className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEdit };