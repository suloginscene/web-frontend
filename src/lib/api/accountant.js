import client from './client';

export const index = ({indexLink}) =>
  client.get(indexLink);

export const postAccount = ({postAccountLink, jwt, type, name, money}) =>
  client.post(postAccountLink, {type, name, money}, {headers: {'X-AUTH-TOKEN': jwt}});

export const getAccounts = ({getAccountsLink, jwt}) =>
  client.get(getAccountsLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const getAccount = ({getAccountLink, jwt}) =>
  client.get(getAccountLink, {headers: {'X-AUTH-TOKEN': jwt}});
