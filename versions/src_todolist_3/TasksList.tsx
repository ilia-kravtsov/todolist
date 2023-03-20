import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./Todolist";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type TasksListPropsType = {
    tasksData: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
}
const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasksData.length  // > 0 => ?
        ? props.tasksData.map((task) => {
            const changeTasksStatus = (event: ChangeEvent<HTMLInputElement>) =>
            {props.changeTasksStatus(task.id, event.currentTarget.checked)}
            const onClickButtonHandler = () => {props.removeTask(task.id)}
                const taskCSSClass = task.isDone ? 'done' : 'is'
            return (
                <li key={task.id} className={taskCSSClass}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTasksStatus}/>
                    <span>{task.title}</span>
                    <button onClick={onClickButtonHandler}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    return (
        <ul ref={listRef}>
            {tasksItems}
        </ul>
    );
};

export default TasksList;

/*
 const taskCSSClass = task.isDone ? 'is done' : 'is'

 or

const taskCSSClass = ['is']
task.isDone && taskCSSClass.push('done')
return (
<li key={task.id} className={taskCSSClass.join(' ')}>
*/