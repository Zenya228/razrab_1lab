import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import UserManagement from './pages/UserManagement'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])

  const userAccounts = [
    { id: 1, email: 'user1@example.com', password: 'password1', name: 'User One' },
    { id: 2, email: 'user2@example.com', password: 'password2', name: 'User Two' },
    { id: 3, email: 'admin@example.com', password: 'admin123', name: 'Administrator' }
  ]

  const handleLogin = (email, password) => {
    const user = userAccounts.find(acc => acc.email === email && acc.password === password)
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const addUser = (userData) => {
    const newUser = {
      Id: users.length > 0 ? Math.max(...users.map(u => u.Id)) + 1 : 1,
      ...userData
    }
    setUsers([...users, newUser])
  }

  const updateUser = (id, userData) => {
    setUsers(users.map(user => user.Id === id ? { ...user, ...userData } : user))
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.Id !== id))
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              currentUser ? 
              <Navigate to="/users" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/users" 
            element={
              currentUser ? 
              <UserManagement 
                users={users}
                currentUser={currentUser}
                onLogout={handleLogout}
                onAddUser={addUser}
                onUpdateUser={updateUser}
                onDeleteUser={deleteUser}
              /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
