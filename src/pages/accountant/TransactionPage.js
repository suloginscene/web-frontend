import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import AccountantTemplate from "../../components/accountant/AccountantTemplate";
import TransactionForm from "../../components/accountant/TransactionForm";

function TransactionPage() {
  const {jwt} = useSelector(({auth}) => ({jwt: auth.jwt}));
  return jwt ?
    <AccountantTemplate>
      <TransactionForm/>
    </AccountantTemplate>
    : <Redirect to={"/login"}/>;
}

export default TransactionPage;
