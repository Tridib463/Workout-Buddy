import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';


const App = () => {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element = {user ? <Home/> : <Login/>}
          />
          <Route 
            path="/login"
            element ={!user ? <Login/> : <Home/>}
          />
          <Route 
            path="/signup"
            element={!user ? <Signup /> : <Home/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App