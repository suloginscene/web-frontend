import React from 'react';
import {useSelector} from "react-redux";
import IncomeStatementFormContainer from "../../containers/accountant/IncomeStatementFormContainer";
import {Redirect} from "react-router-dom";
import CentralTemplate from "../../components/common/CentralTemplate";

function IncomeStatementFormPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <CentralTemplate>
      <IncomeStatementFormContainer/>
    </CentralTemplate>
    : <Redirect to={"/login"}/>;
}

export default IncomeStatementFormPage;
