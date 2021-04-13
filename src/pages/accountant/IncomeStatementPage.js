import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function IncomeStatementPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <>
      IncomeStatementPage
    </>
    : <Redirect to={"/login"}/>;
}

export default IncomeStatementPage;
