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
            socket: {},
            name: '',
            opponentName: ''
        }

        this.searchForGame = this.searchForGame.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchForGame() {
        let {
            isSearchingForGame,
            name
        } = this.state;
        if (!isSearchingForGame) {
            let socket = socketIOClient(`/gameRoom?name=${name}`, { name, name });
            this.setState({ socket: socket })
            socket.on('gameFound', msg => {
                console.log(msg);
                this.setState({
                    gameOpen: true,
                    opponent: msg.opponent,
                    myPiece: msg.piece,
                    opponentName: msg.opponentName
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let {
            gameOpen,
            isSearchingForGame,
            socket,
            myPiece,
            opponent,
            name,
            opponentName
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
                            opponentName={opponentName}
                        /> :
                        <NewGameScreen
                            searchForGame={this.searchForGame}
                            isSearchingForGame={isSearchingForGame}
                            name={name}
                            handleChange={this.handleChange}
                        />
                }


            </Grid>
        )
    }
}

function NewGameScreen(props) {
    return (
        <div>
            <label>Enter your name</label>
            <input
                name="name"
                value={props.name}
                onChange={props.handleChange}
            />
            <br></br>
            <Button
                size={'large'}
                variant="contained"
                color="primary"
                onClick={props.searchForGame}
            >
                {props.isSearchingForGame ? 'Stop Searching' : 'Start Game'}
            </Button>
            {
                (props.isSearchingForGame) &&
                <div>Searching...</div>
            }
        </div>
    )

}
