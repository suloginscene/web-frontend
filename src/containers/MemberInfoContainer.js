import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MemberInfo from "../components/auth/MemberInfo";
import {changeField, initializeForm, myInfo} from "../modules/auth";

function MemberInfoContainer() {
  const dispatch = useDispatch();
  const {jwt, myInfoLink, email, form, errorResponse} = useSelector(({auth}) => ({
      jwt: auth.jwt,
      myInfoLink: auth.links.myInfo,
      email: auth.email,
      form: auth.changePassword,
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
    // TODO
    console.log("send");
  };

  const onClickWithdraw = () => {
    // TODO
    console.log("withdraw");
  };

  useEffect(() => {
    dispatch(initializeForm('changePassword'));
    dispatch(myInfo(myInfoLink, {jwt}));
  }, [dispatch, jwt, myInfoLink]);

  // useEffect(() => {
  //   if (jwt) {
  //     history.push('/');
  //   }
  // }, [jwt, history]);

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
