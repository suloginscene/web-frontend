import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function TransactionPage() {
  const {jwt} = useSelector(({auth}) => ({jwt: auth.jwt}));
  return jwt ?
    <>
      TransactionPage
    </>
    : <Redirect to={"/login"}/>;
}

export default TransactionPage;
