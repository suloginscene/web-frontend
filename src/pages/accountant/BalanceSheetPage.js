import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import PageTemplate from "../../components/common/PageTemplate";
import BalanceSheetContainer from "../../containers/accountant/BalanceSheetContainer";

function BalanceSheetPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <PageTemplate>
      <BalanceSheetContainer/>
    </PageTemplate>
    : <Redirect to={"/login"}/>;
}

export default BalanceSheetPage;
