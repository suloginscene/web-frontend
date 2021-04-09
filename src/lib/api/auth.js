import client from './client';
import {auth} from '../../properties/server';

export const index = () =>
  client.get(auth + '/api');

// TODO use links
export const login = ({username, password}) =>
  client.post(auth + '/jwt', {username, password});

export const signup = ({username, password}) =>
  client.post(auth + '/api/members', {username, password});
