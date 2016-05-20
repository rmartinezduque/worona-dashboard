import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import Hero from '../elements/Hero';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { createAccountRequested } from '../../actions';
import { createAccountStatus, createAccountError, isCreatingAccount, formFailed }
  from '../../selectors';
import { validate } from './validate';
import styles from './style.css';

const submit = (values, dispatch) => {
  dispatch(createAccountRequested(values.name, values.email, values.password));
};

const Register = ({ fields: { name, email, password }, handleSubmit, waiting, failed, statusMessage,
  errorMessage }) => (
  <div>
    <Hero title="Create an account" color="info"
      subtitle="Welcome to Worona. You are only one step away to start making apps."
    />

    <section className="hero-content">
      <div className="container is-text-centered">

        <form onSubmit={handleSubmit(submit)} className={styles.box}>
          <Input type="text" placeholder="My name is..." icon="user" {...name}
            help={cn(name.touched && name.error)}
            color={cn(name.touched && name.error && 'danger')}
          />
          <Input type="email" placeholder="Email" icon="envelope" {...email}
            help={cn(email.touched && email.error)}
            color={cn(email.touched && email.error && 'danger')}
          />
          <Input type="password" placeholder="Password" icon="lock" {...password}
            help={cn(password.touched && password.error)}
            color={cn(password.touched && password.error && 'danger')}
          />

          <Button animate={cn(failed && 'shake')} color="success" center
            size="medium" loading={waiting} disabled={waiting} className={styles.button}
          >
            Create my account
          </Button>

          <div className={cn('help', styles.status)}>
            {statusMessage}
          </div>

          <div className={cn('help', 'is-danger', styles.status)}>
            {errorMessage.reason}
          </div>
        </form>

        <div className={styles.link}>
          <Link to="/login">
            I already have an account
          </Link>
        </div>

      </div>
    </section>
  </div>
);

Register.propTypes = {
  fields: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  failed: React.PropTypes.bool,
  statusMessage: React.PropTypes.any,
  errorMessage: React.PropTypes.any,
};

const mapStateToProps = state => ({
  waiting: isCreatingAccount(state),
  statusMessage: createAccountStatus(state),
  errorMessage: createAccountError(state),
  failed: formFailed(state),
});

export default reduxForm({
  form: 'register',
  fields: ['name', 'email', 'password'],
  validate,
}, mapStateToProps)(Register);