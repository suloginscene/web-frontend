import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, login} from "../../modules/member";
import MemberForm from "../../components/member/MemberForm";
import {withRouter} from 'react-router-dom';
import toErrorMessage from "../../lib/error/toErrorMessage";

function LoginForm({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {form, loginLink, jwt, refreshToken, errorResponse} = useSelector(({member}) => ({
      form: member.login,
      loginLink: member.links.login,
      jwt: member.jwt,
      refreshToken: member.refreshToken,
      errorResponse: member.errorResponse
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
    if (jwt && refreshToken) {
      history.push('/');
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [jwt, refreshToken, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return (
    <MemberForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default withRouter(LoginForm);
