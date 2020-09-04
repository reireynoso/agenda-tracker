import initialData from '../../initial-data'

export default (state = initialData, action) => {
    switch(action.type){
        case "DRAGNDROP":
            // console.log(action.payload)
            const {destination, draggableId, source} = action.payload;
            
            //if different location, remove from the original and add to the destination
            if(source.droppableId !== destination.droppableId){
                //remove from source
                const removedFromSource = state.columns[source.droppableId].taskIds.filter(id => id !== draggableId)
                //add to destination
                const newCopyOfDestinationTask = state.columns[destination.droppableId].taskIds.slice(0);
                newCopyOfDestinationTask.splice(destination.index, 0, draggableId)
                const updatedObj = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [source.droppableId]: {
                            ...state.columns[source.droppableId],
                            taskIds: removedFromSource
                        },
                        [destination.droppableId]: {
                            ...state.columns[destination.droppableId],
                            taskIds: newCopyOfDestinationTask
                        }
                    }
                }
                return updatedObj
            }else{
                //if same column, just change index
                const newLocation = state.columns[source.droppableId].taskIds
                newLocation.splice(source.index, 1);
                newLocation.splice(destination.index, 0, draggableId);

                const updatedObj = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [source.droppableId]: {
                            ...state.columns[source.droppableId],
                            taskIds: newLocation
                        }
                    }
                }
                return updatedObj
            }
        case "ADDNEWTASK":
            const {payload} = action
            const updatedState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [payload.id]: payload 
                },
                columns: {
                    ...state.columns,
                    "column-1": {
                        ...state.columns["column-1"],
                        taskIds: [...state.columns["column-1"].taskIds, payload.id]
                    }
                }
            }
            return updatedState    
        case "REMOVETASK":
            const {col, taskid} = action.payload;
            //make a copy of the tasks object
            const copyOfTasksObject = {
                ...state.tasks
            }
            // destructively delete the key from the copy
            delete copyOfTasksObject[taskid]
            const updatedRemoved = {
                ...state,
                tasks: copyOfTasksObject,
                columns: {
                    ...state.columns,
                    [col]:{
                        ...state.columns[col],
                        taskIds: state.columns[col].taskIds.filter(id => id !== taskid)
                    }
                }
            }
            return updatedRemoved
        default: 
            return state;
    }
}