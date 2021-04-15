import client from './client';

export const index = ({indexLink}) =>
  client.get(indexLink);
