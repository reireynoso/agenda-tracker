import initialData from '../../initial-data'

export default (state = initialData, action) => {
    switch(action.type){
        case "DRAGNDROP":
            // console.log(action.payload)
            const {destination, draggableId, source} = action.payload;
            
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
        default: 
            return state;
    }
}