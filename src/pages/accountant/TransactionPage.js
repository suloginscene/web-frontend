import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import TransactionForm from "../../components/accountant/TransactionForm";
import CentralTemplate from "../../components/common/CentralTemplate";

function TransactionPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <CentralTemplate>
      <TransactionForm/>
    </CentralTemplate>
    : <Redirect to={"/login"}/>;
}

export default TransactionPage;
