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

export const startSetData = () => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;

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

        return database.ref(`users/${uid}`).once('value').then((snapshot) => {
            // debugger
            // console.log(snapshot)
            // console.log(snapshot.val())
            if(!snapshot.val()){
                database.ref(`users/${uid}`).set({
                    columns: {
                        'column-1': {
                            title: "Unfinished",
                            taskIds: {

                            }
                        },
                        'column-2': {
                            title: "W.I.P",
                            taskIds: {

                            }
                        },
                        'column-3': {
                            title: "Finished",
                            taskIds: {

                            }
                        },
                    }
                })
            }
            dispatch(setData(snapshot.val()))
        })
    }
}

export const startAddNewTask = (taskObj, columns) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // if(initial){
        //     const usersRef = database.ref(`users/${uid}`);
        //     usersRef.set({
        //             tasks: {
        //                 ...taskObj
        //             },
        //             columns: {
        //                 'column-1': {
        //                     title: "Unfinished",
        //                     taskIds: {

        //                     }
        //                 },
        //                 'column-2': {
        //                     title: "W.I.P",
        //                     taskIds: {

        //                     }
        //                 },
        //                 'column-3': {
        //                     title: "Finished",
        //                     taskIds: {

        //                     }
        //                 },
        //             }
        //     }).then(ref => {
        //         console.log(ref.key)
        //         database.ref(`users/${uid}/columns/column-1/taskIds`).push({
        //             id: ref.key,
        //             ...taskObj
        //         })
        //         dispatch(addNewTask({
        //             id: ref.key,
        //             ...taskObj
        //         }))
        //     })
        // }else{
            const taskids = columns["column-1"].taskIds
            const taskidsArray = taskids ? Object.keys(columns["column-1"].taskIds) : []
            return database.ref(`users/${uid}/tasks`).push(taskObj).then((ref) => {
                database.ref(`users/${uid}/columns/column-1/taskIds`).update({
                    [ref.key]: taskidsArray.length > 0 ? taskidsArray.length : 0
                })
                dispatch(addNewTask({
                    id: ref.key,
                    ...taskObj
                }))
            })
        // }

    }
}

export const startRemoveTask = ({col,taskid, agenda}) => {
    return (dispatch, getState) => {

        // const {col, taskid} = action.payload;
            //make a copy of the tasks object
        const uid = getState().auth.uid
        const copyOfTasksObject = {
            ...agenda.tasks
        }
        // destructively delete the key from the copy
        delete copyOfTasksObject[taskid]

        const copyOfTaskids = {
            ...agenda.columns[col].taskIds
        }

        delete copyOfTaskids[taskid]
        const updatedRemoved = {
            ...agenda,
            tasks: copyOfTasksObject,
            columns: {
                ...agenda.columns,
                [col]:{
                    ...agenda.columns[col],
                    // taskIds: agenda.columns[col].taskIds.filter(id => id !== taskid)
                    taskIds: copyOfTaskids
                }
            }
        }
        return database.ref(`users/${uid}`).update(updatedRemoved).then(() => {
            dispatch(removeTask(updatedRemoved))
        })
    }
}

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
            const keysOfRemovedFromSource = Object.keys(removedFromSource)
            if(keysOfRemovedFromSource.length > 0){
                if(keysOfRemovedFromSource.length === 1){
                    removedFromSource[keysOfRemovedFromSource[0]] = 0;
                }

                if(keysOfRemovedFromSource.length > 1){
                    // sort out the removedFromSource by values
                    // array of arrays with each array containing key and value
                    const separate = Object.entries(removedFromSource)
                    const sorted = separate.sort((a,b) => a[1] - b[1])

                    // iterate over the sorted and assign the new values
                    for(let i = 0; i < sorted.length; i++){
                        removedFromSource[sorted[i][0]] = i;
                    }
                }
            }

            const newCopyOfDestinationTask = {};

            // const selectedColumn = columns[destination.droppableId].taskIds
            // if(selectedColumn && Object.keys(selectedColumn).length === 0){
            //     newCopyOfDestinationTask[draggableId] = true;
            // }
            let order = 0;
            // else{
                // checks if column id has taskIds defined (since Firebase eliminates the property if empty)
            if(columns[destination.droppableId].taskIds){
                // const columnTaskids = Object.keys(columns[destination.droppableId].taskIds)
                const columnTaskids = Object.entries(columns[destination.droppableId].taskIds)
                columnTaskids.sort((a,b) => a[1] - b[1])
                for(let i = 0; i < columnTaskids.length; i++){
                    if(destination.index === i){
                        // debugger
                        newCopyOfDestinationTask[draggableId] = order;
                        order++
                    }
                    newCopyOfDestinationTask[columnTaskids[i][0]] = order
                    order++
                }

                if(destination.index === columnTaskids.length){
                    newCopyOfDestinationTask[draggableId] = order;
                }
                // debugger
            }else{
                newCopyOfDestinationTask[draggableId] = order
            }
            // }
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
            
            let order = 0;
            const removeOldLocation = {
                ...columns[source.droppableId].taskIds
            }
            delete removeOldLocation[draggableId]
                   
            const newLocation = {}
            // const columnTaskids = Object.keys(removeOldLocation)
            const columnTaskids = Object.entries(removeOldLocation)
            columnTaskids.sort((a,b) => a[1] - b[1])
            //iterate through the old taskids and add the new one in the right location
            for(let i = 0; i < columnTaskids.length; i++){
                if(destination.index === i){
                    newLocation[draggableId] = order;
                    order++
                }
                newLocation[columnTaskids[i][0]] = order
                order++
            }

            if(destination.index === columnTaskids.length){
                newLocation[draggableId] = order;
            }

            updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...columns[source.droppableId],
                    taskIds: newLocation
                }
            }
        }
        dispatch(changePositioning(updatedColumns))
        // console.log(updatedColumns["column-1"].taskIds)
        // return database.ref(`users/${uid}/columns`).remove().then(() => {
            // database.ref(`users/${uid}/columns`).set(updatedColumns)
        // })
        return database.ref(`users/${uid}/columns`).update(updatedColumns)
    }
}