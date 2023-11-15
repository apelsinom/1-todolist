import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from "../App";
import ChangeableTitle from "./ChangeableTitle";

type InputPropsType = {
    tasks: TasksType
    todolistId: string
    filter: FilterValueType
    removeTask: (todolistId:string, id: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTitleTask: (todolistId: string, id:string, newTitle:string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const InputTodolist = (props: InputPropsType) => {
    let tasksForTodolist = props.tasks[props.todolistId]
    if (props.filter==='active') {
        tasksForTodolist = props.tasks[props.todolistId].filter(t=>t.isDone)
    }
    if (props.filter==='completed') {
        tasksForTodolist = props.tasks[props.todolistId].filter(t=>!t.isDone)
    }
    return (
        <ul>
            {tasksForTodolist.map(t => {
                const onClickHandler = ()=> {
                    props.removeTask(props.todolistId, t.id)
                }
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    let newIsDonValue = e.currentTarget.checked
                    props.changeTaskStatus(props.todolistId, t.id, newIsDonValue)
                }
                const changeTitleTaskHandler = (newTitle:string) => {
                    props.changeTitleTask(props.todolistId, t.id, newTitle)}

                return (
                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type={'checkbox'}
                               checked={t.isDone}
                               onChange={onChangeHandler}/>
                        <ChangeableTitle title={t.title}
                                         onChange={changeTitleTaskHandler}/>
                        <button onClick={onClickHandler}>✖️</button>
                    </li>
                )
            })}
        </ul>
    )
}
