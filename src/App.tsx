import './App.css'
import Home from './components/home'
import Login from "./components/login"

function App() {
  return 10 > 5 ? <Login/> : <Home/>
}

export default App
