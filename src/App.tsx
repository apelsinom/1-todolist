import './App.css';
import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {TasksType} from "./components/InputTodolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
function App() {

    const truck = 'What to learn';

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    function removeTask(id: string) {
        setTasks(tasks.filter( t => t.id !== id))
    }

    function addTask(newTaskTitle:string) {
        const newTask = {id: v1(), title: newTaskTitle, isDone: true}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks
    if(filter === 'active') {
        tasksForTodolist = tasks.filter( t => t.isDone === true)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter( t => t.isDone === false)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }
    
    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id===id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist truck={truck}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;
