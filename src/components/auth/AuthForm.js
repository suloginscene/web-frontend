import React from 'react';
import './AuthForm.scss';
import {Link} from "react-router-dom";

const textMap = {
  login: '로그인',
  signup: '회원가입',
  forget: '비밀번호 찾기'
};

function AuthForm({type, form, onChange, onSubmit}) {
  const text = textMap[type];

  function selectInputs() {
    switch (text) {
      case '로그인':
        return (
          <>
            <input
              name={"username"}
              type={"text"}
              placeholder={"이메일"}
              onChange={onChange}
              value={form.username}
            />
            <input
              name={"password"}
              type={"password"}
              placeholder={"비밀번호"}
              onChange={onChange}
              value={form.password}
            />
          </>
        );
      case '회원가입':
        return (
          <>
            <input
              name={"username"}
              type={"text"}
              placeholder={"이메일"}
              onChange={onChange}
              value={form.username}
            />
            <input
              name={"password"}
              type={"password"}
              placeholder={"비밀번호"}
              onChange={onChange}
              value={form.password}
            />
            <input
              name={"passwordConfirm"}
              type={"password"}
              placeholder={"비밀번호 확인"}
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </>
        );
      case '비밀번호 찾기':
        return (
          <>
            <input
              name={"username"}
              type={"text"}
              placeholder={"이메일"}
              onChange={onChange}
              value={form.username}
            />
          </>
        );
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
      <form onSubmit={onSubmit}>
        {selectInputs()}
        <button type={"submit"}>{text}</button>
      </form>
      <div className={"links"}>
        {selectLinks()}
      </div>
    </div>
  );
}

export default AuthForm;
