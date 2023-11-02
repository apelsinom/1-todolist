import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {InputTodolist, TasksType} from "./InputTodolist";
import {FilterValueType} from "../App";

export type PropsType = {
    truck: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}


export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
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
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.truck}</h3>
            <div>
                <input type={'text'} value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <InputTodolist task={props.tasks}
                           removeTask={props.removeTask}
                           changeTaskStatus={props.changeTaskStatus}/>
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