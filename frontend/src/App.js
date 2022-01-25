import './App.css';
import Sidenav from './Components/Sidenav';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import Register from './pages/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin]= useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!loggedIn && <Route 
            path="*"
            element={<Navigate to="/login" />}
          />}
          {loggedIn && <Route 
            path="/login"
            element={<Navigate to="/" />}
          />}
          <Route path="/*" element={<Dashboard isAdmin={isAdmin} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/login" exact element={<Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
