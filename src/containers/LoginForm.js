import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm} from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";

function LoginForm() {
  const dispatch = useDispatch();
  const {form} = useSelector(({auth}) => ({form: auth.login}));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'login', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log("should impl");
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default LoginForm;
