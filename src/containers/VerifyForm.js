import React, {useEffect, useState} from 'react';
import AuthForm from "../components/auth/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, verify} from "../modules/auth";
import {withRouter} from 'react-router-dom';
import {toErrorMessage} from "../lib/error";

function VerifyForm({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {form, verificationLink, verified, errorResponse} = useSelector(({auth}) => ({
    form: auth.verify,
    verificationLink: auth.links.verify,
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
      setErrorMessage("토큰을 다시 확인해주세요.");
      return;
    }
    dispatch(verify(verificationLink, {token}));
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
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return (
    <AuthForm
      type="verify"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default withRouter(VerifyForm);
