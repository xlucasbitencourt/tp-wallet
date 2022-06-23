import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    return (
      <>
        <Header />
        <Expenses />
      </>
    );
  }
}

// const mapDispatchToProps = {
//   currencies: fetchCurrencies,
// };

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
