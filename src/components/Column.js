import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid';
import {Droppable} from 'react-beautiful-dnd'

import Task from '../components/Task'

export default ({col}) => {
    const columns = useSelector(state => state.columns) 

    const useStyles = makeStyles(() => ({
        column: {
            minHeight: "260px",
            padding: "0.5rem"
        },
        input: {
            width: "100%"
        }
    }));

    const classes = useStyles();
    
    return (
        <Grid  item xs={8} sm={6} md={4}>
        <h2 className="category__title">{columns[col].title}</h2>
        <Droppable droppableId={col}>
            {
            provided => (    
                <Paper 
                innerRef={provided.innerRef} 
                {...provided.droppableProps} 
                className={classes.column}>        
                    {
                        columns[col].taskIds.map((taskid,index) => {
                            return <Task key={taskid} taskid={taskid} index={index}/>
                        })
                    }
                    {
                    provided.placeholder
                    }
                    {
                    col === "column-1" ? <Input 
                        className={classes.input}
                        placeholder="New task. Press Enter"
                        onKeyPress={(e) => console.log(e)}
                        /> : null
                    }
                </Paper>
            )
            }
            </Droppable>
        </Grid>
    )
}