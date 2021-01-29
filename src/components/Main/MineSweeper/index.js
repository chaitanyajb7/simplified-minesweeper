import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Button from '@material-ui/core/Button';
import strings from '../../../localization/label';
import {
    makeStyles,
  } from '@material-ui/core/styles';
import './MineSweeperView.css';

const useStyles = makeStyles((theme) => ({
      container:{
        justifyContent:"center",
        backgroundColor:"black",
        padding: theme.spacing(1),

      },

      tile:{
          background: "grey",
          width: theme.spacing(5),
          height: theme.spacing(5),
          margin: theme.spacing(0.2),
      },

      errorCell:{
        background: 'red',
        color:"black"
      },

      tileTextInVisible:{
        color:"grey",
      },

      tileTextVisible:{
          color:"black",
      },

      gameOverDialog: {
        justifyContent:"center",
        color:"red",
        ...theme.typography.button,
        backgroundColor: "black",
        padding: theme.spacing(1),
      },

      gameCompletedDialog: {
        justifyContent:"center",
        color:"green",
        backgroundColor: "black",
        padding: theme.spacing(1),
      },

      button:{
        margin: theme.spacing(1),
      }
  }));

const totalAdjacentMines =  (matrixWithMines,currentM,currentN) => {
    let result = 0;
    const currentMPlus1 = currentM+1;
    const currentMMinus1 = currentM-1;
    const currentNMinus1 = currentN-1;
    const currentNPlus1 = currentN+1;

    result = ((currentMMinus1!== -1 ? matrixWithMines[currentMMinus1][currentN] : 0) +// up
        (currentMPlus1 < matrixWithMines.length ? matrixWithMines[currentMPlus1][currentN] : 0)+//down
        (currentNMinus1 !== -1 ? matrixWithMines[currentM][currentNMinus1] : 0)+//Left 
        (currentNPlus1 < matrixWithMines[0].length ? matrixWithMines[currentM][currentNPlus1] : 0) +// Right
        (currentMMinus1 !== -1 && currentNMinus1 !== -1? matrixWithMines[currentMMinus1][currentNMinus1] : 0) + // Left Up
        (currentMPlus1 < matrixWithMines.length   && currentNPlus1 < matrixWithMines[0].length? matrixWithMines[currentMPlus1][currentNPlus1] : 0) + // Right Down
        (currentMMinus1 !== -1 && currentNPlus1 < matrixWithMines[0].length ? matrixWithMines[currentMMinus1][currentNPlus1] : 0)  + // Right Up
        (currentMPlus1 < matrixWithMines.length  && currentNMinus1 !== -1 ? matrixWithMines[currentMPlus1][currentNMinus1]:0))//Left Down
    return result;
}
  

const MineSweeperView = ({matrixWithMines,revealedSpots,onCellClick, gameOverStatus, restart, createNewGame, errorCell,gameCompleted}) => {
    const classes = useStyles();
    return(
            <>
                <Grid container className={classes.container} direction="row" justify="center" alignItems="center">
                    {matrixWithMines.map((subArray,i) =>{
                        return <Grid item key={i}  className={"unselectable"} >
                                    {subArray.map((item,j) =>{
                                        let textStyle= classes.tileTextInVisible.concat(" pressed");
                                        if(errorCell && errorCell.m === i && errorCell.n === j){
                                            textStyle = classes.errorCell;
                                        }
                                        else if(gameOverStatus){
                                            textStyle = classes.tileTextVisible;
                                        }else if(revealedSpots[i][j]===1){
                                            textStyle = classes.tileTextVisible ;
                                        }
                                        const adjacentCellsMines = totalAdjacentMines(matrixWithMines,i,j);
                                        return <Paper
                                                    key={`${i}_${j}`}
                                                    className={`${classes.tile} ${textStyle}`}
                                                    justify="center"
                                                    variant="outlined"
                                                    elevation={10}
                                                    onClick={()=>onCellClick(item,i,j)}>
                                                    {matrixWithMines[i][j]?<WbSunnyIcon/>:(adjacentCellsMines?adjacentCellsMines:"")}
                                               </Paper>
                                               }
                                    )}
                                </Grid>
                    })}
                </Grid>
                <Grid container className={gameCompleted?classes.gameCompletedDialog :classes.gameOverDialog}>
                    <Grid item xs={12}>
                        {(gameOverStatus || gameCompleted)&& 
                            <>
                                <Typography variant="h5" component="h5">
                                    {gameOverStatus? strings.game_over_title : strings.game_completed }
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    {strings.create_new_game}<br/>
                                </Typography>
                            </>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {(gameOverStatus || gameCompleted) && 
                            <>
                                <Button onClick={()=>restart()} className={classes.button} variant="contained" color="primary">
                                    {strings.restart}
                                </Button>
                                <Button onClick={()=>createNewGame()} className={classes.button} variant="contained" color="secondary">
                                    {strings.create_new_game}
                                </Button>
                            </> 
                        }
                    </Grid>
                </Grid>
                
            </>
    );
  }

export default MineSweeperView;