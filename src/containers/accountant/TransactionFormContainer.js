import React, {useEffect, useState} from 'react';
import TransactionForm from "../../components/accountant/TransactionForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, executeTransaction, getAccounts, initializeForm} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";
import {withRouter} from "react-router-dom";


function TransactionFormContainer({history}) {
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
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    dispatch(getAccounts(getAccountsLink, jwt));
  }, [dispatch, getAccountsLink, jwt]);


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
    if (executed) {
      history.push('/ledger');
    }
  }, [executed, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse))
    }
  }, [errorResponse]);


  useEffect(() => {
    return () => {
      dispatch(initializeForm('transactionForm'));
    }
  }, [dispatch]);


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
