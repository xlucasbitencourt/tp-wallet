import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newExpense } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentacao',
};
class Expenses extends Component {
  state = INITIAL_STATE;

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  buttonAddExpense = () => {
    const { expenseId, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;

    if (!value) return;

    dispatch(newExpense({
      id: expenseId,
      value,
      description,
      currency,
      method,
      tag,
    }));

    this.setState(INITIAL_STATE);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="expenses">
        <label htmlFor="value">
          <span>Valor: </span>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <span>Descrição: </span>
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          <span>Moeda: </span>
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <span>Pagamento: </span>
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span>Categoria: </span>
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          className="main-button"
          type="button"
          onClick={ this.buttonAddExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseId: state.wallet.expenses.length,
});

Expenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Expenses);
