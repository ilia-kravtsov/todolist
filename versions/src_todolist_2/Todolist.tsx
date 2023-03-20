import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type FilteredTasksDataType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasksData: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilteredTasksDataType) => void
    addTask: (title: string) => void
    changeTasksStatus: (id: string, isDone: boolean) => void
    filter: FilteredTasksDataType
}
export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addNewTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addNewTask()
        }
    }
    const changeAllFilter = () => props.changeFilter('all')
    const changeActiveFilter = () => props.changeFilter('active')
    const changeCompletedFilter = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasksData.map(task => {
                    const removeTaskHandler = () => props.removeTask(task.id)

                    const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTasksStatus(task.id, newIsDoneValue)
                    }

                    return (
                        <li key={task.id} style={{margin: '10px'}} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onCheckBoxHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={changeAllFilter}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={changeActiveFilter}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={changeCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

