import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  updateTotal = () => {
    const { expenses } = this.props;
    const totalAmount = expenses.reduce((acc, curr) => {
      acc += parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
    return parseFloat(totalAmount);
  }

  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          Total:
          {' '}
          { this.updateTotal().toFixed(2)}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
