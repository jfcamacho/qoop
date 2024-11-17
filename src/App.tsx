import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home'
import Login from "./pages/login"
import User from './pages/users';
import Projects from './pages/projects';
import Tasks from './pages/tasks';
import SuscriptionPage from './pages/suscription';

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
        <Route path="suscriptions" element={<SuscriptionPage />} />
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
