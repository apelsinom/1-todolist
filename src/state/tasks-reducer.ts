import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodoListACType} from "./todolisrs-reducer";

type TasksReducerType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodoListACType
export const tasksReducer = (state: TasksType, action: TasksReducerType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    [
                        {id: v1(), title: action.payload.newTaskTitle, isDone: false},
                        ...state[action.payload.todolistId]
                    ]
            }
        }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.id
                        ? {...el, isDone: action.payload.isDone}
                        : el)
            }
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.id
                        ? {...el, title: action.payload.newTitle}
                        : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const {[action.payload.todolistId]: [], ...rest} = state
            return rest
        }

        default:
            return state
    }
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}
export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTaskTitle
        }
    } as const
}
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {
            todolistId,
            id,
            isDone
        }
    } as const
}
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            todolistId,
            id,
            newTitle
        }
    } as const
}