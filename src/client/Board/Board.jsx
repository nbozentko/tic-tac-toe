import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            currentTurn: this.props.firstTurn,
            winner: '',
            gameIsOver: false,
            socket: this.props.socket
        }

        this.checkForWin = this.checkForWin.bind(this);
        this.handleTileClick = this.handleTileClick.bind(this);
    }

    componentDidMount() {
        let {
            socket,
            myPiece
        } = this.props;
        socket.on('move', newBoard => {
            this.checkForWin(newBoard);
            this.setState({
                board: newBoard,
                currentTurn: myPiece
            });
        });
        this.setState({
            socket: socket
        })
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
                    }
                } else {
                    break;
                }
            }
        }

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
            gameIsOver,
            board,
            currentTurn,
            socket
        } = this.state;
        let {
            myPiece,
            opponentId
        } = this.props;
        if (e.target.getAttribute('value') || gameIsOver || currentTurn !== myPiece) {
            return false;
        }
        let posStr = e.target.getAttribute('name')
        let position = posStr.split(',');
        board[position[0]][position[1]] = currentTurn;

        socket.emit('move', {
            to: opponentId,
            board: board
        });

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
            myPiece,
            opponent: opponentId,
            opponentName
        } = this.props;

        let currentTurnIcon = currentTurn === 'X' ? <CloseOutlinedIcon /> : <Brightness1OutlinedIcon />

        return (

            <Box style={{
                position: 'absolute', left: '50%', top: '40%',
                transform: 'translate(-50%, -50%)',
                textAlign: "center"
            }}>
                <h5>You opponent is {opponentName}</h5>
                <h5>You are {myPiece}</h5>
                <br></br>
                <h2>Current Turn: {currentTurnIcon}</h2>

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
                {
                    gameIsOver &&
                    <div>
                        {
                            !!winner ?
                                <div>The winner is {winner}</div>
                                :
                                <div>Tie!</div>
                        }
                        <Button
                            onClick={closeGame}
                            variant="contained"
                            color="primary"
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