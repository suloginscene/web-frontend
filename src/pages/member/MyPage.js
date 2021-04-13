import React from 'react';
import CentralTemplate from "../../components/common/CentralTemplate";
import MemberInfoContainer from "../../containers/member/MemberInfoContainer";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function MyPage() {
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  return jwt ?
    <CentralTemplate>
      <MemberInfoContainer/>
    </CentralTemplate>
    : <Redirect to={"/login"}/>;
}

export default MyPage;
