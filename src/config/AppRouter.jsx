import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import LoginPage from '../pages/LoginPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/auth' >
        <Route path='login' element={<LoginPage />} />
        
      </Route>
    </Routes>
  )
}

export default AppRouter