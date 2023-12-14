import './App.css';
import {Todolist} from "./components/Todolist";
import {useReducer} from "react";
import {TaskType} from "./components/InputTodolist";
import {v1} from "uuid";
import {AddInputItemForm} from "./components/AddInputItemForm";
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolisrs-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodoListsType = {
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

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(todolistId, id))
    }
    function addTask(todolistId: string, newTaskTitle: string) {
        dispatchToTasks(addTaskAC(todolistId, newTaskTitle))
    }
    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(todolistId, id, isDone))
    }
    function changeTitleTask(todolistId: string, id: string, newTitle: string) {
        dispatchToTasks(changeTaskTitleAC(todolistId, id, newTitle))
    }
    function removeTodoList(todolistId: string) {
        const action = removeTodoListAC(todolistId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function addTodolist(newTitle: string) {
        const action = addTodolistAC(newTitle);
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function changeTitleTodolist(todolistId: string, newTitle: string) {
        dispatchToTodoLists(changeTitleTodolistAC(todolistId, newTitle))
    }
    function changeFilter(todolistId: string, value: FilterValueType) {
        dispatchToTodoLists(changeFilterAC(todolistId, value))
    }

    return (
        <div className="App">
            <AddInputItemForm callBack={addTodolist}/>
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
                                  removeTodoList={removeTodoList}
                                  changeTitleTodolist={changeTitleTodolist}
                                  changeTitleTask={changeTitleTask}
                        />
                    )
                }
            )}

        </div>
    );
}

export default App;

