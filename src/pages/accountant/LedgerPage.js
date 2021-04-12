import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function LedgerPage() {
  const {jwt} = useSelector(({auth}) => ({jwt: auth.jwt}));
  return jwt ?
    <>
      LedgerPage
    </>
    : <Redirect to={"/login"}/>;
}

export default LedgerPage;
