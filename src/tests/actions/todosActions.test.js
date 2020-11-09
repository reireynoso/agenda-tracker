import {
    setData,
    addNewTask,
    removeTask,
    changePositioning
} from '../../actions/todosAction'
import initialData from '../fixtures/todos'

test("Should set up todos action with data", () => {
    const action = setData(initialData);
    expect(action).toEqual({
        type: "SETDATA", 
        payload: initialData
    })
})

test("Should add new task action object", () => {
    const newTask = {
        id: "123abc",
        content: "testing"
    }
    const action = addNewTask(newTask)

    expect(action).toEqual({
        type: "ADDNEWTASK",
        payload: newTask
    })
})

test("Should remove task action object", () => {
    const action = removeTask(initialData)

    expect(action).toEqual({
        type: "REMOVETASK",
        payload: initialData
    })
})

test("Should change task action object", () => {
    const action = changePositioning(initialData)

    expect(action).toEqual({
        type: "DRAGNDROP",
        payload: initialData
    })
})