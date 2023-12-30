import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";

// типизация "action creator"
type TodoListsReducerType = RemoveTodoListACType
    | AddTodolistACType
    | ChangeTitleTodolistACType
    | ChangeFilterACType

/*
export let todolistID1 = v1()
export let todolistID2 = v1()
*/

const initialState: TodoListsType[] = [
/*    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},*/
]
export const todoListsReducer = (state:TodoListsType[] = initialState, action:TodoListsReducerType):TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el=> el.id!==action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.todolistId, title: action.payload.newTitle, filter: 'all'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el=> el.id===action.payload.todolistId
                ? {...el, title: action.payload.newTitle}
                : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el=> el.id===action.payload.todolistId
                ? {...el, filter: action.payload.value}
                : el)
        }
        default: return state
    }
}
// "action creator" - это функция, которая возвращает объект action
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    }as const
}
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            newTitle
        }
    }as const
}
export type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todolistId: string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    }as const
}
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValueType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            value
    }
    }as const
}

