import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

function AccountListPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <>
      AccountListPage
      <Link to={"/account/1"}>계정 1</Link>
    </>
    : <Redirect to={"/login"}/>;
}

export default AccountListPage;
