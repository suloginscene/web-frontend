import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import AccountContainer from "../../containers/accountant/AccountContainer";
import PageTemplate from "../../components/common/PageTemplate";

function AccountPage({match}) {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <PageTemplate>
      <AccountContainer id={match.params.id}/>
    </PageTemplate>
    : <Redirect to={"/login"}/>;
}

export default AccountPage;
