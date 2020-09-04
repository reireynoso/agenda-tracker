import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Draggable} from 'react-beautiful-dnd'
import {removeTask} from '../actions/todosAction'
// import ContentEditable from 'react-contenteditable'

export default ({taskid,index,col}) => {
    const dispatch = useDispatch()
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

    const handleRemoveTask = (e) => {
        e.preventDefault();
        // console.log(col, taskid)
        dispatch(removeTask({
            col,
            taskid
        }))
    }
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
                {
                    // <div className="task__content">
                    //     <ContentEditable
                    //         className = "task__content-edit"
                    //         html={
                    //             `<span>${tasks[taskid].content}</span>`
                    //         }
                    //     />
                    // </div>
                }
                    <span className="task__content">{tasks[taskid].content}</span>
                {
                    col === "column-3" && <button onClick={handleRemoveTask} className="task__delete-button">X</button>
                }
            </Paper>
            )
        }
        </Draggable> 
    )
}