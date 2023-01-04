import React from "react";
import {FilterValuesType} from "./App";


export type tasksDataUSType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasksDataUS: Array<tasksDataUSType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TodolistType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasksDataUS.map((task) =>
                        <li key={task.id}>
                            <input type="checkbox" defaultChecked={task.isDone}/>
                            <span>{task.title}</span>
                            <button className={'deleteButton'} onClick={() => {props.removeTask(task.id)}}>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}
