import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, forget, initializeForm} from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";
import {withRouter} from "react-router-dom";

function ForgetForm({history}) {
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
      alert("실패");
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="forget"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(ForgetForm);
