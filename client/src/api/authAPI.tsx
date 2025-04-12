import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
  }

    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error logging in:', error);
    return Promise.reject('User information is not found.');
  }
}



export { login };
