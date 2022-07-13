import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDelete } from '../actions';

class TableExpenses extends Component {
  delete = (expense, id) => {
    const { dispatch } = this.props;
    dispatch(updateDelete(expense, id));
  }

  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((item, index) => (
                <tr key={ index }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{parseFloat(item.value).toFixed(2)}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                  <td>
                    {(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      name="excluir"
                      onClick={ () => this.delete(expenses, item.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="expenses-list">
          <h2>Despesas</h2>
          {
            expenses.map((it, index) => (
              <div className="expense-mobile" key={ index }>
                <p>
                  Despesa
                  {' '}
                  { index + 1 }
                </p>
                <span className="title">Descrição: </span>
                <span>{it.description}</span>
                <br />
                <span className="title">Categoria: </span>
                <span>{it.tag}</span>
                <br />
                <span className="title">Método de pagamento: </span>
                <span>{it.method}</span>
                <br />
                <span className="title">Valor: </span>
                <span>{parseFloat(it.value).toFixed(2)}</span>
                <br />
                <span className="title">Moeda: </span>
                <span>{it.exchangeRates[it.currency].name}</span>
                <br />
                <span className="title">Câmbio utilizado: </span>
                <span>{parseFloat(it.exchangeRates[it.currency].ask).toFixed(2)}</span>
                <br />
                <span className="title">Valor convertido: </span>
                <span>{(it.value * it.exchangeRates[it.currency].ask).toFixed(2)}</span>
                <br />
                <span className="title">Moeda de conversão: </span>
                <span>Real</span>
                <br />
                <button
                  className="main-button"
                  type="button"
                  onClick={ () => this.delete(expenses, it.id) }
                >
                  Excluir
                </button>
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  newExpenses: state.wallet,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
