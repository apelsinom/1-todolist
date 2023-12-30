import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type PropsType = {
    callBack:(newTitle: string) => void
}
export const AddInputItemForm = memo((props: PropsType) => {

    const [newTitle, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (event.key === 'Enter') addTask();
    }
    return (
        <div className={'title-block'}>
            <input type={'text'} value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
});