import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';

import Home from './Home';
import Foo from './Foo';
import Bar from './Bar';


export default class App extends Component {
    state = { username: null };

    // componentDidMount() {
    //   fetch('/api/getUsername')
    //     .then(res => res.json())
    //     .then(user => this.setState({ username: user.username }));
    // }

    render() {
        const { username } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Home} exact />
                    <Route path="/foo" component={Foo} />
                    <Route path="/bar" component={Bar} />
                </div>
            </BrowserRouter>
        );
    }
}
