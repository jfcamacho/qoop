import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/home'
import Login from "./components/login"
import User from './components/users';
import Projects from './components/projects';
import Tasks from './components/tasks';

function App() {
  return (

    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Login />} />

      {/* Ruta para Dashboard con rutas hijas */}
      <Route path="/home/*" element={<Home />}>
        <Route path="users" element={<User />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
      // <Routes>
      //     <Route path="/" element={<Login />} />
      //     <Route 
      //       path="/home" 
      //       element={
      //       <></>} 
      //     />
      //     <Route path="/user" element={<User/>} />
      // </Routes>
  );
}

export default App
