import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import AuthForm from "../../components/auth/AuthForm";

function ForgetPage() {
  return (
    <AuthTemplate>
      <AuthForm type={"forget"}/>
    </AuthTemplate>
  );
}

export default ForgetPage;
