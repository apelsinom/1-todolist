import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    onChange: (newTitle:string) => void
}
const ChangeableTitle = (props: PropsType) => {
    let [editMode, setEditMode] = useState<boolean>(true)
    let [newTitle, setNewTitle] = useState('')

    const changeEditHandler = () => {
        setEditMode(false)
        setNewTitle(props.title)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const rewriteTitleHandler = () => {
        setEditMode(true)
        props.onChange(newTitle)

    }
    return (
        editMode
            ? <span onDoubleClick={changeEditHandler}>
                {props.title}
            </span>
            : <input value={newTitle}
                     onChange={changeTitleHandler}
                     type={"text"}
                     onBlur={rewriteTitleHandler}
                     autoFocus/>
    )
        ;
};

export default ChangeableTitle;