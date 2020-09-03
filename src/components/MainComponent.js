import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import {changePositioning} from '../actions/todosAction'

export default () => {
    const tasks = useSelector(state => state.tasks)
    // console.log(tasks)
    const columns = useSelector(state => state.columns) 

    const dispatch = useDispatch()
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

    const onDragEnd = result => {
      // console.log('drag end')
      const {destination, source} = result;
      //if there's no destination do nothing
      if(!destination){
        return;
      }
      //if it was dropped in the same exact location, no need to do anything
      if(
        destination.droppableId === source.droppableId && destination.index === source.index
      ){
        return;
      }    
      dispatch(changePositioning(result))
    }
    
    return(
        <div className="align-center">
            <main id="main">
                <h1 id="main__title">Agendas</h1>
                  <DragDropContext
                    onDragEnd={onDragEnd}
                  >
                    <Grid justify="center" container className={classes.root} spacing={2}>  
                          {Object.keys(columns).map(key => (
                          <Grid key={key} item xs={8} sm={6} md={4}>
                            <Droppable key={key} droppableId={key}>
                              {
                                provided => (    
                                    <Paper innerRef={provided.innerRef} {...provided.droppableProps} className={classes.column}>
                                      <h2 className="category__title">{columns[key].title}</h2>
                                      {
                                          columns[key].taskIds.map((taskid,index) => {
                                              return <Draggable
                                                key={taskid}
                                                draggableId={taskid}
                                                index={index}
                                              >
                                                {
                                                  (provided) => (
                                                    <Paper {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} key={taskid} className={classes.paper}>{tasks[taskid].content}</Paper>
                                                  )
                                                }
                                                
                                              </Draggable> 
                                          })
                                      }
                                      {
                                        provided.placeholder
                                      }
                                    </Paper>
                                )
                              }
                              </Droppable>
                          </Grid>
                          ))}       
                    </Grid>
                  </DragDropContext>
            </main>
        </div>
    )
}