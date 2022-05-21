import React, { useState } from 'react';
import axios from 'axios';
import { alertService } from '@/_services';
import { API_HOST } from '../config';
import { Redirect } from 'react-router';
import { GoogleLogin } from 'react-google-login';

function Home() {
    const [signedIn, setSignedIn] = useState(false);

    const responseGoogle = response => {
        const { code } = response;
        axios.post(`${API_HOST}/api/v1/user/token`, { code })
            .then(response => {
                const dataResults = response.data.result;
                localStorage.setItem("isSignedIn", true);
                localStorage.setItem("email", dataResults.email);
                setSignedIn(true);
                alertService.success('Logged In successfully', { keepAfterRouteChange: true });
            })
            .catch(error => { alertService.error(error.message); })
    }


    const responseError = error => {
        console.error(error);
        alertService.error(error.message);
    }

    return (
        <div>
            <h1>Calendar API Integration Plus Zoom Integrations</h1>
            <p>An application fetch free slots between 2 calendars and setup a zoom meeting.</p>
            {signedIn ? <Redirect to="/users" /> :
                <GoogleLogin
                    clientId='197382519409-jae2erb25mc82itvilpp7np7ofm4je76.apps.googleusercontent.com'
                    buttonText='Sign in with Google'
                    onSuccess={responseGoogle}
                    onFailure={responseError}
                    cookiePolicy={'single_host_origin'}
                    responseType='code'
                    accessType='offline'
                    scope='openid email profile https://www.googleapis.com/auth/calendar'
                // uxMode={"redirect"}
                // redirectUri={"http://localhost:3000/api"}
                />
            }

        </div>
    );
}

export { Home };