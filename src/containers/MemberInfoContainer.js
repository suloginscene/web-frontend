import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MemberInfo from "../components/auth/MemberInfo";
import {changeField, changePassword, initializeForm, myInfo, withdraw} from "../modules/auth";
import {withRouter} from "react-router-dom";

function MemberInfoContainer({history}) {
  const dispatch = useDispatch();
  const {jwt, myInfoLink, email, changePasswordLink, form, passwordChanged, withdrawLink, withdrew, errorResponse}
    = useSelector(({auth}) => ({
      jwt: auth.jwt,
      myInfoLink: auth.links.myInfo,
      email: auth.email,
      changePasswordLink: auth.links.changePassword,
      form: auth.changePassword,
      passwordChanged: auth.passwordChanged,
      withdrawLink: auth.links.withdraw,
      withdrew: auth.withdrew,
      errorResponse: auth.errorResponse
    })
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'changePassword', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {newPassword, newPasswordConfirm} = form;
    if (newPassword !== newPasswordConfirm) {
      alert("비밀번호를 다시 확인해 주세요.");
      return;
    }
    dispatch(changePassword(changePasswordLink, jwt, {newPassword}));
  };

  const onClickWithdraw = () => {
    alert("정말로 탈퇴하시겠습니까?");
    dispatch(withdraw(withdrawLink, jwt));
  };

  useEffect(() => {
    dispatch(initializeForm('changePassword'));
    if (jwt) {
      dispatch(myInfo(myInfoLink, jwt));
    }
  }, [dispatch, jwt, myInfoLink]);

  useEffect(() => {
    if (passwordChanged) {
      alert("비밀번호가 변경되었습니다.");
      history.push('/login');
    }
  }, [passwordChanged, history]);

  useEffect(() => {
    if (withdrew) {
      // TODO clear accountant
      history.push('/');
    }
  }, [withdrew, history]);

  useEffect(() => {
    if (errorResponse) {
      alert("실패");
    }
  }, [errorResponse]);

  return (
    <MemberInfo
      email={email}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onClickWithdraw={onClickWithdraw}
    />
  );
}

export default withRouter(MemberInfoContainer);
