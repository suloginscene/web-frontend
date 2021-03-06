import client from './client';

export const index = ({indexLink}) =>
  client.get(indexLink);

export const clear = ({clearLink, jwt})=>
  client.delete(clearLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const postAccount = ({postAccountLink, jwt, type, name, money}) =>
  client.post(postAccountLink, {type, name, money}, {headers: {'X-AUTH-TOKEN': jwt}});

export const getAccounts = ({getAccountsLink, jwt}) =>
  client.get(getAccountsLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const getAccount = ({getAccountLink, jwt}) =>
  client.get(getAccountLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const changeName = ({changeNameLink, jwt, newName}) =>
  client.put(changeNameLink, {newName}, {headers: {'X-AUTH-TOKEN': jwt}});

export const changeBudget = ({changeBudgetLink, jwt, newBudget}) =>
  client.put(changeBudgetLink, {newBudget}, {headers: {'X-AUTH-TOKEN': jwt}});

export const deleteAccount = ({deleteAccountLink, jwt}) =>
  client.delete(deleteAccountLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const getLedger = ({getLedgerLink, jwt}) =>
  client.get(getLedgerLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const getBalanceSheet = ({getBalanceSheetLink, jwt}) =>
  client.get(getBalanceSheetLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const getIncomeStatement = ({getIncomeStatementLink, jwt, begin, end}) =>
  client.get(getIncomeStatementLink + `?beginDate=${begin}&inclusiveEndDate=${end}`, {headers: {'X-AUTH-TOKEN': jwt}});

export const executeTransaction = ({executeTransactionLink, jwt, type, sourceId, destinationId, amount, description}) =>
  client.post(
    executeTransactionLink, {type, sourceId, destinationId, amount, description}, {headers: {'X-AUTH-TOKEN': jwt}});
