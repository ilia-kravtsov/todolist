import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilteredTasksType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
    // BLL:
    const todolistTitle: string = 'What to learn'

    let [tasksData, setTasksData]= useState<Array<TaskType>>( [
        {id: v1(), title: 'HTML CSS', isDone: true},
        {id: v1(), title: 'ES6 TS', isDone: true},
        {id: v1(), title: 'REACT REDUX', isDone: false},
    ])

    const [filter,setFilter] = useState<FilteredTasksType>('all')

    const changeFilter = (filter: FilteredTasksType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        setTasksData(tasksData.filter(t => t.id !== taskId))
    }
    const getFilteredTasksForRender = () => {
        switch(filter) {
            case 'active' :
                return tasksData.filter(task => !task.isDone)
            case 'completed' :
                return tasksData.filter(task => task.isDone)
            default:
                return tasksData
        }
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasksData([newTask, ...tasksData])
    }
    const changeTasksStatus = (taskId: string, isDone: boolean) => {
        setTasksData(tasksData.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender();
    // UI:
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasksData={filteredTasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTasksStatus={changeTasksStatus}
                      filter={filter}
            />
        </div>
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