import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hit Home
                <Link to="/foo">Go to Foo</Link>
            </div>
        )
    }
}