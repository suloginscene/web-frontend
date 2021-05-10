import React, {useEffect, useState} from 'react';
import AccountForm from "../../components/accountant/AccountForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, postAccount} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import {withRouter} from "react-router-dom";


function AccountFormContainer({history}) {
  const dispatch = useDispatch();

  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {form, postAccountLink, posted, errorResponse} = useSelector(({accountant}) => ({
    form: accountant.accountForm,
    postAccountLink: accountant.links.postAccount,
    posted: accountant.posted,
    errorResponse: accountant.errorResponse
  }));
  const [errorMessage, setErrorMessage] = useState(null);


  const onChange = (e) => {
    let {name, value} = e.target;
    if (name === 'money') {
      value = value.split(',').join('');
      if (isNaN(value)) return;
      value = Number(value).toLocaleString('ko-KR');
    } else if (name === 'name') {
      if (value.length > 8) return;
    }
    dispatch(changeField({form: 'accountForm', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let {type, name, money} = form;
    money = money.split(',').join('');
    if ([type, name, money].includes('')) {
      setErrorMessage("빈 칸을 모두 입력해 주세요.");
      return;
    }
    dispatch(postAccount(postAccountLink, jwt, {type, name, money}));
  };

  useEffect(() => {
    if (posted) {
      history.push('/account-list');
    }
  }, [posted, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  useEffect(() => {
    return () => {
      dispatch(initializeForm('accountForm'));
    }
  }, [dispatch]);


  return (
    <AccountForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}


export default withRouter(AccountFormContainer);
