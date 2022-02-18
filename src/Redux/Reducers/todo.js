import * as types from "../Constants/index"

const initialState = {
    todos: [],
    bulk: false
}

export default function todo(state = initialState, action){
    switch(action.type){
        case types.ADD_NEW_TASK: {
            var todos = state.todos;
            todos.push({
                ...action.data,
                state: false
            });
            todos.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
            return {
                ...state,
                todos: todos
            }
        }
        case types.REMOVE_TASK: {
            const todos = state.todos;
            const index = todos.indexOf(action.data);
            if(index > -1){
                todos.splice(index, 1);
            }
            return {
                ...state,
                todos: todos
            }
        }
        case types.UPDATE_TASK: {
            const todos = state.todos;
            const index = todos.indexOf(action.data.prev);
            if(index > -1){
                todos[index] = action.data.item;
            }
            todos.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
            var check = false;
            todos.map(item => {
                if(item.state){
                    check = true;
                }
            })
            return {
                ...state,
                todos: todos,
                bulk: check
            }
        }
        case types.COMPLETE_ALL_TASK: {
            const todos = state.todos;
            todos.map(item => {
                item.state = true;
            })
            return {
                ...state,
                todos: todos,
                bulk: true
            }
        }
        case types.REMOVE_ALL_TASK: {
            const todos = state.todos;
            todos.map(item => {
                item.state = false;
            });
            return {
                ...state,
                todos: todos,
                bulk: false
            }
        }
        case types.GET_DATA: {
            return {
                todos: action.todos,
                bulk: action.bulk
            }
        }
    }
    return state;
}