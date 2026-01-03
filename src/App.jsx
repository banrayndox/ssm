
import Header from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ContextProvider, { AppContext } from './store/AppContext'
import Auth from './pages/Auth'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

const AppRoutes = () => {
  const { state } = useContext(AppContext);
 const { isLogged} = state

  return (
   <Routes>
   <Route path="/" element={isLogged===true ? 
    <Header /> : <Auth /> } />

  </Routes>
  
  )
}
const App = () => {

  return (

<ContextProvider>
<BrowserRouter>  
<AppRoutes />
</BrowserRouter>
</ContextProvider>

  )
}

export default App
