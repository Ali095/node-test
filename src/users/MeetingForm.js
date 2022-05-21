import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import { API_HOST } from '../config';

function MeetingForm({ history, match }) {
    const { id } = match.params;
    const organized_by = localStorage.getItem("email");
    const initialValues = {
        summary: '',
        description: '',
        location: 'Online',
        start_date_time: '',
        end_date_time: '',
        attendees: id,
        organizer: organized_by
    };

    const validationSchema = Yup.object().shape({
        summary: Yup.string()
            .required('Summary is required'),
        description: Yup.string()
            .optional('Description is optional'),
        location: Yup.string()
            .required('Location is required'),
        start_date_time: Yup.date()
            .required('Start Time is required'),
        end_date_time: Yup.date().min(Yup.ref("start_date_time"), "End time should be greater than start time")
            .required('End Time is required'),
        attendees: Yup.string()
            .required('Location is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        const { organizer, attendees, summary, description, location, start_date_time, end_date_time } = fields;
        axios.post(`${API_HOST}/api/v1/user/meeting/create`, { organizer, attendees, summary, description, location, start_date_time, end_date_time })
            .then(() => {
                alertService.success('Meeting Created', { keepAfterRouteChange: true });
                history.push('.');
            }).catch((error) => {
                setSubmitting(false);
                alertService.error(error.message);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <h1>Create New Meeting</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Summary / Title: </label>
                                <Field name="summary" type="text" className={'form-control' + (errors.summary && touched.summary ? ' is-invalid' : '')} />
                                <ErrorMessage name="summary" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Location: </label>
                                <Field name="location" type="text" className={'form-control' + (errors.location && touched.location ? ' is-invalid' : '')} />
                                <ErrorMessage name="location" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Organizer: </label>
                                <Field name="organizer" disabled type="text" className={'form-control' + (errors.organizer && touched.organizer ? ' is-invalid' : '')} />
                                <ErrorMessage name="organizer" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Attendee: </label>
                                <Field name="attendees" disabled type="text" className={'form-control' + (errors.attendees && touched.attendees ? ' is-invalid' : '')} />
                                <ErrorMessage name="attendees" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Start Time: </label>
                                <Field name="start_date_time" type="datetime-local" className={'form-control' + (errors.start_date_time && touched.start_date_time ? ' is-invalid' : '')} />
                                <ErrorMessage name="start_date_time" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>End Time: </label>
                                <Field name="end_date_time" type="datetime-local" className={'form-control' + (errors.end_date_time && touched.end_date_time ? ' is-invalid' : '')} />
                                <ErrorMessage name="end_date_time" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-10">
                                <label>Description: </label>
                                <Field name="description" type="textbox" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to='/users' className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { MeetingForm };