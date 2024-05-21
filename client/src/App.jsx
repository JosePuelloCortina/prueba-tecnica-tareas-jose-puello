import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from "./pages/LoginPage"
import TaskPage from './pages/TaskPage'
import useAuthStore from './store/auth.js';
import  ProtectedRoute  from './components/ProtectedRoute'
import RegisterPage from './pages/RegistrePage.jsx';
import NewTaskPage from './pages/NewTasPage.jsx';

function App() {
  const isAuth = useAuthStore(state => state.isAuth)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}  />
        <Route path='/register' element={<RegisterPage/>} />
        <Route element={<ProtectedRoute isAllowed={isAuth}/> } >
          <Route path='/task' element={<><TaskPage/></>}  /> 
          <Route path='/newtask/:id' element={<NewTaskPage/>}/>
        </Route>
      </Routes>    
    </BrowserRouter>
  )
}

export default App