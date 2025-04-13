import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);

    // checks if the token is expired
    // if so, return true
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return true;
    }

    // method to check if the token is expired due to inactivity

    // grabs current time from localStorage
    const lastAction = parseInt(localStorage.getItem('lastAction') || '0', 10);
    const currentTime = Math.floor(Date.now() / 1000);

    // sets expiration time to 5 minutes
    const expTime = 5 * 60;

    // grabs inactvity time from localStorage
    // and adds new inactivity time to it
    const updatedExpTime = parseInt(localStorage.getItem('expTime') || '0', 10);
    const updatedTime = (currentTime - lastAction) + updatedExpTime;
    
    // if the inactivity time is greater than the expiration time
    // return true, token is expired
    if (updatedExpTime > expTime) {
      return true;
    }

    // if inactivity time is less than expiration time
    // return false, and update both inactivity time and current time
    localStorage.setItem('expTime', updatedTime.toString());
    localStorage.setItem('lastAction', currentTime.toString());
    return false;
  }

  // method to redirect user to the login page if the token is expired
  redirectIfTokenExpired() {
    const token = this.getToken();
    // if token is not present or expired
    // remove the token from localStorage and redirect to login page
    if (!token || this.isTokenExpired(token)) {
      window.alert('Session expired. Please log in again.');
      localStorage.removeItem('id_token');
      window.location.assign('/login');
    }
  }

  // method to check if the user is active
  activityChecker () {
    // checks if user is active, and if so, update the current time in localStorage
    // and reset the inactivity time
    const checkActivity = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      localStorage.setItem('lastAction', currentTime.toString());
      localStorage.setItem('expTime', '0');
    };
    // event listeners to check if user is active
    window.addEventListener('mousemove', checkActivity);
    window.addEventListener('keydown', checkActivity);
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('id_token') || '';
    return token;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expTime', '0');
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
