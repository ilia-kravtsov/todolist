import React, {useState} from 'react';
import './App.css';
import {tasksForTodolistType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [tasksUS, setTasksUS] = useState<Array<tasksForTodolistType>>([
        {id: v1(), title: 'push me', isDone: true },
        {id: v1(), title: 'and then just touch me', isDone: true },
        {id: v1(), title: 'till i can get my', isDone: false },
        {id: v1(), title: 'satisfaction', isDone: false },
    ])

    console.log(tasksUS)

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        let filteredTasksDataUS = tasksUS.filter(filteredTask => filteredTask.id !== id)
        setTasksUS(filteredTasksDataUS)
    }

    function addTask(inputTitle: string) {
        let newTask = {id: v1(), title: inputTitle, isDone: false}
        let newTasks = [newTask, ...tasksUS]
        setTasksUS(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasksUS;

    if (filter === 'completed') {
        tasksForTodolist = tasksUS.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasksUS.filter(task => !task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'Benny Benassi'}
                tasksForTodolist={tasksForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

