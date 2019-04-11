var todoData = [
  {
    id: 0,
    task: 'Sample Task',
    memo: 'Sample Memo',
    state: 0
  },
  {
    id: 1,
    task: 'タスクのタイトルです',
    memo: 'タスクのメモです',
    state: 1
  }
]
var getTodos = function (callback) {
  setTimeout(function () {
    callback(null, todoData)
  }, 300)
}
var postTodo = function (params, callback) {
  setTimeout(function () {
    params.id = todoData[todoData.length - 1].id + 1
    todoData.push(params)
    callback(null, params)
  }, 300)
}
export { todoData, getTodos, postTodo }
