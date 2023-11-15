import React from "react";
import {InputTodolist} from "./InputTodolist";
import {FilterValueType, TasksType} from "../App";
import {AddInputItemForm} from "./AddInputItemForm";
import ChangeableTitle from "./ChangeableTitle";

export type PropsType = {
    todolistId:string
    title: string
    tasks: TasksType
    removeTask: (todolistId:string, id: string) => void
    changeFilter: (todolistId:string, value: FilterValueType) => void
    addTask: (todolistId:string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
    changeTitleTodolist: (todolistId:string, newTitle:string) => void
    changeTitleTask: (todolistId:string, id: string, newTitle:string) => void
}
export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const onClickRemoveTodoListHandler = ()=> {
        props.removeTodoList(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const changeTitleTodolist = (newTitle:string) => {
        props.changeTitleTodolist(props.todolistId, newTitle)}
    return (
        <div>
            <h3>
                <ChangeableTitle title={props.title}
                                 onChange={changeTitleTodolist}/>
                <button onClick={onClickRemoveTodoListHandler}>✖️</button>
            </h3>
            <AddInputItemForm callBack={addTask}/>
            <InputTodolist tasks={props.tasks}
                           removeTask={props.removeTask}
                           changeTaskStatus={props.changeTaskStatus}
                           filter={props.filter}
                           todolistId={props.todolistId}
                           changeTitleTask={props.changeTitleTask}/>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

