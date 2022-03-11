import './App.css';
import React from 'react';

const rowAmount = 6;
const colAmount = 7;

function App() {

    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

export default App;

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                <div className={"circle " + this.props.value}/>
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(rowAmount).fill(null).map(row => new Array(colAmount).fill(null)),
            nextTurn: 1,
            winner: ' '
        };
    }

    handleClick(i, j) {
        if (this.state.winner !== 'blue' && this.state.winner !== 'red') {
            const squares = this.state.squares.slice();
            const lowest = this.dropPiece(j);

            if (this.state.nextTurn === 1) {
                squares[lowest][j] = 'blue';
            } else {
                squares[lowest][j] = 'red';
            }
            //this.setState({squares: squares, nextTurn: this.state.nextTurn %2 + 1, });

            const winner = this.checkWinner(lowest, j, this.state.squares[lowest][j])
            this.setState({
                squares: squares,
                nextTurn: this.state.nextTurn % 2 + 1,
                winner: winner
            })
        }
    }

    renderSquare(i, j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />

        );
    }

    dropPiece(j) {
        for (let index = 5; index >= 0; index--)
            if (this.state.squares[index][j] == null) {
                return index;
            }
    }

    resetBoard() {
        this.setState({
            squares: Array(rowAmount).fill(null).map(row => new Array(colAmount).fill(null)),
            nextTurn: 1,
            winner: ' '
        })
    }

    checkWinner(i, j, player) {
        console.log("searching for winner: " + player + " i: " + i + " j: " + j)
        const squares = this.state.squares.slice()
        const positionI = i;
        const positionJ = j;
        let counter = 0;

        if (checkHorizontal(i, j, player) || checkDiagonalLeft(i, j, player) || checkDiagonalRight(i, j, player) || checkVertical(i, j, player)) {
            return player
        }
        return ' '

        //help functions
        function checkHorizontal(i, j, player) {
            counter = 0
            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                j++
            }
            j = positionJ - 1 //reset position

            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                j--
                counter++
            }
            return counter >= 4;
        }

        function checkDiagonalLeft(i, j, player) {
            counter = 0
            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                i--
                j--
            }
            i = positionI + 1
            j = positionJ + 1
            
            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                i++
                j++
            }
            return counter >= 4;
        }

        function checkDiagonalRight(i, j, player) {
            counter = 0
            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                i--
                j++
            }
            i = positionI + 1
            j = positionJ - 1

            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                i++
                j--
            }
            return counter >= 4;
        }

        function checkVertical(i, j, player) {
            counter = 0
            while (isFieldInsideBoard(i, j) && squares[i][j] === player) {
                counter++
                i++
            }
            return counter >= 4;
        }

        function isFieldInsideBoard(i, j) {
            return ((i > 0 && i < rowAmount) && (j > 0 && j < colAmount))
        }
    }

    render() {
        const status = 'Next player: ' + this.state.nextTurn
        const winner = 'Winner is: ' + this.state.winner

        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    {this.state.squares.map((row, i) => (
                        <div className="row">
                            {row.map((column, j) => (
                                this.renderSquare(i, j)
                            ))}
                        </div>
                    ))}
                </div>
                <div className="status">{winner}</div>
                <div>
                    <button onClick={() => this.resetBoard()}>
                        Reset Game
                    </button>
                </div>
            </div>
        );
    }
}

