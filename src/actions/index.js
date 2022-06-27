// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const getCurrencies = (currenciesData) => ({
  type: GET_CURRENCIES,
  payload: currenciesData,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});

export const updateDelete = (expenses, id) => (dispatch) => {
  const newExpenses = expenses.filter((expense) => expense.id !== id);
  dispatch(deleteExpense(newExpenses));
  return newExpenses;
};

const updateAmount = (expense) => {
  const currencies = Object.values(expense.exchangeRates);
  const curr = currencies.filter((currency) => (
    currency.code === expense.currency && currency.codein === 'BRL'
  ));
  const entry = curr[0].ask * expense.value;
  return ({
    type: UPDATE_AMOUNT,
    payload: entry,
  });
};

export const newExpense = (expense) => async (dispatch) => {
  const fetchCurr = await fetch(URL);
  const response = await fetchCurr.json();

  dispatch(addExpense({
    ...expense,
    exchangeRates: response,
  }));

  dispatch(updateAmount({
    ...expense,
    exchangeRates: response,
  }));
};

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(URL);
  const responseJson = await response.json();

  const currenciesList = Object.keys(responseJson)
    .filter((currency) => currency !== 'USDT');

  dispatch(getCurrencies(currenciesList));
};
