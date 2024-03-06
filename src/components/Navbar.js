import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'; 
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const {logout} = useLogout();
  const {user} = useAuthContext();

  
  const handleClick  = () => {
    logout();
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              {user && (
                <div>
                <span>{user.email}</span>
                <button className = "button"onClick={handleClick}>Log out</button>
              </div>
              )}
              {!user && (
                 <div>
                 <Link to="/login" className='button'>Login</Link>
                 <Link to="/signup" className='button'>Sign up</Link>
               </div>
              )}
             
            </nav>
        </div>
    </header>
  )
}

export default Navbar