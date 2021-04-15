import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';

function Navigation({jwt, onClickLogout}) {
  function selectMenus() {
    return jwt ?
      <>
        <div className={"menu"}>
          <Link to={"/transaction"}>거래</Link>
        </div>

        <div className={"menu"}>
          <span>계정</span>
          <div className={"dropdown account-dropdown"}>
            <Link to={"/account-form"}>등록</Link>
            <Link to={"/account-list"}>목록</Link>
          </div>
        </div>

        <div className={"menu"}>
          <span>보고서</span>
          <div className={"dropdown report-dropdown"}>
            <Link to={"/ledger"}>복식장부</Link>
            <Link to={"/balance-sheet"}>재무상태표</Link>
            <Link to={"/income-statement"}>손익계산서</Link>
          </div>
        </div>

        <div className={"menu"}>
          <span>회원</span>
          <div className={"dropdown member-dropdown"}>
            <Link to={"/my-page"}>내 정보</Link>
            <span onClick={onClickLogout}>로그아웃</span>
          </div>
        </div>
      </>
      : <Link to={"/login"}>로그인</Link>;
  }

  return (
    <nav className={"navigation"}>
      <div className={"brand"}>
        <Link to={"/"}>SCENE</Link>
      </div>
      <div className={"menus"}>
        {selectMenus()}
      </div>
    </nav>
  );
}

export default Navigation;
