import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import AccountContainer from "../../containers/accountant/AccountContainer";
import PageTemplate from "../../components/common/PageTemplate";

function AccountPage({match}) {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {accounts} = useSelector(({accountant}) => ({accounts: accountant.accounts}));

  if (!jwt) return <Redirect to={"/login"}/>;
  if (!accounts) return <Redirect to={"/account-list"}/>
  return (
    <PageTemplate>
      <AccountContainer id={match.params.id}/>
    </PageTemplate>
  );
}

export default AccountPage;
