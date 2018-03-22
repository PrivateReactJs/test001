import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: Array(0).fill(null),
          squares: Array(9).fill(""),
          isXPlayer: true, 
          move:0,         
        };
        const squares = this.state.squares;
        const historyObj = this.state.history;
        this.setState({history: historyObj.concat([{squares}])});
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]}  onClick={() => this.handleClick(i)}/>;
    }
  
    handleClick(i) {
        const squares = this.state.squares.slice();
        const historyObj = this.state.history;

        squares[i] = this.state.isXPlayer?"X":"O";
        this.setState({isXPlayer: !this.state.isXPlayer});
        this.setState({squares: squares});

        this.setState({history: historyObj.concat([{squares}])});
        this.setState({move: this.state.move + 1});

    }

    calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log("log : " + i + " - " + squares[a]);
            return squares[a];
          }
        }
        console.log("log null");
        return null;
      }


    previousMove() {
        const move = this.state.move - 1;
        console.log(move);
        if (move > 0) {
            this.jumpTo(this.state.history[move - 1]);
            this.setState({ move: move });
        }
    }

    nextMove() {
        this.previousMove()
    }

    jumpTo(step) {
        this.setState({squares:step.squares});        
    }

    render() {
        console.log(this.state.history);        
        const winner = this.calculateWinner(this.state.squares);
        console.log("winner: " + winner);
        const status = 'Next player: ' + (this.state.isXPlayer ? 'X' : 'O');
        const history = this.state.history;
      
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move.toString()}>
                <button onClick={() => this.jumpTo(step)}>{desc}</button>
              </li>
            );
        });
    
      return (
          <div>
              <div className="status">{status}</div>
              <div className="board-row">
                  {this.renderSquare(0)}
                  {this.renderSquare(1)}
                  {this.renderSquare(2)}
              </div>
              <div className="board-row">
                  {this.renderSquare(3)}
                  {this.renderSquare(4)}
                  {this.renderSquare(5)}
              </div>
              <div className="board-row">
                  {this.renderSquare(6)}
                  {this.renderSquare(7)}
                  {this.renderSquare(8)}
              </div>
              <div>
                  <button className="xxxx" onClick={() => this.previousMove()}> &lt; </button>
                  {this.state.move}
                  <button className="xxxx" onClick={() => this.nextMove()}> > </button>
                  <ol>{moves}</ol>
              </div>
          </div>
      );
    }
  }

  export default Board;
