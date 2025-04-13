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

    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return true;
    }

    const lastAction = parseInt(localStorage.getItem('lastAction') || '0', 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = 5 * 60;
    const updatedExpTime = parseInt(localStorage.getItem('expTime') || '0', 10);
    const updatedTime = (currentTime - lastAction) + updatedExpTime;
    console.log('updatedTime', updatedExpTime);
    
    if (updatedExpTime > expTime) {
      return true;
    }

    localStorage.setItem('expTime', updatedTime.toString());
    localStorage.setItem('lastAction', currentTime.toString());
    return false;
    // console.log('currentTime', expTime);
    // console.log('decoded.exp', decoded.exp);
    // return decoded.exp ? decoded.exp < expTime : false;
  }

  redirectIfTokenExpired() {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      localStorage.removeItem('id_token');
      window.location.assign('/login');
    }
  }

  activityChecker () {
    const checkActivity = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      localStorage.setItem('lastAction', currentTime.toString());
      localStorage.setItem('expTime', '0');
    };

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
