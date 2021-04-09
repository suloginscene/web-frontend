import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, signup} from "../modules/auth";
import React, {useEffect} from "react";
import AuthForm from "../components/auth/AuthForm";

function SignupForm() {
  const dispatch = useDispatch();
  const {form, response, errorResponse} = useSelector(({auth}) => ({
    form: auth.signup,
    response: auth.response,
    errorResponse: auth.errorResponse
  }));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'signup', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {username, password, passwordConfirm} = form;
    if (password !== passwordConfirm) {
      alert("비밀번호를 다시 확인해 주세요.");
      return;
    }
    dispatch(signup({username, password}));
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  useEffect(() => {
    if (response) {
      alert(response.data.id + ' ' + response.data._links.verify.href);
    } else if (errorResponse) {
      alert(errorResponse.status + ' ' + errorResponse.data.error + ' ' + errorResponse.data.errorDescription);
    }
  }, [response, errorResponse]);

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
