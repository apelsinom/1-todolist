import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {InputTodolist} from "./InputTodolist";
import {FilterValueType, TasksType} from "../App";

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
}
export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(props.todolistId, newTaskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') addTask();
    }
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

    return (
        <div>
            <h3 style={{display: 'inline'}}>{props.title}</h3>
            <button onClick={onClickRemoveTodoListHandler}>✖️</button>
            <div>
                <input type={'text'} value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <InputTodolist tasks={props.tasks}
                           removeTask={props.removeTask}
                           changeTaskStatus={props.changeTaskStatus}
                           filter={props.filter}
                           todolistId={props.todolistId}/>
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
