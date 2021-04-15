import React from 'react';
import {useSelector} from "react-redux";
import CentralTemplate from "../../components/common/CentralTemplate";
import {Redirect} from "react-router-dom";
import AccountFormContainer from "../../containers/accountant/AccountFormContainer";

function AccountFormPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <CentralTemplate>
      <AccountFormContainer/>
    </CentralTemplate>
    : <Redirect to={"/login"}/>;
}

export default AccountFormPage;
