// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const getCurrencies = (currenciesData) => ({
  type: GET_CURRENCIES,
  payload: currenciesData,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(URL);
  const responseJson = await response.json();

  const currenciesList = Object.keys(responseJson)
    .filter((currencie) => currencie !== 'USDT');

  dispatch(getCurrencies(currenciesList));
};
