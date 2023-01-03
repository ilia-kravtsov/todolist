import React, {useState} from 'react';
import './App.css';
import {TaskDataType, Todolist} from "./Todolist";

function App() {

    let tasksData = [
        {id: 1, title: 'push me', isDone: true },
        {id: 2, title: 'and then just touch me', isDone: false },
        {id: 3, title: 'till i can get my ... satisfaction', isDone: true },
    ]

    let arrayUseState = useState(tasksData)

    let useStateTasksData = arrayUseState[0]
    let setTasks = arrayUseState[1]

    function removeTask(id: number) {
        let filteredTasks = useStateTasksData.filter(filteredTask => filteredTask.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'push me'}
                tasksDataApp={useStateTasksData}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;

