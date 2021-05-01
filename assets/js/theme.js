// @ts-check

// Constants
const LS_KEY = 'RTUI-darkMode'
const DARK_CLASS_NAME = 'dark'

// Get access to DOM classlist
const docClassList = document.documentElement.classList

// Check if darkTheme in local storage
let isDarkTheme = !!localStorage.getItem(LS_KEY)
setTheme()

// Create a Button
const themeFAB = document.createElement('button')

themeFAB.id = 'themeFAB'
themeFAB.title = 'Toggle dark mode'
themeFAB.onclick = () => {
  isDarkTheme = !isDarkTheme
  setTheme()
}
themeFAB.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 486.883 486.883" style="enable-background:new 0 0 486.883 486.883;" xml:space="preserve">
<path d="M243.451,0C109.226,0,0.001,109.191,0.001,243.417c0,134.244,109.226,243.466,243.45,243.466
s243.431-109.222,243.431-243.466C486.882,109.191,377.676,0,243.451,0z M243.451,437.958c-0.237,0-0.479-0.033-0.716-0.033V48.96
c0.237,0,0.479-0.035,0.716-0.035c107.247,0,194.506,87.246,194.506,194.492C437.957,350.682,350.698,437.958,243.451,437.958z" fill="currentColor" />
</svg>
`

// Append button to body
document.body.appendChild(themeFAB)

/** function to set theme settings */
function setTheme() {
  if (isDarkTheme) {
    localStorage.setItem(LS_KEY, 'true')
    docClassList.add(DARK_CLASS_NAME)
  } else {
    localStorage.removeItem(LS_KEY)
    docClassList.remove(DARK_CLASS_NAME)
  }
}
