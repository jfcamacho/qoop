import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/home'
import Login from "./components/login"
import User from './components/users';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/user" element={<User/>} />
      </Routes>
  );
}

export default App
