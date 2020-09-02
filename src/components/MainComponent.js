import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default () => {
    const tasks = useSelector(state => state.tasks)
    console.log(tasks)
    const columns = useSelector(state => state.columns) 
    console.log(Object.keys(columns))
    const useStyles = makeStyles(() => ({
        root: {
          flexGrow: 1
        },
        paper: {
          padding: "0.6rem",
          border: "1px solid white",
          marginBottom: "5px",
          background: "#1c88bf",
          cursor: "pointer"
        },
        column: {
            minHeight: "260px",
            padding: "0.5rem"
        }
      }));
      
    const classes = useStyles();
    
    return(
        <div className="align-center">
            <main id="main">
                <h1 id="main__title">Agendas</h1>
                    <Grid justify="center" container className={classes.root} spacing={2}>  
                          {Object.keys(columns).map(key => (
                            <Grid key={key} item xs={8} sm={6} md={4}>
                              <Paper className={classes.column}>
                                <h2 className="category__title">{columns[key].title}</h2>
                                {
                                    columns[key].taskIds.map(taskid => {
                                        return <Paper key={taskid} className={classes.paper}>{tasks[taskid].content}</Paper>
                                    })
                                }
                              </Paper>
                            </Grid>
                          ))}       
                    </Grid>
            </main>
        </div>
    )
}