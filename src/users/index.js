import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MeetingForm } from './MeetingForm';
import { List } from './List';
import { AddEdit } from './AddEdit';

function Users({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/add`} component={AddEdit} />
            <Route path={`${path}/:id`} component={MeetingForm} />
        </Switch>
    );
}

export { Users };