import React, {memo, ReactNode, useCallback} from 'react';
import {FilterValueType} from "../App";

type PropsType = {
    filter: FilterValueType
    classForFilter: FilterValueType
    onClick: () => void
    children: ReactNode
}
export const ButtonForFilter = memo((props: PropsType) => {
    const onClickFilterHandler = useCallback(() => {
        props.onClick();
    }, [props.onClick])
    const classForButton = props.classForFilter === props.filter ? 'active-filter' : '';
    return (
        <button onClick={onClickFilterHandler}
                className={classForButton}>
            {props.children}
        </button>
    );
});
