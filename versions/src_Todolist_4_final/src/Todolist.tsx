import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";



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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '' ) {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
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
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasksForTodolist.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }
                        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onCheckboxChangeHandler} checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler} className={'deleteButton'}>✖️
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={`${props.filter === 'all' ? 'active-filter' : ''} ${'buttonStyle'}`}
                        onClick={onAllClickHandler}>All</button>
                <button className={`${props.filter === 'active' ? 'active-filter' : ''} ${'buttonStyle'}`}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={`${props.filter === 'completed' ? 'active-filter' : ''} ${'buttonStyle'}`}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
