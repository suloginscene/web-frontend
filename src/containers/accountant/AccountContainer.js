import React, {useEffect} from 'react';
import Account from "../../components/accountant/Account";
import {useDispatch, useSelector} from "react-redux";
import {changeBudget, changeField, changeName, deleteAccount, getAccount} from "../../modules/accountant";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";
import {withRouter} from "react-router-dom";

function AccountContainer({id, history}) {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));
  const {accounts, account, form, changed, deleted, errorResponse} = useSelector(({accountant}) => ({
    accounts: accountant.accounts,
    account: accountant.account,
    form: accountant.modifyForm,
    changed: accountant.changed,
    deleted: accountant.deleted,
    errorResponse: accountant.errorResponse
  }));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'modifyForm', key: name, value: value}));
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    const {newName} = form;
    if (newName === '') {
      alert("새 이름을 입력해 주세요.");
      return;
    }
    if (newName.length > 8) {
      alert("계정 이름은 8자 이하여야 합니다.");
      return;
    }
    dispatch(changeName(account._links.changeName.href, jwt, {newName}));
  };

  const onSubmitBudget = (e) => {
    e.preventDefault();
    const {newBudget} = form;
    if (newBudget === '') {
      alert("새 예산을 입력해 주세요.");
      return;
    }
    if (isNaN(newBudget)) {
      alert("금액은 숫자여야 합니다.");
      return;
    }
    dispatch(changeBudget(account._links.changeBudget.href, jwt, {newBudget}));
  };

  const onClickDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteAccount(account._links.deleteAccount.href, jwt));
    }
  };

  useEffect(() => {
    const simpleAccount = accounts.filter(account => account.id === Number(id))[0];
    dispatch(getAccount(simpleAccount._links.self.href, jwt));
  }, [dispatch, accounts, id, jwt]);

  useEffect(() => {
    if (changed) {
      history.push('/account-list');
    }
  }, [changed, history]);

  useEffect(() => {
    if (deleted) {
      history.push('/account-list');
    }
  }, [deleted, history]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  return account ? (
    <Account
      account={account}
      form={form}
      onChange={onChange}
      onSubmitName={onSubmitName}
      onSubmitBudget={onSubmitBudget}
      onClickDelete={onClickDelete}
    />
  ) : <Loading/>;
}

export default withRouter(AccountContainer);
