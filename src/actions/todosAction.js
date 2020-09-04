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