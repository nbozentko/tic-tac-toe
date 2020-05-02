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

    checkForWin() {

    }

    handleTileClick(e) {
        if (e.target.getAttribute('value')) {
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
        this.checkForWin();
    }

    render() {
        let {
            board,
            currentTurn
        } = this.state;

        return (
            <Box>
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
            width: '50px',
            height: '50px',
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