import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';

function Navigation() {
  return (
    <nav className={"navigation"}>
      <Link to={"/"}>홈</Link>

      <Link to={"/transaction"}>거래 등록</Link>

      <Link to={"/account-list"}>계정 관리</Link>

      <Link to={"/ledger"}>복식장부</Link>
      <Link to={"/balance-sheet"}>재무상태표</Link>
      <Link to={"/income-statement"}>손익계산서</Link>

      <Link to={"/login"}>로그인</Link>
      <Link to={"/my-page"}>내 정보</Link>
    </nav>
  );
}

export default Navigation;
