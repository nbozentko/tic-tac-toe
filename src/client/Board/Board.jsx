import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

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
            winner: ''
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

        console.log(winner)
        this.setState({
            winner: winner
        });
    }

    handleTileClick(e) {
        let {
            winner
        } = this.state;
        if (e.target.getAttribute('value') || !!winner) {
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
            winner
        } = this.state;

        return (
            <Box style={{
                position: 'absolute', left: '50%', top: '40%',
                transform: 'translate(-50%, -50%)',
                textAlign:"center"
            }}>
                <h3>Current Turn: {currentTurn}</h3>
                <table>
                    <tbody>
                        <tr>
                            <BoardTile
                                piece={board[0][0]}
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
                    winner && // If winner
                    <div>The winner is {winner}</div>
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
            textAlign: 'center'
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