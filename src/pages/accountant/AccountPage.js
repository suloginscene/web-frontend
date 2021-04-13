import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function AccountPage({match}) {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <>
      AccountPage {match.params.id}
    </>
    : <Redirect to={"/login"}/>;
}

export default AccountPage;
