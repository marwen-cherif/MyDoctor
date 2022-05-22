import axios from 'axios';

const API_URL_LOGIN = `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/login`;
const API_URL_REGISTER = `${process.env.REACT_APP_BACK_END_BASE_URL}/auth/register`;

class AuthenticationService {
  login({ email, password }: { email: string; password: string }) {
    return axios
      .post(API_URL_LOGIN, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(email: string, password: string, phone: string) {
    return axios.post(API_URL_REGISTER, {
      email,
      password,
      phone,
    });
  }
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
  }

  isLoggedIn() {
    console.log(Boolean(this.getCurrentUser()));
    return Boolean(this.getCurrentUser());
  }
}

export default new AuthenticationService();
