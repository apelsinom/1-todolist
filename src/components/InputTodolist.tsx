import React, {ChangeEvent} from 'react';

type InputPropsType = {
    task: TasksType[]
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const InputTodolist = (props: InputPropsType) => {
    return (
        <ul>
            {props.task.map(t => {

                const onClickHandler = ()=> {
                    props.removeTask(t.id)
                }
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    let newIsDonValue = e.currentTarget.checked
                    props.changeTaskStatus(t.id, newIsDonValue)
                }

                return (
                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>✖️</button>
                    </li>
                )
            })}
        </ul>
    )
}
