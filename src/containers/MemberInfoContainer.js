import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MemberInfo from "../components/auth/MemberInfo";
import {changeField, changePassword, initializeForm, myInfo} from "../modules/auth";

function MemberInfoContainer() {
  const dispatch = useDispatch();
  const {jwt, myInfoLink, email, changePasswordLink, form, passwordChanged, errorResponse} = useSelector(({auth}) => ({
      jwt: auth.jwt,
      myInfoLink: auth.links.myInfo,
      email: auth.email,
      changePasswordLink: auth.links.changePassword,
      form: auth.changePassword,
      passwordChanged: auth.passwordChanged,
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
    // TODO
    console.log("withdraw");
  };

  useEffect(() => {
    dispatch(initializeForm('changePassword'));
    dispatch(myInfo(myInfoLink, jwt));
  }, [dispatch, jwt, myInfoLink]);

  useEffect(() => {
    if (passwordChanged) {
      alert("비밀번호가 변경되었습니다.");
      dispatch(initializeForm('changePassword'))
    }
  }, [dispatch, passwordChanged]);

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

export default MemberInfoContainer;
