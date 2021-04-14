import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import LedgerContainer from "../../containers/accountant/LedgerContainer";
import PageTemplate from "../../components/common/PageTemplate";

function LedgerPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <PageTemplate>
      <LedgerContainer/>
    </PageTemplate>
    : <Redirect to={"/login"}/>;
}

export default LedgerPage;
