import React, {memo, useCallback} from "react";
import {InputTodolist} from "./InputTodolist";
import {FilterValueType, TasksType} from "../App";
import {AddInputItemForm} from "./AddInputItemForm";
import {ChangeableTitle} from "./ChangeableTitle";
import {ButtonForFilter} from "./ButtonForFilter";

export type PropsType = {
    todolistId: string
    title: string
    tasks: TasksType
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
    removeTask: (todolistId: string, id: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTitleTask: (todolistId: string, id: string, newTitle: string) => void
}
export const Todolist = memo((props: PropsType) => {
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'all')
    }, [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'active')
    }, [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'completed')
    }, [props.changeFilter, props.todolistId])
    const onClickRemoveTodoListHandler = useCallback(() => {
        props.removeTodoList(props.todolistId)
    }, [props.removeTodoList, props.todolistId])
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const changeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(props.todolistId, newTitle)
    }, [props.changeTitleTodolist, props.todolistId])
    return (
        <div>
            <h3 className={'input-button-block'}>
                <ChangeableTitle title={props.title}
                                 onChange={changeTitleTodolist}/>
                <button onClick={onClickRemoveTodoListHandler}>✖️</button>
            </h3>
            <AddInputItemForm callBack={addTask}/>
            <InputTodolist tasks={props.tasks}
                           filter={props.filter}
                           todolistId={props.todolistId}
                           removeTask={props.removeTask}
                           changeTaskStatus={props.changeTaskStatus}
                           changeTitleTask={props.changeTitleTask}/>
            <div>
                <ButtonForFilter classForFilter={'all'}
                                 onClick={onAllClickHandler}
                                 filter={props.filter}>
                    All
                </ButtonForFilter>
                <ButtonForFilter classForFilter={'active'}
                                 onClick={onActiveClickHandler}
                                 filter={props.filter}>
                    Active
                </ButtonForFilter>
                <ButtonForFilter classForFilter={'completed'}
                                 onClick={onCompletedClickHandler}
                                 filter={props.filter}>
                    Completed
                </ButtonForFilter>
            </div>
        </div>
    )
})

