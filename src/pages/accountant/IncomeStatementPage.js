import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import PageTemplate from "../../components/common/PageTemplate";
import IncomeStatementContainer from "../../containers/accountant/IncomeStatementContainer";

function IncomeStatementPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {incomeStatement} = useSelector(({accountant}) => ({incomeStatement: accountant.incomeStatement}));

  if (!jwt) return <Redirect to={"/login"}/>;
  if (!incomeStatement) return <Redirect to={"/income-statement-form"}/>;
  return (
    <PageTemplate>
      <IncomeStatementContainer/>
    </PageTemplate>
  );
}

export default IncomeStatementPage;
