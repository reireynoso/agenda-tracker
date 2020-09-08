import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {DragDropContext} from 'react-beautiful-dnd'

import {startChangePositioning} from '../actions/todosAction'

import Column from '../components/Column'

export default () => {
    const columns = useSelector(state => state.todosReducer.columns) 
    const dispatch = useDispatch()
    const useStyles = makeStyles(() => ({
        root: {
          flexGrow: 1
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
      dispatch(startChangePositioning(columns,result))
    }
    
    return(
        <div className="align-center">
            <main id="main">
                <h1 id="main__title">Agendas</h1>
                  <DragDropContext
                    onDragEnd={onDragEnd}
                  >
                    <Grid justify="center" container className={classes.root} spacing={2}>  
                          {Object.keys(columns).map(col => (
                            <Column key={col} col={col}/>
                          ))}       
                    </Grid>
                  </DragDropContext>
            </main>
        </div>
    )
}