import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import MemberInfoContainer from "../../containers/MemberInfoContainer";

function MyPage() {
  return (
    <AuthTemplate>
      <MemberInfoContainer/>
    </AuthTemplate>
  );
}

export default MyPage;
