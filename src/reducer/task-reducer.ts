import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType} from "./todolist-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TaskStateType = {
    [todoId: string]: TaskType[]
}

type ActionType = addTaskActionType
    | removeTaskActionType
    | changeStatusTaskActionType
    | changeTitleTaskActionType
    | removeTodolistActionType
    | addTodolistActionType

export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD_TASKS':
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: true}
            return {
                ...state,
                [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]
            }
        case 'REMOVE_TASKS':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(el => el.id !== action.payload.taskId)
            }
        case 'CHANGE_STATUS_TASK':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: action.payload.newIsdone}
                        : el)
            }
        case 'CHANGE_TITLE_TASK':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(el =>
                    el.id === action.payload.taskId ? {...el, title: action.payload.newTitle}
                        : el)
            }
        case 'ADD_TODOLIST':
            return {
                [action.payload.todoId]:[],
                    ...state
            }
        case "REMOVE_TODOLIST":
            const stateCopy ={...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        default:
            return state
    }
}


export type addTaskActionType = ReturnType<typeof addTaskAC>
export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type changeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>
export type changeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>

export const addTaskAC = (todoId: string, newTitle: string) => {
    return {
        type: 'ADD_TASKS',
        payload: {todoId, newTitle}
    } as const
}
export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASKS',
        payload: {todoId, taskId}
    } as const
}
export const changeStatusTaskAC = (todoId: string, taskId: string, newIsdone: boolean) => {
    return {
        type: 'CHANGE_STATUS_TASK',
        payload: {todoId, taskId, newIsdone}
    } as const
}
export const changeTitleTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TITLE_TASK',
        payload: {todoId, taskId, newTitle}
    } as const
}
