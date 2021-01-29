import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import GridSizerForm from './GridSizer/GridSizerForm';
import MineSweeperView from './MineSweeper';
import {MIN,MAX} from '../../constants/config'

const placeTheMines = (matrix) =>{
  let mineMatrix =  matrix.map(inner => inner.slice());
  for(let i = 1; i < mineMatrix.length * (mineMatrix.length * 1/4); i++) {
    const tempM = Math.floor(Math.random() * (mineMatrix.length-1 + 1) );
    const tempN = Math.floor(Math.random() * (mineMatrix[0].length-1  + 1) );
    //console.log("tempM",tempM);
    //console.log("tempN",tempN);
    mineMatrix[tempM][tempN]=1
  }
  return mineMatrix;
}

const createMatrix = (m, n) =>{
    let matrix = [];
    for(let i = 0; i < n; i++) {
        matrix.push(new Array(m).fill(0))
    }
    return matrix
}

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            m:"12",
            n:"12",
            formMode:true,
            matrixWithMines:[],
            revealedSpots:[],
            gameOverStatus:false,
            errorCell:null,
            gameCompleted:false,
        };
      }
    
    handleMNChange = (values) => {  
        const {formMode} = this.state;
        const intN= parseInt(values.row);
        const intM = parseInt(values.column);
        const matrix = createMatrix(intN,intM);
        const mineMatrix = placeTheMines(matrix)
        this.setState({n:values.row,m:values.column,formMode:!formMode,matrixWithMines:mineMatrix,revealedSpots:matrix});
    }
    
    onCellClick = (cellValue, currentColumn, currentRow) =>{
      const {revealedSpots} = this.state;
      if(cellValue === 1){
        this.setState({gameOverStatus:true,errorCell:{m:currentColumn,n:currentRow}});
      }else{
        let tempRevealedSpots = Object.assign([],revealedSpots);
        tempRevealedSpots[currentColumn][currentRow]= 1;
        this.setState({revealedSpots:tempRevealedSpots,gameCompleted:this.checkGameCompleted(tempRevealedSpots)});
      }
    }

    restart = () => {
      const {m,n} = this.state;
      const matrix = createMatrix(parseInt(n),parseInt(m));
      const mineMatrix = placeTheMines(matrix)
      this.setState({gameOverStatus:false,gameCompleted:false, matrixWithMines:mineMatrix, revealedSpots:matrix, errorCell:null});
    }
 
    createNewGame = () => {
      const {formMode} = this.state;
      this.setState({n:10, m:10, formMode:!formMode, gameOverStatus:false,gameCompleted:false, errorCell:null});
    }
    
    checkGameCompleted = (revealedSpots)=>{
      return revealedSpots.every(function(arr) {
        return arr.every(function (e) {
          return e = 0;
        });
      });
    }

    render() {
      const {m, n, formMode, matrixWithMines, revealedSpots, gameOverStatus, errorCell, gameCompleted} = this.state;
      return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            {!formMode & parseInt(m) >= MIN & parseInt(n) >= MIN ? 
              <MineSweeperView 
                matrixWithMines={matrixWithMines}
                revealedSpots={revealedSpots}
                onCellClick={this.onCellClick}
                gameOverStatus={gameOverStatus}
                restart={this.restart}
                createNewGame={this.createNewGame}
                gameCompleted={gameCompleted}
                errorCell={errorCell}/> : <GridSizerForm m={m} n={n} min={MIN} max={MAX} handleMNChange={this.handleMNChange}/>
            }
          </Container>
      </React.Fragment>);
    }
}

export default MainContainer;