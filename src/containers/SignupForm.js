import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm} from "../modules/auth";
import React, {useEffect} from "react";
import AuthForm from "../components/auth/AuthForm";

function SignupForm() {
  const dispatch = useDispatch();
  const {form} = useSelector(({auth}) => ({form: auth.signup}));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'signup', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log("should impl");
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default SignupForm;
