import React from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import PageTemplate from "../../components/common/PageTemplate";
import AccountListContainer from "../../containers/accountant/AccountListContainer";

function AccountListPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <PageTemplate>
      <AccountListContainer/>
    </PageTemplate>
    : <Redirect to={"/login"}/>;
}

export default AccountListPage;
