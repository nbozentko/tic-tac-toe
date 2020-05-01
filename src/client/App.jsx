import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home/Home';

export default class App extends Component {
    state = { username: null };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Home} exact />
                </div>
            </BrowserRouter>
        );
    }
}
