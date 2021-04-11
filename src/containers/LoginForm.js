import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, login} from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";
import {withRouter} from 'react-router-dom';

function LoginForm({history}) {
  const dispatch = useDispatch();
  const {form, loginLink, jwt, errorResponse} = useSelector(({auth}) => ({
      form: auth.login,
      loginLink: auth.links.login,
      jwt: auth.jwt,
      errorResponse: auth.errorResponse
    })
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'login', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {username, password} = form;
    dispatch(login(loginLink, {username, password}));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (jwt) {
      history.push('/');
    }
  }, [jwt, history]);

  useEffect(() => {
    if (errorResponse) {
      alert("로그인 실패");
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(LoginForm);
