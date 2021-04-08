import React from 'react';
import './AuthForm.scss';
import {Link} from "react-router-dom";

const textMap = {
  login: '로그인',
  signup: '회원가입',
  forget: '비밀번호 찾기'
};

function AuthForm({type}) {
  const text = textMap[type];

  function selectInputs() {
    switch (text) {
      case '로그인':
        return <input name={"password"} type={"password"} placeholder={"비밀번호"}/>
      case '회원가입':
        return (
          <>
            <input name={"password"} type={"password"} placeholder={"비밀번호"}/>
            <input name={"passwordConfirm"} type={"password"} placeholder={"비밀번호 확인"}/>
          </>
        );
      case '비밀번호 찾기':
        return <></>;
      default:
        throw new Error("타입이 적절하지 않습니다.");
    }
  }

  function selectLinks() {
    switch (text) {
      case '로그인':
        return (
          <>
            <Link to={"/signup"}>회원가입</Link>
            <Link to={"/forget"}>비밀번호 찾기</Link>
          </>
        );
      case '회원가입':
        return (
          <>
            <Link to={"/login"}>로그인</Link>
            <Link to={"/forget"}>비밀번호 찾기</Link>
          </>
        );
      case '비밀번호 찾기':
        return (
          <>
            <Link to={"/signup"}>회원가입</Link>
            <Link to={"/login"}>로그인</Link>
          </>
        );
      default:
        throw new Error("타입이 적절하지 않습니다.");
    }
  }

  return (
    <div className={"auth-form"}>
      <h3>{text}</h3>
      <form>
        <input name={"email"} type={"text"} placeholder={"이메일"}/>
        {selectInputs()}
        <button>{text}</button>
      </form>
      <div className={"links"}>
        {selectLinks()}
      </div>
    </div>
  );
}

export default AuthForm;
