import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    taskReducer,
    TaskStateType
} from "./task-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

let todoId1:string
let todoId2:string
let startState:TaskStateType

beforeEach(()=>{
    todoId1 = v1()
    todoId2 = v1()

    startState = {
        [todoId1]:[
            {id:'1', title:'HTML&CSS', isDone:true},
            {id:'2', title:'React', isDone:false},
            {id:'3', title:'JS', isDone:false},
        ],
        [todoId2]:[
            {id:'1', title:'Heros', isDone:true},
            {id:'2', title:'XZ', isDone:false},
            {id:'3', title:'SHIT', isDone:true},
        ],
    }
})






test('should be able to add the task',()=>{

    const newTitle = 'Milk'

    const endState = taskReducer(startState, addTaskAC(todoId1,newTitle) )

    expect(endState[todoId1][0].title).toBe(newTitle)
    expect(endState[todoId1][2].title).toBe('React')
    expect(endState[todoId1].length).toBe(4)
    expect(endState[todoId2].length).toBe(3)

})
test('should be able to remove the task',()=>{



    const endState = taskReducer(startState, removeTaskAC(todoId2,'1') )

    expect(endState[todoId2][0].title).toBe('XZ')
    expect(endState[todoId1][0].title).toBe('HTML&CSS')
    expect(endState[todoId2].length).toBe(2)
    expect(endState[todoId1].length).toBe(3)


})
test('should be able to change status the task',()=>{


    const endState = taskReducer(startState, changeStatusTaskAC(todoId1,'2',true) )

    expect(endState[todoId1][1].isDone).toBe(true)
    expect(endState[todoId2][1].isDone).toBe(false)
    expect(endState[todoId1][2].isDone).toBe(false)

})
test('should be able to change title the task',()=>{

    const newTitle = 'Angular'
    const endState = taskReducer(startState, changeTitleTaskAC(todoId1,'2',newTitle) )

    expect(endState[todoId1][1].title).toBe(newTitle)
    expect(endState[todoId2][1].title).toBe('XZ')
    expect(endState[todoId1].length).toBe(3)


})
test('new array should be added when new todolist is added', () => {



    const action = addTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todoId1)

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoId1]).not.toBeDefined()
})
