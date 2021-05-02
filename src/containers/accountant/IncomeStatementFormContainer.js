import React, {useEffect, useState} from 'react';
import IncomeStatementForm from "../../components/accountant/IncomeStatementForm";
import {useDispatch, useSelector} from "react-redux";
import {getIncomeStatement} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import {withRouter} from "react-router-dom";


function IncomeStatementFormContainer({history}) {
  const dispatch = useDispatch();

  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {getIncomeStatementLink, incomeStatement, errorResponse} = useSelector(({accountant}) => ({
    getIncomeStatementLink: accountant.links.getIncomeStatement,
    incomeStatement: accountant.incomeStatement,
    errorResponse: accountant.errorResponse
  }));
  const [errorMessage, setErrorMessage] = useState(null);


  const onSubmit = (e) => {
    e.preventDefault();
    const [beginDate, inclusiveEndDate] = e.target;
    const begin = beginDate.value;
    const end = inclusiveEndDate.value;
    if ([begin, end].includes('')) {
      setErrorMessage('날짜를 입력해 주세요.');
      return;
    }
    dispatch(getIncomeStatement(getIncomeStatementLink, jwt, {begin, end}));
  };

  useEffect(() => {
    if (incomeStatement) {
      history.push('/income-statement');
    }
  }, [incomeStatement, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  return (
    <IncomeStatementForm
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}


export default withRouter(IncomeStatementFormContainer);
