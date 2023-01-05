import React, {useState} from "react";
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

    let [inputTitle, setInputTitle] = useState('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputTitle}
                       onChange={ (e) => {
                           setInputTitle(e.currentTarget.value)
                       }}
                       onKeyPress={(e) => {}}
                />
                <button onClick={ () => {
                    props.addTask(inputTitle)
                    setInputTitle('')
                } }>+</button>
            </div>
            <ul>
                {
                    props.tasksForTodolist.map((task) =>
                        <li key={task.id}>
                            <input type="checkbox" defaultChecked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {props.removeTask(task.id)}} className={'deleteButton'}>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={(e) => {props.changeFilter('all')}}>All</button>
                <button onClick={(e) => {props.changeFilter('active')}}>Active</button>
                <button onClick={(e) => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}
