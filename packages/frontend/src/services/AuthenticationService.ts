import axiosApiInstance from '../helpers/axiosApiInstance';

const API_URL_LOGIN = `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/login`;
const API_URL_REGISTER = `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/register`;

class AuthenticationService {
  login({
    email,
    password,
    rememberMe,
  }: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    return axiosApiInstance
      .post(API_URL_LOGIN, {
        email,
        password,
      })
      .then((response) => {
        if (rememberMe && response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          sessionStorage.removeItem('user');
        } else if (!rememberMe && response.data.access_token) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
          localStorage.removeItem('user');
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }

  register(email: string, password: string, phone: string) {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    return axiosApiInstance.post(API_URL_REGISTER, {
      email,
      password,
      phone,
    });
  }

  getCurrentUser() {
    const userFromLocalStorage = localStorage.getItem('user');
    const userFromSessionStorage = sessionStorage.getItem('user');
    const user = userFromLocalStorage || userFromSessionStorage;

    return user ? JSON.parse(user) : undefined;
  }

  isLoggedIn() {
    return Boolean(this.getCurrentUser());
  }
}

export default new AuthenticationService();
