import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import PageTemplate from "../../components/common/PageTemplate";
import IncomeStatementContainer from "../../containers/accountant/IncomeStatementContainer";

function IncomeStatementPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <PageTemplate>
      <IncomeStatementContainer/>
    </PageTemplate>
    : <Redirect to={"/login"}/>;
}

export default IncomeStatementPage;
