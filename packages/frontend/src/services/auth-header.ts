export default function authHeader() {
  const userFromLocalStorage = localStorage.getItem('user');
  const user = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : undefined;

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return undefined;
  }
}
