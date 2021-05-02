
const TODO_APP_SAVED_ITEMS = 'todo-app-saved-items'

const TODO_VIEW_ALL = 'todo_view_all'
const TODO_VIEW_ACTIVE = 'todo_view_active'
const TODO_VIEW_COMPLETED = 'todo_view_completed'


// { text: 'one', isCompleted: true }, { text: 'two', isCompleted: false }

let todoList = []

const fetchTodoFromStorage = () => {
  if (noTodoSaved()) return []
  // There is todo saved
  const localData = window.localStorage.getItem(TODO_APP_SAVED_ITEMS)
  return JSON.parse(localData)
}

const saveTodoToStorage = () => {
  window.localStorage.setItem(TODO_APP_SAVED_ITEMS, JSON.stringify(todoList))
}

const addTodo = (text, callback) => {
  if (findTodoIndex(text) !== -1) {
    return callback('This todo already exist! Wanna check it?', true)
  }
  const todo = { text, isCompleted: false }
  todoList = [todo, ...todoList]
  saveTodoToStorage()
  return callback(todo)
}

const toggleTodoCheck = (todo) => {
  const index = findTodoIndex(todo)
  if (index === -1) return
  todoList[index].isCompleted = !todoList[index].isCompleted
  saveTodoToStorage()
  return todoList[index]
}

const findTodoIndex = (todo) => {
  const text = typeof todo === 'string' ? todo : todo.text
  return todoList.findIndex((todo) => todo.text === text)
}

const clearCompleted = (callback) => {
  todoList = todoList.filter((todo) => !todo.isCompleted)
  saveTodoToStorage()
  if (callback) callback()
}

const noTodoSaved = () => !window.localStorage.getItem(TODO_APP_SAVED_ITEMS)
