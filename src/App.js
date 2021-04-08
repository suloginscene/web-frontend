import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/member/SignupPage";
import LoginPage from "./pages/member/LoginPage";
import MyPage from "./pages/member/MyPage";
import ForgetPage from "./pages/member/ForgetPage";
import AccountListPage from "./pages/accountant/AccountListPage";
import AccountPage from "./pages/accountant/AccountPage";
import TransactionPage from "./pages/accountant/TransactionPage";
import LedgerPage from "./pages/accountant/LedgerPage";
import BalanceSheetPage from "./pages/accountant/BalanceSheetPage";
import IncomeStatementPage from "./pages/accountant/IncomeStatementPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>

      <header>
        <Link to={"/"}>홈</Link>

        <Link to={"/signup"}>회원가입</Link>
        <Link to={"/login"}>로그인</Link>
        <Link to={"/my-page"}>내 정보</Link>
        <Link to={"/forget"}>비밀번호 분실</Link>

        <Link to={"/account-list"}>계정 목록</Link>
        <Link to={"/account/:id"}>계정</Link>
        <Link to={"/transaction"}>거래</Link>

        <Link to={"/ledger"}>복식장부</Link>
        <Link to={"/balance-sheet"}>재무상태표</Link>
        <Link to={"/income-statement"}>손익계산서</Link>
      </header>

      <main>
        <Switch>
          <Route component={HomePage} path={"/"} exact/>

          <Route component={SignupPage} path={"/signup"} exact/>
          <Route component={LoginPage} path={"/login"} exact/>
          <Route component={MyPage} path={"/my-page"} exact/>
          <Route component={ForgetPage} path={"/forget"} exact/>

          <Route component={AccountListPage} path={"/account-list"} exact/>
          <Route component={AccountPage} path={"/account/:id"}/>
          <Route component={TransactionPage} path={"/transaction"} exact/>

          <Route component={LedgerPage} path={"/ledger"} exact/>
          <Route component={BalanceSheetPage} path={"/balance-sheet"} exact/>
          <Route component={IncomeStatementPage} path={"/income-statement"} exact/>

          <Route component={NotFoundPage}/>
        </Switch>
      </main>

      <footer>footer</footer>

    </BrowserRouter>
  );
}

export default App;
