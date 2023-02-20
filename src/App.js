import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthProvider from './context/AuthContext';
import useAuthentication from './hooks/useAuthentication'

import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Tasks from './pages/tasks/Tasks';
import Home from './pages/home/Home';
import { onAuthStateChanged } from 'firebase/auth';



function App() {

  const [user, setUser] = useState()

  const { auth } = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])


  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <Navigate to='/tasks' /> : <Home />} />
            <Route path='/login' element={user ? <Navigate to='/tasks' /> : <Login />} />
            <Route path='/register' element={user ? <Navigate to='/tasks' /> : <Register />} />
            <Route path='/tasks' element={user ? <Tasks /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
