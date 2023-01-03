import React from "react";
import TodolistStyle from './Todolist.module.css'

export type TaskDataType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasksDataApp: Array<TaskDataType>
    removeTask: Function
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
                    props.tasksDataApp.map((tasksDataAppItem) =>
                        <li>
                            <input type="checkbox" defaultChecked={tasksDataAppItem.isDone}/>
                            <span>{tasksDataAppItem.title}</span>
                            <button className={'deleteButton'} onClick={() => { props.removeTask(tasksDataAppItem.id) }}>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
