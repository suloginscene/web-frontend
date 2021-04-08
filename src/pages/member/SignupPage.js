import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import AuthForm from "../../components/auth/AuthForm";

function SignupPage() {
  return (
    <AuthTemplate>
      <AuthForm type={"signup"}/>
    </AuthTemplate>
  );
}

export default SignupPage;
