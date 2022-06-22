// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});
