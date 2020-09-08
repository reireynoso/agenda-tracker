import database from '../firebase/firebase'

export const changePositioning = payload => ({
    type: "DRAGNDROP",
    payload
})

export const addNewTask = (payload) => ({
    type: "ADDNEWTASK",
    payload
})

export const removeTask = (payload) => ({
    type: "REMOVETASK",
    payload
})

export const setData = (data) => ({
    type: "SETDATA",
    payload: data
})

// export const startSetData = () => {
//     return (dispatch,getState) => {
//         const uid = getState().auth.uid;

        // return database.ref(`users/${uid}`).once('value').then((snapshot) => {
        //     debugger
        //     console.log(snapshot.val())
        //     snapshot.forEach((childSnapshot) => {
        //         debugger
        //         console.log(childSnapshot.val())
        //     })
        // })
        // return database.ref(`users/${uid}`).on('value', (snapshot) => {
        //     // debugger
        //     dispatch(setData(snapshot.val()))
        // })

//         return database.ref(`users/${uid}`).once('value').then((snapshot) => {
//             // debugger
//             dispatch(setData(snapshot.val()))
//         })
//     }
// }

// export const startAddNewTask = (taskObj, intitial) => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid
//         const usersRef = database.ref(`users/${uid}`);
//         usersRef.set({
//                 tasks: {
//                     ...taskObj
//                 },
                // columns: {
                //     'column-1': {
                //         title: "Unfinished",
                //         taskIds: []
                //     },
                //     'column-2': {
                //         title: "W.I.P",
                //         taskIds: []
                //     },
                //     'column-3': {
                //         title: "Finished",
                //         taskIds: []
                //     },
                // }
        // })
        // return database.ref(`users/${uid}`).push(taskObj).then((ref) => {
        //     dispatch(addNewTask({
        //         id: ref.key,
        //         ...taskObj
        //     }))
        // })
//     }
// }

export const startChangePositioning = (columns, result) => {
    return (dispatch,getState) => {
        // const uid = getState().auth.uid;
        // const {destination, draggableId, source} = result;
        // let updatedColumns;
        // //if different location, remove from the original and add to the destination
        // if(source.droppableId !== destination.droppableId){
        //     //remove from source
        //     const removedFromSource = columns[source.droppableId].taskIds.filter(id => id !== draggableId)
        //     //add to destination
        //     const newCopyOfDestinationTask = columns[destination.droppableId].taskIds.slice(0);
        //     newCopyOfDestinationTask.splice(destination.index, 0, draggableId)
        //     updatedColumns = {
        //         ...columns,
        //         [source.droppableId]: {
        //             ...columns[source.droppableId],
        //             taskIds: removedFromSource
        //         },
        //         [destination.droppableId]: {
        //             ...columns[destination.droppableId],
        //             taskIds: newCopyOfDestinationTask
        //         }            
        //     }
            
        // }else{
        //     //if same column, just change index
        //     const newLocation = columns[source.droppableId].taskIds
        //     newLocation.splice(source.index, 1);
        //     newLocation.splice(destination.index, 0, draggableId);

        //     updatedColumns = {
        //         ...columns,
        //         [source.droppableId]: {
        //             ...columns[source.droppableId],
        //             taskIds: newLocation
        //         }
        //     }
        // }

        const uid = getState().auth.uid;
        const {destination, draggableId, source} = result;
        let updatedColumns;
        //if different location, remove from the original and add to the destination
        if(source.droppableId !== destination.droppableId){
            //remove from source
            const removedFromSource = {
                ...columns[source.droppableId].taskIds
            }
             
            delete removedFromSource[draggableId]
            //add to destination
            // debugger
            
            const newCopyOfDestinationTask = {};

            const selectedColumn = columns[destination.droppableId].taskIds
            if(selectedColumn && Object.keys(selectedColumn).length === 0){
                newCopyOfDestinationTask[draggableId] = true;
            }
            else{
                // checks if column id has taskIds defined (since Firebase eliminates the property if empty)
                if(columns[destination.droppableId].taskIds){
                    const columnTaskids = Object.keys(columns[destination.droppableId].taskIds)
                    for(let i = 0; i < columnTaskids.length; i++){
                        if(destination.index === i){
                            // debugger
                            newCopyOfDestinationTask[draggableId] = true;
                        }
                        newCopyOfDestinationTask[columnTaskids[i]] = true
                    }

                    if(destination.index === columnTaskids.length){
                        newCopyOfDestinationTask[draggableId] = true;
                    }
                    // debugger
                }else{
                    newCopyOfDestinationTask[draggableId] = true
                }
            }
            // debugger
            // iterate through keys and insert new one when apprpriate 
            // newCopyOfDestinationTask.splice(destination.index, 0, draggableId)
            updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...columns[source.droppableId],
                    taskIds: removedFromSource
                },
                [destination.droppableId]: {
                    ...columns[destination.droppableId],
                    taskIds: newCopyOfDestinationTask
                }            
            }
            
        }else{
            //if same column, just change index
            // const newLocation = columns[source.droppableId].taskIds
            //remove the old task location
            const removeOldLocation = {
                ...columns[source.droppableId].taskIds
            }
            delete removeOldLocation[draggableId]
                   
            const newLocation = {}
            const columnTaskids = Object.keys(removeOldLocation)
            //iterate through the old taskids and add the new one in the right location
            for(let i = 0; i < columnTaskids.length; i++){
                if(destination.index === i){
                    newLocation[draggableId] = true;
                }
                newLocation[columnTaskids[i]] = true
            }

            if(destination.index === columnTaskids.length){
                newLocation[draggableId] = true;
            }

            updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...columns[source.droppableId],
                    taskIds: newLocation
                }
            }
        }
        // return database.ref(`users/${uid}/columns`).update(updatedColumns).then(() => {
            dispatch(changePositioning(updatedColumns))
        // })
    }
}