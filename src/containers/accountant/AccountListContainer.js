import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, postAccount} from "../../modules/accountant";
import AccountList from "../../components/accountant/AccountList";
import toErrorMessage from "../../lib/error/toErrorMessage";

function AccountListContainer() {

  const accounts = [{
    "id": 6,
    "name": "ASSET",
    "type": "Asset",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/6"
      }
    }
  }, {
    "id": 7,
    "name": "LIABILITY",
    "type": "Liability",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/7"
      }
    }
  }, {
    "id": 8,
    "name": "REVENUE",
    "type": "Revenue",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/8"
      }
    }
  }, {
    "id": 9,
    "name": "EXPENSE",
    "type": "Expense",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/accounts/9"
      }
    }
  }];

  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {form, postAccountLink, posted, errorResponse} = useSelector(({accountant}) => ({
      form: accountant.account,
      postAccountLink: accountant.links.postAccount,
      posted: accountant.posted,
      errorResponse: accountant.errorResponse
    })
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'account', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {type, name, money} = form;
    if ([type, name, money].includes('')) {
      setErrorMessage("빈 칸을 모두 입력해 주세요.");
      return;
    }
    if (name.length > 8) {
      setErrorMessage("계정 이름은 8자 이하여야 합니다.");
      return;
    }
    if (isNaN(money)) {
      setErrorMessage("금액은 숫자여야 합니다.");
      return;
    }
    dispatch(postAccount(postAccountLink, jwt, {type, name, money}));
  };

  useEffect(() => {
    dispatch(initializeForm('account'));
  }, [dispatch]);

  useEffect(() => {
    if (posted) {
      // TODO
      console.log('success');
    }
  }, [posted]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return (
    <AccountList
      accounts={accounts}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default AccountListContainer;
