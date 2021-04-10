import React, {useEffect} from 'react';
import AuthForm from "../components/auth/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, verify} from "../modules/auth";
import {withRouter} from 'react-router-dom';

function VerifyForm({history}) {
  const dispatch = useDispatch();
  const {form, id, jwt, errorResponse} = useSelector(({auth}) => ({
    form: auth.verify,
    id: auth.id,
    jwt: auth.jwt,
    errorResponse: auth.errorResponse
  }));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'verify', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {id, token} = form;
    if (!id) {
      alert("인증할 수 없는 상황입니다.");
      return;
    }
    if (token.length !== 6) {
      alert("토큰을 다시 확인해주세요.");
      return;
    }
    dispatch(verify({id, token}));
  };

  useEffect(() => {
    initializeForm('verify');
    dispatch(changeField({form: 'verify', key: 'id', value: id}))
  }, [dispatch, id]);

  useEffect(() => {
    if (jwt) {
      history.push('/');
    }
  }, [jwt, history]);

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
