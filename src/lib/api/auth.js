import client from './client';
import {auth} from '../../properties/server';

export const index = () =>
  client.get(auth + '/api');

// TODO use links
export const signup = ({username, password}) =>
  client.post(auth + '/api/members', {username, password});

export const verify = ({verificationLink, token}) =>
  client.post(verificationLink, {token});

export const login = ({username, password}) =>
  client.post(auth + '/jwt', {username, password});
