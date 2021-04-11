import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavigationContainer from "./containers/NavigationContainer";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/member/SignupPage";
import VerifyPage from "./pages/member/VerifyPage";
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
import ServiceInformation from "./components/common/ServiceInformation";
import {useDispatch} from 'react-redux';
import {authIndex} from './modules/auth';
import {auth} from './properties/server';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authIndex(auth + '/api'));
  }, [dispatch]);

  return (
    <BrowserRouter>

      <header>
        <NavigationContainer/>
      </header>

      <main>
        <Switch>
          <Route component={HomePage} path={"/"} exact/>

          <Route component={SignupPage} path={"/signup"} exact/>
          <Route component={VerifyPage} path={"/verify"} exact/>
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

      <footer>
        <ServiceInformation/>
      </footer>

    </BrowserRouter>
  );
}

export default App;
