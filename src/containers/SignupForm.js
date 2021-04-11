import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, signup} from "../modules/auth";
import React, {useEffect} from "react";
import AuthForm from "../components/auth/AuthForm";
import {withRouter} from 'react-router-dom';

function SignupForm({history}) {
  const dispatch = useDispatch();
  const {form, signupLink, verificationLink, errorResponse} = useSelector(({auth}) => ({
      form: auth.signup,
      signupLink: auth.links.signup,
      verificationLink: auth.links.verify,
      errorResponse: auth.errorResponse
    })
  );

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
    dispatch(signup(signupLink, {username, password}));
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  useEffect(() => {
    if (verificationLink) {
      history.push('/verify');
    }
  }, [verificationLink, history]);

  useEffect(() => {
    if (errorResponse) {
      // TODO errorResponse.status + ' ' + errorResponse.data.error + ' ' + errorResponse.data.errorDescription);
      alert("가입신청 실패");
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(SignupForm);
