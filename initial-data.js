const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            content: "Take out the garbage"
            },
        'task-2': {
            id: 'task-2',
            content: "Watch my favorite show"
            },
        'task-3': {
            id: 'task-3',
            content: "Charge my phone"
            },
        'task-4': {
            id: 'task-4',
            content: "Cook dinner"
            },
    },
    columns: {
        'column-1': {
            title: "Unfinished",
            taskIds: {
                'task-4': true, 
                'task-2': true, 
                'task-1': true, 
                'task-3': true
            },
        },
        'column-2': {
            title: "W.I.P",
            // taskIds: {
            // }
        },
        'column-3': {
            title: "Finished",
            // taskIds: {

            // }
        },
    },
    // initial: true
}


// export default initialData;

// const initialData = {
//     tasks: {
//         'task-1': {
//             id: 'task-1',
//             content: "Take out the garbage"
//             },
//         'task-2': {
//             id: 'task-2',
//             content: "Watch my favorite show"
//             },
//         'task-3': {
//             id: 'task-3',
//             content: "Charge my phone"
//             },
//         'task-4': {
//             id: 'task-4',
//             content: "Cook dinner"
//             },
//     },
//     columns: {
//         'column-1': {
//             title: "Unfinished",
//             taskIds: ['task-4', 'task-2', 'task-1', 'task-3']
//         },
//         'column-2': {
//             title: "W.I.P",
//             taskIds: []
//         },
//         'column-3': {
//             title: "Finished",
//             taskIds: []
//         },
//     },
//     // initial: true
// }

export default initialData;