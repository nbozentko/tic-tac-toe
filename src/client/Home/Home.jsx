import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
            opponentName: '',
            oppoenentId: '',
            firstTurn: ''
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
                this.setState({
                    gameOpen: true,
                    opponentId: msg.opponentId,
                    myPiece: msg.piece,
                    opponentName: msg.opponentName,
                    firstTurn: msg.firstTurn,
                    isSearchingForGame: false
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
            opponentId,
            name,
            opponentName,
            firstTurn
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
                            opponentId={opponentId}
                            opponentName={opponentName}
                            firstTurn={firstTurn}
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
            <label style={{marginRight: '10px'}}>Enter your name:</label>
            <br></br>
            <br></br>
            <TextField 
                name="name"
                value={props.name}
                onChange={props.handleChange}
                variant="outlined"        
            >
            </TextField>
            <br></br>
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
