import './App.css';
import {Todolist} from "./components/Todolist";
import {TaskType} from "./components/InputTodolist";
import {AddInputItemForm} from "./components/AddInputItemForm";
import {addTodolistAC, changeFilterAC, changeTitleTodolistAC, removeTodoListAC} from "./state/todolisrs-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {useCallback} from "react";

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

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListsType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todolistId, newTaskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }, [dispatch])

    const changeTitleTask = useCallback((todolistId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const changeTitleTodolist = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValueType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [dispatch])

    return (
        <div className="App">
            <AddInputItemForm callBack={addTodolist}/>
            <div className="todolist">
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

        </div>
    );
}

export default App;

