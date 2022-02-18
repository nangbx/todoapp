import * as types from "../Constants/index"

export const addNewTask = (data) => ({
    type: types.ADD_NEW_TASK,
    data: data
})
export const removeTask = (id) => ({
    type: types.REMOVE_TASK,
    data: id
})
export const updateTask = (item, prev) => ({
    type: types.UPDATE_TASK,
    data: {
        item: item,
        prev: prev
    }
})
export const completeAllTask = () => ({
    type: types.COMPLETE_ALL_TASK
})
export const removeAllTask = () => ({
    type: types.REMOVE_ALL_TASK
})

export const getData = (todos, bulk) => ({
    type: types.GET_DATA,
    todos: todos,
    bulk: bulk
})