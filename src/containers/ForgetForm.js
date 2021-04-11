import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, forget, initializeForm} from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";
import {withRouter} from "react-router-dom";
import {toErrorMessage} from "../lib/error";

function ForgetForm({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {form, forgetLink, found, errorResponse} = useSelector(({auth}) => ({
      form: auth.forget,
      forgetLink: auth.links.forget,
      found: auth.found,
      errorResponse: auth.errorResponse
    })
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'forget', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {username} = form;
    dispatch(forget(forgetLink, {username}));
  };

  useEffect(() => {
    dispatch(initializeForm('forget'));
  }, [dispatch]);

  useEffect(() => {
    if (found) {
      history.push('/login');
    }
  }, [found, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="forget"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default withRouter(ForgetForm);
