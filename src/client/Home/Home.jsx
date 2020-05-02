import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8080');
socket.on('test', data => console.log(data));

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Paper>item</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}