import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import '../css/styles.css'

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
        let i,j;
        let winner=''
        let checkXWinHorizontal, checkYWinHorizontal, checkXWinVertical, checkYWinVertical =0;
        let {board,gameIsOver} = this.state;
        let checkGame = gameIsOver;

        // Check Horizontal and Vertical.... gotta fix this 
        for (i=0;i<3;i++){
            checkXWinHorizontal = checkYWinHorizontal = checkXWinVertical = checkYWinVertical=0;
            for (j=0;j<3;j++){
                if (board[i][j]==="X"){
                    checkXWinHorizontal+=1;
                    if (checkXWinHorizontal==3){
                        checkGame=true; 
                        winner="X"
                    }                                      
                }
                else{
                    if (board[i][j]==="O"){
                        checkYWinHorizontal+=1;
                        if (checkYWinHorizontal==3){
                            checkGame=true;
                            winner="O"
                        }                          
                    }
                }
                if (board[j][i]=="X"){
                    checkXWinVertical+=1;
                    if (checkXWinVertical==3){
                        checkGame=true;
                        winner="X"
                    }                      
                }
                else{
                    if (board[j][i]==="O"){
                        checkYWinVertical+=1;
                        if (checkYWinVertical==3){
                            checkGame=true;
                            winner="O";
                        }                         
                    }
                }
            }
        }

        // Check Diag
        if (board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!=''){
            checkGame=true; 
            winner=board[0][0];
        }
        
        if (board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!=''){
            checkGame=true; 
            winner=board[0][2];
        }
        

        if (checkGame){
            document.getElementById('winner').innerHTML = "The winner is " + winner
            document.getElementById('winner').style.display='inline';
        }
        
        this.setState({ gameIsOver: checkGame }); 
        
    }
        


    handleTileClick(e) {
        let {gameIsOver} = this.state;
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
                <div id="winner">
                </div>
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