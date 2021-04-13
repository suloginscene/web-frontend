import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, signup} from "../../modules/member";
import toErrorMessage from "../../lib/error/toErrorMessage";
import MemberForm from "../../components/member/MemberForm";
import {withRouter} from 'react-router-dom';
import isValidEmail from "../../lib/error/isValidEmail";

function SignupForm({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {form, signupLink, verificationLink, errorResponse} = useSelector(({member}) => ({
      form: member.signup,
      signupLink: member.links.signup,
      verificationLink: member.links.verify,
      errorResponse: member.errorResponse
    })
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'signup', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {username, password, passwordConfirm} = form;
    if ([username, password, passwordConfirm].includes('')) {
      setErrorMessage("빈 칸을 모두 입력해 주세요.");
      return;
    }
    if (!isValidEmail(username)) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호를 다시 확인해 주세요.");
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
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return (
    <MemberForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default withRouter(SignupForm);
