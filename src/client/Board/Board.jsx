import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            currentTurn: '',
            winner: '',
            gameIsOver: false
        }

        this.checkForWin = this.checkForWin.bind(this);
        this.determineFirstTurn = this.determineFirstTurn.bind(this);
        this.handleTileClick = this.handleTileClick.bind(this);
     
    }

 

    componentDidMount() {
        this.determineFirstTurn();
    }

    determineFirstTurn() {
        this.setState({
            currentTurn: Math.random() < 0.5 ? 'X' : 'O'
        });

    }

    checkForWin(board) {
        let winner = '';

        // Check horizontal win
        for (let i = 0; i < 3; i++) {
            let possibleWinner = board[i][0];
            for (let j = 0; j < 3; j++) {
                if (possibleWinner === board[i][j]) {
                    if (j === 2 && possibleWinner) {
                        winner = possibleWinner;
                        console.log(winner)
                    }
                } else {
                    break;
                }
            }
        }
        console.log(winner)

        // Check vertical win
        for (let i = 0; i < 3; i++) {
            let possibleWinner = board[0][i];
            for (let j = 0; j < 3; j++) {
                if (possibleWinner === board[j][i]) {
                    if (j === 2 && possibleWinner) {
                        winner = possibleWinner;
                    }
                } else {
                    break;
                }
            }
        }

        // Check diag top left to bottom right
        for (let i = 0; i < 3; i++) {
            let possibleWinner = board[0][0];
            if (board[i][i] !== possibleWinner) {
                break;
            } else {
                if (i === 2 && possibleWinner) {
                    winner = possibleWinner;
                }
            }
        }

        // Check diag bottom left to top right
        for (let i = 0; i < 3; i++) {
            let possibleWinner = board[0][2];
            if (board[i][2 - i] !== possibleWinner) {
                break;
            } else {
                if (i === 2 && possibleWinner) {
                    winner = possibleWinner;
                }
            }
        }

        // Check if game board is full
        let boardIsFull = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    boardIsFull = false;
                    break;
                }
            }
        }

        this.setState({
            winner: winner,
            gameIsOver: boardIsFull || !!winner
        });
    }

    handleTileClick(e) {
        let {
            gameIsOver
        } = this.state;
        if (e.target.getAttribute('value') || gameIsOver) {
            console.log('Invalid move');
            return false;
        }
        let {
            board,
            currentTurn
        } = this.state;
        let position = e.target.getAttribute('name').split(',');
        board[position[0]][position[1]] = currentTurn;
        this.setState({
            board: board,
            currentTurn: currentTurn === 'X' ? 'O' : 'X'
        });
        this.checkForWin(board);
    }

    render() {
        let {
            board,
            currentTurn,
            winner,
            gameIsOver
        } = this.state;

        let {
            closeGame,
            socket,
            myPiece,
            opponent,
            opponentName
        } = this.props;

        console.log(socket);

        let currentTurnIcon = currentTurn === 'X' ? <CloseOutlinedIcon /> : <Brightness1OutlinedIcon />

        const opponentStyling = {
            width: '50%',
            margin: '0 auto'
        }
        const pieceStyling = {
            fontSize:'20px',
            fontFamily:'Verdana'
        }
        return (

            <Box style={{
                position: 'absolute', left: '50%', top: '45%',
                transform: 'translate(-50%, -50%)',
                textAlign: "center"
            }}>
                <Alert style={opponentStyling} severity="info">Your opponent is {opponentName} </Alert>
                <br></br>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        {
                            myPiece=="X"?
                            <div> You are: <CloseOutlinedIcon style={{ component: "h2" }}/> </div> 
                            :
                            <div> You are: <Brightness1OutlinedIcon style={{component:'h2'}} /> </div> 
                        }
                        
                        <br></br>
                        <br></br>
                        <div style={{component:'h2'}}> Current Turn: {currentTurnIcon} </div>
                        </Typography>        
                    </CardContent>
                </Card>
                <br></br>


                <table>
                    <tbody>
                        <tr>
                            <BoardTile
                                piece={(board[0][0])}
                                handleClick={this.handleTileClick}
                                position={[0, 0]}
                            />
                            <BoardTile
                                piece={board[0][1]}
                                handleClick={this.handleTileClick}
                                position={[0, 1]}
                            />
                            <BoardTile
                                piece={board[0][2]}
                                handleClick={this.handleTileClick}
                                position={[0, 2]}
                            />
                        </tr>
                        <tr>
                            <BoardTile
                                piece={board[1][0]}
                                handleClick={this.handleTileClick}
                                position={[1, 0]}
                            />
                            <BoardTile
                                piece={board[1][1]}
                                handleClick={this.handleTileClick}
                                position={[1, 1]}
                            />
                            <BoardTile
                                piece={board[1][2]}
                                handleClick={this.handleTileClick}
                                position={[1, 2]}
                            />
                        </tr>
                        <tr>
                            <BoardTile
                                piece={board[2][0]}
                                handleClick={this.handleTileClick}
                                position={[2, 0]}
                            />
                            <BoardTile
                                piece={board[2][1]}
                                handleClick={this.handleTileClick}
                                position={[2, 1]}
                            />
                            <BoardTile
                                piece={board[2][2]}
                                handleClick={this.handleTileClick}
                                position={[2, 2]}
                            />
                        </tr>
                    </tbody>
                </table>
                <br></br>
                {
                    gameIsOver &&
                    <div>
                        {
                            !!winner ?

                            <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <div> The winner is {winner} </div>
                                    </Typography>        
                                </CardContent>
                            </Card>
                                :
                                <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        <div> Tie! </div>
                                        </Typography>        
                                    </CardContent>
                                </Card>

                        }
                        <br></br>
                        <Button
                            onClick={closeGame}
                            variant="contained"
                            color="default"
                        >
                            Back to Main Page
                        </Button>
                    </div>
                }
            </Box>
        )
    }
}

class BoardTile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {
            piece,
            handleClick,
            position
        } = this.props;

        let cellStyle = {
            width: '150px',
            height: '150px',
            minWidth: '150px',
            borderStyle: 'solid',
            borderWidth: '2px',
            margin: '0px',
            textAlign: 'center',
            fontSize: "40px"
        }

        if (piece == "X") {
            piece = <CloseOutlinedIcon style={{ fontSize: "50px" }} />
        }
        else if (piece == "O") {
            piece = <Brightness1OutlinedIcon style={{ fontSize: "50px" }} />
        }
        return (
            <td
                onClick={handleClick}
                value={piece}
                style={cellStyle}
                name={position}
            >
                {piece}
            </td>
        )
    }
}