const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            content: "Take out the garbage"
            },
        'task-2': {
            id: 'task-2',
            content: "Watch my favorite show"
            }
    },
    columns: {
        'column-1': {
            title: "Unfinished",
            taskIds: {
                'task-2': true, 
                'task-1': true
            },
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
}

export default initialData;