import {
    setData,
    addNewTask
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