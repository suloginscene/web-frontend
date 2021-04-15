import client from './client';

export const index = ({indexLink}) =>
  client.get(indexLink);

export const postAccount = ({postAccountLink, jwt, type, name, money}) =>
  client.post(postAccountLink, {type, name, money}, {headers: {'X-AUTH-TOKEN': jwt}});
