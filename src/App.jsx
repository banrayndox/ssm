
import Header from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ContextProvider, { AppContext } from './store/AppContext'
import Auth from './pages/Auth'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
const AppRoutes = () => {
  const { state } = useContext(AppContext);

 const { isLogged, loading } = state;

  if (loading) return <div className='flex justify-center items-center text-2xl text-gray-500'>...</div>; 
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
