import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import CentralTemplate from "../../components/common/CentralTemplate";
import TransactionFormContainer from "../../containers/accountant/TransactionFormContainer";

function TransactionPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <CentralTemplate>
      <TransactionFormContainer/>
    </CentralTemplate>
    : <Redirect to={"/login"}/>;
}

export default TransactionPage;
