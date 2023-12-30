import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const ChangeableTitle = (props: PropsType) => {
    let [editMode, setEditMode] = useState<boolean>(true)
    let [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeEditHandler = () => {
        setEditMode(false)
        setNewTitle(props.title)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const rewriteTitleHandler = () => {
        if (newTitle.trim() !== '') {
            setEditMode(true)
            props.onChange(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (event.key === 'Enter') rewriteTitleHandler();
    }
    return (
        <div className={'title-block'}>
            {editMode
                ? <span onDoubleClick={changeEditHandler}>
                {props.title}
                </span>
                : <input value={newTitle}
                         onChange={changeTitleHandler}
                         type={"text"}
                         onBlur={rewriteTitleHandler}
                         onKeyDown={onKeyPressHandler}
                         autoFocus
                         className={error ? 'error' : '' + ' ' + 'change-input'}/>}
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
};
