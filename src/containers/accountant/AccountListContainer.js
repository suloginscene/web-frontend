import React, {useEffect} from 'react';
import AccountList from "../../components/accountant/AccountList";
import {useDispatch, useSelector} from "react-redux";
import {getAccounts} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";

function AccountListContainer() {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {getAccountsLink, accounts, errorResponse} = useSelector(({accountant}) => ({
    getAccountsLink: accountant.links.getAccounts,
    accounts: accountant.accounts,
    errorResponse: accountant.errorResponse
  }));

  useEffect(() => {
    dispatch(getAccounts(getAccountsLink, jwt));
  }, [dispatch, getAccountsLink, jwt]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return accounts ? (
    <AccountList
      accounts={accounts}
    />
  ) : <Loading/>;
}

export default AccountListContainer;
