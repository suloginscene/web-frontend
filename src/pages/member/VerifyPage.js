import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import VerifyForm from "../../containers/VerifyForm";

function VerifyPage() {
  return (
    <AuthTemplate>
      <VerifyForm/>
    </AuthTemplate>
  );
}

export default VerifyPage;
