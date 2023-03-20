import {TasksStateType, TodolistType} from "../App";
import {tasksReducer} from "./tasks-reducers";
import {AddTodolistAC, todolistReducers} from "./todolist-reducers";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducers(startTodolistsState, action)

    const keys = Object.keys(endTasksState)

    expect(keys[0]).toBe(action.todolistId)
    expect(endTodolistsState[0].id).toBe(action.todolistId)
})

