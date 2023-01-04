import React, {useState} from 'react';
import './App.css';
import {tasksDataUSType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [tasksDataUS, setTasksUS] = useState<Array<tasksDataUSType>>([
        {id: 1, title: 'push me', isDone: true },
        {id: 2, title: 'and then just touch me', isDone: true },
        {id: 3, title: 'till i can get my', isDone: false },
        {id: 4, title: 'satisfaction', isDone: false },
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasksData = tasksDataUS.filter(filteredTask => filteredTask.id !== id)
        setTasksUS(filteredTasksData)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }


    let tasksForTodolist = tasksDataUS;

    if (filter === 'completed') {
        tasksForTodolist = tasksDataUS.filter(task => task.isDone === true)
    }

    if (filter === 'active') {
        tasksForTodolist = tasksDataUS.filter(task => task.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title={'Benny Benassi'}
                tasksDataUS={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

