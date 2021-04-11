import React, {useEffect} from 'react';
import AuthForm from "../components/auth/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, verify} from "../modules/auth";
import {withRouter} from 'react-router-dom';

function VerifyForm({history}) {
  const dispatch = useDispatch();
  const {form, verificationLink, verified, errorResponse} = useSelector(({auth}) => ({
    form: auth.verify,
    verificationLink: auth.verificationLink,
    verified: auth.verified,
    errorResponse: auth.errorResponse
  }));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'verify', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {token} = form;
    if (token.length !== 6) {
      alert("토큰을 다시 확인해주세요.");
      return;
    }
    dispatch(verify({verificationLink, token}));
  };

  useEffect(() => {
    dispatch(initializeForm('verify'));
  }, [dispatch]);

  useEffect(() => {
    if (verified) {
      history.push('/login');
    }
  }, [verified, history]);

  useEffect(() => {
    if (errorResponse) {
      alert(errorResponse.status + ' ' + errorResponse.data.error + ' ' + errorResponse.data.errorDescription);
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="verify"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(VerifyForm);
