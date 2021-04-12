import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function BalanceSheetPage() {
  const {jwt} = useSelector(({auth}) => ({jwt: auth.jwt}));
  return jwt ?
    <>
      BalanceSheetPage
    </>
    : <Redirect to={"/login"}/>;
}

export default BalanceSheetPage;
