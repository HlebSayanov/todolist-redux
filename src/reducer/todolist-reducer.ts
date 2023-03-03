import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export  type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTitleTodolistActionType
    | changeFilterTodolistActionType

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.payload.todoId)
        case 'ADD_TODOLIST':
            const newTodo: TodolistType =
                {
                    id: action.payload.todoId,
                    title: action.payload.newTitle,
                    filter: 'all'
                }
            return [newTodo, ...state]
        case 'CHANGE_TITLE_TODOLIST':
            return state.map(el => el.id === action.payload.todoId
                ? {...el, title: action.payload.newTitle}
                : el)
        case 'CHANGE_FILTER_TODOLIST':
            return state.map(el => el.id === action.payload.todoId
                ? {...el, filter: action.payload.newFilter}
                : el)
        default:
            return state
    }
}


export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type changeTitleTodolistActionType = ReturnType<typeof changeTitleTodolistAC>
export type changeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>

export const removeTodolistAC = (todoId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todoId}
    } as const
}
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {newTitle, todoId: v1()}
    } as const
}
export const changeTitleTodolistAC = (todoId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TITLE_TODOLIST',
        payload: {todoId, newTitle}
    } as const
}
export const changeFilterTodolistAC = (todoId: string, newFilter: FilterValueType) => {
    return {
        type: 'CHANGE_FILTER_TODOLIST',
        payload: {todoId, newFilter}
    } as const
}
