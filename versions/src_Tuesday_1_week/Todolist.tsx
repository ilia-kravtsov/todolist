import React, {ChangeEvent, FC, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilteredTasksType} from "./App";

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilteredTasksType
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (title: FilteredTasksType, todolistId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist: FC<TodolistPropsType> = (props): JSX.Element => {

    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim(), props.todolistId)
        } else {
           setError(true)
        }
        setInputValue('')
    }
    const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputValue(event.currentTarget.value)
    }
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => event.charCode === 13 && addTask()
    const handlerCreator = (filter: FilteredTasksType): () => void => (): void => props.changeTodolistFilter(filter, props.todolistId)
    const AllClassName = props.filter === 'all' ? 'btn_active' : ''
    const ActiveClassName = props.filter === 'active' ? 'btn_active' : ''
    const CompletedClassName = props.filter === 'completed' ? 'btn_active' : ''
    const inputClass = error ? 'error' : ''
    const errorMessage = error && <div className={'error_message'}>Title is required</div>

    return (
        <div>
            <h3>{props.title}
            <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={inputValue}
                       onChange={onChaneInputHandler}
                       onKeyPress={onKeyPressInputHandler}
                       className={inputClass}/>
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <TasksList tasksData={props.tasks} removeTask={props.removeTask} changeTasksStatus={props.changeTasksStatus} todolistId={props.todolistId}/>
            <div>
                <button onClick={handlerCreator('all')} className={AllClassName}>All</button>
                <button onClick={handlerCreator('active')} className={ActiveClassName}>Active</button>
                <button onClick={handlerCreator('completed')} className={CompletedClassName}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;

/*

    // const onClickAllHandler = () => {props.changeFilter('all')}
    // const onClickActiveHandler = () => {props.changeFilter('active')}
    // const onClickCompletedHandler = () => {props.changeFilter('completed')}

     <button onClick={handlerCreator('all')}>All</button> - можно если
     handlerCreator - возвращает нам callback
      const handlerCreator = (filter: FilteredTasksType) => () => props.changeFilter(filter)


old version

    const Todolist: FC<TodolistPropsType> = (props): JSX.Element => {

        let [inputValue, setInputValue] = useState<string>('')

        const addTask = () => {
            props.addTask(inputValue)
        }

        const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.currentTarget.value)
        }

        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={inputValue} onChange={onChaneInputHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
               <TasksList tasksData={props.tasksData} removeTask={props.removeTask}/>
                <div>
                    <button onClick={() => {props.changeFilter('all')}}>All</button>
                    <button onClick={() => {props.changeFilter('active')}}>Active</button>
                    <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
                </div>
            </div>
        );
    };

    export default Todolist;


ref version

import React, {ChangeEvent, FC, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilteredTasksType} from "./App";

export type TodolistPropsType = {
    title: string
    tasksData: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (title: FilteredTasksType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist: FC<TodolistPropsType> = (props): JSX.Element => {

    const ref = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input ref={ref}/>
                <button onClick={() => {
                    if(ref.current) {
                    props.addTask(ref.current.value)
                    ref.current.value = ''
                }
                }}>+</button>
            </div>
            <TasksList tasksData={props.tasksData} removeTask={props.removeTask}/>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
*/




























/*
const Todolist: React.FC<TodolistPropsType> = (props) => {
the same with
const Todolist: FC<TodolistPropsType> = (props) => {   - need to import FC
the same with

___________________________________________________________________________

const Todolist = (props: TodolistPropsType) => {

const tasksItems = props.tasksData.length - проверяем длину массива на входе

const Todolist: FC<TodolistPropsType> = (props) => {

    const tasksItems = props.tasksData.length  // > 0 => ?
    ? props.tasksData.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={props.tasksData[0].isDone}/>
                    <span>{props.tasksData[0].title}</span>
                </li>
            )
        })
    : <span>Your taskslist is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
___________________________________________________________________________

const Todolist: FC<TodolistPropsType> = (props) => {

    const tasksItems = props.tasksData.length  // > 0 => ?
    ? props.tasksData.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
    : <span>Your taskslist is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
_______________________________________________________________________________________________________________________
const removeTask = (taskId: string) => {
        setTasksData(tasksData.filter(t => t.id !== taskId))
        console.log(tasksData)
    }
Асинхронный код

Обычно интерпретатор выполняет код в порядке написания
1,2,3,4,5 строка и если мы пишем 4 строку то мы полагаем что 3-я строка к этому времени уже исполнена
так работает синхронный код

Но в некоторых случаях интерпретатор js работает не синхронно или работает какой-то код который
внутри себя содержит асинхроннсть
например это может быть запрос на сервер
после отправки запроса мы должны убедиться что данные с сервера получены
и только если мы получили ответ от сервера то только в этом случае мы начинаем разбирать ответ от сервера
если данные не получены то мы пользователю показываем крутилочку и он ждет пока данные будут получены

Метод setTasks не обновляет стейт синхронно он передает новое значение в useState
в котором есть свои оптимизации которые приводят к тому что стейт не обновляется мгновенно
то есть
    setTasksData(tasksData.filter(t => t.id !== taskId)) на эту операцию уходит 5 или 10 милисекунд
То есть мы обновляем стейт но на самом деле в эту же секунду стейт не обновляется
и мы получаем в консоли предыдущий стейт который существовал еще до setTasksData(tasksData.filter(t => t.id !== taskId))
console.log(tasksData)

setTasksData(tasksData.filter(t => t.id !== taskId)) - работает асинхронно
console.log(tasksData) - работает синхронно

Если мы хотим обрабатывать асинхронные изменения стейта
Если нам нужно дождаться изменний этого стейта есть хук useEffect

useEffect(() => {}, )

который будет выполнять функцию при этом он будет следить за переменными tasks которые мы передадим в специальный массив
зависимостей

useEffect(() => {},[tasksdata])

useEffect следит за нашей переменной tasksData если эта переменная будет вызвана
если tasksData изменится выведи ее в консоль

    useEffect(() => {
        console.log(tasksData)
    }, [tasksData])

в результате страница перерисовывается и в консоли видим уменьшение количества тасок в массиве
в этом случае при запуске useEffect отрабатыват 2 раза потому что в index.tsx стоит <React.StrictMode>
если его убрать то отрисуется 1 раз
________________________________________________________________________________________________________________________
    const getFilteredTasksForRender = () => {

        switch(filter) {
            case 'active' :
                return tasksData.filter(task => !task.isDone)                        the same
            case 'completed' :
                return tasksData.filter(task => task.isDone)
            default:
                return tasksData
        }
    }
________________________________________________________________________________________________________________________
        const getFilteredTasksForRender = () => {
        let tasksForRender: Array<TaskType> = tasksData

        if(filter === 'active') {
            tasksForRender = tasksData.filter(task => !task.isDone)                   the same
        }
        if(filter === 'completed') {
            tasksForRender = tasksData.filter(task => task.isDone)
        }
        return tasksForRender
    }
________________________________________________________________________________________________________________________
        const getFilteredTasksForRender = () => {
        let filteredTasksForRender;
        switch(filter) {
            case 'active' :
                filteredTasksForRender = tasksData.filter(task => !task.isDone)
                break
            case 'completed' :
                filteredTasksForRender = tasksData.filter(task => task.isDone)          the same
                break
            default:
                filteredTasksForRender = tasksData
        }
        return filteredTasksForRender
    }
________________________________________________________________________________________________________________________
    Желательно чтобы функция возвращали 1 return
*/