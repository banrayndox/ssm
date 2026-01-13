
import Header from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ContextProvider, { AppContext } from './store/AppContext'
import Auth from './pages/Auth'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader'
import FirstPage from './components/FirstPage'
const AppRoutes = () => {
  const { state } = useContext(AppContext);

 const { isLogged, loading } = state;

  if (loading) return <FirstPage />
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
<Toaster />
<AppRoutes />
</BrowserRouter>
</ContextProvider>

  )
}

export default App
