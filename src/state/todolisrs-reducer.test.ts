import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolisrs-reducer";

let todolistID1 = v1()
let todolistID2 = v1()

let startState:TodoListsType[];
beforeEach(()=> {
    todolistID1 = v1();
    todolistID2 = v1();
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})
test('correct todoLists should be removed', () => {
    // старый синтаксис
    // const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistID1})
    // синтаксис через с помощью функций, называемых "action creator" - это функция, которая возвращает объект action.
    const endState = todoListsReducer(startState, removeTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});
test('correct todoLists should be added', () => {
    const newTodolistTitle = 'New Todolist'
    // старый синтаксис
    // const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
    // синтаксис через с помощью функций, называемых "action creator" - это функция, которая возвращает объект action.
    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todoLists should change its name', () => {
    const newTodolistTitle = 'New Todolist'
    // старый синтаксис
    // const endState = todoListsReducer(startState, action);
    // синтаксис через с помощью функций, называемых "action creator" - это функция, которая возвращает объект action.
    const endState = todoListsReducer(startState, changeTitleTodolistAC(todolistID2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todoLists should be changed', () => {
    const newFilter: FilterValueType = 'completed';
    // старый синтаксис
    // const endState = todoListsReducer(startState, action);
    // синтаксис через с помощью функций, называемых "action creator" - это функция, которая возвращает объект action.
    const endState = todoListsReducer(startState, changeFilterAC(todolistID2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
