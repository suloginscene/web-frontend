import React from 'react';
import AuthTemplate from "../../components/auth/AuthTemplate";
import SignupForm from "../../containers/SignupForm";

function SignupPage() {
  return (
    <AuthTemplate>
      <SignupForm/>
    </AuthTemplate>
  );
}

export default SignupPage;
