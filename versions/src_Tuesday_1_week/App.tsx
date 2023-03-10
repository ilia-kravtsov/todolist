import React, {useEffect, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {FilterValuesType} from "../versions/src_Todolist_4_final/src/App";

export type FilteredTasksType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilteredTasksType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML CSS', isDone: true},
            {id: v1(), title: 'ES6 TS', isDone: true},
            {id: v1(), title: 'REACT REDUX', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'WHISKEY', isDone: true},
            {id: v1(), title: 'COLA', isDone: true},
            {id: v1(), title: 'ICE', isDone: false},
        ],
    })

    const changeTodolistFilter = (filter: FilteredTasksType, todolistId: string) => {
        const updatedTodolists = todolists.map((todolist) =>
            todolist.id === todolistId ? {...todolist, filter: filter} : todolist)
        setTodolists(updatedTodolists)
    }
    const removeTask = (taskId: string, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const tasksForUpdate = tasks[todolistId] // 3 tasks
        // const updatedTasks = [newTask, ...tasksForUpdate] // 4 tasks
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        const updatedTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeTasksStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        const updatedTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})}
    }
    const removeTodolist = (todolistId: string) => {
            const updatedTodolists = todolists.filter((todolist) => todolist.id !== todolistId)
            setTodolists(updatedTodolists)
    }

        const getFilteredTasksForRender = (
            (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
                switch (filter) {
                    case 'active' :
                        return tasks.filter(task => !task.isDone)
                    case 'completed' :
                        return tasks.filter(task => task.isDone)
                    default:
                        return tasks
                }
            })

        // UI:
        const todolistComponents = todolists.length
            ? todolists.map((todolist) => {
            const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[todolist.id], todolist.filter);
            return (
                <Todolist title={todolist.title}
                          todolistId={todolist.id}
                          tasks={filteredTasksForRender}
                          removeTask={removeTask}
                          changeTodolistFilter={changeTodolistFilter}
                          addTask={addTask}
                          changeTasksStatus={changeTasksStatus}
                          filter={todolist.filter}
                          removeTodolist={removeTodolist}
                />
            )
            })
            : <span>Create your first Todolist</span>

        return (
            <div className="App" >{todolistComponents}</div>
        );

}

export default App;

/*
Create
Read (pagination, filtration, sorting)
Update (edit, modification)
Delete

React.useState() - вызов useState как метода объекта React
всегда когда происходит обновление интерфейса вызывается useState

Области видимости js
Блочная
Функциональная
Глобальная
Модульная

Мы пишем структуру которая называется проект
проектом управляет webpack (сборщик проектов)

Браузер TS не понимает TS мы используем только в разработке

useEffect(() => {
        console.log(tasksData)
    }, filter)
*/