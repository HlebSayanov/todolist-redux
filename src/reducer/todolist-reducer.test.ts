import { v1 } from "uuid"
import {
    addTodolistAC, changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer,
    TodolistType
} from "./todolist-reducer";





let todoId1:string
let todoId2:string
let startState: TodolistType[]

beforeEach(()=>{
    todoId1=v1()
    todoId2=v1()
    startState = [
        {id:todoId1, title:'hello world', filter:'all'},
        {id:todoId2, title:'my home-work', filter:'all'}
    ]
})

test('should be removed todolist',()=>{


    const endState=todolistReducer(startState,removeTodolistAC(todoId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)
    expect(endState[0].title).toBe('my home-work')

})
test('should be add new todolist',()=>{

    const newTittle = 'WTF JS'

    const endState=todolistReducer(startState,addTodolistAC(newTittle))

    expect(endState.length).toBe(3)
    expect(endState[1].id).toBe(todoId1)
    expect(endState[0].title).toBe('WTF JS')

})
test('should be сhange title  todolist',()=>{

    const newTittle = 'this is America'

    const endState=todolistReducer(startState,changeTitleTodolistAC(todoId2,newTittle))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todoId1)
    expect(endState[0].title).toBe('hello world')
    expect(endState[1].title).toBe(newTittle)

})
test('should be сhange filter  todolist',()=>{



    const endState=todolistReducer(startState,changeFilterTodolistAC(todoId1,'completed'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')


})
