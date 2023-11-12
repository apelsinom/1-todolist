import './App.css';
import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {TaskType} from "./components/InputTodolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }
    function addTask(todolistId: string, newTaskTitle: string) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todolistId]]})
    }
    function changeFilter(todolistId: string, value: FilterValueType) {
        setTodoLists(todoLists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> el.id===id ? {...el, isDone: isDone} : el)})
    }
    function removeTodoList (todolistId: string) {
        setTodoLists(todoLists.filter(el=> el.id!==todolistId))
        delete tasks[todolistId]
    }
    return (
        <div className="App">
            {todoLists.map(
                el => {
                    return (
                        <Todolist key={el.id}
                                  todolistId={el.id}
                                  title={el.title}
                                  tasks={tasks}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={el.filter}
                                  removeTodoList={removeTodoList}/>
                    )
                }
            )}

        </div>
    );
}

export default App;
