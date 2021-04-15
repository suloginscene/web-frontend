import React, {useEffect} from 'react';
import Account from "../../components/accountant/Account";
import {useDispatch, useSelector} from "react-redux";
import {getAccount} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";

function AccountContainer({id}) {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {accounts, account, errorResponse} = useSelector(({accountant}) => ({
    accounts: accountant.accounts,
    account: accountant.account,
    errorResponse: accountant.errorResponse
  }));

  useEffect(() => {
    const accountElement = accounts.filter(account => account.id === Number(id));
    const getAccountLink = accountElement[0]._links.self.href;
    dispatch(getAccount(getAccountLink, jwt));
  }, [dispatch, accounts, id, jwt]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return account ? (
    <Account
      account={account}
    />
  ) : <></>;
}

export default AccountContainer;
