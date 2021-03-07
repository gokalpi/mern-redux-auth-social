import React from 'react';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { registerUserWithEmail } from '../redux/auth/auth.actions';
import registerSchema from '../validations/register.schema';

import AuthLayout from '../layouts/AuthLayout';
import '../assets/styles/styles.css';

const Register = ({ auth, history, registerUserWithEmail }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerUserWithEmail(values, history);
    },
  });

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <AuthLayout>
      <div className="auth-form-section">
        <h1>React Redux Auth</h1>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <h2>Register</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <label htmlFor="name">Name</label>
            {formik.touched.name && formik.errors.name ? (
              <p className="invalid-feedback">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              placeholder="Email address"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email ? (
              <p className="invalid-feedback">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <p className="invalid-feedback">{formik.errors.password}</p>
            ) : null}
          </div>
          {auth.error && <p className="error">{auth.error}</p>}
          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-primary" type="submit" disabled={auth.isLoading || !formik.isValid}>
              Register
            </button>
          </div>
          <div>
            Don't have an account?{' '}
            <Link className="bold" to="/register">
              Register
            </Link>
          </div>
        </form>

        <h3>Log in with social media</h3>
        <div className="mb-0 d-flex justify-content-center">
          <div className="d-grid gap-2 d-md-block">
            <a href="http://localhost:4000/auth/google" className="btn btn-google mr-4">
              <FontAwesomeIcon icon={faGoogle} />
            </a>

            <a href="http://localhost:4000/auth/facebook" className="btn btn-facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
