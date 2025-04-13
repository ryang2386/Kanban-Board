import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import AuthService from './utils/auth';
import Navbar from './components/Navbar';

function App() {

  useEffect(() => {
    const token = AuthService.getToken();
    const interval = setInterval(() => {
      AuthService.activityChecker();
      const tokenExpired = AuthService.isTokenExpired(token);
      if (tokenExpired) {
        AuthService.redirectIfTokenExpired();
      }
    }, 1000 * 15);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;
