import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type tasksForTodolistType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasksForTodolist: Array<tasksForTodolistType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputTitle: string) => void
}

export function Todolist(props: TodolistType) {

    const [inputTitle, setInputTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(inputTitle)
            setInputTitle('')
        }
    }
    const addTask = () => {
        props.addTask(inputTitle)
        setInputTitle('')
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasksForTodolist.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" defaultChecked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler} className={'deleteButton'}>x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
