import './App.css';
import React from 'react';

var rowAmount = 6;
var colAmount = 7;

function App() {

    return (
        <div className="game">
            <div className="game-board">
                <Board />
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
                className={"square " + this.props.value}
                onClick={() => this.props.onClick()}
            >
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(rowAmount).fill(null).map(row => new Array(colAmount).fill(null)),
            nextTurn: 1
        };
    }

    handleClick(j) {
        const squares = this.state.squares.slice();
        var lowest = this.dropPiece(j);

        if(this.state.nextTurn == 1){
            squares[lowest][j] = 'blue';
        }
        else{
            squares[lowest][j] = 'red';
        }
        this.setState({squares: squares, nextTurn: this.state.nextTurn %2 + 1});
    }

    renderSquare(i,j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(j)}
            />
        );
    }

    dropPiece(j) {
        for(let index = 5; index >= 0; index--)
        if(this.state.squares[index][j] == null){
            return index;
        }
    }

    render() {
        const status = 'Next player: ' + this.state.nextTurn;

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
            </div>
        );
    }
}

