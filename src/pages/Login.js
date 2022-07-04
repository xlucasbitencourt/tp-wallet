import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  }

  enableButton = () => {
    const MIN_LENGHT = 6;
    const EMAIL_VALIDO = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/img;
    const { email, password } = this.state;
    if (password.length >= MIN_LENGHT && EMAIL_VALIDO.test(email)) {
      this.setState({ buttonDisabled: false });
    } else this.setState({ buttonDisabled: true });
  }

  clickLogin = () => {
    const { history, userLogin } = this.props;
    const { email, password } = this.state;
    userLogin({ email, password });
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <div className="login">
        <h1>Wallet</h1>
        <form className="form-login">
          <h2>Login</h2>
          <label className="label-login" htmlFor="email">
            <span>E-mail: </span>
            <input
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
              type="email"
              required
              placeholder="Digite seu e-mail..."
            />
          </label>
          <label className="label-login" htmlFor="password">
            <span>Senha: </span>
            <input
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              type="password"
              required
              min="6"
              placeholder="Digite sua senha..."
            />
          </label>
          <br />
          <button
            onClick={ this.clickLogin }
            type="button"
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin: login,
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
