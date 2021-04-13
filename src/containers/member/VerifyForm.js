import React, {useEffect, useState} from 'react';
import MemberForm from "../../components/member/MemberForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, verify} from "../../modules/member";
import {withRouter} from 'react-router-dom';
import toErrorMessage from "../../lib/error/toErrorMessage";

function VerifyForm({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {form, verificationLink, verified, errorResponse} = useSelector(({member}) => ({
    form: member.verify,
    verificationLink: member.links.verify,
    verified: member.verified,
    errorResponse: member.errorResponse
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
    <MemberForm
      type="verify"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default withRouter(VerifyForm);
