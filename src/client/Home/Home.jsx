import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import socketIOClient from 'socket.io-client';
import Board from '../Board/Board';

const socket = socketIOClient('http://localhost:8080');
socket.on('test', data => console.log(data));

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box>
                <Board />
            </Box>
        )
    }
}
