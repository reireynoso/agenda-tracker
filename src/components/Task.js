import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Draggable} from 'react-beautiful-dnd'

export default ({taskid,index}) => {
    const tasks = useSelector(state => state.tasks);

    const useStyles = makeStyles(() => ({
        paper: {
            padding: "0.6rem",
            border: "1px solid white",
            marginBottom: "5px",
            background: "#1c88bf",
            cursor: "pointer"
        }
    }));

    const classes = useStyles();
    return (
        <Draggable
        key={taskid}
        draggableId={taskid}
        index={index}
        >
        {
            (provided) => (
            <Paper 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            innerRef={provided.innerRef} 
            key={taskid} 
            className={classes.paper}
            >
                {tasks[taskid].content}
            </Paper>
            )
        }
        </Draggable> 
    )
}