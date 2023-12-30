import React, {ChangeEvent, memo, useCallback} from 'react';
import {ChangeableTitle} from "./ChangeableTitle";
import {TaskType} from "./InputTodolist";
import {FilterValueType} from "../App";

type PropsType = {
    todolistId: string
    filter: FilterValueType
    taskTodolist: TaskType
    removeTask: (todolistId:string, id: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTitleTask: (todolistId: string, id:string, newTitle:string) => void
}
const Task = memo((props: PropsType) => {
    const onClickHandler = useCallback(()=> {
        props.removeTask(props.todolistId, props.taskTodolist.id)
    }, [props.todolistId, props.taskTodolist.id])
    const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        let newIsDonValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.taskTodolist.id, newIsDonValue)
    }, [props.todolistId, props.taskTodolist.id])
    const changeTitleTaskHandler = useCallback((newTitle:string) => {
        props.changeTitleTask(props.todolistId, props.taskTodolist.id, newTitle)
    }, [props.todolistId, props.taskTodolist.id])

    return (
        <li className={props.taskTodolist.isDone ? 'is-done' : '' + ' ' + 'input-button-block'}>
            <input type={'checkbox'}
                   checked={props.taskTodolist.isDone}
                   onChange={onChangeHandler}/>
            <ChangeableTitle title={props.taskTodolist.title}
                             onChange={changeTitleTaskHandler}/>
            <button onClick={onClickHandler}>✖️</button>
        </li>
    )
});

export default Task;