import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import socketIOClient from 'socket.io-client';
import Board from '../Board/Board';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameOpen: false,
            isSearchingForGame: false,
            roomNumber: '',
            myPiece: '',
            socket: {}
        }

        this.searchForGame = this.searchForGame.bind(this);
    }

    searchForGame() {
        let {
            isSearchingForGame
        } = this.state;
        if (!isSearchingForGame) {
            let socket = socketIOClient('/gameRoom');
            this.setState({ socket: socket })
            socket.on('gameFound', msg => {
                console.log(msg);
                this.setState({
                    gameOpen: true,
                    opponent: msg.opponent,
                    myPiece: msg.piece
                });
            });
        } else {
            socket.disconnect();
        }

        this.setState(prevState => {
            return {
                isSearchingForGame: !prevState.isSearchingForGame
            }
        })
    }

    render() {
        let {
            gameOpen,
            isSearchingForGame,
            socket,
            myPiece,
            opponent
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
                            socket={socket}
                            myPiece={myPiece}
                            opponent={opponent}
                        /> :
                        <Button
                            size={'large'}
                            variant="contained"
                            color="primary"
                            onClick={this.searchForGame}
                        >
                            {isSearchingForGame ? 'Stop Searching' : 'Start Game'}
                        </Button>
                }
                {
                    (isSearchingForGame && !gameOpen) &&
                    <div>Searching...</div>
                }

            </Grid>
        )
    }
}
