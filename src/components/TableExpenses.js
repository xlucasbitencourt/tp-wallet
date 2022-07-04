import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDelete } from '../actions';

class TableExpenses extends Component {
  delete = (expense, id) => {
    const { delExp } = this.props;
    delExp(expense, id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((item) => (
                <tr key={ item.id }>
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
            expenses.map((it) => (
              <div className="expense-mobile" key={ it.id }>
                <span className="title">Descrição: </span>
                <span>{it.description}</span>
                <br />
                <span className="title">Tag: </span>
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

const mapDispatchToProps = (dispatch) => ({
  delExp: (expenses, id) => { dispatch(updateDelete(expenses, id)); },
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
