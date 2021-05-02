import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MemberInfo from "../../components/member/MemberInfo";
import {changeField, changePassword, initializeForm, myInfo, withdraw} from "../../modules/member";
import {withRouter} from "react-router-dom";
import toErrorMessage from "../../lib/error/toErrorMessage";


function MemberInfoContainer({history}) {
  const dispatch = useDispatch();

  const {jwt, myInfoLink, email, changePasswordLink, form, passwordChanged, withdrawLink, withdrew, errorResponse}
    = useSelector(({member}) => ({
    jwt: member.jwt,
    myInfoLink: member.links.myInfo,
    email: member.email,
    changePasswordLink: member.links.changePassword,
    form: member.changePassword,
    passwordChanged: member.passwordChanged,
    withdrawLink: member.links.withdraw,
    withdrew: member.withdrew,
    errorResponse: member.errorResponse
  }));


  useEffect(() => {
    dispatch(myInfo(myInfoLink, jwt));
  }, [dispatch, myInfoLink, jwt]);


  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'changePassword', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {newPassword, newPasswordConfirm} = form;
    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      alert("비밀번호를 다시 확인해 주세요.");
      return;
    }
    dispatch(changePassword(changePasswordLink, jwt, {newPassword}));
  };

  useEffect(() => {
    if (passwordChanged) {
      history.push('/login');
    }
  }, [passwordChanged, history]);


  const onClickWithdraw = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      dispatch(withdraw(withdrawLink, jwt));
      // TODO clear accountant
    }
  };

  useEffect(() => {
    if (withdrew) {
      history.push('/');
    }
  }, [withdrew, history]);


  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  useEffect(() => {
    return () => {
      dispatch(initializeForm('changePassword'));
    }
  }, [dispatch]);


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
