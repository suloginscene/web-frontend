import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import MemberInfoContainer from "../../containers/MemberInfoContainer";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function MyPage() {
  const {jwt} = useSelector(({auth}) => ({jwt: auth.jwt}));
  return jwt ?
    <AuthTemplate>
      <MemberInfoContainer/>
    </AuthTemplate>
    : <Redirect to={"/login"}/>;
}

export default MyPage;
