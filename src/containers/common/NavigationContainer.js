import React, {useEffect} from 'react';
import Navigation from "../../components/common/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout, renew} from "../../modules/member";
import {withRouter} from "react-router-dom";


function NavigationContainer({history}) {
  const dispatch = useDispatch();

  const {jwt, refreshToken, renewLink, errorResponse} = useSelector(({member}) => ({
    jwt: member.jwt,
    refreshToken: member.refreshToken,
    renewLink: member.links.renew,
    errorResponse: member.errorResponse
  }));


  useEffect(() => {
    if (renewLink && refreshToken) {
      dispatch(renew(renewLink, refreshToken));
    }
  }, [dispatch, refreshToken, renewLink]);


  useEffect(() => {
    if (errorResponse) {
      if (errorResponse.data.error === 'RefreshTokenException') {
        alert('로그인 자동연장 기간이 만료되었습니다. 수동 로그인이 필요합니다.');
        dispatch(logout());
      }
    }
  }, [dispatch, errorResponse]);

  const onClickLogout = () => dispatch(logout());


  useEffect(() => {
    if (!jwt && !refreshToken) {
      history.push('/');
      localStorage.removeItem('refreshToken');
    }
  }, [jwt, refreshToken, history]);


  return (
    <Navigation
      jwt={jwt}
      onClickLogout={onClickLogout}
    />
  );
}


export default withRouter(NavigationContainer);
