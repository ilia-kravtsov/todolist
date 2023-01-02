import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let tasks_1 = [
        {id: 1, title: 'push me', isDone: true },
        {id: 2, title: 'and then just touch me', isDone: false },
        {id: 3, title: 'till i can get my ... satisfaction', isDone: true },
    ]

    let tasks_2: Array<TaskType> = [
        {id: 1, title: 'satisfaction', isDone: true },
        {id: 2, title: 'satisfaction', isDone: true },
        {id: 3, title: 'satisfaction', isDone: false },
    ]

    return (
        <div className="App">
            <Todolist title={'push me'} tasks={tasks_1}/>
            <Todolist title={'and then just touch me'} tasks={tasks_2}/>
        </div>
    );
}

export default App;

