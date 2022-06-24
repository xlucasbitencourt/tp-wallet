// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSE, UPDATE_AMOUNT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: [...action.payload],
    };
  }
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case UPDATE_AMOUNT: {
    return {
      ...state,
      total: state.total + action.payload,
    };
  }
  default:
    return state;
  }
};

export default wallet;
