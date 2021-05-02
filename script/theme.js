
const TODO_APP_PREF_THEME = 'todo-app-pref-theme'
let theme = window.localStorage.getItem(TODO_APP_PREF_THEME) || 'day'

const loadPrefTheme = () => {
  theme = window.localStorage.getItem(TODO_APP_PREF_THEME) || 'day'
  return theme
}

const initThemeState = (callback) => {
  loadPrefTheme()
  if (theme === 'day') changeToLightTheme()
  else changeToDarkTheme()
  if (callback) callback(theme)
}

const changeToLightTheme = () => {
  document.documentElement.style.setProperty('--page-bg', 'white')
  document.documentElement.style.setProperty('--content-bg', 'white')
  document.documentElement.style.setProperty('--text-color', 'var(--very-dark-grayish-blue)')
  document.documentElement.style.setProperty('--text-color-contrast', 'var(--dark-grayish-blue)')
  document.documentElement.style.setProperty('--line-color', 'var(--light-grayish-blue)')
  document.documentElement.style.setProperty('--shadow-bg', '0px 0px 10rem hsla(236, 9%, 61%, .25)')
}

const changeToDarkTheme = () => {
  document.documentElement.style.setProperty('--page-bg', 'var(--very-dark-blue)')
  document.documentElement.style.setProperty('--content-bg', 'var(--very-dark-desaturted-blue)')
  document.documentElement.style.setProperty('--text-color', 'var(--light-grayish-blue)')
  document.documentElement.style.setProperty('--text-color-contrast', 'var(--very-dark-grayish-blue)')
  document.documentElement.style.setProperty('--line-color', 'var(--very-dark-grayish-blue-alt)')
  document.documentElement.style.setProperty('--shadow-bg', '0px 0px 10rem rgba(0, 0, 0, 0.5)')
}

const switchTheme = (callback) => {
  theme = theme === 'day' ? 'night' : 'day'
  if (theme === 'day') changeToLightTheme()
  else changeToDarkTheme()
  window.localStorage.setItem(TODO_APP_PREF_THEME, theme)
  if (callback) callback(theme)
}
