import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import socketIOClient from 'socket.io-client';
import Board from '../Board/Board';

const socket = socketIOClient();
socket.on('test', data => console.log(data));

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameOpen: false
        }
    }

    render() {
        let {
            gameOpen
        } = this.state;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto'
                }}
            >
                {
                    gameOpen ?
                        <Board
                            closeGame={() => this.setState({ gameOpen: false })}
                        /> :
                        <Button
                            size={'large'}
                            variant="contained"
                            color="primary"
                            onClick={() => this.setState({ gameOpen: true })}
                        >
                            Start Game
                        </Button>
                }

            </Grid>
        )
    }
}
