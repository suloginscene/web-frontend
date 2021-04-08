import React from 'react';
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <>
      LoginPage
      <Link to={"/signup"}>회원가입</Link>
      <Link to={"/forget"}>비밀번호 분실</Link>
    </>
  );
}

export default LoginPage;
