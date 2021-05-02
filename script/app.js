const themeToggle = document.querySelector('#theme-toggle')
const bgImgElem = document.querySelector('.bg--bx img')

const todoBox = document.querySelector('.todo-item--bx .todos')
const todoOvw = document.querySelector('.todo-ovw')
const todoMobileOvw = document.querySelector('.todo-mobile-ovw') || null

const addInput = document.querySelector('.todo-input--bx input')

const todoStateBox = document.querySelector('.todo-list-state')

let todoAppState = TODO_VIEW_ALL


function init() {
  initTheme()
  initTodo()
  initDrag()
}

/*
Set up for app theme system
 */
function initTheme() {
  // Callback for theme changes
  const alignImgWithTheme = (theme) => {
    const themeToggleImage = themeToggle.querySelector('img')
    if (theme === 'day') {
      bgImgElem.setAttribute('src', './images/bg-desktop-light.jpg')
      themeToggleImage.setAttribute('src', './images/icon-moon.svg')
    } else {
      bgImgElem.setAttribute('src', './images/bg-desktop-dark.jpg')
      themeToggleImage.setAttribute('src', './images/icon-sun.svg')
    }
  }
  initThemeState(alignImgWithTheme)
  themeToggle.addEventListener('click', () => {
    switchTheme(alignImgWithTheme)
  })
}

function initDrag () {
  dragSortableList('.todo--bx .todo-item--bx', '.todo-item--bx .todo-item')
}

/*
Set up for todo system
 */
function initTodo () {
  // Fetch todo from localStorage
  todoList = fetchTodoFromStorage()

  todoBox.innerHTML = ''
  renderTodo()

  updateTodoCount()

  // add new todo
  addInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTodo(e.target.value.trim(), (todo, error) => {
        if (error) console.log(todo)
        else {
          renderOneTodo(todo)
          addInput.value = ''
          updateTodoCount()
        }
      })
    }
  })

  // clear completed
  todoOvw.querySelector('.clear-completed').addEventListener('click', () => {
    clearCompleted(() => {
      updateTodoCount()
      todoBox.innerHTML = ''
      renderTodo()
    })
  })

  // add event to todo state action buttons
  todoStateBox.querySelectorAll('[data-action]').forEach((elem) => elem.addEventListener('click', (e) => {
    const action = `todo_view_${elem.getAttribute('data-action')}`
    if (todoAppState === action) {
      return // To avoid same work over and over again
    }
    todoAppState = action
    todoBox.innerHTML = ''
    renderTodo(todoAppState)

    todoStateBox.querySelectorAll('[data-action]').forEach((elem) => elem.classList.remove('active'))
    elem.classList.add('active')
  }))

  // todoStatebox for mobile view
  todoMobileOvw.querySelectorAll('[data-action]').forEach((elem) => elem.addEventListener('click', (e) => {
    const action = `todo_view_${elem.getAttribute('data-action')}`
    if (todoAppState === action) {
      return // To avoid same work over and over again
    }
    todoAppState = action
    todoBox.innerHTML = ''
    renderTodo(todoAppState)

    todoMobileOvw.querySelectorAll('[data-action]').forEach((elem) => elem.classList.remove('active'))
    elem.classList.add('active')
  }))
}

function renderTodo (filtered=TODO_VIEW_ALL) {
  todoList.forEach((todo) => {
    if (filtered === TODO_VIEW_ACTIVE && todo.isCompleted) return
    if (filtered === TODO_VIEW_COMPLETED && !todo.isCompleted) return

    const singleTodo = document.createElement('div')
    singleTodo.className = `todo-item ${todo.isCompleted ? 'completed' : ''}`
    singleTodo.innerHTML = `<span class="todo-chk"><span class="checkbx--bx"><input type="checkbox" ${todo.isCompleted ? 'checked' : ''} /><span class="checkbx"></span></span></span><span>${todo.text}</span>`
    addEventToTodo(todo, singleTodo)
    todoBox.append(singleTodo)
  })
}

function renderOneTodo (todo) {
  const singleTodo = document.createElement('div')
  singleTodo.className = `todo-item ${todo.isCompleted ? 'completed' : ''}`
  singleTodo.innerHTML = `<span class="todo-chk"><span class="checkbx--bx"><input type="checkbox" ${todo.isCompleted ? 'checked' : ''} /><span class="checkbx"></span></span></span><span>${todo.text}</span>`
  addEventToTodo(todo, singleTodo)
  todoBox.insertBefore(singleTodo, todoBox.firstChild)
}

function addEventToTodo(todo, todoElem) {
  todoElem.querySelector('.todo-chk input').addEventListener('change', (e) => {
    const newTodo = toggleTodoCheck(todo)
    if (newTodo.isCompleted) {
        todoElem.classList.add('completed')
    } else {
      todoElem.classList.remove('completed')
    }
  })
}

function updateTodoCount() {
  todoOvw.querySelector('.todo-count').textContent = `${todoList.length} item${todoList.length > 1 ? 's' : ''} left`
}


init()
