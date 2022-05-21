import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { alertService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [myMeetings, setMyMeetings] = useState(null);
    const isSignedIn = localStorage.getItem("isSignedIn");
    const email = localStorage.getItem("email");

    useEffect(() => {
        axios.get(`${API_HOST}/api/v1/user/meeting/list?email=${email}`)
            .then(response => {
                response = response.data.result;
                setMyMeetings(response)
            }).catch(err => {
                alertService.error(err.message);
            });
    }, []);

    return (!isSignedIn ? <Redirect exact to='/' /> :
        <div>
            <h1>My Meetings</h1>
            <table style={{ overflowX: "scroll" }} className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: 'auto' }}>Summary/Title</th>
                        <th style={{ width: 'auto' }}>Description</th>
                        <th style={{ width: 'auto' }}>Organized By / Joiner </th>
                        {/* <th style={{ width: 'auto' }}>Joiner</th> */}
                        <th style={{ width: 'auto' }}>Time Zone</th>
                        <th style={{ width: 'auto' }}>Start Time</th>
                        <th style={{ width: 'auto' }}>End Time</th>
                        <th style={{ width: 'auto' }}>Duration</th>
                        <th style={{ width: 'auto' }}>Start URL</th>
                        <th style={{ width: 'auto' }}>Joining URL</th>
                    </tr>
                </thead>
                <tbody>
                    {myMeetings && myMeetings.map(meeting =>
                        <tr key={meeting._id}>
                            <td>{meeting.summary}</td>
                            <td>{meeting.description}</td>
                            <td>{meeting.organizer} / {meeting.attendee}</td>
                            {/* <td></td> */}
                            <td>{meeting.timezone}</td>
                            <td>{meeting.start_time}</td>
                            <td>{meeting.end_time}</td>
                            <td>{meeting.duration} Minutes</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <a href={meeting.start_url} className="link" target={'_blank'}>
                                    Start Meeting
                                </a>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <a href={meeting.join_url} className="link" target={'_blank'}>
                                    Join Meeting
                                </a>
                            </td>
                        </tr>
                    )}
                    {!myMeetings &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {myMeetings && !myMeetings.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };