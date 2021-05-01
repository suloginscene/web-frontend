import React, {useEffect, useState} from 'react';
import TransactionForm from "../../components/accountant/TransactionForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, executeTransaction, getAccounts, initializeForm} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";
import {withRouter} from "react-router-dom";

function TransactionFormContainer({history}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {getAccountsLink, accounts, form, executeTransactionLink, executed, errorResponse}
    = useSelector(({accountant}) => ({
    getAccountsLink: accountant.links.getAccounts,
    accounts: accountant.accounts,
    form: accountant.transactionForm,
    executeTransactionLink: accountant.links.executeTransaction,
    executed: accountant.executed,
    errorResponse: accountant.errorResponse
  }));

  const onChange = (e) => {
    let {name, value} = e.target;
    if (name === 'amount') {
      value = Number(value.split(',').join('')).toLocaleString('ko-KR');
    }
    dispatch(changeField({form: 'transactionForm', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let {type, sourceId, destinationId, amount, description} = form;
    amount = amount.split(',').join('');
    if ([type, sourceId, destinationId, amount, description].includes('')) {
      setErrorMessage("빈 칸을 모두 입력해 주세요.");
      return;
    }
    if (isNaN(amount)) {
      setErrorMessage("금액은 숫자여야 합니다.");
      return;
    }
    dispatch(executeTransaction(executeTransactionLink, jwt, {type, sourceId, destinationId, amount, description}));
  };

  useEffect(() => {
    dispatch(getAccounts(getAccountsLink, jwt));
    dispatch(initializeForm('transactionForm'));
  }, [dispatch, getAccountsLink, jwt]);

  useEffect(() => {
    if (executed) {
      history.push('/ledger');
    }
  }, [executed, history]);

  // TODO 클린업 조건 확인
  // TODO 다른 컴포넌트에 클린업 적용
  useEffect(() => {
    return () => {
      dispatch(initializeForm('transactionForm'));
    }
  }, [dispatch]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse))
    }
  }, [errorResponse]);

  return accounts ? (
    <TransactionForm
      accounts={accounts}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  ) : <Loading/>;
}

export default withRouter(TransactionFormContainer);
