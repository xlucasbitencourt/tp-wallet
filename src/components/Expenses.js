import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Expenses extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value">
          <span>Valor</span>
          <input data-testid="value-input" />
        </label>
        <label htmlFor="description">
          <span>Descrição</span>
          <input data-testid="description-input" />
        </label>
        <label htmlFor="currencie">
          <span>Moeda</span>
          <select name="currencie" id="currencie">
            {
              currencies.map((currencie) => (
                <option
                  key={ currencie }
                  value={ currencie }
                >
                  {currencie}

                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="payment">
          <span>Pagamento</span>
          <select data-testid="method-input" name="payment" id="payment">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span>Categoria</span>
          <select data-testid="tag-input" name="tag" id="tag">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

// const mapDispatchToProps = {}

Expenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Expenses);
