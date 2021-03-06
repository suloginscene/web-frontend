import client from './client';

export const index = ({indexLink}) =>
  client.get(indexLink);

export const signup = ({signupLink, username, password}) =>
  client.post(signupLink, {username, password});

export const verify = ({verificationLink, token}) =>
  client.post(verificationLink, {token});

export const login = ({loginLink, username, password}) =>
  client.post(loginLink, {username, password});

export const renew = ({renewLink, refreshToken}) =>
  client.post(renewLink, refreshToken, {headers: {'Content-Type': 'text/plain'}});

export const forget = ({forgetLink, username}) =>
  client.post(forgetLink, {username});

export const myInfo = ({myInfoLink, jwt}) =>
  client.get(myInfoLink, {headers: {'X-AUTH-TOKEN': jwt}});

export const changePassword = ({changePasswordLink, jwt, newPassword}) =>
  client.put(changePasswordLink, {newPassword}, {headers: {'X-AUTH-TOKEN': jwt}});

export const withdraw = ({withdrawLink, jwt}) =>
  client.delete(withdrawLink, {headers: {'X-AUTH-TOKEN': jwt}});
